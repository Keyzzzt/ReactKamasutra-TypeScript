// import * as axios from "axios" при таком импорте TS может ругаться на axios.create(), возможны и другие ошибки
import axios from "axios";

export const requestSetup = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    withCredentials: true,
    headers: {
        'API-KEY': 'fbf0bec4-38e2-4c6a-98a6-4d83e4b90085'
    }

})

export enum ResultCodeEnum {
    Success = 0,
    Error = 1,
    Captcha = 10
}

// Присвоив D = {} Значение по умолчанию, мы можем использовать generic не уточняяя тип
export type CommonResponse<D = {}> = {
    resultCode: ResultCodeEnum
    messages: Array<string>
    data: D
    fieldsErrors: Array<string>
}






