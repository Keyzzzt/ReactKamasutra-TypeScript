
// TODO: типизировать any

export const updateObjectInArray = (items: any, itemId: any, objectPropName: any, newObjectProps: any) => {
    return items.map((u: any) => {
        if(u[objectPropName] === itemId){
            return {...u, ...newObjectProps}
        }
        return u
})
}

// Функция выше заменяет следующее:

// case FOLLOW:
//    return {...state, users: state.users.map(user => {
//        if(user.id === action.payload){
//            return {...user, followed: true}
//        }
//        return user
//        })}

