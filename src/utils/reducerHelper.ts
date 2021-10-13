
// TODO: типизировать any

export const updateObjectInArray = (items: any, itemId: any, objectPropName: any, newObjectProps: any) => {
    return items.map((user: any) => {
        if(user[objectPropName] === itemId){
            return {...user, ...newObjectProps}
        }
        return user
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

