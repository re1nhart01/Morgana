import {RawData} from "ws";

export function isValidJSON(json: string | RawData) {
    try {
        const JSONData = JSON.parse(json as string)
        return JSONData
    } catch (e) {
        return null
    }
}
