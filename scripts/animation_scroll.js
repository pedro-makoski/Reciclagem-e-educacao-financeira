const elementos_animation_scroll = document.querySelectorAll('[data-animation]')
const elementos_animation_open = document.querySelectorAll('[data-animation-open]')
const elemento_ani_take = Array.from(document.querySelectorAll('section.lixosreciclaveis > article > img'))

const obeserver = new IntersectionObserver(entries => {
    entries.forEach(entrie => {
        if(entrie.intersectionRect.height / entrie.target.getBoundingClientRect().height >= 0.50) {
            entrie.target.classList.add('animate')
        } else if (entrie.intersectionRatio === 0){
            debounce(() => {
                entrie.target.classList.remove('animate')
            }, 100)
        }
    })}, {
        threshold: tresshold
    }
)


window.addEventListener('DOMContentLoaded', () => {
    body.classList.add('javascripton')

    Array.from(elementos_animation_open).forEach(elemento => {
        setTimeout(() => {
            console.log(elemento)
            elemento.classList.add('animate')
        }, 200)
    })
})

Array.from(elementos_animation_scroll).forEach(elemento => {
    obeserver.observe(elemento)
})


