import { PacketBuffer } from "../packet-buffer";
import { Packet } from "./packet";
import { PacketType } from "../packet-type";

export class ClickButtonPacket implements Packet {

    type = PacketType.CLICK_BUTTON;
    fixed = true;

    public buttonID: number;

    constructor(buttonID?: number) {
        this.buttonID = buttonID;
    }

    write(buffer: PacketBuffer): void {
        buffer.writeShort(this.buttonID);
    }

    read(buffer: PacketBuffer, type: number, size: number): void {
        this.buttonID = buffer.readShort();
    }
}