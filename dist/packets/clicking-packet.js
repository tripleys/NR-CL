"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const packet_type_1 = require("../packet-type");
/**
 * Empty, Unknown or Unimplemented packet.
 */
class ClickingPacket {
    constructor() {
        this.type = packet_type_1.PacketType.CLICKING;
        this.fixed = true;
    }
    write(buffer) {
        buffer.writeInt32(61161963);
    }
    read(buffer, type, size) { }
}
exports.ClickingPacket = ClickingPacket;
