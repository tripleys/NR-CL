import { Packet } from "./packets/packet";
import { EmptyPacket } from "./packets/empty-packet";
import { Client } from "./client";
import { WalkPacket } from "./packets/walk-packet";
import { ClickButtonPacket } from "./packets/click-button-packet";
import { LogoutPacket } from "./packets/logout-packet";
import { MessagePacket } from "./packets/message-packet";
import { PacketType } from "./packet-type";
import { DialoguePacket } from "./packets/dialogue-packet";
import { Module } from "./module/module";
import { PromptPacket } from "./packets/prompt-packet";

export class Packets {

    public static signals: {
        [packetId: number]: Function[]
    } = {};

    public static moduleSignals: {
        [packetId: number]: {
            instance: any,
            fun: Function
        }[]
    } = {};

    static get_server_packet(type: number): Packet {
        switch(type) {
            case PacketType.LOGOUT:
            return new LogoutPacket;
            //case PacketType.MESSAGE:
            //return new MessagePacket;
            case PacketType.DIALOGUE:
            return new DialoguePacket;
            case PacketType.PROMPT:
            return new PromptPacket;
            default:
            return new EmptyPacket;
        }
    }

    public static signal(packetId: number, packet: Packet, client: Client): void {
        if (Packets.signals[packetId]) {
            Packets.signals[packetId].forEach(fn => fn.apply(client, [packet]));
            Packets.moduleSignals[packetId].forEach(m => m.fun.apply(m.instance, [client, packet]));
        }
    }

}