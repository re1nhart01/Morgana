import {BaseChain} from "./base.chain";

export class ConstantsChain extends BaseChain<any> {
    constructor() {
        super('CONSTANTS');
    }

    public get constants() {
        const dateConstants = {
            monthToNumber: 2678400000,
        }
        return {
            dateConstants,
        }
    }

    get usings(): { [p: string]: any } {
        return {};
    }
}