//function to get all films
let displayedFilm;
let films = getAllFilms();
console.log("films", films);
function getAllFilms() {
  return fetch("http://localhost:3000/films")
    .then((res) => res.json())
    .then((filmData) => renderOneFilm(filmData));
}
//function to create render one FILM
function renderOneFilm(films) {
  console.log(films);
  let filmList = "";
  films.forEach((film) => {
    filmList += appendItemOnList(film);
  });
  document.getElementById("filmTitle").innerHTML = filmList;
}

function appendItemOnList(film) {
  let filmList = `<li class="list-group-item" onclick="getOneFilm(${film.id})"><a >${film.title} </a></li> `;
  return filmList;
}

function getOneFilm(id) {
  console.log("film id", id);
  let url = "http://localhost:3000/films/" + id;
  fetch(url)
    .then((res) => res.json())
    .then((filmData) => dataForEach(filmData));
}
function dataForEach(filmData) {
  console.log(filmData);
  displayedFilm = filmData;
  let details = `<div class="card" style="width: 30rem;">
  <img src=${filmData.poster} class="card-img-top" alt="...">
  <div class="card-body">
  
    <table class="table table-borderless">
      <tbody>
        <tr>
          <th scope="row">1</th>
          <td>Movie title</td>
          <td>${filmData.title}</td>
          
        </tr>
        
        <tr>
          <th scope="row">2</th>
          <td>Runtime(minutes)</td>
          <td>${filmData.runtime}</td>
          
        </tr>
        <tr>
          <th scope="row">3</th>
          <td>Capacity</td>
          <td>${filmData.capacity}</td>
          
        </tr>
        <tr>
          <th scope="row">4</th>
          <td>Showtime</td>
          <td>${filmData.showtime}</td>
          
        </tr>
        <tr>
          <th scope="row">5</th>
          <td>Tickets sold</td>
          <td>${filmData.tickets_sold}</td>
          
        </tr>
        <tr>
          <th scope="row">6</th>
          <td>Description</td>
          <td>${filmData.description}"</td>
          
        </tr>
      </tbody>
    </table>
    <a id="ticket-button" onclick="buyTickets(${filmData.capacity})" class="btn btn-primary">Buy ticket</a>
    <span id="errorMessage"> </span>
    
  </div>
</div>`;
  document.getElementById("filmDetails").innerHTML = details;
}

function buyTickets(filmData) {
  console.log("ticket purchased", filmData);

  if (displayedFilm.capacity<= displayedFilm.tickets_sold) {
    document.getElementById("errorMessage").innerHTML = "Tickets sold out";
  } else {
    displayedFilm.tickets_sold ++;
  }
  dataForEach(displayedFilm);
}