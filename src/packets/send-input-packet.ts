import { PacketBuffer } from "../packet-buffer";
import { Packet } from "./packet";
import { PacketType } from "../packet-type";

/**
 * Empty, Unknown or Unimplemented packet.
 */
export class SendInputPacket implements Packet {

    type = PacketType.SEND_INPUT;
    fixed = false;

    public input: string;

    constructor(input?: string) {
        this.input = input;
    }

    write(buffer: PacketBuffer): void {
        buffer.writeRS2String(this.input);
    }

    read(buffer: PacketBuffer, type: number, size: number): void {}
}