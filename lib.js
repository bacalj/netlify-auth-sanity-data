function renderNotes(arr){
    
    document.getElementById("notes").innerHTML = ""

    let notes = arr.filter((n) => n.title.length > 0 )

    notes.forEach(obj => {

        let newItem = document.createElement('li');
        newItem.id = obj.id

        let newButton = document.createElement('button');
        newButton.addEventListener('click', deleteUserNote)
        newButton.innerHTML = '&times';
        newButton.setAttribute('data-delete-id', obj.id)

        newItem.appendChild(newButton)
        newItem.appendChild(document.createTextNode(obj.title));
        
        document.getElementById("notes").appendChild(newItem);
    });
}

async function createUserNote(){
    
    showAnimation()

    let noteText = document.getElementById('new-note').value 

    if (netlifyIdentity.currentUser() !== null){

        await fetch(`/.netlify/functions/create-note?note=${noteText}`, {
            headers: {
                Authorization: `Bearer ${theToken()}`
            }
        }).then((r) => {
            
            removeAnimation()

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

async function getAndRenderUserNotes(){
    
    if (netlifyIdentity.currentUser() !== null){

        await fetch(`/.netlify/functions/user-notes`, {
            headers: {
                Authorization: `Bearer ${theToken()}`
            }
        })
        .then((response) => {
            return response.json()
        }).then((data) => {
            //console.log(data)
            renderNotes(data)
        })

    } 
}


async function deleteUserNote(e){

    showAnimation(e)

    const deleteMe =  e.target.dataset.deleteId

    if (netlifyIdentity.currentUser() !== null){
         
        await fetch(`/.netlify/functions/delete-note?id=${deleteMe}`, {
            headers: {
                Authorization: `Bearer ${theToken()}`
            }
        }).then((r) => {

            removeAnimation()

            if (r.ok){
                getAndRenderUserNotes()
            }
            if (!r.ok){
                alert('Something is messed up. You could try logging out and back in.')
            }
        })
    } 
}

function theToken(){
    if (netlifyIdentity.currentUser() !== null){
        const localUser = JSON.parse(localStorage.getItem('gotrue.user'))
        return localUser.token.access_token
    } else {
        return false
    }
}

function showAnimation(){
    document.getElementById('animation').style.display = "grid"
}

function removeAnimation(){
    console.log('remove animation')
    document.getElementById('animation').style.display = "none"
}

window.netlifyIdentity.on('init', () => {
    console.log('netlifyIdentity local object ready')
})

window.netlifyIdentity.on('login', (u) => {
    console.log('logging in a user, giving them a token here')
    console.log(u)
    applyBodyClass('logged-in')
    getAndRenderUserNotes()
})

window.netlifyIdentity.on('logout', () => {
    console.log('user logged out')
    applyBodyClass('logged-out')
})

applyBodyClass = (str) => {
    document.querySelector('body').className = ''
    document.querySelector('body').classList.add(str)
}

window.addEventListener('DOMContentLoaded', (event) => {
    removeAnimation()
});