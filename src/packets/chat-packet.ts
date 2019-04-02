import { PacketBuffer } from "../packet-buffer";
import { Packet } from "./packet";
import { PacketType } from "../packet-type";

export class ChatPacket implements Packet {

    type = PacketType.CHAT;
    fixed = false;

    write(buffer: PacketBuffer): void {}

    read(buffer: PacketBuffer, type: number, size: number): void {}
}