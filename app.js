import data from "./data.json" assert { type: "json" };

const content = document.querySelector(".content");

const allBtn = document.querySelector(".allBtn");
const recomendedBtn = document.querySelector(".recomendedBtn");

const watchList = document.querySelector(".watch_list");
const watchListText = document.querySelector(".watch_list_text");

let dailyWatchList = [];



//console.log(data);

class UI {
  static displayAllMovies = () => {
    content.innerHTML = "";
    data.forEach((movie) => UI.listMovies(movie));
    logWatchBtns();
  };

  static displayRecomendedMovies = () => {
    content.innerHTML = "";
    data.forEach((movie) => {
      let rate = movie.imdbRating;
      if (rate > 7) {
        UI.listMovies(movie);
        logWatchBtns();
      }
    });
  };

  static listMovies = (movie) => {
    content.innerHTML += `<div class="card col-md-3 col-sm-12 m-3">
                            <div class="m-3">
                              <h3>${movie.title}</h3>
                              <h4>${movie.year}</h4>
                              <h5>${movie.genres}</h5>
                            </div>
    
                            <div class="dropdown">
                              <button data-id="${movie.id}" class="btn btn-primary watchBtn dropdown-toggle m-4" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                              Add to Watch List
                              </button>
                              <ul class="dropdown-menu bg-secondary">
                                <li><a class="dropdown-item" href="#">Monday</a></li>
                                <li><a class="dropdown-item" href="#">Thuesday</a></li>
                                <li><a class="dropdown-item" href="#">Wednesday</a></li>
                                <li><a class="dropdown-item" href="#">Thursday</a></li>
                                <li><a class="dropdown-item" href="#">Friday</a></li>
                                <li><a class="dropdown-item" href="#">Saturday</a></li>
                                <li><a class="dropdown-item" href="#">Sunday</a></li>
                              </ul>
                            </div>`;
  };
}

class WatchList {
  static addToWatch = (e) => {
    let id = e.target.dataset.id;

    let movie = data.filter((movie) => movie.id == id)[0];
    console.log(movie);

    if (!dailyWatchList.includes(movie)) {
      dailyWatchList.push(movie);
    }

    console.log(dailyWatchList);

    watchList.innerHTML = "";

    dailyWatchList.forEach((movie) => {
      watchList.innerHTML += `<h3>${movie.title}</h3>`;
    });

    watchListText.style.display = "block";
  };
}

UI.displayAllMovies();
allBtn.onclick = UI.displayAllMovies.bind(UI);
recomendedBtn.onclick = UI.displayRecomendedMovies.bind(UI);

const logWatchBtns = () => {
      let watchBtns = document.querySelectorAll(".watchBtn");
      watchBtns.forEach((btn) => {
        btn.onclick = WatchList.addToWatch.bind(WatchList);
      });
};





