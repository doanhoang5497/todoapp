export const data = state=>{
    const todoData = state.todoList.filter(todo=>{
        return todo.name.toLowerCase().includes(state.filters.status.toLowerCase()) 
        || todo.done.find(state.tabs.name) ;
    });
    return todoData
};