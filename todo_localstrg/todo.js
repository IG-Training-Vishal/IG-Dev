let todolist=[];
todolist = JSON.parse(localStorage.getItem("todo"));
if(todolist==null){
    todolist=[];
}
todolist.forEach(element => {
    document.querySelector('#tasks').innerHTML += `
            <div class="task">
                <span id="taskname">
                    ${element}
                </span>
                <button class="delete">
                    <i class="far fa-trash-alt"></i>
                </button>
            </div>
        `;   
});
document.querySelector('#push').onclick = function(){
    if(document.querySelector('#newtask input').value.length == 0){
        alert("Please Enter a Task")
    }
    else{
        document.querySelector('#tasks').innerHTML += `
            <div class="task">
                <span id="taskname">
                    ${document.querySelector('#newtask input').value}
                </span>
                <button class="delete">
                    <i class="far fa-trash-alt"></i>
                </button>
            </div>
        `;

       todolist.push(document.querySelector('#newtask input').value);
       localStorage.setItem("todo",JSON.stringify(todolist));
        
       
       var current_tasks = document.querySelectorAll(".delete");
        for(var i=0; i<current_tasks.length; i++){
            current_tasks[i].onclick = function(){
                this.parentNode.remove();
            }
        }

        var tasks = document.querySelectorAll(".task");
        for(var i=0; i<tasks.length; i++){
            tasks[i].onclick = function(){
                classList.toggle('completed');
            }
        }

        document.querySelector("#newtask input").value = "";
    }
}