import { PacketBuffer } from "../packet-buffer";
import { Packet } from "./packet";
import { PacketType } from "../packet-type";

/**
 * Empty, Unknown or Unimplemented packet.
 */
export class ClickingPacket implements Packet {

    type = PacketType.CLICKING;
    fixed = true;

    write(buffer: PacketBuffer): void {
        buffer.writeInt32(61161963);
    }

    read(buffer: PacketBuffer, type: number, size: number): void {}
}