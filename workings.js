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
    let userData = JSON.parse(localStorage.getItem('gotrue.user'))
    console.log(userData)
    // document.querySelector('#userinfo').innerHTML = `<pre>${userData}</pre>`
}

function renderNotes(){
    let notes = ["eat", "sleep"]
    for (let i = 0; i < notes.length; i++) {
        let newItem = document.createElement('li');
        let newText = document.createTextNode(notes[i]);
        newItem.appendChild(newText);
        document.getElementById("notes").appendChild(newItem);  
    }
}

async function createUserNote(){
    const localUser = JSON.parse(localStorage.getItem('gotrue.user'))
    const token = localUser.token

    fetch('/.netlify/functions/create-note', {
        headers: {
            Authorization: `token ${token}`
        }
    }).then((r) => {
        console.log(r)
    })
}