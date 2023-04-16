function testFunc(e) {
    if (e.classList.contains("rot")) {
        e.classList.remove("rot")
        e.parentElement.parentElement.getElementsByClassName('project-item-content')[0].classList.remove("project-closed")
    } else {
        e.classList.add("rot")
        e.parentElement.parentElement.getElementsByClassName('project-item-content')[0].classList.add("project-closed")
    }
}