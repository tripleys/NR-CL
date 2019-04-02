import { PacketBuffer } from "../packet-buffer";
import { Packet } from "./packet";
import { PacketType } from "../packet-type";

/**
 * Empty, Unknown or Unimplemented packet.
 */
export class PromptPacket implements Packet {

    type = PacketType.PROMPT;
    fixed = true;

    public title: string;

    write(buffer: PacketBuffer): void {}

    read(buffer: PacketBuffer, type: number, size: number): void {
        this.title = buffer.readRS2String();
    }
}