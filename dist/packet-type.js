"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var PacketType;
(function (PacketType) {
    PacketType[PacketType["CHAT"] = 103] = "CHAT";
    PacketType[PacketType["LOGOUT"] = 109] = "LOGOUT";
    PacketType[PacketType["WALK"] = 164] = "WALK";
    PacketType[PacketType["MESSAGE"] = 253] = "MESSAGE";
    PacketType[PacketType["CLICK_BUTTON"] = 185] = "CLICK_BUTTON";
    PacketType[PacketType["CLICKING"] = 241] = "CLICKING";
    PacketType[PacketType["DIALOGUE"] = 126] = "DIALOGUE";
    PacketType[PacketType["PROMPT"] = 187] = "PROMPT";
    PacketType[PacketType["SEND_INPUT"] = 60] = "SEND_INPUT";
    PacketType[PacketType["PLAYER_UPDATE"] = 81] = "PLAYER_UPDATE";
    PacketType[PacketType["FIRST_CLICK_OBJECT"] = 132] = "FIRST_CLICK_OBJECT";
    PacketType[PacketType["SEND_AMOUNT"] = 208] = "SEND_AMOUNT";
})(PacketType = exports.PacketType || (exports.PacketType = {}));
