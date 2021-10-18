import React, {useEffect} from "react";
import Pagination from "../common/Pagination/Pagination";
import {SingleUser} from "./SingleUser";
import {UsersSearchForm} from "./UsersSearchForm";
import {FilterType, requestUsers} from "../../redux/reducers/usersReducer";
import {useDispatch, useSelector} from "react-redux";
import {StateType} from "../../redux/reduxStore";
import Loader from "../common/Loader";
import { useHistory } from "react-router-dom";
import * as queryString from "querystring";

type PropsType = {}

export const Users: React.FC<PropsType> = () => {
    const dispatch = useDispatch()
    const history = useHistory()

    const {users, totalUsersCount, pageSize, pageNumber, filter, isFetching} = useSelector((state: StateType) => state.usersPage)


    const onPageChanged = (pageNumber: number) => {
        dispatch(requestUsers(pageNumber, pageSize, filter))
    }
    const onFilterChanged = (filter: FilterType) => {
        // Тут важно передать pageNumber 1, а не значение из state.
        dispatch(requestUsers(1, pageSize, filter))
    }


    let totalUserPages = Math.ceil(totalUsersCount / pageSize)
    let pages: Array<number> = []
    for (let i = 1; i <= totalUserPages; i++) {
        pages.push(i)
    }

    // Два useEffect ниже, в купе дают нам то, что мы выбранные параметры поиска закидываем в GET параметры,
    // Затем мы их сохраняем в бизнесе. При перезагрузке страницы параметры не пропадают.
    // 16 - useHistory, filter, search, query string _ React TypeScript - Путь Самурая 2.0
    useEffect(() => {
        //После перезагрузки страницы, параметры фильтров должны остаться в GET параматерах.
        //Считываем GET параметры, которые мы же туда и поместили, и отправляем их в бизнес
        const parsed = queryString.parse(history.location.search.substring(1)) as {term: string, friend: string, page: string}
        let actualPage = pageNumber
        let actualFilter = filter
        if (parsed.page)  actualPage = Number(parsed.page)
        if (parsed.term) actualFilter = {...actualFilter, term: parsed.term}
        if (parsed.friend) actualFilter = {...actualFilter, friend: parsed.friend === 'null' ? null : parsed.friend === 'true'}

        dispatch(requestUsers(actualPage, pageSize, actualFilter))
    }, [])

    // При попадании на /users, в GET параметры записываем данные из state
    // Так же синхронизируемся с filter и pageNumber, при изменении их в state, изменяем их и в GET параметрах
    useEffect(() => {
        history.push({
            pathname: '/users',
            search: `?term=${filter.term}&friend=${filter.friend}&page=${pageNumber}`
        })
    }, [filter, pageNumber])


    return (
        <div>
            {isFetching ? <Loader/> : (
                <div>
                    <UsersSearchForm onFilterChanged={onFilterChanged} filterFromState={filter}/>
                    <Pagination onPageChanged={onPageChanged} currentPage={pageNumber} pageSize={pageSize}
                                totalItemsCount={totalUsersCount} />
                    {users.map(user => <SingleUser user={user} key={user.id}/>)}
                </div>
            )}

        </div>
    )
}