"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const signal_1 = require("../signal");
const packet_type_1 = require("../../packet-type");
const command_packet_1 = require("../../packets/command-packet");
const walk_packet_1 = require("../../packets/walk-packet");
const first_click_object_packet_1 = require("../../packets/first-click-object-packet");
const uuid = require('uuid');
class ThievingBot {
    constructor() {
        ThievingBot.timers = {};
    }
    author() {
        return "Bert";
    }
    name() {
        return "Thieving Bot";
    }
    description() {
        return "Module that bots thieving.";
    }
    hook(client) {
        client.log("wtffff");
        this.start(client);
    }
    dehook(client) {
        if (ThievingBot.timers[client.account.alias])
            clearInterval(ThievingBot.timers[client.account.alias]);
    }
    start(client) {
        if (ThievingBot.timers[client.account.alias])
            clearInterval(ThievingBot.timers[client.account.alias]);
        const packet = new command_packet_1.CommandPacket;
        packet.text = "::home";
        client.queuePacket(packet);
        setTimeout(() => {
            const walk = new walk_packet_1.WalkPacket;
            walk.x = 3087;
            walk.y = 3501;
            client.queuePacket(walk);
            setTimeout(() => {
                walk.x = 3092;
                walk.y = 3501;
                client.queuePacket(walk);
                setTimeout(() => {
                    walk.x = 3092;
                    walk.y = 3497;
                    client.queuePacket(walk);
                    setTimeout(() => {
                        walk.x = 3094;
                        walk.y = 3497;
                        client.queuePacket(walk);
                        setTimeout(() => {
                            walk.x = 3094;
                            walk.y = 3499;
                            client.queuePacket(walk);
                            setTimeout(() => {
                                ThievingBot.timers[client.account.alias] = setInterval(() => {
                                    const click = new first_click_object_packet_1.FirstClickObjectPacket;
                                    click.x = 3094;
                                    click.objectId = 4875;
                                    click.y = 3500;
                                    client.queuePacket(click);
                                }, 3000);
                            }, 3000);
                        }, 3000);
                    }, 3000);
                }, 3000);
            }, 3000);
        }, 5000);
    }
    messaged(client, message) {
        if (message.text.includes("@red@You've received an anti-cheat measure, if you cannot solve it log out and back in.")) {
        }
    }
}
__decorate([
    signal_1.Signal(packet_type_1.PacketType.MESSAGE)
], ThievingBot.prototype, "messaged", null);
exports.ThievingBot = ThievingBot;
