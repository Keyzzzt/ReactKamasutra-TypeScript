import {CommonResponse, requestSetup} from "./api"

/**
 * ? Тут два варианта типизации, типизируем либо response либо метод запроса.......
 * ? V1
 const requestNumber = () => {
                return requestSetup.get('./someData')
                    .then((response: AxiosResponse<number>)  => response.data)
            }
 * ? V2
 const requestNumber = () => {
                return requestSetup.get<number>('./someData')
                    .then(response  => response.data)
            }
 */


type AuthType = {
    data: {
        id: number
        email: string
        login: string
    }
    resultCode: number
    messages: Array<string>
}
type GetCaptchaType = {
    url: string
}
type LoginDataType = {
    userId: number
}


export const authAPI = {
    authMe: function () {
        return requestSetup.get<AuthType>('auth/me')
            .then(res => res.data)
    },
    login: function (email: string, password: string, rememberMe: boolean = false, captcha: string | null = null) {
        return requestSetup
            .post<CommonResponse<LoginDataType>>('auth/login', {email, password, rememberMe, captcha})
            .then(res => res.data)
    },
    logout: function () {
        return requestSetup
            .delete<CommonResponse>('auth/login')
            .then(res => res.data)
    },
    getCaptcha: function () {
        return requestSetup
            .get<GetCaptchaType>('security/get-captcha-url')
            .then(res => res.data.url)
    }
}