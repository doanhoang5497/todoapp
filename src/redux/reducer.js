const initState = {
    filters: {
        search: '',
        status: ''
    },
    tabs: {
        name: 'All',
    },
    todoList: [
        { id: 1, name: 'Quet nha', done: 'Active' },
        { id: 2, name: 'Rua bat', done: 'Complete' },
        { id: 3, name: 'Nau com', done: 'Active' },
        { id: 4, name: 'Giat do', done: 'Complete' }
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
        default:
            return state
    }
}

export default rootReducer;