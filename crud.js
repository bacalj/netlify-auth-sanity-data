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

    writeMessage('foos')
    
    if (JSON.parse(localStorage.getItem('gotrue.user')) !== null){
        const localUser = JSON.parse(localStorage.getItem('gotrue.user'))
        const token = localUser.token.access_token
         
        fetch('/.netlify/functions/create-note?foo=bar', {
            headers: {
                Authorization: `bearer ${token}`
            }
        }).then((r) => {
            console.log(r)
        })
    } 
}