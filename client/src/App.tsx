import React, {useEffect, useState} from 'react';
import './styles/styles.css'
import {BrowserRouter, Route, Routes, useNavigate} from "react-router-dom";
import {RegisterScreen} from "./components/global/RegisterScreen";
import {HomeScreen} from "./components/global/HomeScreen";
import {WelcomeScreen} from "./components/global/WelcomeScreen";
import {WelcomeContainer} from "./components/global/controllers/WelcomeContainer";
import {NavigationConfig} from "./bll/NavigationConfig";
const { app } = window.require('@electron/remote')


type applicationStateType = {};

function App() {
    const [applicationState, setApplicationState] = useState<applicationStateType>({})
    const history = useNavigate()
    const {screens} = NavigationConfig;


    useEffect(() => {
        window.__app__.User.clientStart(history)
    }, [])

        return (
               <Routes>
                   {
                       screens.map((screen) => {
                           return <Route
                               path={screen.path}
                               key={screen.key}
                               element={screen.element}
                               index={screen.index}
                               children={screen.children}
                           />
                       })
                   }
               </Routes>
        );
}

export default App;
