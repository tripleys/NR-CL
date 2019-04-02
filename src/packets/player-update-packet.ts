import { PacketBuffer } from "../packet-buffer";
import { Packet } from "./packet";
import { PacketType } from "../packet-type";

/**
 * Empty, Unknown or Unimplemented packet.
 */
export class PlayerUpdatePacket implements Packet {

    type = PacketType.PLAYER_UPDATE;
    fixed = false;

    public j: number;
    public k: number;

    write(buffer: PacketBuffer): void {}

    read(buffer: PacketBuffer, type: number, size: number): void {
        buffer.initBitAccess();
        this.j = buffer.readBits(1);
        if (this.j === 0)
            return;
        this.k = buffer.readBits(2);
        if (this.k === 0)
            return
    }
}