import {GlobalLogic} from "./GlobalLogic";

export {};

declare global {
    interface Window {
        __app__: GlobalLogic;
    }
}