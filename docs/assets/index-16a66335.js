(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))d(o);new MutationObserver(o=>{for(const n of o)if(n.type==="childList")for(const p of n.addedNodes)p.tagName==="LINK"&&p.rel==="modulepreload"&&d(p)}).observe(document,{childList:!0,subtree:!0});function i(o){const n={};return o.integrity&&(n.integrity=o.integrity),o.referrerpolicy&&(n.referrerPolicy=o.referrerpolicy),o.crossorigin==="use-credentials"?n.credentials="include":o.crossorigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function d(o){if(o.ep)return;o.ep=!0;const n=i(o);fetch(o.href,n)}})();let f;const v=new Uint8Array(16);function C(){if(!f&&(f=typeof crypto<"u"&&crypto.getRandomValues&&crypto.getRandomValues.bind(crypto),!f))throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");return f(v)}const r=[];for(let e=0;e<256;++e)r.push((e+256).toString(16).slice(1));function S(e,t=0){return(r[e[t+0]]+r[e[t+1]]+r[e[t+2]]+r[e[t+3]]+"-"+r[e[t+4]]+r[e[t+5]]+"-"+r[e[t+6]]+r[e[t+7]]+"-"+r[e[t+8]]+r[e[t+9]]+"-"+r[e[t+10]]+r[e[t+11]]+r[e[t+12]]+r[e[t+13]]+r[e[t+14]]+r[e[t+15]]).toLowerCase()}const L=typeof crypto<"u"&&crypto.randomUUID&&crypto.randomUUID.bind(crypto),b={randomUUID:L};function E(e,t,i){if(b.randomUUID&&!t&&!e)return b.randomUUID();e=e||{};const d=e.random||(e.rng||C)();if(d[6]=d[6]&15|64,d[8]=d[8]&63|128,t){i=i||0;for(let o=0;o<16;++o)t[i+o]=d[o];return t}return S(d)}class A{constructor(t){this.id=E(),this.description=t,this.done=!1,this.createdAt=new Date}}const a={All:"all",Completed:"Completed",Pending:"Pending"},l={todos:[],filter:a.All},k=()=>{T(),console.log("InitStore")},T=()=>{if(!localStorage.getItem("state"))return;const{todos:e=[],filter:t=a.All}=JSON.parse(localStorage.getItem("state"));l.todos=e,l.filter=t},g=()=>{localStorage.setItem("state",JSON.stringify(l))},P=(e=a.All)=>{switch(e){case a.All:return[...l.todos];case a.Completed:return l.todos.filter(t=>t.done);case a.Pending:return l.todos.filter(t=>!t.done);default:throw new Error(`Option ${e} is not valid.`)}},I=e=>{if(!e)throw new Error("Description is required");l.todos.push(new A(e)),g()},U=e=>{l.todos=l.todos.map(t=>(t.id===e&&(t.done=!t.done),t)),g()},q=e=>{l.todos=l.todos.filter(t=>t.id!==e),g()},x=()=>{l.todos=l.todos.filter(e=>!e.done),g()},F=(e=a.All)=>{l.filter=e,g()},M=()=>l.filter,c={initStore:k,getTodos:P,loadStore:T,addTodo:I,toggleTodo:U,deleteTodo:q,deleteCompleted:x,setFilter:F,getCurrentFilter:M},D=`<section class="todoapp">\r
    <header class="header">\r
        <h1>Tareas</h1>\r
        <input id="new-todo-input" class="new-todo" placeholder="¿Qué necesita ser hecho?" autofocus>\r
    </header>\r
    \r
    <!-- This section should be hidden by default and shown when there are todos -->\r
    <section class="main">\r
        <input id="toggle-all" class="toggle-all" type="checkbox">\r
        <label for="toggle-all">Mark all as complete</label>\r
        <ul class="todo-list">\r
            <!-- These are here just to show the structure of the list items -->\r
            <!-- List items should get the class "editing" when editing and "completed" when marked as completed -->\r
    <!--          <li class="completed" data-id="abc">\r
                <div class="view">\r
                    <input class="toggle" type="checkbox" checked>\r
                    <label>Probar JavaScript</label>\r
                    <button class="destroy"></button>\r
                </div>\r
                <input class="edit" value="Create a TodoMVC template">\r
            </li> \r
            <li>\r
                <div class="view">\r
                    <input class="toggle" type="checkbox">\r
                    <label>Comprar un unicornio</label>\r
                    <button class="destroy"></button>\r
                </div>\r
                <input class="edit" value="Rule the web">\r
            </li> -->\r
        </ul>\r
    </section>\r
  \r
    <!-- This footer should hidden by default and shown when there are todos -->\r
    <footer class="footer">\r
        <!-- This should be "0 items left" by default -->\r
        <span class="todo-count"><strong id="pending-count">0</strong> pendiente(s)</span>\r
        <!-- Remove this if you don't implement routing -->\r
        <ul class="filters">\r
            <li>\r
                <!-- selected -->\r
                <a id= "All" class="filtro" class="selected" href="#/">Todos</a>\r
            </li>\r
            <li>\r
                <a id ="Pending" class="filtro" href="#/active">Pendientes</a>\r
            </li>\r
            <li>\r
                <a id="Completed" class="filtro" href="#/completed">Completados</a>\r
            </li>\r
        </ul>\r
        <!-- Hidden if no completed items are left ↓ -->\r
        <button class="clear-completed">Borrar completados</button>\r
    </footer>\r
  </section>\r
  \r
  \r
  <footer class="info">\r
    <p>Template creado por <a href="http://sindresorhus.com">Sindre Sorhus</a></p>\r
    <!-- Change this out with your name and url ↓ -->\r
    <p>Creado por <a href="http://todomvc.com">ti</a></p>\r
    <p>Parte de <a href="http://todomvc.com">TodoMVC</a></p>\r
  </footer>`;let y;const O=e=>{if(y||(y=document.querySelector(e)),!y)throw new Error(`Element ${e} not found`);y.innerHTML=c.getTodos(a.Pending).length},N=e=>{if(!e)throw new Error("A TODO object is required");const{done:t,description:i,id:d}=e,o=`
    <div class="view">
        <input class="toggle" type="checkbox" ${t?"checked":""}>
        <label>${i}</label>
        <button class="destroy"></button>
    </div>
    <input class="edit" value="Create a TodoMVC template">
    `,n=document.createElement("li");return n.innerHTML=o,n.setAttribute("data-id",d),e.done&&n.classList.add("completed"),n};let h;const H=(e,t=[])=>{if(h||(h=document.querySelector(e)),!h)throw new Error(`Element ${e} not found`);h.innerHTML="",t.forEach(i=>{h.append(N(i))})},u={ClearCompleted:".clear-completed",TodoList:".todo-list",NewTodoInput:"#new-todo-input",TodoFilters:".filtro",PendingCount:"#pending-count"},V=e=>{const t=()=>{const s=c.getTodos(c.getCurrentFilter());H(u.TodoList,s),i()},i=()=>{O(u.PendingCount)};(()=>{const s=document.createElement("div");s.innerHTML=D,document.querySelector(e).append(s),t()})();const d=document.querySelector(u.NewTodoInput),o=document.querySelector(u.TodoList),n=document.querySelector(u.ClearCompleted),p=document.querySelectorAll(u.TodoFilters);document.querySelector(u.PendingCount),d.addEventListener("keyup",s=>{s.keyCode==13&&s.target.value.trim().lenght!==0&&(c.addTodo(s.target.value),t(),s.target.value="")}),o.addEventListener("click",s=>{const m=s.target.closest("[data-id]");c.toggleTodo(m.getAttribute("data-id")),t()}),o.addEventListener("click",s=>{if(s.target.className==="destroy"){const m=s.target.closest("[data-id]");c.deleteTodo(m.getAttribute("data-id")),t()}else return}),n.addEventListener("click",()=>{c.deleteCompleted(),t()}),p.forEach(s=>{s.addEventListener("click",m=>{switch(p.forEach(w=>w.classList.remove("selected")),m.target.classList.add("selected"),m.target.getAttribute("id")){case"All":c.setFilter(a.All),t();break;case"Pending":c.setFilter(a.Pending),i(),t();break;case"Completed":c.setFilter(a.Completed),t();break}})})};c.initStore();V("#app");
