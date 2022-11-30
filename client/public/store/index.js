const Store = require('electron-store')

const schema = {
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




const store = new Store({schema});