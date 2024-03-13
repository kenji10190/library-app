const config = {
    url: "https://openlibrary.org/api/books?jscmd=data&format=json&bibkeys=ISBN:",
    parentId: "book-cards",
    searchBtnId: "isbn-search-btn",
    searchInputId: "isbn-search",
}

let searchBtn = document.getElementById(config.searchBtnId);
searchBtn.addEventListener("click", function(){
    const bookCards = document.getElementById(config.parentId);

    let isbn = document.getElementById(config.searchInputId).value;
    fetch(config.url + isbn).then(response=>response.json()).then(function(data){
        console.log(data);

        if (Object.keys(data).length === 0) bookCards.innerHTML = `<h2>Not Found</h2>`;
        else {
            for (book in data){
                bookCards.innerHTML = "";
                bookCards.append(generateBookCard(data[book]));
            }
        }
    });
});

function generateBookCard(book){
    let bookCard = document.createElement("div");
    bookCard.innerHTML = `
        <div class="card mb-3" style="max-width: 1000px;">
            <div class="row">
                <div class="col-md-4">
                    <img src="${book.cover.medium}" class="card-img p-3" alt="">
                </div>
                <div class="col-md-8">
                    <div class="card-body">
                        <h5 class="card-title m-0 font-weight-bold">${book.title}</h5>
                        <p class="m-0"> </p>
                        <p class="card-text pt-2 book-description">${book.by_statement}</p>
                    </div>
                </div>
            </div>
            <div class="col-10">
                <table class="table table-striped" style = "table-layout: fixed;">
                    <tbody>
                    <tr>
                        <th scope="row">Page</th>
                        <td>${book.number_of_pages}</td>
                    </tr>
                    <tr>
                        <th scope="row">Publisher</th>
                        <td>${parseDataOL(book.authors)}</td>
                    </tr>
                    <tr>
                        <th scope="row">Published Date</th>
                        <td>${book.publish_date}</td>
                    </tr>
                    <tr>
                        <th scope="row">Categories</th>
                        <td>${parseDataOL(book.subjects)}</td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
    `;

    return bookCard;
}

function parseDataOL(data){
    let parsed = "";
    for(let i = 0; i < data.length - 1; i++){
        parsed += (data[i].name + ",");
    }
    return parsed + data[data.length-1].name;
}