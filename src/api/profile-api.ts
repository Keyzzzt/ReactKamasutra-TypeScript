import {PhotosType, ProfileType} from "../Types"
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

type UpdatePhotosData = {
    photos: PhotosType
}

export const profileAPI = {
    getUserProfile: function (userId: number | null) {
        return requestSetup
            .get<ProfileType>(`profile/${userId}`)
            .then(res => res.data)
    },
    getStatus: function (userId: number) {
        return requestSetup
            .get<string>(`profile/status/${userId}`)
            .then(res => res.data)
    },
    updateStatus: function (status: string) {
        return requestSetup
            .put<CommonResponse>(`profile/status`, {status})
            .then(res => res.data)
    },
    updateProfileImage: function (imageFile: File) {
        // объект c заголовком header: Content-Type: form/multipart можно не отправлять в API. Конструктор FormData() формирует его сам автоматически
        const formData = new FormData()
        formData.append("image", imageFile)
        return requestSetup
            .put<CommonResponse<UpdatePhotosData>>(`/profile/photo`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            .then(res => res.data)
    },
    saveProfile: function (profile: ProfileType) {
        return requestSetup
            .put<CommonResponse>(`profile`, profile)
            .then(res => res.data)
    }
}