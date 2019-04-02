"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const packet_type_1 = require("../packet-type");
/**
 * Message from server
 */
class MessagePacket {
    constructor() {
        this.type = packet_type_1.PacketType.MESSAGE;
        this.fixed = true;
    }
    write(buffer) {
        buffer.writeRS2String(this.text);
    }
    read(buffer, type, size) {
        this.text = buffer.readRS2String();
    }
}
exports.MessagePacket = MessagePacket;
