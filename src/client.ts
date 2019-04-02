import { Socket } from "net";
import { PacketBuffer } from "./packet-buffer";
import { Packet } from "./packets/packet";
import { Packets } from "./packets";
import { ISAACRandomGen } from "./isaac-random-gen";
import { EmptyPacket } from "./packets/empty-packet";
import { WalkPacket } from "./packets/walk-packet";
import { ClickButtonPacket } from "./packets/click-button-packet";
import { LogoutPacket } from "./packets/logout-packet";
import { MessagePacket } from "./packets/message-packet";
import { TimeoutPacket } from "./packets/timeout-packet";
import { DialoguePacket } from "./packets/dialogue-packet";
import { ContinuePacket } from "./packets/continue-packet";
import { ClickingPacket } from "./packets/clicking-packet";
import { Signal } from "./module/signal";
import { PacketType } from "./packet-type";
import { TextUtil } from "./util/text-util";
import { EndPoint } from "./data/endpoint";
import { Account } from "./data/account";
import { Proxy } from "./data/proxy";
import { SocksClientOptions, SocksClient } from "socks";
import { ModuleManager } from "./module/module-manager";

const uuid = require('uuid');

const GAME_VERSION = 72;

const PACKET_SIZES = [
    0, 0, 0, 1, 6, 3, 6, 0, 4,
    0, 0, 5, 0, 0, -2, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 1, 0, 0,
    -1, 0, 1, 0, 0, 0, -2, -2,
    4, 3, 14, 2, 0, 0, 0, 0, 0,
    5, 8, 0, 6, 0, 0, 9, 8, 0,
    -2, -2, 0, 0, 0, 0, 0, -2,
    1, 0, 0, 2, -2, 0, 0, 0, 0,
    6, 3, 2, 4, 2, 4, 0, 0,0, 4,
    0, -2, 0, 0, 7, 2, 0, 6, 6,
    0, 0, 0, 0, 0, 0,0, 0, 4, 0,
    1, 0, 2, 0, 1, -1, 4, 1, 0,
    1, 0, 1, 1, 1, 1, 2, 1, 4,
    15, 0, 0, 0, 4, 4, -1, 5, 0,
    -2, 1, 2, 0, 0, 0, 0, 0, 9,
    0, 0, 0, 0, 0, 0, 0, 2, 0, 0,
    0, 0, 14, 0, 0, 16, 6, 6, 0,
    0, 0, 5, 0, 0, 0, 4, 0, 0, 0,
    2, 0, 6, 0, 0, 0, 0, 3, 0, 0,
    5, 5, 10, 6, 0, 0, 0, 0, 0, 0,
    0, 2, 0, -1, 0, 0, 6, 18, 0,
    0, 0, 0, -1, 0, 0, 0, 4, 0, 0,
    0, 0, 0, 3, 0, 2, 0, 0, 0, 0, 0,
    -2, 7, 0, -2, 2, 0, 0, 1, 0, 0,
    0, 0, 0, 0, 0, 0, 8, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 2, -2, 0, 0, -1, 0,
    6, 0, 4, 3, 8, 0, 0, -1, 6, 0, 0
];

const DEBUG_MODE = false

export class Client {

    public account: Account;

    private client: Socket;
    private connection: Socket;

    private serverPacketType: number = -1;
    private serverPacketSize: number = -1;

    private out: PacketBuffer;
    private in: PacketBuffer;

    private clientEncryption: ISAACRandomGen;
    private serverEncryption: ISAACRandomGen;

    private loggedIn: boolean = false;
    private privilege: number;

    private updateTimer: NodeJS.Timer;
    private packetQueue: Buffer[];
    private lastTime: number;

    public tutorial: boolean = false;
    public endpoint: EndPoint;
    constructor(account: Account, endpoint: EndPoint) {
        this.account = account;
        this.endpoint = endpoint;
        this.connect();
    }

    public connect(): void {
        this.kill = false;
        this.packetQueue = [];
        this.lastTime = 0;
        this.in = new PacketBuffer(1);
        this.out = new PacketBuffer(4096);
        if (this.endpoint.proxy) {
            SocksClient.createConnection(this.endpoint.proxy).then(info => {
                this.connection = info.socket;
                this.connection.on('data', this.onData.bind(this));
                this.connection.on('close', this.disconnect.bind(this));
                this.connection.on('error', error => { });
                this.login();
            });
        } else {
            this.connection = new Socket;// '185.30.166.138'
            this.connection.connect(this.endpoint.port, this.endpoint.address, this.login.bind(this));
            this.connection.on('data', this.onData.bind(this));
            this.connection.on('close', this.disconnect.bind(this));
            this.connection.on('error', error => { });
        }
    }

