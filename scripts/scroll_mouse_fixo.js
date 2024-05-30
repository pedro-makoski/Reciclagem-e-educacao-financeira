function descobrirposicoescada(childrens_iten) {
    let posicoes = [0]
    let largura_principal = childrens_iten[0].getBoundingClientRect().width
    let posicao = NaN

    for (i = 1; i < childrens_iten.length; i++) {
        posicao = largura_principal * i
        posicao = Math.ceil(posicao)

        posicoes.push(posicao)
    }

    return posicoes
}

function melhorar_flechas_visibilidade(artigo, oque, valor_maximo) {
    let botao_direita = document.querySelector(`article#${artigo}:not(#lugares) .${oque} + div > button.right`)
    let botao_esquerda = document.querySelector(`article#${artigo}:not(#lugares) div:has(+ .${oque}) button.left`)

    if (clicks[`${artigo}_${oque}`] !== valor_maximo && artigo !== 'lugares') {
        botao_direita.style.display = 'flex'    
    }
    if (clicks[`${artigo}_${oque}`] > 1 && artigo !== 'lugares') {
        botao_esquerda.style.display = 'flex'
    }
    if (clicks[`${artigo}_${oque}`] === 1 && artigo !== 'lugares') {
        botao_esquerda.style.display = 'none'
    }
    if (clicks[`${artigo}_${oque}`] === valor_maximo && artigo !== 'lugares') {
        botao_direita.style.display = 'none'
    }
}

function maisproximo(lista, item) {
    let menor_difereca = item - lista[0]
    let menor_numero = lista[0]
    let index = 0

    for (i = 1; i<lista.length; i++) {
        let diferenca = Math.abs(item - lista[i])

        if (diferenca < menor_difereca) {
            menor_difereca = diferenca
            menor_numero = lista[i]
            index = i
        }
    }
    
    return index
}

function realizar_scroll(item, posicoes) {
    let posicao_scroll = Math.ceil(item.scrollLeft)

    let mais_proximo = maisproximo(posicoes, posicao_scroll)
    
    item.scrollTo({
        left: posicoes[mais_proximo],
        behavior: 'smooth'
    })
    
    return mais_proximo
}

items_de_scroll.forEach((item) => {
    let childrens_iten = [].slice.call(item.children)
    let valor_maximo = childrens_iten.length
    let posicoes = descobrirposicoescada(childrens_iten)

    let oque = item.classList.item(0)
    let artigo = item.closest('article').id

    window.addEventListener('resize', () => {
        setTimeout(() => {
            posicoes = descobrirposicoescada(childrens_iten)
        }, 300);
    })

    item.addEventListener('scroll', () => {
        document.addEventListener('touchend', () => {
            let mais_proximo = realizar_scroll(item, posicoes)
            clicks[`${artigo}_${oque}`] = mais_proximo + 1
        })

        document.addEventListener('mouseup', () => {
            let mais_proximo = realizar_scroll(item, posicoes)
            clicks[`${artigo}_${oque}`] = mais_proximo + 1
        })
    
        document.addEventListener('wheel', (e) => {
            if (e.deltaY === 0) {
                let mais_proximo = realizar_scroll(item, posicoes)
                clicks[`${artigo}_${oque}`] = mais_proximo + 1
            }
        })

        setTimeout(() => {
            melhorar_flechas_visibilidade(artigo, oque, valor_maximo) 
        }, 500)
    })
})