const Store = require('electron-store')



class MainStore {
    private readonly defaultScheme: object;
    private store: typeof Store;
    constructor() {
        this.defaultScheme = {
            userData: {
                about: "",
                birth: 0,
                email: "",
                icon: "",
                id: "",
                inviteHash: "",
                theme: "",
                userColor: "",
                username: "",
                rememberMe: false,
            },
            tokens: {
                access_token: "",
                refresh_token: "",
            }
        }
        this.store = new Store({schema: this.defaultScheme})
    }

    public setItem(key: string, value: any) {
        try {
            let jsonValue = value;
            if (typeof value === "object") {
                jsonValue = JSON.stringify(value)
            }
            return this.store.set(key, jsonValue)
        } catch (e) {
            console.log('MainStore.setItem ex', e)
            return null;
        }
    }

    public getItem(key: string) {
        try {
            return this.store.get(key)
        } catch (e) {
            console.log('MainStore.setItem ex', e)
            return null;
        }
    }
}


export const mainStore = new MainStore();