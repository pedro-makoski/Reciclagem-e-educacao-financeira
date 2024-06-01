const elementos_animation_scroll = document.querySelectorAll('[data-animation]')
const elemento_ani_take = Array.from(document.querySelectorAll('section.lixosreciclaveis > article > img'))

const obeserver = new IntersectionObserver(entries => {
    entries.forEach(entrie => {
        if(entrie.intersectionRect.height / entrie.target.getBoundingClientRect().height >= 0.50 && entrie.isIntersecting) {
            entrie.target.classList.add('animate')
        } else if (entrie.intersectionRatio === 0){
            entrie.target.classList.remove('animate')
        }
    })}, {
        threshold: tresshold
    }
)

Array.from(elementos_animation_scroll).forEach(elemento => {
    body.classList.add('javascripton')

    obeserver.observe(elemento)
})


