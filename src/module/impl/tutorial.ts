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
import { ModuleManager } from "../module-manager";

const uuid = require('uuid');

export class Tutorial implements Module {

    author(): string {
        return "Bert";
    }

    name(): string {
        return "Tutorial Auto Completer";
    }

    description(): string {
        return "Module that auto completes the tutorial";
    }

    hook(client: Client): void {}

    dehook(client: Client): void {}

    @Signal(PacketType.PROMPT)
    onPrompt(client: Client, prompt: PromptPacket): void {
        if (prompt.title === "A forum account has been created for you, please enter your e-mail:") {
            client.log("TUTORIAL_STATE 7");
            setTimeout(() => client.queuePacket(new SendInputPacket(uuid.v4() + "@" + uuid.v4() + ".com")), 100);
            //setTimeout(() => ModuleManager.hook("Thieving Bot", client), 5000);
        }
    }

    @Signal(PacketType.DIALOGUE)
    onDialogue(client: Client, dialogue: DialoguePacket): void {
        client.log(JSON.stringify(dialogue));
        if (dialogue.frame === 128) {
            switch (dialogue.text) {
                case "Which mode would you like to play as?":
                    client.tutorial = true;
                    client.log("TUTORIAL_STATE 0");
                    setTimeout(() => client.queuePacket(new ContinuePacket(4892)), 100);
                    break;
                case "Ultimate Ironman":
                    client.log("TUTORIAL_STATE 1");
                    setTimeout(() => client.queuePacket(new ClickButtonPacket(2471)), 100);
                    break;
                case "Play using @blu@normal@bla@ mode.":
                    client.log("TUTORIAL_STATE 2");
                    setTimeout(() => client.queuePacket(new ClickButtonPacket(2461)), 100);
                    break;
                case "You have selected @blu@normal@bla@ mode.":
                    client.log("TUTORIAL_STATE 3");
                    setTimeout(() => client.queuePacket(new ContinuePacket(4907)), 100);
                    break;
                case "Would you like to skip the tutorial?":
                    client.log("TUTORIAL_STATE 4");
                    setTimeout(() => client.queuePacket(new ContinuePacket(4886)), 100);
                    client.log("TUTORIAL_STATE 5");
                    setTimeout(() => client.queuePacket(new ClickButtonPacket(2461)), 500);
                    break;
                case "That will conclude the tutorial.":
                    client.log("TUTORIAL_STATE 6");
                    setTimeout(() => client.queuePacket(new ContinuePacket(4907)), 100);
                    break;
            }

        }
    }
}