function renderNotes(){
    let notes = ["eat", "sleep"]
    for (let i = 0; i < notes.length; i++) {
        let newItem = document.createElement('li');
        let newText = document.createTextNode(notes[i]);
        newItem.appendChild(newText);
        document.getElementById("notes").appendChild(newItem);  
    }
}

function createUserNote(){

    let noteText = document.getElementById('new-note').value 

    if (netlifyIdentity.currentUser() !== null){

        const localUser = JSON.parse(localStorage.getItem('gotrue.user'))
        const token = localUser.token.access_token

        console.log(token)
         
        fetch(`/.netlify/functions/create-note?note=${noteText}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((r) => {
            console.log(r)
            if (!r.ok){
                alert('you need to refresh your login, then try again.')
            }
            // TODO handle response from netlify function, e.g. if it 500s because logout has expired
            // we should prompt user to refresh login

        })
    } 
}