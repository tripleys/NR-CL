import { PacketBuffer } from "../packet-buffer";
import { Packet } from "./packet";
import { PacketType } from "../packet-type";

/**
 * Message from server
 */
export class MessagePacket implements Packet {

    type = PacketType.MESSAGE;
    fixed = true;

    public text: string;

    write(buffer: PacketBuffer): void {
        buffer.writeRS2String(this.text);
    }

    read(buffer: PacketBuffer, type: number, size: number): void {
        this.text = buffer.readRS2String();
    }
}