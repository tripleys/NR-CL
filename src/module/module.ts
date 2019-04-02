import { Client } from "../client";

export interface Module {

    author(): string;

    name(): string;

    description(): string;

    hook(client: Client): void;

    dehook(client: Client): void;
}