const articles = Array.from(document.querySelectorAll('article, #header_top, #grafico-assunto'))


let tamanhos = []

for(let i = 0; i < articles.length; i++) {
    tamanhos.push(articles[i].offsetTop)
}

window.addEventListener('scroll', () => {
    const sizes_diference = 100

    setTimeout(() => {
        for(let i = 0; i < tamanhos.length; i++) {
            let pos_real = tamanhos[i] - DIFERENCE_NUMBER_OF_SCROLL - sizes_diference

            if(tamanhos[i+1] !== undefined) {
                if(window.scrollY >= pos_real && window.scrollY <= tamanhos[i+1]) {
                    if(window.location.hash.slice(1) !== articles[i].id) {
                        let local = window.location.protocol + '//' + window.location.host + window.location.pathname + '#' + articles[i].id
                        window.history.replaceState({}, '', local)
                    } else {
                        i = tamanhos.length
                    }
                }
            } else {
                if(window.scrollY >= pos_real) {
                    if(window.location.hash.slice(1) !== articles[i].id) {
                        let local = window.location.protocol + '//' + window.location.host + window.location.pathname + '#' + articles[i].id
                        window.history.replaceState({}, '', local)

                        i = tamanhos.length
                    }
                }
            }
        }
    }, 100)
})
