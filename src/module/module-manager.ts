import { Client } from "../client";
import { Module } from "./module";
import { Tutorial } from "./impl/tutorial";

export class ModuleManager {

    private static modules: {
        [name: string]: Module
    } = {};

    public static install(mod: Module): void {
        ModuleManager.modules[mod.name()] = mod;
        console.log(`[ModuleManager]: Installed: ${mod.name()} by ${mod.author()} - "${mod.description()}".`);
    }

    public static hook(name: string, client: Client): void {
        if (ModuleManager.modules[name]) ModuleManager.modules[name].hook(client);
    }
}