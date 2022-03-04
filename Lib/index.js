const addBookCont = document.getElementById("addBookCont");
const addBookButt = document.getElementById("addBook");
const pagesRead = document.getElementById("pagesRead");
const readState = document.getElementById("readState");


readState.addEventListener("change", function(){
    if (this.checked){
        pagesRead.disabled = false;
    } else{
        pagesRead.disabled = true;
    }
})


addBookButt.addEventListener('click', toggleAddBookWin);

function closeAddBookWin(){
    addBookCont.classList.add("hidden");
    addBookCont.classList.remove("shown");
}
function toggleAddBookWin(){

    if (addBookCont.classList.contains("hidden")){
        addBookCont.classList.remove("hidden");
        addBookCont.classList.add("shown");
        
    } else{
        closeAddBookWin();
        
    }
    
}

window.onclick = function(event){
    if (event.target.id === "addBookCont"){
        closeAddBookWin();
    }
}