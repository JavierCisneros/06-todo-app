import { Todo } from "../todos/models/todo.model";

export const Filters = {
    All: 'all',
    Completed: 'Completed',
    Pending: 'Pending'
}

const state = {
    todos:[

    ],
    filter: Filters.All,
}

const initStore = () =>{
    loadStore();
    console.log('InitStore'); 

}

const loadStore = () => { //Uso de localStorage
    if(!localStorage.getItem('state')) return; //Regresa si no existe el localStorage

    //Se verifica el localStorage que los datos no hayan sido manipulados
    const {todos=[],filter=Filters.All} = JSON.parse(localStorage.getItem('state')); 
    //Se asignan los datos
   state.todos = todos;
   state.filter = filter;
}

const saveStateToSessionStorage = () =>{
    localStorage.setItem('state',JSON.stringify(state));
}

const getTodos = (filter = Filters.All) =>{
    switch(filter){
        case Filters.All:
            return [...state.todos];
        case Filters.Completed:
            return state.todos.filter(todo => todo.done);
        case Filters.Pending:
            return state.todos.filter(todo => !todo.done);
        default: 
        throw new Error(`Option ${filter} is not valid.`);
    }
    
}

/**
 * 
 * @param {String} description
 */
const addTodo = (description) => {
    //Verifica que hay una descripcion, si la hay la agrega al arreglo
    if(!description) throw new Error('Description is required');
    state.todos.push (new Todo(description));
    saveStateToSessionStorage();
}
/**
 * 
 * @param {String} todoId 
 */
const toggleTodo = (todoId) => {
    //Deberia ser sustituido por un find para eficiencia, donde se encuentre el valor y se devuelva a la posicion donde estaba
    state.todos = state.todos.map(todo =>{
        if(todo.id === todoId){
            todo.done = !todo.done;
        }
        return todo;
    });
    saveStateToSessionStorage();
}
/**
 * 
 * @param {String} todoId 
 */
const deleteTodo = (todoId) =>{
    //Asigna al arreglo todos los elementos diferentes al id recibido
    state.todos = state.todos.filter(todo => todo.id !== todoId); 
    saveStateToSessionStorage();
} 

const deleteCompleted = () =>{
    state.todos = state.todos.filter(todo => !todo.done);
    saveStateToSessionStorage();
    
}

const setFilter = (newFilter = Filters.All) =>{
    state.filter = newFilter;
    saveStateToSessionStorage();
}

const getCurrentFilter =  () =>{
    return state.filter;
}

export default{
    initStore,
    getTodos,
    loadStore,
    addTodo,
    toggleTodo,
    deleteTodo,
    deleteCompleted,
    setFilter,
    getCurrentFilter,
    
    
}