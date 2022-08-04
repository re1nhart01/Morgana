import {BaseDto} from "./Base.dto";
import {DtoField} from "../internal/types";




export class RegisterUserDto extends BaseDto {
    username: DtoField;
    password: DtoField;
    email: DtoField;
    constructor() {
        super();
        this.username = {
            defaultValue: "",
            type: "STRING",
            required: true,
            min: 5,
            max: 20
        };
        this.password = {
            defaultValue: "",
            type: "STRING",
            required: true,
        };
        this.email = {
            defaultValue: null,
            type: "STRING",
            required: true,
        };
    }
}