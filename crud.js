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
         
        fetch(`/.netlify/functions/create-note?note=${noteText}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((r) => {
            console.log(r)
            if (!r.ok){
                alert('Something is messed up. You could try logging out and back in.')
            }
        })
    } 
}

function getUsersNotes(){
    
    if (netlifyIdentity.currentUser() !== null){

        const localUser = JSON.parse(localStorage.getItem('gotrue.user'))
        const token = localUser.token.access_token
        
        console.log(token)

        fetch(`/.netlify/functions/user-notes`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((r) => {
            console.log(r)
            if (!r.ok){
                alert('Something is messed up. You could try logging out and back in.')
            }
            // return r
        })
    } 
}

document.addEventListener("DOMContentLoaded", function() {
    // console.log('getting notes...')
    // var notim = getUsersNotes()
    // console.log(notim)
});