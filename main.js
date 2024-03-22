
let container = document.querySelector(".movie-container")
const form = document.querySelector(".search")

initialStart()

form.addEventListener("submit",(e)=>{
    e.preventDefault()
    const searchValue = document.querySelector(".search-movie").value
    if(searchValue){
            console.log(searchValue)
            fetch(`https://www.omdbapi.com/?apikey=709f6671&plot=full&s=${searchValue}`)
            .then(res => res.json())
            .then(movies => {
                    if(movies.Response==='False'){
                       container.innerHTML=`Movie not Found`
                    }
                   else{

                       placingHtml(movies)
                   }
            
            })
    } else {
        container.innerHTML = "Enter something to search";
    }
})

function placingHtml(movies){
        let html =""
        for(let movie of movies.Search){
            fetch(`https://www.omdbapi.com/?apikey=709f6671&t=${movie.Title}`)
            .then(res => res.json())
            .then(movie => {
                console.log(movie)
                console.log(movie.Plot.length)
                html +=`

                <div class="movie">
                <div class="movie-img-container">
                    <img src="${movie.Poster}" class="movie-img">
                </div>
                <div class="movie-info-container">
                    <div class="title-and-rating">
                        <strong>${movie.Title}</strong>
                        <i class="fa-solid fa-star"></i>
                        <small>${movie.imdbRating}</small>
                    </div>
                    <div class="duration-and-type">
                        <div>
                            <small>${movie.Runtime}</small>
                        </div>
                        <div class="type">
                            <small>
                                  ${movie.Genre}
                            </small>
                        </div>
                        <div class="watch-list" data-movie="${movie.imdbID}">
                        <a href="#"> 
                        <i class="fa-solid fa-circle-plus"></i>
                            <label for="">Watchlist</label>
                        </a>  
                        </div>
                    </div>
                    <div class="description">
                        <p>${(movie.Plot.length <132)?movie.Plot:movie.Plot.slice(0,130)+`<a href="#">...Read more</a>`}</p>
                    </div>
                </div>
            </div>
                <hr>
                `
                container.innerHTML=html
            })
        }     
}

let moviesInWatchlist =[]
document.addEventListener("click", (e) => {
    const closestDiv = e.target.closest("div")
    if (closestDiv && closestDiv.dataset.movie) {
        if(moviesInWatchlist.includes(closestDiv.dataset.movie)){
            movieExist()
        }else{
            moviesInWatchlist.unshift(closestDiv.dataset.movie);
            localStorage.setItem("movies", JSON.stringify(moviesInWatchlist))
            movieAdded()
        }

    }
    if(closestDiv && closestDiv.dataset.mode){
        console.log(e.target.closest("div").dataset.mode)
        container.classList.toggle("color")
    }
  
})


function movieAdded(){
    Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Added!',
        showConfirmButton: false,
        timer: 1500
    })
}


function movieExist(){
    Swal.fire({
        position: 'center',
        icon: 'warning',
        title: 'Movie already exist!',
        showConfirmButton: false,
        timer: 1500
    })
}

function initialStart(){
    container.innerHTML =`
    <div class="no-movies">
        <div> <img src="images/explore-move.png" ></div>
        <b>Start exploring</b>
    </div>`
}

