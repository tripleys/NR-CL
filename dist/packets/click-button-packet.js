"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const packet_type_1 = require("../packet-type");
class ClickButtonPacket {
    constructor(buttonID) {
        this.type = packet_type_1.PacketType.CLICK_BUTTON;
        this.fixed = true;
        this.buttonID = buttonID;
    }
    write(buffer) {
        buffer.writeShort(this.buttonID);
    }
    read(buffer, type, size) {
        this.buttonID = buffer.readShort();
    }
}
exports.ClickButtonPacket = ClickButtonPacket;
