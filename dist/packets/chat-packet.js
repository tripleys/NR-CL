"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const packet_type_1 = require("../packet-type");
class ChatPacket {
    constructor() {
        this.type = packet_type_1.PacketType.CHAT;
        this.fixed = false;
    }
    write(buffer) { }
    read(buffer, type, size) { }
}
exports.ChatPacket = ChatPacket;
