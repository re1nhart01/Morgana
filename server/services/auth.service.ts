import {BaseService} from "./base.service";
import {Cobol, ResponseData} from "../internal/types";
import {Responder} from "../internal/responder";
import {ReasonPhrases, StatusCodes} from "http-status-codes";


export class AuthService extends BaseService {
    constructor() {
        super();
    }

    public registerService = (cobol: Cobol): ResponseData => {
        try {
            return Responder.giveOKResponseWithData(cobol)
        } catch (e) {
            console.log('registerService ex', e)
            return Responder.giveResponse(StatusCodes.BAD_REQUEST, ReasonPhrases.BAD_REQUEST)
        }
    }
}