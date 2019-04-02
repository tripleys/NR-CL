import { PacketBuffer } from "../packet-buffer";
import { Packet } from "./packet";
import { PacketType } from "../packet-type";

export class CommandPacket implements Packet {

    type = PacketType.CHAT;
    fixed = true;

    public text: string;

    write(buffer: PacketBuffer): void {
        buffer.writeByte(this.text.length - 1);
        buffer.writeRS2String(this.text.substring(2));
    }

    read(buffer: PacketBuffer, type: number, size: number): void {}
}