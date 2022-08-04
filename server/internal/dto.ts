import {BaseDto} from "../dto/Base.dto";
import {Cobol, DtoField, ErrorField} from "./types";

export const bindDtoWithRequest = <T extends BaseDto>(dto: T, fields: any): Cobol => {
    try {
        if (!(dto instanceof BaseDto)) {
            throw new Error(`Current Dto does not extends BaseDto!`)
        }
        let isError = false;
        let errorsField: Array<ErrorField> = [];
        for (let i in dto) {
            const field: DtoField = dto[i] as any;
            const isRequestFieldMin = field.min !== void 0 && fields[i] >= field.min;
            const isRequestFieldMax = field.max !== void 0 && fields[i] <= field.max;
            const errorField: ErrorField | any = {}
            if (fields[i] === void 0 && field.required) {
                isError = true;
                errorField.isMissing = true;
                errorField.name = i;
            }
            if (isRequestFieldMin) {
                isError = true;
                errorField.name = i;
                errorField.isLessThanMin = isRequestFieldMin;
            }
            if (isRequestFieldMax) {
                isError = true;
                errorField.name = i;
                errorField.isLongerThanMax = isRequestFieldMax;
            }

            if (JSON.stringify(errorsField) !== "{}") {
                errorsField.push(errorField)
            }
            dto[i] = fields[i];
        }
        return {dto, isError, errorsField, errorMessage: ""}
    } catch (ex) {
        console.log(ex)
        return {dto, isError: true, errorsField: [], errorMessage: ex}
    }
}