import { PacketBuffer } from "../packet-buffer";
import { Packet } from "./packet";

/**
 * Empty, Unknown or Unimplemented packet.
 */
export class EmptyPacket implements Packet {

    type = -1;
    fixed = true;

    write(buffer: PacketBuffer): void {}

    read(buffer: PacketBuffer, type: number, size: number): void {}
}