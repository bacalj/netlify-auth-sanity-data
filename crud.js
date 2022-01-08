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

    let noteText = document.getElementById('new-note').value 

    if (netlifyIdentity.currentUser() !== null){
        const localUser = JSON.parse(localStorage.getItem('gotrue.user'))
        const token = localUser.token.access_token
         
        console.log(localUser.id, noteText)
        fetch(`/.netlify/functions/create-note?note=${noteText}`, {
            headers: {
                Authorization: `bearer ${token}`
            }
        }).then((r) => {
            console.log(r)
        })
    } 
}