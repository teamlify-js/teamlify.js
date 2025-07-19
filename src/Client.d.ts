import { Bot } from "./Bot";
import { Events } from "./utils/Events";

export declare class Client {
    bot: Bot;

    on(eventName: Events, listener: (...args: any[]) => void): void;
    off(eventName: Events, listenerToRemove: (...args: any[]) => void): void;
    once(eventName: Events, listener: (...args: any[]) => void): void;
    removeAllListeners(eventName?: Events): void;

    async login(token: string): Promise<void>;
}