    @Signal(PacketType.MESSAGE)
    public onMessage(message: MessagePacket): void {
        this.log(`Message: "${message.text}"`);
    }

    private login(): void {

        this.log("Connected.");

        // login protocol
        // write the login protocol, always 14
        this.out.writeByte(14);

        let hash = TextUtil.longForName(this.account.username);
        hash = (hash >> 16 & 31);
        // write name hash
        this.out.writeByte(hash & 0xff);
        // send
        this.connection.write(this.out.data.slice(0, 2));
        // reset buffer
        this.resetOutgoingBuffer();
        // wait for data to arrive
    }

    private finishLogin(data: Buffer): void {

        let index = 0;

        // read the first 8 bytes
        for (let i = 0; i < 8; i++ , data.readInt8(index++));

        // should be 0
        let k = data.readInt8(index++);

        if (k !== 0) {
            console.log(`Invalid Login Status: ${k}`);
            this.disconnect();
            return;
        }


        const serverSessionKey = [];
        serverSessionKey.push(data.readInt32BE(index));
        index += 4;
        serverSessionKey.push(data.readInt32BE(index));
        index += 4;

        const seed = [];
        seed[0] = Math.floor(Math.random() * 99999999);
        seed[1] = Math.floor(Math.random() * 99999999);
        seed[2] = serverSessionKey[0];
        seed[3] = serverSessionKey[1];

        this.out.bufferIndex++;
        this.out.writeByte(10);
        for (const a of seed)
            this.out.writeInt32(a);
        this.out.writeInt32(350);
        this.out.writeRS2String(uuid.v4());
        this.out.writeRS2String(this.account.username);
        this.out.writeRS2String(this.account.password);
        this.out.writeRS2String("");
        this.out.writeRS2String("");
        this.out.writeRS2String("false");
        this.out.writeRS2String(uuid.v4());
        const size = this.out.bufferIndex;
        this.out.bufferIndex = 0;
        this.out.writeUnsignedByte((size - 1) & 0xff);
        const loginBuffer = new PacketBuffer;
        loginBuffer.writeByte(16);
        loginBuffer.writeUnsignedByte((size & 0xff) + 36 + 1 + 1 + 2);
        loginBuffer.writeUnsignedByte(255);
        loginBuffer.writeShort(GAME_VERSION);
        loginBuffer.writeByte(0);
        this.clientEncryption = new ISAACRandomGen(seed);
        for (let i = 0; i < 9; i++) {
            if (i < 4) {
                seed[i] += 50;
            }
            loginBuffer.writeInt32(0);
        }
        this.serverEncryption = new ISAACRandomGen(seed);
        this.connection.write(Buffer.concat([loginBuffer.data.slice(0, loginBuffer.bufferIndex), this.out.data.slice(0, size)]));
        this.resetOutgoingBuffer();
    }

    private start: number;

    private startGameProcessor(): void {
        this.start = Date.now();
        setTimeout(() => {
            //if (!this.tutorial) ModuleManager.hook("Thieving Bot", this);
        }, 10000);
        this.updateTimer = setInterval(() => {
            if (Date.now() - this.lastTime > 200) {
                this.queuePacket(new TimeoutPacket);
                this.lastTime = Date.now();
            }
            this.packetQueue.forEach(buf => this.connection.write(buf));
            this.packetQueue.length = 0;
        }, 1000 / 30);
    }

    private onData(data: Buffer): void {
        try {
            this.parsePacket(data);
        } catch(exp) {
            this.disconnect();
        }
    }

