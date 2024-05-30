const article = document.querySelectorAll('article, #header_top, #grafico-assunto')

const observerarticle = new IntersectionObserver(debounce(entries => {
    let i_height_maior = 0

    for(let i = 0; i < entries.length; i++) {
        if (entries[i].isIntersecting) {
            if(entries[i].intersectionRect.height > entries[i_height_maior].intersectionRect.height) {
                i_height_maior = i
            }
        }
    }
    
    let local = window.location.protocol + '//' + window.location.host + window.location.pathname + '#' + entries[i_height_maior].target.id
    window.history.replaceState({}, '', local)
    
}, 100), {
    threshold: tresshold
})

Array.from(article).forEach(artigo => {
    observerarticle.observe(artigo)
})