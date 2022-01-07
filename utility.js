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

/*
https://github.com/netlify/netlify-identity-widget

*/

window.netlifyIdentity.on('init', (u) => {
    writeMessage('initialized netlifyIdentity at' + niceTime(), + ' user is: ', u)
})

window.netlifyIdentity.on('login', () => {
    writeMessage('logged in the user')
})


