import {BaseDto} from "../internal/core/Base.dto";
import {DtoField} from "../internal/types";




export class RegisterUserDto extends BaseDto {
    username: DtoField;
    password: DtoField;
    email: DtoField;
    birth: DtoField;
    private about: DtoField;
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
            min: 6,
            max: 70
        };
        this.email = {
            defaultValue: null,
            type: "STRING",
            required: true,
        };
        this.birth = {
            defaultValue: new Date().toString(),
            type: "STRING",
            required: false,
        }
        this.about = {
            type: "STRING",
            required: false,
        }
    }
}