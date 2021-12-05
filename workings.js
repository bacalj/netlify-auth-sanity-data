/* UTILITY */
function niceTime(){
    let newDate = new Date();
    return newDate.toUTCString().substring(17,25);
}

function writeMessage(msg){ 
    let newItem = document.createElement('li');
    let newText = document.createTextNode(msg + ' at ' + niceTime());
    newItem.appendChild(newText);
    document.getElementById("messages").appendChild(newItem);
}


function seeUser(){
    console.log(JSON.parse(localStorage['gotrue.user']))
}

function renderToDos(){
    let todos = ["eat", "sleep"]
    for (let i = 0; i < todos.length; i++) {
        let newItem = document.createElement('li');
        let newText = document.createTextNode(todos[i]);
        newItem.appendChild(newText);
        document.getElementById("todos").appendChild(newItem);  
    }
}
