"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const packet_type_1 = require("../packet-type");
class WalkPacket {
    constructor() {
        this.type = packet_type_1.PacketType.WALK;
        this.fixed = true;
    }
    write(buffer) {
        buffer.writeByte(5);
        buffer.writeNeekerA(this.x);
        buffer.writeNeeker(this.y);
        buffer.writeByte(0);
    }
    read(buffer, type, size) { }
}
exports.WalkPacket = WalkPacket;
