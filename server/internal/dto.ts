import {BaseDto} from "../dto/Base.dto";

export const bindDtoWithRequest = <T extends BaseDto>(dto: T, fields: any) => {
    try {
        let isError = false;
        let missingFields = [];
        for (let i in dto) {
            if (fields[i] === void 0) {
                isError = true;
                missingFields.push(i)
            }
            dto[i] = fields[i];
        }
        return {dto, isError, missingFields}
    } catch (ex) {
        console.log(ex)
        return {dto, isError: true, missingFields: []}
    }
}