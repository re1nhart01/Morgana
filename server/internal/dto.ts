import {BaseDto} from "../dto/Base.dto";
import {DtoField} from "./types";

export const bindDtoWithRequest = <T extends BaseDto>(dto: T, fields: any) => {
    try {
        if (!(dto instanceof BaseDto)) {
            throw new Error(`Current Dto does not extends BaseDto!`)
        }
        let isError = false;
        let missingFields = [];
        for (let i in dto) {
            const field: DtoField = dto[i] as any;
            if (fields[i] === void 0 && field.required) {
                isError = true;
                missingFields.push(i)
            }
            dto[i] = fields[i];
        }
        return {dto, isError, missingFields, errorMessage: ""}
    } catch (ex) {
        console.log(ex)
        return {dto, isError: true, missingFields: [], errorMessage: ex}
    }
}