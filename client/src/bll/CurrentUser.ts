import { useNavigate } from "react-router-dom";
import {application} from "./GlobalLogic";
import axios from 'axios';

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

type tokens = {
    refresh_token: string;
    access_token: string;
}

export enum localStorageKeys {
    UserData = 'userData',
    Tokens = "Tokens",
}

export class CurrentUser {
    private _userData: userData
    private _tokens: tokens
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
        this._tokens = {
            access_token: "",
            refresh_token: "",
        }
    }

    public get userData(): userData {
        return this._userData;
    }

    public get isAuth() {
       return this._userData.id !== "" && this.userData.username !== ""
    }


    public async registerUser({username, password, birth, email, about}: {username: string, password: string, email: string, birth: string, about: string}) {
        const fixedDate = new Date(birth).toISOString().slice(0, 19).replace('T', ' ')
        console.log(fixedDate)
        const body = {
            username: username,
            password: password,
            email: email,
            birth: birth,
            ...(about !== void 0 && {about}),
        }
        const response = await axios.post(`${application.api.API_URL}auth/register`, body)
        if (response.status !== 500) {
            return response.data;
        } else {
            return application.validators.on500Error
        }
    }


    public async signIn({username, password}: {username: string, password: string}) {
        const body = {
            username: username,
            password: password,
        }
        const response = await axios.post(`${application.api.API_URL}auth/sign-in`, body)
        if (response.status !== 500) {
            if (response.data.statusCode === 200 && response.data.data) {
                    this._tokens = response.data.data;
                    this.saveUser();
            }
            return response.data;
        } else {
            return application.validators.on500Error
        }
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
            const data = localStorage.getItem(localStorageKeys.UserData)
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
            const tokens = localStorage.getItem(localStorageKeys.Tokens)
            if (tokens !== void 0 && tokens !== null) {
                let parsedTokens = JSON.parse(tokens)
                this._tokens.access_token = parsedTokens.access_token;
                this._tokens.refresh_token = parsedTokens.refresh_token;
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
            this._tokens = {
                refresh_token: "",
                access_token: "",
            }
            await this.saveUser()
        } catch (ex) {
            console.warn('log out ex', ex)
        }
    }

    public saveUser() {
        try {
            const jsonData = JSON.stringify(this._userData)
            const tokensData = JSON.stringify(this._tokens)
            localStorage.setItem(localStorageKeys.UserData, jsonData);
            localStorage.setItem(localStorageKeys.Tokens, tokensData);
        } catch (e) {
            console.warn('save user ex', e)
        }
    }

}


