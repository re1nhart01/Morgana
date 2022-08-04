import {BaseModel} from "./types";


export function useAllRoutes(app: any, controllers: Array<any>) {
    if (controllers === void 0 || controllers === null) {
        throw new Error('Error corrupted on controllers installing!')
    }
    controllers.forEach((controller) => {
        const controllerImpl = new controller();
        app.use(controllerImpl.router)
    })
}

export function useAllModels(models: BaseModel[]) {
    if (models === void 0 || models === null) {
        throw new Error('Error corrupted on models syncing!')
    }
    models.forEach(async (model) => {
        try {
            console.log('zxcxzc')
            console.log(`[database]: Model ${model.name} is trying to sync`)
            model.sync({})
            console.log(`[database]: Model ${model.name} is synced!`)
        } catch (e) {
            console.log('useAllModels ex', e)
        }
    })
}