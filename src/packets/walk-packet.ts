import { PacketBuffer } from "../packet-buffer";
import { Packet } from "./packet";
import { PacketType } from "../packet-type";

export class WalkPacket implements Packet {

    type = PacketType.WALK;
    fixed = true;

    public x: number;
    public y: number;

    write(buffer: PacketBuffer): void {
        buffer.writeByte(5);
        buffer.writeNeekerA(this.x);
        buffer.writeNeeker(this.y);
        buffer.writeByte(0);
    }

    read(buffer: PacketBuffer, type: number, size: number): void {}
}