    private parsePacket(data: Buffer): void {
        if (!this.serverEncryption) {

            this.finishLogin(data);

            return;
        }
        // login protocol
        if (!this.loggedIn) {

            const response = data.readInt8(0);

            this.log(`Response: ${response} | Data: ${JSON.stringify(data)}`);
            if (response === 2) {
                this.log("Login successful.");
                this.privilege = data.readInt8(1);
                this.loggedIn = true;
                this.startGameProcessor();
                
                if (data.length === 3) return;
                data = data.slice(3);
            } else if (response === 3) {
                this.log("Invalid username or password.");
            } else if (response === 4) {
                this.log("Your account has been banned.");
            } else if (response === 5) {
                this.log("Your account is already logged in.");
            } else if (response === 6) {
                this.log("Version mismatch: Update required!");
            } else if (response === 7) {
                this.log("This world is full.");
            } else {
                this.log("Unimplemented response.");
            }

            if (!this.loggedIn) {
                this.disconnect();
                return;
            }
        }

        let index = 0;
        for (const byte of data) {
            if (this.serverPacketType !== -1) {
                if (this.serverPacketSize === -1) {
                    this.serverPacketSize = data.readUInt8(Math.max(index - 1, 0));
                    this.in.resizeBuffer(this.serverPacketSize + 2);
                } else if (this.serverPacketSize === -2) {
                    this.serverPacketSize = data.readUInt16BE(Math.max(index - 1, 0));
                    this.in.resizeBuffer(this.serverPacketSize + 3);
                }
            }
            if (this.in.bufferIndex < this.in.data.length) {
                this.in.data[this.in.bufferIndex++] = byte;
            } else {
                if (this.serverPacketType === -1) {
                    this.processHead(data);
                } else {
                    this.processPacket();
                }
                this.in.data[this.in.bufferIndex++] = byte;
            }
            index++;
        }

        if (this.in.bufferIndex === this.in.data.length) {
            if (this.serverPacketType === -1) {
                this.processHead(data);
            } else {
                this.processPacket();
            }
        }
    }

    private processHead(data: Buffer): void {
        if (!this.serverEncryption) {
            return;
        }
        this.in.bufferIndex = 0;

        this.serverPacketType = this.in.readByte() & 0xFF;

        this.serverPacketType = this.serverPacketType - this.serverEncryption.getNextKey() & 0xFF;

        this.serverPacketSize = PACKET_SIZES[this.serverPacketType];

        if (this.serverPacketSize > 0)
            this.in.resizeBuffer(this.serverPacketSize + 1);
        else if (this.serverPacketSize === 0)
            this.processPacket();
    }

    private processPacket(): void {

        const packet = Packets.get_server_packet(this.serverPacketType);

        const size = PACKET_SIZES[this.serverPacketType];
        this.in.bufferIndex = (size === -1 ? 2 : size === -2 ? 3 : 1);

        //console.log(`[Server]: ${this.serverPacketType} | ${this.serverPacketSize} | ${this.in.data.length}`);

        if (size === -1) {
            this.in.data[1] = this.serverPacketSize;
        }

        if (packet) {
            try {
                packet.read(this.in, this.serverPacketType, this.serverPacketSize);
            } catch(exception) {
                this.disconnect();
            }
        }

        Packets.signal(this.serverPacketType, packet, this);

        this.resetServerBuffer();
    }

    private resetOutgoingBuffer(): void {
        this.out = new PacketBuffer(4096);
    }

    private resetServerBuffer(): void {
        this.serverPacketType = -1;
        this.serverPacketSize = -1;
        this.in = new PacketBuffer(1);
    }

    private kill: boolean;

    public disconnect(): void {
        // already disconnected
        if (!this.kill) {
            console.log("Disconnected.");
            setTimeout(() => this.connect(), 500);
        };
        this.kill = true;
        this.reset();
    }

    private reset(): void {
        this.loggedIn = false;
        this.privilege = -1;
        this.clientEncryption = null;
        this.serverEncryption = null;
        this.resetOutgoingBuffer();
        this.resetServerBuffer();
    }

    /**
     * Queues packet(s)
     * @param packets 
     */
    public queuePacket(...packets: Packet[]) {

        if (this.kill) return;
try {
        for (const packet of packets) {
            if (packet.type != 0)
                this.log(`Adding to PacketQueue [${packet.type}]`);
            this.out.writeUnsignedByte((packet.type + this.clientEncryption.getNextKey()) & 0xff);
            if (packet.fixed) {
                packet.write(this.out);
                this.packetQueue.push(this.out.data.slice(0, this.out.bufferIndex));
            } else {
                this.out.bufferIndex++;
                packet.write(this.out);
                const size = this.out.bufferIndex;
                this.out.bufferIndex = 1;
                this.out.writeUnsignedByte(size - 2);
                this.packetQueue.push(this.out.data.slice(0, size));
            }
            this.resetOutgoingBuffer();
        }
    } catch(exc) {

    }
    }

    public log(text: string): void {
        console.log(`[${this.account.alias}]: ${text}`);
    }
}