import {BaseService} from "../internal/core/base.service";
import {Cobol, ResponseData} from "../internal/types";
import {Responder} from "../internal/responder";
import {ReasonPhrases, StatusCodes} from "http-status-codes";
import {chainTool} from "../internal/core/index.chain";


export class AuthService extends BaseService {
    constructor() {
        super();
    }

    public registerService = async (cobol: Cobol): Promise<ResponseData> => {
        try {
            const {access_token, refresh_token} = await chainTool.jwt.createJWTS(cobol.dto.data)
            return Responder.giveOKResponseWithData({access_token, refresh_token, dto: cobol.dto.data, errors: cobol.errorsField})
        } catch (e) {
            console.log('registerService ex', e)
            return Responder.giveResponse(StatusCodes.BAD_REQUEST, ReasonPhrases.BAD_REQUEST)
        }
    }
}