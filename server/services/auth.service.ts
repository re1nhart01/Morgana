import {BaseService} from "../internal/core/base.service";
import {Injected, ResponseData, TOKENS, TypedCobol, valuableTokens} from "../internal/types";
import {Responder} from "../internal/responder";
import {ReasonPhrases, StatusCodes} from "http-status-codes";
import {chainTool} from "../internal/core/index.chain";
import {useInjectableModel, useService} from "../internal/decorators";
import {randomUUID} from "crypto";
import {UserModelType} from "../types/models.interface";
import {Op} from "sequelize";

const User = require('./../models/UserModel')
//    const {access_token, refresh_token} = await chainTool.jwt.createJWTS(cobol.dto.data)
//             const verify = await chainTool.jwt.validateRefreshJWT(access_token)


@useService('Auth')
export class AuthService extends BaseService {
    @useInjectableModel(User)
    private userRepository: Injected<typeof User>
    constructor() {
        super();
    }

    public signInService = async (cobol: TypedCobol<UserModelType>): Promise<ResponseData> => {
        try {
            const currentUserName = cobol.dto.data.username;
            const currentUser = await this.userRepository().findOne({
                attributes: ['username', 'password', 'userHash'],
                where: [{username: currentUserName }]
            })
            console.log(currentUser)
            if (currentUser === null) {
                return Responder.giveResponseWithData(StatusCodes.BAD_REQUEST, ReasonPhrases.BAD_REQUEST, chainTool.constants.errorMessages.invalidAuth)
            }
            const isValidPassword = await chainTool.crypto.compareHashes(cobol.dto.data.password, currentUser.password)
            if (isValidPassword) {
                const tokens = await chainTool.jwt.createJWTS({userHash: currentUser.userHash})
                return Responder.giveOKResponseWithData(tokens)
            } else {
                return Responder.giveResponseWithData(StatusCodes.BAD_REQUEST, ReasonPhrases.BAD_REQUEST, chainTool.constants.errorMessages.invalidAuth)
            }
        } catch (e) {
            console.log('registerService ex', e)
            return Responder.giveResponse(StatusCodes.FORBIDDEN, ReasonPhrases.FORBIDDEN)
        }
    }

    public registerService = async (cobol: TypedCobol<UserModelType>): Promise<ResponseData> => {
        try {
            const userHash = await chainTool.crypto.hashString(JSON.stringify({
                username: cobol.dto.data.username,
                email: cobol.dto.data.email,
            }))
            const body = {
                username: cobol.dto.data.username,
                password: cobol.dto.data.password,
                email: cobol.dto.data.email,
                birth: cobol.dto.data.birth,
                inviteHash: randomUUID(),
                rtcid: randomUUID(),
                isActive: true,
                userHash: userHash,
            }
            if (cobol.isError) {
                return Responder.giveResponseWithData(StatusCodes.BAD_REQUEST, ReasonPhrases.BAD_REQUEST, cobol.errorsField)
            }
            const newUser = await this.userRepository().build(body)
            await newUser.save();
            return Responder.giveOKResponse()
        } catch (e) {
            console.log('registerService ex', e)
            return Responder.giveResponse(StatusCodes.FORBIDDEN, ReasonPhrases.FORBIDDEN)
        }
    }


    public getSelfByTokens = async (tokens: valuableTokens) => {
        try {
            const isValid = await chainTool.jwt.validateRefreshJWT(tokens.refresh)
            if (isValid) {
                const decodeAccess = await chainTool.jwt.validateAccessJWT(tokens.access)
                if (decodeAccess !== void 0 || decodeAccess !== null) {
                    const requestedUser = await this.userRepository().findOne({
                        where: {
                            userHash: {
                                [Op.eq]: decodeAccess.userHash + 'asdas',
                            },
                            isactive: {
                                [Op.eq]: true,
                            }
                        },
                        attributes: ["id", 'username', 'email', 'icon', 'about', 'color', 'theme', 'inviteHash', 'rtcid', 'isactive', 'userHash', 'birth']
                    })
                    if (requestedUser !== null) {
                        return Responder.giveOKResponseWithData(requestedUser)
                    } else {
                       return Responder.giveResponse(StatusCodes.BAD_REQUEST, ReasonPhrases.BAD_REQUEST)
                    }
                }
            }
        } catch (e) {
            console.log('getSelfByTokens ex', e)
            return Responder.giveResponse(StatusCodes.FORBIDDEN, ReasonPhrases.FORBIDDEN)
        }
    }

    public pingRefresh =  async (refresh_token: string): Promise<ResponseData> => {
        try {
            const isValid = await chainTool.jwt.validateRefreshJWT(refresh_token);
            return isValid ? Responder.giveOKResponse() : Responder.giveResponse(StatusCodes.FORBIDDEN, ReasonPhrases.FORBIDDEN)
        } catch (e) {
            console.log('registerService ex', e)
            return Responder.giveResponse(StatusCodes.FORBIDDEN, ReasonPhrases.FORBIDDEN)
        }
    }
}