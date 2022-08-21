import {BaseChain} from "../internal/core/base.chain";

export class ConstantsChain extends BaseChain<any> {
    constructor() {
        super('CONSTANTS');
    }

    public get processConstants() {
        return {
            PORT: process.env.PORT,
            ACCESS_WORD: process.env.ACCESS_WORD,
            REFRESH_WORD: process.env.REFRESH_WORD,
            RTC_PEER_PORT: process.env.RTC_PORT,
        }
    }

    public get errorMessages() {
        return {
            invalidAuth: "Ooops, your username or password is not valid!"
        }
    }

    public get dateConstants() {
        return {
            monthToNumber: 2678400000,
        }
    }

    public get constants() {
        return {
            dateConstants: this.dateConstants,
            processConstants: this.processConstants
        }
    }

    get usings(): { [p: string]: any } {
        return {};
    }
}