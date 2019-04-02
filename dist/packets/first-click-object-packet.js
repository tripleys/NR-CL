"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const packet_type_1 = require("../packet-type");
class FirstClickObjectPacket {
    constructor() {
        this.type = packet_type_1.PacketType.FIRST_CLICK_OBJECT;
        this.fixed = true;
    }
    write(buffer) {
        buffer.writeNeekerA(this.x);
        buffer.writeShort(this.objectId);
        buffer.writeNeekerB(this.y);
    }
    read(buffer, type, size) { }
}
exports.FirstClickObjectPacket = FirstClickObjectPacket;
