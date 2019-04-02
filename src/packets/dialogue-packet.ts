import { PacketBuffer } from "../packet-buffer";
import { Packet } from "./packet";

/**
 * Empty, Unknown or Unimplemented packet.
 */
export class DialoguePacket implements Packet {

    type = 126;
    fixed = true;

    public text: string;
    public frame: number;

    write(buffer: PacketBuffer): void {}

    read(buffer: PacketBuffer, type: number, size: number): void {
        this.text = buffer.readRS2String();
        this.frame = buffer.readUnsignedShortA();
    }
}