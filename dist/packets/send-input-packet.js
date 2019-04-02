"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const packet_type_1 = require("../packet-type");
/**
 * Empty, Unknown or Unimplemented packet.
 */
class SendInputPacket {
    constructor(input) {
        this.type = packet_type_1.PacketType.SEND_INPUT;
        this.fixed = false;
        this.input = input;
    }
    write(buffer) {
        buffer.writeRS2String(this.input);
    }
    read(buffer, type, size) { }
}
exports.SendInputPacket = SendInputPacket;
