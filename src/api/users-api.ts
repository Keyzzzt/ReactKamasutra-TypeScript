import {CommonResponse, requestSetup} from "./api";
import {UserType} from "../Types";

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

type GetUsersType = {
    items: Array<UserType>
    totalCount: number
    error: string | null
}

export const usersAPI = {
    getUsers: function (currentPage: number, pageSize: number) {
        return requestSetup
            .get<GetUsersType>(`users?page=${currentPage}&count=${pageSize}`)
            .then((response) => response.data)
    },
    follow: function (userId: number) {
        return requestSetup
            .post<CommonResponse>(`follow/${userId}`)
            .then(response => response.data)
    },
    unFollow: function (userId: number) {
        return requestSetup
            .delete<CommonResponse>(`follow/${userId}`)
            .then(response => response.data)
    },
}