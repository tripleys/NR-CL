"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const packet_type_1 = require("../packet-type");
class CommandPacket {
    constructor() {
        this.type = packet_type_1.PacketType.CHAT;
        this.fixed = true;
    }
    write(buffer) {
        buffer.writeByte(this.text.length - 1);
        buffer.writeRS2String(this.text.substring(2));
    }
    read(buffer, type, size) { }
}
exports.CommandPacket = CommandPacket;
