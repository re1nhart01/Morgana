import {METHODS} from "./types";


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
        target[key].__unsafe_data = {
            path,
            method,
        }
        setTimeout(() => {
            target.router[method](`/${target.__usafe__group}/${path}`, target[key])
        }, 0)
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
        target.prototype.__usafe__group = group;
    }
}

export function useMiddlewareRoute(path: string, method: METHODS, ...middlewareCallbacks) {
    return (target: any, key: string, descriptor: PropertyDescriptor) => {
        if (target.router === void 0 || middlewareCallbacks === void 0) {
            throw new Error('this controller does not extends BaseController')
        }
        console.log(descriptor.value.toString())
        setTimeout(() => {
            target.router[method](`/${target.__usafe__group}/${path}`, ...middlewareCallbacks, target[key])
        }, 0)
    }
}
