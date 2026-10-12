function display(element) {
     window.onclick = function(event) {
        if (event.target === element) {
             element.style.display = "none";
         }
     }

     document.addEventListener('keydown', function(event){
         if(event.key === "Escape") {
             element.style.display = "none";
         }
     })

    element.style.display = "inline-block";
}

function hide(element) {
    element.style.display = "none";
}