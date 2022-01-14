export const data = state=>{
    const todoData = state.todoList.filter(todo=>{
        return todo.name.toLowerCase().includes(state.filters.status.toLowerCase())   
    });
    return todoData
};