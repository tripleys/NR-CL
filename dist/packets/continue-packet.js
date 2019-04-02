"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Empty, Unknown or Unimplemented packet.
 */
class ContinuePacket {
    constructor(action) {
        this.type = 40;
        this.fixed = true;
        this.action = action;
    }
    write(buffer) {
        buffer.writeShort(this.action);
    }
    read(buffer, type, size) { }
}
exports.ContinuePacket = ContinuePacket;
