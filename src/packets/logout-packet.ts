import { PacketBuffer } from "../packet-buffer";
import { Packet } from "./packet";
import { PacketType } from "../packet-type";

export class LogoutPacket implements Packet {

    type = PacketType.LOGOUT;
    fixed = true;

    write(buffer: PacketBuffer): void {}

    read(buffer: PacketBuffer, type: number, size: number): void {}
}