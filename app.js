import data from "./data.json" assert { type: "json" };

const content = document.querySelector(".content");

const allBtn = document.querySelector(".allBtn");
const recomendedBtn = document.querySelector(".recomendedBtn");

const watchList = document.querySelector(".watch_list");
const watchListText = document.querySelector(".watch_list_text");

const downloadCsvBtn = document.querySelector(".downloadCsv");

const searchInput = document.querySelector(".search_input");

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
    content.innerHTML += `<div class="card col-md-3 col-sm-12 m-3 bg-light">
                            <div class="m-3">
                                <div>
                                  <h3>${movie.title}</h3>
                                  <h4>${movie.year}</h4>
                                  <h5>${movie.genres}</h5>
                                </div>

                                <div>
                                  <button data-id="${movie.id}" class="btn watchBtn btn-primary">Add to Watch List</button>
                                </div>
                              </div>
                            </div>`;
  };

  static searchMovies = (e) => {
    content.innerHTML = "";
    let value = e.target.value;
    data.forEach((movie) => {
      let title = movie.title;
      if (title.toLocaleLowerCase().includes(value.toLocaleLowerCase())) {
        UI.listMovies(movie);
        let watchBtns = document.querySelectorAll(".watchBtn");
        watchBtns.forEach((btn) => {
          btn.onclick = WatchList.addToWatch.bind(WatchList);
        });
      }
    });
  }
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

  static downloadCsv = () => {
    let csv = "";
    dailyWatchList.forEach((movie) => {
      csv += movie.title + "\n";
    });

    let myBlob = new Blob([csv], {type: "text/csv"});
    let url = window.URL.createObjectURL(myBlob);
    let anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "demo.csv";

    anchor.click();
    window.URL.revokeObjectURL(url);
    anchor.remove();
  }

  static chooseDay = () => {
    console.log("clicked");
  };
}

UI.displayAllMovies();
allBtn.onclick = UI.displayAllMovies.bind(UI);
recomendedBtn.onclick = UI.displayRecomendedMovies.bind(UI);
downloadCsvBtn.onclick = WatchList.downloadCsv.bind(WatchList);
searchInput.oninput = UI.searchMovies.bind(UI);
