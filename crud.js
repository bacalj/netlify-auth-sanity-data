function renderNotes(arr){

    document.getElementById("notes").innerHTML = ""

    let notes = arr.filter((n) => n.length > 0 )

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
            if (r.ok){
                getAndRenderUserNotes()
            }
            if (!r.ok){
                alert('Something is messed up. You could try logging out and back in.')
            }
        })
    } 

    document.getElementById('new-note').value = ''
}

function getAndRenderUserNotes(){
    
    if (netlifyIdentity.currentUser() !== null){

        const localUser = JSON.parse(localStorage.getItem('gotrue.user'))
        const token = localUser.token.access_token

        fetch(`/.netlify/functions/user-notes`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then((response) => {
            return response.json()
        }).then((data) => {
            console.log(data)
            renderNotes(data)
        })

    } 
}

function deleteNote(){

}

document.addEventListener("DOMContentLoaded", function() {
    if (netlifyIdentity.currentUser() !== null){
        getAndRenderUserNotes()
    }
});

// function userObj(){
//     if (netlifyIdentity.currentUser() !== null){
//         const localUser = JSON.parse(localStorage.getItem('gotrue.user'))
//         const token = localUser.token.access_token
//         return ({ email: localUser.email,
//             role: })
//     } else {
//         return false
//     }
// }