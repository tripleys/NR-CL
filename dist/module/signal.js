"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const packets_1 = require("../packets");
function Signal(type) {
    return (target, propertyKey, descriptor) => {
        const originalMethod = descriptor.value;
        if (!packets_1.Packets.signals[type]) {
            packets_1.Packets.signals[type] = [];
        }
        if (!packets_1.Packets.moduleSignals[type]) {
            packets_1.Packets.moduleSignals[type] = [];
        }
        if (target.constructor.name === "Client")
            packets_1.Packets.signals[type].push(originalMethod);
        else {
            packets_1.Packets.moduleSignals[type].push({
                instance: target,
                fun: originalMethod
            });
        }
    };
}
exports.Signal = Signal;
