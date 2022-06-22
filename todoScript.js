//todo list
//Model 
//manage data
let todos;
const savedTodos = JSON.parse(localStorage.getItem('todos'));
if(Array.isArray(savedTodos)){
  todos = savedTodos;

}else{
  todos = [
  {title:'wash car',
  dueDate:'2022-11-08',
  id:111
  },
  {title:'make dinner',
  dueDate:'2022-11-08',
  id:222
  }
]
}

function createTodo(title,dueDate){
  let id = new Date().getTime();
    //push into array
  todos.push({
    title:title,
    dueDate:dueDate,
    id:id
  }); 
  saveTodos();
} 

function removeTodo(idToDelete){
  todos = todos.filter(function (todo){
    if(todo.id == idToDelete){
      return false;
    }else{
      return true;
    }
  });
  saveTodos();
}

function saveTodos(){
  localStorage.setItem('todos',JSON.stringify(todos));
}

render();

//View
function render(){
  //reset array
  document.getElementById('todo-list').innerHTML=' ';
  todos.forEach(function (todo){
    let text = document.createElement('div');

    text.innerText = todo.title+' '+todo.dueDate; 
    //create delete button and set button value
    let deletebutton = document.createElement('BUTTON');
    deletebutton.innerHTML='Delete';
    deletebutton.className = 'deletebutton';
    deletebutton.onclick = deleteTodo;
    deletebutton.id=todo.id;
    text.appendChild(deletebutton);
    let todolist= document.getElementById('todo-list');
    todolist.appendChild(text); 
  })
}

//Controller 
//response to interaction
function addTodo(){
  //get input todos and duedate
  let textbox = document.getElementById('todo-text');
  let title = textbox.value;
  let datePick = document.getElementById('todo-duedate');
  let dueDate = datePick.value;
  if(title =='' || dueDate ==''){
    alert("Input can not be empty!");
  }else{
    //push into array
    createTodo(title,dueDate);
    render();
    textbox.value='';
    datePick.value='';
  } 
}

function deleteTodo(event){
  let delButton = event.target;
  let idToDelete = delButton.id;
  removeTodo(idToDelete);
  render();
}