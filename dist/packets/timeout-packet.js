"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Empty, Unknown or Unimplemented packet.
 */
class TimeoutPacket {
    constructor() {
        this.type = 0;
        this.fixed = true;
    }
    write(buffer) { }
    read(buffer, type, size) { }
}
exports.TimeoutPacket = TimeoutPacket;
