import { PacketBuffer } from "../packet-buffer";
import { Packet } from "./packet";

/**
 * Empty, Unknown or Unimplemented packet.
 */
export class ContinuePacket implements Packet {

    type = 40;
    fixed = true;

    public action: number;

    constructor(action?: number) {
        this.action = action;
    }

    write(buffer: PacketBuffer): void {
        buffer.writeShort(this.action);
    }

    read(buffer: PacketBuffer, type: number, size: number): void {}
}