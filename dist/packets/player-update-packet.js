"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const packet_type_1 = require("../packet-type");
/**
 * Empty, Unknown or Unimplemented packet.
 */
class PlayerUpdatePacket {
    constructor() {
        this.type = packet_type_1.PacketType.PLAYER_UPDATE;
        this.fixed = false;
    }
    write(buffer) { }
    read(buffer, type, size) {
        buffer.initBitAccess();
        this.j = buffer.readBits(1);
        if (this.j === 0)
            return;
        this.k = buffer.readBits(2);
        if (this.k === 0)
            return;
    }
}
exports.PlayerUpdatePacket = PlayerUpdatePacket;
