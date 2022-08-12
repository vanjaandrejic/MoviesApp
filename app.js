import data from "./data.json" assert { type: "json" };

const content = document.querySelector(".content");

const allBtn = document.querySelector(".allBtn");
const recomendedBtn = document.querySelector(".recomendedBtn");

const watchList = document.querySelector(".watch_list");
const watchListText = document.querySelector(".watch_list_text");

let dailyWatchList = [];

class UI {
  static displayAllMovies = () => {
    content.innerHTML = "";
    data.forEach((movie) => UI.listMovies(movie));
    let watchBtns = document.querySelectorAll(".watchBtn");
    watchBtns.forEach((btn) => {
      btn.onclick = WatchList.addToWatch.bind(WatchList);
    });
  };

  static displayRecomendedMovies = () => {
    content.innerHTML = "";
    data.forEach((movie) => {
      let rate = movie.imdbRating;
      if (rate > 7) {
        UI.listMovies(movie);
        let watchBtns = document.querySelectorAll(".watchBtn");
        watchBtns.forEach((btn) => {
          btn.onclick = WatchList.addToWatch.bind(WatchList);
        });
      }
    });
  };

  static listMovies = (movie) => {
    content.innerHTML += `<div class="card col-md-3 col-sm-12 m-3">
                            <div class="m-3">
                              <h3>${movie.title}</h3>
                              <h4>${movie.year}</h4>
                              <h5>${movie.genres}</h5>

                              <button data-id="${movie.id}" class="btn watchBtn btn-primary">Add to Watch List</button>

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
      watchList.innerHTML += `<div class="d-flex align-items-center">
                
                                <h3>${movie.title}</h3>

                                <div class="dropdown">
                                  <button data-id="${movie.id}" class="btn btn-primary watchBtn dropdown-toggle m-4 btn-sm" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Choose day
                                  </button>
                                    <ul class="dropdown-menu bg-secondary day_links">
                                      <li><a id="monday" class="dropdown-item dayLink" href="#">Monday</a></li>
                                      <li><a id="thuesday" class="dropdown-item dayLink" href="#">Thuesday</a></li>
                                      <li><a id="wednesday" class="dropdown-item dayLink" href="#">Wednesday</a></li>
                                      <li><a id="thursday" class="dropdown-item dayLink" href="#">Thursday</a></li>
                                      <li><a id="friday" class="dropdown-item dayLink" href="#">Friday</a></li>
                                      <li><a id="saturday" class="dropdown-item dayLink" href="#">Saturday</a></li>
                                      <li><a id="sunday" class="dropdown-item dayLink" href="#">Sunday</a></li>
                                    </ul>
                                </div>
     
                              </div>`;
    });

    watchListText.style.display = "block";

    let dayBtns = document.querySelectorAll(".dayLink");
        dayBtns.forEach((btn) => {
          btn.onclick = WatchList.chooseDay.bind(WatchList);
        });

  };

  static chooseDay = () => {
    console.log("clicked");
  };
}

UI.displayAllMovies();
allBtn.onclick = UI.displayAllMovies.bind(UI);
recomendedBtn.onclick = UI.displayRecomendedMovies.bind(UI);
