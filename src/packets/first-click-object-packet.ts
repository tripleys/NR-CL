import { PacketBuffer } from "../packet-buffer";
import { Packet } from "./packet";
import { PacketType } from "../packet-type";

export class FirstClickObjectPacket implements Packet {

    type = PacketType.FIRST_CLICK_OBJECT;
    fixed = true;

    public x: number;
    public objectId: number;
    public y: number;

    write(buffer: PacketBuffer): void {
        buffer.writeNeekerA(this.x);
        buffer.writeShort(this.objectId);
        buffer.writeNeekerB(this.y);
    }

    read(buffer: PacketBuffer, type: number, size: number): void {}
}