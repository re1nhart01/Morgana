import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {Paths} from "../bll/NavigationConfig";


type useObjectedStateType<T> = [T, (k: keyof T,v: any) => void, React.Dispatch<React.SetStateAction<T>>]

export const useComponentState = <T>(defaultValue: T, onLoad = () => {}, onUnmount = () => {}, deps: Array<any> = []): useObjectedStateType<T> => {
    const [getState, setState] = useState<T>(defaultValue)

    const setter = (k: keyof T,v: any) => {
        setState({...getState, [k]: v})
    }

    useEffect(() => {
        onLoad()
        return () => {
            onUnmount()
        }
    }, deps)

    return [getState, setter, setState]
}

export const useTypedNavigation = () => {
    const navigation = useNavigate();
    return (path: Paths, props: {replace?: boolean, state: any}) => {
        navigation(path as unknown as string, props)
    }
}

export const useUpdate = () => {
    const [get, set] = useState(0)
    return () => {
        set((prev) => prev + 1)
    };
}