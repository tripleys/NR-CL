import { Module } from "../module";
import { Signal } from "../signal";
import { PacketType } from "../../packet-type";
import { DialoguePacket } from "../../packets/dialogue-packet";
import { Client } from "../../client";
import { ClickingPacket } from "../../packets/clicking-packet";
import { ContinuePacket } from "../../packets/continue-packet";
import { ClickButtonPacket } from "../../packets/click-button-packet";
import { PromptPacket } from "../../packets/prompt-packet";
import { SendInputPacket } from "../../packets/send-input-packet";
import { MessagePacket } from "../../packets/message-packet";
import { CommandPacket } from "../../packets/command-packet";
import { WalkPacket } from "../../packets/walk-packet";
import { FirstClickObjectPacket } from "../../packets/first-click-object-packet";

const uuid = require('uuid');

export class ThievingBot implements Module {

    author(): string {
        return "Bert";
    }

    name(): string {
        return "Thieving Bot";
    }

    description(): string {
        return "Module that bots thieving.";
    }

    hook(client: Client): void {
        client.log("wtffff");
        this.start(client);
    }

    dehook(client: Client): void {
        if (ThievingBot.timers[client.account.alias])
            clearInterval(ThievingBot.timers[client.account.alias]);
    }

    public start(client: Client): void {
        if (ThievingBot.timers[client.account.alias])
            clearInterval(ThievingBot.timers[client.account.alias]);
        const packet = new CommandPacket;
        packet.text = "::home";
        client.queuePacket(packet);
        setTimeout(() => {
            const walk = new WalkPacket;
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
                                    const click = new FirstClickObjectPacket;
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

    static timers: {
        [name: string]: NodeJS.Timer
    };

    constructor() {
        ThievingBot.timers = {};
    }

    @Signal(PacketType.MESSAGE)
    public messaged(client: Client, message: MessagePacket): void {
        if (message.text.includes("@red@You've received an anti-cheat measure, if you cannot solve it log out and back in.")) {

        }
    }

}