import {BaseChain} from "../internal/core/base.chain";

export class ConstantsChain extends BaseChain<any> {
    constructor() {
        super('CONSTANTS');
    }

    public get processConstants() {
        return {
            PORT: process.env.PORT
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