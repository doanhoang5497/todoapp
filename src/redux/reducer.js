const initState = {
    filters: {
        search: '',
        status: ''
    },
    tabs: {
        name: 'All',
    },
    todoList: [
        { id: 1, name: 'Quet nha', done: true },
        { id: 2, name: 'Rua bat', done: false },
        { id: 3, name: 'Nau com', done: true },
        { id: 4, name: 'Giat do', done: false }
    ]
}

const rootReducer = (state = initState, action) => {
    switch (action.type) {
        case 'addTodo':
            return {
                ...state,
                todoList: [...state.todoList,
                action.payload
                ]
            }
        case 'searchTodo':
            return {
                ...state,
                filters: {
                    ...state.filters,
                    status: action.payload
                }
            }
        case 'tabStatus':
            return {
                ...state,
                tabs: {
                    ...state.tabs,
                    name: action.payload
                }
            }
        case 'updateChecked':
            return (
                {
                    ...state,
                    todoList:
                        state.todoList.map(i => {
                            if (i.id === action.payload) {
                                return {
                                    ...i,
                                    done: !i.done
                                }
                            }
                            return i;
                        })
                });
        default:
            return state
    }
}

export default rootReducer;