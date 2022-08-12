import data from "./data.json" assert { type: "json" };

const content = document.querySelector(".content");

const allBtn = document.querySelector(".allBtn");
const recomendedBtn = document.querySelector(".recomendedBtn");

console.log(data);

class UI {
    static displayAllMovies = () => {
        content.innerHTML = "";
        data.forEach((movie) => UI.listMovies(movie));
    };

    static listMovies = (movie) => {
        content.innerHTML += `<div class="card col-md-3 col-sm-12 m-3">
                            <div class="m-3">
                              <h3>${movie.title}</h3>
                              <h4>${movie.year}</h4>
                              <h5>${movie.genres}</h5>
                            </div>
              
                            <button data-id="${movie.id}" class="btn btn-primary watchBtn mt-4">Add to Watch List</button>`
    }
}

UI.displayAllMovies();