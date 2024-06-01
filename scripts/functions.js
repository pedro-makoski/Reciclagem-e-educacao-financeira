function debounce(funcao, tempo) {
    let tempo_func;

    return function(...args) {
        const atraso = () => {
            clearTimeout(tempo_func)
            funcao.apply(this, args)
        }

        clearTimeout(tempo_func)
        tempo_func = setTimeout(atraso, tempo)
    }
}

const body = document.querySelector('body')
let isPhone = false

if(navigator.userAgent.match(/Android/i)|| navigator.userAgent.match(/WebOS/i) || navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/Ipod/i) || navigator.userAgent.match(/BlackBerry/i) || navigator.userAgent.match(/Windows phone/i)) {
    isPhone = true
    body.classList.remove('pc')
    body.classList.add('phone')
} else {
    isPhone = false
    body.classList.remove('phone')
    body.classList.add('pc')
}