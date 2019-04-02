import { PacketType } from "../packet-type";
import { Packets } from "../packets";
import { Client } from "../client";

export function Signal(type: PacketType): (target: object, propertyKey: string, descriptor: TypedPropertyDescriptor<any>) => void {
    return (target: object, propertyKey: string, descriptor: TypedPropertyDescriptor<any>): void => {
        const originalMethod = descriptor.value;
        if (!Packets.signals[type]) {
            Packets.signals[type] = [];
        }
        if (!Packets.moduleSignals[type]) {
            Packets.moduleSignals[type] = [];
        }

        if (target.constructor.name === "Client") 
            Packets.signals[type].push(originalMethod);
        else {
            Packets.moduleSignals[type].push({
                instance: target,
                fun: originalMethod
            });
        }
    };
}