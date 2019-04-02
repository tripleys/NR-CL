"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Empty, Unknown or Unimplemented packet.
 */
class DialoguePacket {
    constructor() {
        this.type = 126;
        this.fixed = true;
    }
    write(buffer) { }
    read(buffer, type, size) {
        this.text = buffer.readRS2String();
        this.frame = buffer.readUnsignedShortA();
    }
}
exports.DialoguePacket = DialoguePacket;
