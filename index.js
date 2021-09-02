/* **********Search button************* */


document.getElementById('search-button').addEventListener('click', function () {
    booksData();
})

/***************display spinner************** */

const toggleSpinner = displayStyle => {
    document.getElementById('spinner').style.display = displayStyle;
}
const toggleSearchResult = displayStyle => {
    document.getElementById('books-result-container').style.display = displayStyle;
}
const totalBookResult = displayStyle => {
    document.getElementById('total-book').style.display = displayStyle;
}

/* *******************API data load**************** */
const booksData = async () => {

    const searchBookField = document.getElementById('search-field');
    toggleSpinner('block');
    toggleSearchResult('none')
    totalBookResult('none')
    const searchBookFieldValue = searchBookField.value;
    searchBookField.value = '';
    console.log({ searchBookFieldValue });
    const url = `https://openlibrary.org/search.json?q=${searchBookFieldValue}`;
    try {
        const res = await fetch(url);
        const data = await res.json();
        booksDataPost(data.docs);
    }
    catch (error) {
        console.log(error);

    }

}

/* ******************display Library  Books********************/

const booksDataPost = (books) => {
    const booksResultContainer = document.getElementById('books-result-container');
    booksResultContainer.innerHTML = "";
    let div = document.createElement('div');
    div.classList.add('d-flex');
    div.classList.add('flex-wrap');
    div.classList.add('justify-content-around');


    document.getElementById("total-book").innerText = books.length > 0 ? "Total book found: " + books.length : "Book not found!";
    books.slice(0, 30).forEach(book => {

        div.innerHTML += `
       
        <div class="card-style card m-2 col-lg-4 g-3" style="width: 18rem; box-shadow:1px 2px 10px #ffee6eaa;">
        <img style="height:200px" class="card-img-top" src="https://covers.openlibrary.org/b/id/${book?.cover_i}-M.jpg"/>
        <div class="card-body">
        <h3  class="card-text   text-danger"> ${book.title?.slice(0, 19)}</h3>
        <p  class="card-text"> Author: ${book?.author_name?.slice(0, 1)}</p>
        <p  class="card-text"> Publisher: ${book?.publisher?.slice(0, 1)}</p>
        <p  class="card-text"> Published: ${book?.publish_date?.slice(0, 1)}</span></p> 
        </div>
      </div>
        `
    });

    booksResultContainer.appendChild(div);
    toggleSpinner('none');
    toggleSearchResult('block')
    totalBookResult('block')

}


