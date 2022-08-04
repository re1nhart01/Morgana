import {__UNSAFE_DATA, Dto, METHODS} from "./types";
import {bindDtoWithRequest} from "./dto";
import {RegisterUserDto} from "../dto/RegisterUser.dto";





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

export function useMiddlewareRoute(middlewareCallback: Function) {
    return (target: any, key: string, descriptor: PropertyDescriptor) => {
        if (target.router === void 0 || middlewareCallback === void 0) {
            throw new Error('this controller does not extends BaseController')
        }
        (<__UNSAFE_DATA>target[key].__unsafe_data).middlewares = [...(<__UNSAFE_DATA>target[key].__unsafe_data).middlewares, middlewareCallback];
    }
}