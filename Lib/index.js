const addBookCont = document.getElementById("addBookCont");
const libCont = document.getElementById("libCont");


let bookAr = [];
    
function Book(title, auth, nPages, read, rPages = 0){
    this.title = title;
    this.auth = auth;
    this.nPages = nPages;
    this.read = read;
    this.rPages = rPages;
    // This will contain the html element so we dont have to remake it every
    // time we have to reorder the books
    this.htmlElem = null;
}


// To prevent the user inputting a number of pages read if they haven't read
// the book
document.getElementById("readState").addEventListener("change", function(){
    const pagesRead = document.getElementById("pagesRead");
    if (this.checked){
        pagesRead.disabled = false;
    } else{
        pagesRead.disabled = true;
    }
})


document.getElementById("addBook").addEventListener('click', toggleAddBookWin);

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

function removeBook(title, auth){
    for (let i = 0; i < bookAr.length; i++){
        if (bookAr[i].title === title &&
            bookAr[i].auth === auth){
                bookAr.splice(i, 1);
            }
    }
}

function comp(a, b){
    let title1 = a.title;
    let title2 = b.title;
    return title1 > title2 ? 1 : title1 === title2 ? 0 : -1;
}


function resetLib(){
    while (libCont.children.length > 1){
        libCont.removeChild(libCont.lastChild);
    }
}

function createBookElem(elem){
    let dispElem = document.createElement("div");
    dispElem.textContent = elem;
    return dispElem;
}

function createDelButt(){
    let delButt = document.createElement("button");
    delButt.classList.add("ff");
    delButt.textContent = "Remove";
    delButt.addEventListener("click", function(){
        const currBook = this.closest("div");
        // Remove the book from the book array before deleting it from the DOM
        removeBook(currBook.children.item(0).textContent, 
        currBook.children.item(1).textContent);
        currBook.remove();
    })
    return delButt;
}
 

function createHTMLBook(book){
    let dispBook = document.createElement("div");
    dispBook.classList.add("book")
    for (let prop in book){
        // prevent the html element attribute from showing up
        if (prop === "htmlElem"){
            continue;
        }
        dispBook.appendChild(createBookElem(book[prop]));
    }

    dispBook.appendChild(createDelButt());
    return dispBook;

}

function addToLib(book){
    let htmlBook = createHTMLBook(book);
    libCont.appendChild(htmlBook);
    book.htmlElem = htmlBook;
}

function dispBooks(){
    resetLib();
    bookAr.sort(comp);
    // the htmlElem attribute helps to increase the efficiency by passing the
    // html element if it has been already created before
    for (let i = 0; i < bookAr.length; i++){
        if (bookAr[i]["htmlElem"] !== null){
            libCont.appendChild(bookAr[i].htmlElem);
        } else{
            addToLib(bookAr[i]);
        }
    }
}

function addBook(title, auth, nPages, read, rPages = 0){
    bookAr.push(new Book(title, auth, nPages, read, rPages));
}



window.onclick = function(event){
    if (event.target.id === "addBookCont"){
        closeAddBookWin();
    }
}
