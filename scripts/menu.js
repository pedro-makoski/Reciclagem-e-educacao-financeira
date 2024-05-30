const links_nav = document.querySelectorAll('nav a[href^="#"]');

const header = document.querySelector('header')
const hamburguer = document.querySelector('.hamburguer');
const btn_top = document.querySelector('.voltar-topo')
const grow = document.querySelector('[data-animation="grow"]')

function ativaroudesativarmenu() {
    hamburguer.classList.toggle('ativo');
}


function sair() {
    if (!isHoveronNav) {
        nav.classList.add('sair');
    }
}

window.addEventListener('click', (e) => {
    if (!nav.contains(e.target) && hamburguer.classList.contains('ativo')) {
        hamburguer.classList.remove('ativo')
    }
})

Array.from(links_nav).forEach((link) => {
    link.addEventListener('click', ((e) => {
        hamburguer.classList.remove('ativo');
        scrolltosection(link, e)
        link.blur()
    }))


    if (link.offsetTop === 0) {
        let ultimo_scroll = 0;
        let primeira_vez_asair = true;

        window.addEventListener('scroll', () => {
            if (window.scrollY >= header.getBoundingClientRect().height) {
                btn_top.style.display = 'flex'
            } else {
                btn_top.style.display = 'none'
                primeira_vez_asair = true
            }

            if (window.scrollY > ultimo_scroll) {
                if (primeira_vez_asair) {
                    setTimeout(function() {
                        sair()
                        primeira_vez_asair = false;
                    }, 2000);
                }else {
                    sair()
                }
                
            }else {
                nav.classList.remove('sair')
            }

            ultimo_scroll = window.scrollY;

            if (window.scrollY < 700) {
                primeira_vez_asair = false;
            }

        })
    }

})

function scrolltosection(elemento, e) {
    e.preventDefault()

    const id = elemento.getAttribute('href');
    let to = document.querySelector(id).offsetTop;

    window.scroll({
        top: to - 90,
        behavior: "smooth"
    });
}

