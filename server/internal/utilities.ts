import {__UNSAFE_DATA, BaseModel} from "./types";


export function useAllRoutes(app: any, controllers: Array<any>) {
    if (controllers === void 0 || controllers === null) {
        throw new Error('Error corrupted on controllers installing!')
    }
    controllers.forEach(function (controller) {
        const controllerImpl = new controller();
        const router = controllerImpl.router;
        for (let key of Object.getOwnPropertyNames(controller.prototype)) {
            const field = controllerImpl[key];
            if (typeof field === 'function' && key !== 'constructor') {
                const group = controller.prototype.__unsafe__group;
                const data: __UNSAFE_DATA = field.__unsafe_data
                router[data.method || 'get'](`/${group || 'api'}${data.path || 'default'}`, ...data.middlewares , data.__unsafe__dto, (request, response) => {
                    field.apply(controllerImpl, [request, response])
                })
            }
        }
        app.use(controllerImpl.router)
    })
}

export function useAllModels(models: BaseModel[]) {
    if (models === void 0 || models === null) {
        throw new Error('Error corrupted on models syncing!')
    }
    models.forEach(async (model) => {
        try {
            console.log(`[database]: Model ${model.name} is trying to sync`)
            model.sync({})
            console.log(`[database]: Model ${model.name} is synced!`)
        } catch (e) {
            console.log('useAllModels ex', e)
        }
    })
}