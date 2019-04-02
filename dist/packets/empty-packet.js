"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Empty, Unknown or Unimplemented packet.
 */
class EmptyPacket {
    constructor() {
        this.type = -1;
        this.fixed = true;
    }
    write(buffer) { }
    read(buffer, type, size) { }
}
exports.EmptyPacket = EmptyPacket;
