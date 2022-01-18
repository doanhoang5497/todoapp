export const addTodo =(data)=>{
    return {
        type:'addTodo',
        payload:data
    }
}
export const searchTodo =(text)=>{
    return {
        type:'searchTodo',
        payload:text
    }
}
export const tabStatus =(status)=>{
    return {
        type:'tabStatus',
        payload:status
    }
}
export const updateChecked =(idChecked)=>{
    return {
        type:'updateChecked',
        payload:idChecked
    }
}