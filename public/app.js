function profileDropdown(e) {
    console.log(e)
    e.parentElement.getElementsByClassName('dropdown')[0].classList.toggle("show");
}

function adjustHeight(el){
    el.style.height = (el.scrollHeight > el.clientHeight) ? (el.scrollHeight)+"px" : "60px";
}