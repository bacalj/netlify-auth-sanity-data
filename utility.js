window.netlifyIdentity.on('init', () => {
    console.log('netlifyIdentity local object ready')
})

window.netlifyIdentity.on('login', (u) => {
    console.log('logging in a user, giving them a token here')
    console.log(u)
    applyBodyClass('logged-in')
})

window.netlifyIdentity.on('logout', () => {
    console.log('user logged out')
    applyBodyClass('logged-out')
})

applyBodyClass = (str) => {
    document.querySelector('body').className = ''
    document.querySelector('body').classList.add(str)
}
