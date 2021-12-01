
function niceTime(unixStamp){
    let newDate = new Date();
    return newDate.toUTCString().substring(17,25);
}

function writeMessage(msg){ 
    let newItem = document.createElement('li')
    let when = new Date()
    newItem.appendChild(document.createTextNode(msg + ' at ' + niceTime(Date.now())))
    document.getElementById("messages").appendChild(newItem)
}

