window.netlifyIdentity.on('init', () => {
    console.log('netlifyIdentity local object ready')
})

window.netlifyIdentity.on('login', (u) => {
    console.log('logging in a user, giving them a token here')
    console.log(u)
})

window.netlifyIdentity.on('logout', () => {
    console.log('user logged out')
})