import {follow} from "./usersReducer";
import {usersAPI} from "../../api/users-api";
import {CommonResponse, ResultCodeEnum} from "../../api/api";
/**
 *? beforeEach()*/
// Создание моков можно вынести за пределы тестов, чтобы каждый раз их не определять заного
// Но тогда нам необходимо их очищать в beforeEach()
// const dispatchMock = jest.fn()
// const getStateMock = jest.fn()
// beforeEach(() => {
//     dispatchMock.mockClear()
//     getStateMock.mockClear()
// })

// Поскольку это юнит тесты, то нам реальные запросы на сервер не нужны
// Создаем фейковый метод запроса на сервер userAPIMock
jest.mock("../../api/users-api")
const userAPIMock = usersAPI as jest.Mocked<typeof usersAPI>

// Ответ фейкового запроса
let result: CommonResponse = {
    resultCode: ResultCodeEnum.Success,
    data: {},
    messages: [],
    fieldsErrors: []
}
// Тут говорим что при вызове, верни объект result
// usersAPI тут не настоящий, а подмененный нами в строке 9

test("follow thunk testing", async () => {
    const thunk = follow(1)

    const dispatchMock = jest.fn()
    const getStateMock = jest.fn()

    userAPIMock.follow.mockReturnValue(Promise.resolve(result))


    await thunk(dispatchMock, getStateMock, {})

    // Проверяем сколько раз был вызван dispatchMock
    expect(dispatchMock).toBeCalledTimes(3)

    // Проверяем что в определенный вызов, был передан определенный объект экшена
    expect(dispatchMock).toHaveBeenNthCalledWith(1,{
        type: 'TOGGLE_IS_FOLLOWING',
        payload: {isFetching: true, userId: 1}
    })
    expect(dispatchMock).toHaveBeenNthCalledWith(2, {type: 'FOLLOW', payload: 1})
    expect(dispatchMock).toHaveBeenNthCalledWith(3, {
        type: 'TOGGLE_IS_FOLLOWING',
        payload: {isFetching: false, userId: 1}
    })

})