const items_de_scroll = Array.from(document.querySelectorAll('.precos:not(article#vidro .precos, article#oleonapianao .precos, article#bateria .precos), .graficos, .exemplos-locais'))
let scroll_button = false

let clicks = {
    "papel_graficos": 1,
    "plastico_graficos": 1,
    "metal_graficos": 1,
    "vidro_graficos": 1,
    "papel_precos": 1,
    "plastico_precos": 1,
    "metal_precos": 1,
    "lugares_exemplos-locais": 1
}

function irparaesquerda(artigo, oque, local_do_scroll, item_dentro_do_local, botao_direita, botao_esquerda, valor_maximo) {
    let quanto_de_scroll = item_dentro_do_local[0].offsetWidth
    //let cabedois = ((window.innerWidth / quanto_de_scroll) >= 2) && artigo === "lugares"

    botao_direita.setAttribute("onclick", "")
    botao_esquerda.setAttribute("onclick", "")

    local_do_scroll.scrollBy({
        left: quanto_de_scroll * -1,
        behavior: 'smooth'
    })

    setTimeout(() => {        
        clicks[`${artigo}_${oque}`] -= 1
        
        if (clicks[`${artigo}_${oque}`] !== valor_maximo) {
            botao_direita.style.display = 'flex'
        }
        if (clicks[`${artigo}_${oque}`] > 1) {
            botao_esquerda.style.display = 'flex'
        }
    }, 1);

    setTimeout(() => {
        botao_direita.setAttribute("onclick", `scroll_to('${artigo}', '${oque}', 'direita')`)
        botao_esquerda.setAttribute("onclick", `scroll_to('${artigo}', '${oque}', 'esquerda')`)
    }, 459);

}



function irparadireita(artigo, oque, local_do_scroll, item_dentro_do_local, botao_direita, botao_esquerda, valor_maximo) {
    let quanto_de_scroll = item_dentro_do_local[0].getBoundingClientRect().width
    
    //let cabedois = ((window.innerWidth / quanto_de_scroll) >= 2) && artigo === "lugares"

    botao_direita.setAttribute("onclick", "")
    botao_esquerda.setAttribute("onclick", "")
    
    local_do_scroll.scrollBy({
        left: quanto_de_scroll,
        behavior: 'smooth'  
    })  

    setTimeout(() => {
        clicks[`${artigo}_${oque}`] += 1 
        
        if (clicks[`${artigo}_${oque}`] === valor_maximo && artigo !== 'lugares') {
            botao_direita.style.display = 'none'
        }
        if (clicks[`${artigo}_${oque}`] > 1 && artigo !== 'lugares') {
            botao_esquerda.style.display = 'flex'
        }
    }, 1);

    setTimeout(() => {
        botao_direita.setAttribute("onclick", `scroll_to('${artigo}', '${oque}', 'direita')`)
        botao_esquerda.setAttribute("onclick", `scroll_to('${artigo}', '${oque}', 'esquerda')`)
    }, 459)

}


function scroll_to(artigo, oque, paraquelado) {
    const local_do_scroll = document.querySelector(`article#${artigo} .${oque}`)
    const item_dentro_do_local = document.querySelectorAll(`article#${artigo} .${oque} > div`)

    let botao_direita = document.querySelector(`article#${artigo} .${oque} + div > button.right`)
    let botao_esquerda = document.querySelector(`article#${artigo} div:has(+ .${oque}) button.left`)


    let valor_maximo = item_dentro_do_local.length

    
    if (paraquelado === "esquerda") {
        irparaesquerda(artigo, oque, local_do_scroll, item_dentro_do_local, botao_direita, botao_esquerda, valor_maximo)
        scroll_button = true
    }else {
        irparadireita(artigo, oque, local_do_scroll, item_dentro_do_local, botao_direita, botao_esquerda, valor_maximo)
        scroll_button = true
    }
}

items_de_scroll.forEach((item) => {
    let elementos_focaveis = document.querySelectorAll('[tabindex="0"], a, button.voltar-topo')
    let elementos_focaveis_daqui = []

    for(j = 0; j <= elementos_focaveis.length; j++) {
        if (elementos_focaveis[j] !== undefined) {
            if (elementos_focaveis[j].parentElement === item) {
                elementos_focaveis_daqui.push(elementos_focaveis[j])
            }
        } 
    }

    let childrens = [].slice.call(item.children)

    for(let i = 0; i < childrens.length; i++) {
        let oque = item.classList.item(0)
        let artigo = item.closest('article').id

        document.addEventListener('keyup', e => {
            if (e.code === 'Tab') { 
                if(elementos_focaveis_daqui.length !== 0) {
                    for(j = 0; j < elementos_focaveis_daqui.length; j++) {
                        if(elementos_focaveis_daqui[j] === document.activeElement) {
                            irpara(j + 1, childrens, artigo, oque, item)

                            clicks[`${artigo}_${oque}`] = j + 1

                            i = elementos_focaveis_daqui.length
                        }
                    }
                }

                let elemento_pai_pai = document.activeElement.parentElement.parentElement
                
                if(elemento_pai_pai !== undefined && elemento_pai_pai !== null) {
                    if (elemento_pai_pai.classList !== null && elemento_pai_pai.classList !== undefined) {
                        if (elemento_pai_pai.classList.item(0) === 'lugar') {
                            let filhos = [].slice.call(elemento_pai_pai.parentElement.children)
    
                            for(i = 0; i < filhos.length; i++) {
                                if(filhos[i] === elemento_pai_pai) {
                                    irpara(i + 1, childrens, artigo, oque, item)
                                    i = filhos.length
                                }
                            }
                        }
                    }
                }
            }
        })
    }
}) 