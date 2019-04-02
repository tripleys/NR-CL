"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const empty_packet_1 = require("./packets/empty-packet");
const logout_packet_1 = require("./packets/logout-packet");
const packet_type_1 = require("./packet-type");
const dialogue_packet_1 = require("./packets/dialogue-packet");
const prompt_packet_1 = require("./packets/prompt-packet");
class Packets {
    static get_server_packet(type) {
        switch (type) {
            case packet_type_1.PacketType.LOGOUT:
                return new logout_packet_1.LogoutPacket;
            //case PacketType.MESSAGE:
            //return new MessagePacket;
            case packet_type_1.PacketType.DIALOGUE:
                return new dialogue_packet_1.DialoguePacket;
            case packet_type_1.PacketType.PROMPT:
                return new prompt_packet_1.PromptPacket;
            default:
                return new empty_packet_1.EmptyPacket;
        }
    }
    static signal(packetId, packet, client) {
        if (Packets.signals[packetId]) {
            Packets.signals[packetId].forEach(fn => fn.apply(client, [packet]));
            Packets.moduleSignals[packetId].forEach(m => m.fun.apply(m.instance, [client, packet]));
        }
    }
}
Packets.signals = {};
Packets.moduleSignals = {};
exports.Packets = Packets;
