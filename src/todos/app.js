import todoStore, {Filters} from '../store/todo.store';
import html from './app.html?raw';
import { renderTodos,  renderPending} from './use-cases/';

const ElementIds = {
    ClearCompleted: '.clear-completed',//class
    TodoList: '.todo-list',//class
    NewTodoInput: '#new-todo-input',//id
    TodoFilters: '.filtro',
    PendingCount: '#pending-count'
}
/**
 * 
 * @param {String} elementId 
 */

export const App = (elementId) =>{


    const displayTodos = () => {
        const todos = todoStore.getTodos(todoStore.getCurrentFilter());
        //console.log(todos);
        renderTodos(ElementIds.TodoList, todos);
        updatePendingCount();

    }

    //PendingCount
    const updatePendingCount = () =>{
        renderPending(ElementIds.PendingCount);

    }

    //Cuando la funcion App() se llama
    (()=>{
        const app = document.createElement('div');
        app.innerHTML = html;
        document.querySelector(elementId).append(app);
        displayTodos();
    })();



    //Referencias HTML se crean despues de la funcion asincrona

    const newDescriptionInput = document.querySelector(ElementIds.NewTodoInput);
    const todoListUL = document.querySelector(ElementIds.TodoList);
    const clearCompletedButton = document.querySelector(ElementIds.ClearCompleted);
    const filtersLIs = document.querySelectorAll(ElementIds.TodoFilters);
    const pendingCountStrong = document.querySelector(ElementIds.PendingCount);

    
    //Listeners

    newDescriptionInput.addEventListener('keyup', (event) =>{
        if(event.keyCode != 13) return;
        if(event.target.value.trim().lenght === 0) return;

        todoStore.addTodo(event.target.value);
        displayTodos();
        event.target.value = '';
    });

    todoListUL.addEventListener('click', (event)=>{
        const element = event.target.closest('[data-id]'); //buscar elemento padre con el elementID MAS CERCANO
        //console.log(element.getAttribute('data-id'));
        todoStore.toggleTodo(element.getAttribute('data-id'));
        displayTodos();
    });

    
    todoListUL.addEventListener('click', (event)=>{
        if(event.target.className === 'destroy')
        {
            const element = event.target.closest('[data-id]');
            todoStore.deleteTodo(element.getAttribute('data-id'));
            displayTodos();
        }
        else return;
    });


    clearCompletedButton.addEventListener('click',()=>{
        todoStore.deleteCompleted();
        displayTodos();
    });

    filtersLIs.forEach(element =>{
        element.addEventListener('click', (element) =>{
            filtersLIs.forEach(el =>el.classList.remove('selected'));
            element.target.classList.add('selected');
            //console.log(element.target.getAttribute('id'));
            switch(element.target.getAttribute('id')){
                case 'All':
                    todoStore.setFilter(Filters.All);
                    displayTodos();
                break;
                case 'Pending':
                    todoStore.setFilter(Filters.Pending);
                    updatePendingCount();
                    displayTodos();
                break;
                case 'Completed':
                    todoStore.setFilter(Filters.Completed);
                    displayTodos();
                    break;
            }

        });

    });
}