import { useNavigate } from "react-router-dom";
import {application} from "./GlobalLogic";


type userData = {
    birth: number;
    username: string;
    email: string;
    id: string;
    icon:string;
    about: string;
    userColor: string;
    theme: string;
    inviteHash: string;
    rememberMe: boolean;
}

export class CurrentUser {
    private _userData: userData
    constructor() {
        this._userData = {
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
        }
    }

    public get userData(): userData {
        return this._userData;
    }

    public get isAuth() {
       return this._userData.id !== "" && this.userData.username !== ""
    }



    public get userAvatarURL() {
        return `${application.api.protocol}://localhost:8080/api/storage/avatars/${this._userData.icon}.png`
    }

    public async clientStart(navigation: any) {
        try {
            await this.restoreUser()
            await this.checkIsRemember(navigation)
            if (this.isAuth) {
                navigation('/home')
            } else {
                navigation('/welcome')
            }
        } catch (ex) {

        }
    }


    public restoreUser() {
        try {
            const data = localStorage.getItem("userData")
            if (data !== void 0 && data !== null) {
                let parsedData = JSON.parse(data)
                this._userData.userColor = parsedData.userColor;
                this._userData.about = parsedData.about;
                this._userData.id = parsedData.id;
                this._userData.birth = parsedData.birth;
                this._userData.email = parsedData.email;
                this._userData.icon = parsedData.icon;
                this._userData.inviteHash = parsedData.inviteHash;
                this._userData.username = parsedData.username;
                this._userData.theme = parsedData.theme;
                this._userData.rememberMe = parsedData.rememberMe;
            }
        } catch (ex) {
            console.warn('restore user ex', ex)
        }
    }


    public async checkIsRemember(navigation: any) {
        const isRemember = this._userData.rememberMe;
        if (!isRemember) {
            this.logOut().then(() => {
                navigation('/welcome')
            });
        }
    }

    public async logOut() {
        try {
            this._userData = {
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
            }
            await this.saveUser()
        } catch (ex) {
            console.warn('log out ex', ex)
        }
    }

    public saveUser() {
        try {
            const jsonData = JSON.stringify(this._userData)
            localStorage.setItem("userData", jsonData);
        } catch (e) {
            console.warn('save user ex', e)
        }
    }

}


