function renderNotes(arr){
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
            console.log(r)
            if (!r.ok){
                alert('Something is messed up. You could try logging out and back in.')
            }
        })
    } 

    document.getElementById('new-note').value = ''
}

function getUsersNotes(){
    
    if (netlifyIdentity.currentUser() !== null){

        const localUser = JSON.parse(localStorage.getItem('gotrue.user'))
        const token = localUser.token.access_token
        
        console.log(localUser)

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