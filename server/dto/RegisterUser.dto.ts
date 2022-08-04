import {BaseDto} from "./Base.dto";

export class RegisterUserDto extends BaseDto {
    username: string;
    password: string;
    constructor() {
        super();
        this.username = "";
        this.password = "";
    }
}