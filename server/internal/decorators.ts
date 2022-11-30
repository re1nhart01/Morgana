import {__UNSAFE_DATA, Dto, METHODS, multerConfig, multerMethods} from "./types";
import {bindDtoWithRequest} from "./dto";
import {chainTool} from "./core/index.chain";
import {randomUUID} from "crypto";
import path from "path";
const multer  = require('multer')





/***
 *
 * The TypeScript decorator documentation specifies the order:
 * 1. Parameter Decorators, followed by Method, Accessor, or Property Decorators are applied for each instance member.
 * 2. Parameter Decorators, followed by Method, Accessor, or Property Decorators are applied for each static member.
 * 3. Parameter Decorators are applied for the constructor.
 * 4. Class Decorators are applied for the class
 *
 *
 * @param path
 * @param method
 */

export function useRoute(path: string, method: METHODS) {
    return (target: any, key: string, descriptor: PropertyDescriptor) => {
        if (target.router === void 0) {
            throw new Error('this controller does not extends BaseController')
        }
        const unsafeData: __UNSAFE_DATA = {
            __unsafe__group: "",
            method: method,
            path: path,
            middlewares: [],
            __unsafe__dto: (req, res, next) => {
                next()
            },
            __unsafe__tokens: (req, res, next) => {
                next()
            }
        }
        target[key].__unsafe_data = unsafeData;
    }
}


/***
 *
 * @param group
 * use it without any parenthesis, only word!
 */
export function useController(group: string): any {
    return (target: any) => {
        if (target === void 0) {
            throw new Error('this controller is not correct!')
        }
        target.prototype.__unsafe__group = group;
    }
}

export function useMiddleware(middlewareCallback: Function) {
    return (target: any, key: string, descriptor: PropertyDescriptor) => {
        if (target.router === void 0 || middlewareCallback === void 0) {
            throw new Error('this controller does not extends BaseController')
        }
        (<__UNSAFE_DATA>target[key].__unsafe_data).middlewares = [...(<__UNSAFE_DATA>target[key].__unsafe_data).middlewares, middlewareCallback];
    }
}

export function useDto(dto: any) {
    return (target: any, key: string, descriptor: PropertyDescriptor) => {
        if (target.router === void 0) {
            throw new Error('this controller does not extends BaseController')
        }
        (<__UNSAFE_DATA>target[key].__unsafe_data).__unsafe__dto = (req, res, next) => {
            res.cobol = bindDtoWithRequest(dto, req.body)
            next()
        }
    }
}

export function useTokens(useOnlyAccess: boolean = false) {
    return (target: any, key: string, descriptor: PropertyDescriptor) => {
        if (target.router === void 0) {
            throw new Error('this controller does not extends BaseController')
        }
        (<__UNSAFE_DATA>target[key].__unsafe_data).__unsafe__tokens = (req, res, next) => {
            const emptyTokens = {
                access: null,
                ...(!useOnlyAccess && {refresh: null}),
            }
            const reqHeader_refresh = req.header('refresh_token')
            const reqHeader_access = req.header('access_token')
            console.log("[Morgana]: access_token::", reqHeader_access, "[Morgana]: refresh_token::", reqHeader_refresh)
            if (reqHeader_access !== void 0) {
                if (!useOnlyAccess && reqHeader_refresh !== void 0) {
                    const refresh_split = reqHeader_refresh.split(" ")
                    if (refresh_split.length > 1 && refresh_split[0] === chainTool.constants.processConstants.REFRESH_WORD) {
                        emptyTokens.refresh = refresh_split[1];
                    }
                }
                const access_split = reqHeader_access.split(" ")
                if (access_split.length > 1 && access_split[0] === chainTool.constants.processConstants.ACCESS_WORD) {
                    emptyTokens.access = access_split[1];
                }
            }
            res.tokens = emptyTokens;
            next()
        }
    }
}

export function useInjectableModel(model: object | Function): any {
    return (target: any, key: string, descriptor: PropertyDescriptor) => {
        if (typeof model !== 'function') {
            throw new Error('Model is not implemented database table!')
        }
            target[key] = () => {
                if (target.constructor['unsafe__name'] !== void 0) {
                    return model
                } else {
                    throw new Error("You need to wrap your service class with useService decorator")
                }
            }
    }
}



export function useService(name: string) {
    return (target: any) => {
        target['unsafe__name'] = name;
    }
}


export function useFile(name: string, method: multerMethods, config: multerConfig) {
    const upload = multer({
        storage: method !== "NONE" ? multer.diskStorage({
            destination: function (req, file, cb) {
                cb(null, config.dest)
            },
            filename: function (req, file, cb) {
                const filename = config.useUuid ? `${randomUUID()}${path.extname(file.originalname)}` : `${Date.now()}-${file.originalname}`
                cb(null, filename)
            }
        }) : void 0,
        limits: {
            fileSize: config.limit
        },
        ...(config.fileFilter && {fileFilter: config.fileFilter})
    })
    return (target: any, key: string, descriptor: PropertyDescriptor) => {
        const data = target[key].__unsafe_data;
        if (data === void 0 || data === null) {
            throw new Error('Please provide useRoute decorator first, before using useFile decorator!')
        }
        let fileMdlwr = null;
        switch (method) {
            case "ARRAY":
                fileMdlwr = (() => (upload.array(name, config.length)))()
                break
            case "SINGLE":
                fileMdlwr = (() => (upload.single(name)))()
                break
            case "FIELDS":
                fileMdlwr = (() => (upload.fields(config.fields)))()
                break
            case "NONE":
                fileMdlwr = (() => (upload.none()))()
                break
            default:
                fileMdlwr = (() => null)()
                break
        }
        data.middlewares.push(fileMdlwr)
    }
}