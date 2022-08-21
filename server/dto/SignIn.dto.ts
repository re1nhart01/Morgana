import {BaseDto} from "../internal/core/Base.dto";
import {DtoField} from "../internal/types";


export class SignInDto extends BaseDto {
    private username: DtoField;
    private password: DtoField;
    constructor() {
        super();
        this.username = {
            required: true,
            type: "STRING",
            min: 5,
            max: 20
        };
        this.password = {
            required: true,
            type: "STRING",
            min: 6,
            max: 70
        };
    }
}