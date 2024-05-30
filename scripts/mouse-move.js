let isMouseDown = true;

window.addEventListener("mousedown", () => {
    isMouseDown = true;
});

window.addEventListener("mouseup", () => {
    isMouseDown = false
    //rodar(item, e, scroll_left_antigo)
});

window.addEventListener("mouseleave", () => {
    isMouseDown = false;
    //rodar(item, e, scroll_left_antigo) 
}); 