import { PacketBuffer } from "../packet-buffer";

export interface Packet {

    type: number;
    fixed: boolean;

    write(buffer: PacketBuffer): void;

    read(buffer: PacketBuffer, type: number, size: number): void;
}