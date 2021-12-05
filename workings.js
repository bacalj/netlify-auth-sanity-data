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


function getUsersToDos(){
    console.log(JSON.parse(localStorage['gotrue.user']))
}

function writeNewToDo(){

}