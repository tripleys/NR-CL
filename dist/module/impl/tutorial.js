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
const continue_packet_1 = require("../../packets/continue-packet");
const click_button_packet_1 = require("../../packets/click-button-packet");
const send_input_packet_1 = require("../../packets/send-input-packet");
const uuid = require('uuid');
class Tutorial {
    author() {
        return "Bert";
    }
    name() {
        return "Tutorial Auto Completer";
    }
    description() {
        return "Module that auto completes the tutorial";
    }
    hook(client) { }
    dehook(client) { }
    onPrompt(client, prompt) {
        if (prompt.title === "A forum account has been created for you, please enter your e-mail:") {
            client.log("TUTORIAL_STATE 7");
            setTimeout(() => client.queuePacket(new send_input_packet_1.SendInputPacket(uuid.v4() + "@" + uuid.v4() + ".com")), 100);
            //setTimeout(() => ModuleManager.hook("Thieving Bot", client), 5000);
        }
    }
    onDialogue(client, dialogue) {
        client.log(JSON.stringify(dialogue));
        if (dialogue.frame === 128) {
            switch (dialogue.text) {
                case "Which mode would you like to play as?":
                    client.tutorial = true;
                    client.log("TUTORIAL_STATE 0");
                    setTimeout(() => client.queuePacket(new continue_packet_1.ContinuePacket(4892)), 100);
                    break;
                case "Ultimate Ironman":
                    client.log("TUTORIAL_STATE 1");
                    setTimeout(() => client.queuePacket(new click_button_packet_1.ClickButtonPacket(2471)), 100);
                    break;
                case "Play using @blu@normal@bla@ mode.":
                    client.log("TUTORIAL_STATE 2");
                    setTimeout(() => client.queuePacket(new click_button_packet_1.ClickButtonPacket(2461)), 100);
                    break;
                case "You have selected @blu@normal@bla@ mode.":
                    client.log("TUTORIAL_STATE 3");
                    setTimeout(() => client.queuePacket(new continue_packet_1.ContinuePacket(4907)), 100);
                    break;
                case "Would you like to skip the tutorial?":
                    client.log("TUTORIAL_STATE 4");
                    setTimeout(() => client.queuePacket(new continue_packet_1.ContinuePacket(4886)), 100);
                    client.log("TUTORIAL_STATE 5");
                    setTimeout(() => client.queuePacket(new click_button_packet_1.ClickButtonPacket(2461)), 500);
                    break;
                case "That will conclude the tutorial.":
                    client.log("TUTORIAL_STATE 6");
                    setTimeout(() => client.queuePacket(new continue_packet_1.ContinuePacket(4907)), 100);
                    break;
            }
        }
    }
}
__decorate([
    signal_1.Signal(packet_type_1.PacketType.PROMPT)
], Tutorial.prototype, "onPrompt", null);
__decorate([
    signal_1.Signal(packet_type_1.PacketType.DIALOGUE)
], Tutorial.prototype, "onDialogue", null);
exports.Tutorial = Tutorial;
