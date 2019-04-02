"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ModuleManager {
    static install(mod) {
        ModuleManager.modules[mod.name()] = mod;
        console.log(`[ModuleManager]: Installed: ${mod.name()} by ${mod.author()} - "${mod.description()}".`);
    }
    static hook(name, client) {
        if (ModuleManager.modules[name])
            ModuleManager.modules[name].hook(client);
    }
}
ModuleManager.modules = {};
exports.ModuleManager = ModuleManager;
