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

function theUser(){
    return JSON.parse(localStorage.getItem('gotrue.user'))
}

function setFoo(str){
    window.localStorage.setItem('foo', str)
}

// document.cookies.onChanged.addListener(function(changeInfo) {
//     console.log('Cookie changed: ' +
//                 '\n * Cookie: ' + JSON.stringify(changeInfo.cookie) +
//                 '\n * Cause: ' + changeInfo.cause +
//                 '\n * Removed: ' + changeInfo.removed);
// });

//document.addEventListener("DOMContentLoaded", function() {
window.netlifyIdentity.on('init', () => {
    writeMessage('initialized netlifyIdentity at' + niceTime())
})

window.netlifyIdentity.on('currentUser', () => {
    writeMessage('is currentUser an event?')
})


