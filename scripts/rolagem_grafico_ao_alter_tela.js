let lugares_first_child = document.querySelector('#lugares .itens_carrossel .exemplos-locais .lugar:first-child')
let lugares_last_child = document.querySelector('#lugares .itens_carrossel .exemplos-locais .lugar:last-child')

let tresshold = []

for(i = 1; i <= 100; i++) {
    tresshold.push(i/100)
}

const observer = new IntersectionObserver(debounce(entries => {
    lugares_first_child = document.querySelector('#lugares .itens_carrossel .exemplos-locais .lugar:first-child')
    lugares_last_child = document.querySelector('#lugares .itens_carrossel .exemplos-locais .lugar:last-child')

    botao_esquerda_lugares = document.querySelector('#lugares .itens_carrossel .button_space .left')
    botao_direita_lugares = document.querySelector('#lugares .itens_carrossel .button_space .right')

    Array.from(entries).forEach(entrie => {
        if (entrie.target === lugares_last_child && entrie.intersectionRect.width / entrie.target.getBoundingClientRect().width >= 1) {
            botao_direita_lugares.style.display = 'none'
        } else if (entrie.target === lugares_first_child && entrie.intersectionRect.width / entrie.target.getBoundingClientRect().width >= 1) {
            botao_esquerda_lugares.style.display = 'none'
        } else {
            botao_esquerda_lugares.style.display = 'flex'
            botao_direita_lugares.style.display = 'flex'
        }
    })
}, 100), {
    threshold: tresshold.slice(50)
})


observer.observe(lugares_last_child)
observer.observe(lugares_first_child)

function irpara(pos_click, childrens, artigo, oque, item) {
    let valor_maximo = childrens.length

    let emquelocalestamos

    emquelocalestamos = pos_click
    
    let quanto_de_scroll = childrens[0].getBoundingClientRect().width
    let local_posicao_x = quanto_de_scroll * (emquelocalestamos - 1)

    item.scrollTo({
        left: local_posicao_x,
        behavior: 'smooth'
    })
    
    melhorar_flechas_visibilidade(artigo, oque, valor_maximo)
}


window.addEventListener('resize', () => {
    items_de_scroll.forEach((item) => {
        setTimeout(() => {
            let children_item = [].slice.call(item.children)

            let oque = item.classList.item(0)
            let artigo = item.closest("article").id

            let emquelocalestamos = clicks[`${artigo}_${oque}`]

            irpara(emquelocalestamos, children_item, artigo, oque, item)
        }, 500)})
})