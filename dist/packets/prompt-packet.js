"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const packet_type_1 = require("../packet-type");
/**
 * Empty, Unknown or Unimplemented packet.
 */
class PromptPacket {
    constructor() {
        this.type = packet_type_1.PacketType.PROMPT;
        this.fixed = true;
    }
    write(buffer) { }
    read(buffer, type, size) {
        this.title = buffer.readRS2String();
    }
}
exports.PromptPacket = PromptPacket;
