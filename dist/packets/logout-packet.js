"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const packet_type_1 = require("../packet-type");
class LogoutPacket {
    constructor() {
        this.type = packet_type_1.PacketType.LOGOUT;
        this.fixed = true;
    }
    write(buffer) { }
    read(buffer, type, size) { }
}
exports.LogoutPacket = LogoutPacket;
