const nav = document.querySelector('body > nav')
let isHoveronNav = false

nav.addEventListener('mouseover', () => {
    isHoveronNav = true;
})

nav.addEventListener('mouseout', () => {
    isHoveronNav = false;
})