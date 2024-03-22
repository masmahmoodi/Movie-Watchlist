
let container = document.querySelector(".my-watchlist")

document.addEventListener("DOMContentLoaded", ()=> {
    // localStorage.clear()
    if(JSON.parse(localStorage.getItem("movies")).length >0){

        const myarray = JSON.parse(localStorage.getItem('movies'))
        let html =""
       for(let i =0;i<myarray.length;i++){
            fetch(`https://www.omdbapi.com/?apikey=709f6671&i=${myarray[i]}`)
            .then(res=>res.json())
            .then(movie =>{
                html +=`
    
                    <div class="movie" >
                    <div class="movie-img-container">
                        <img src="${movie.Poster}" class="movie-img">
                    </div>
                    <div class="movie-info-container">
                        <div class="title-and-rating">
                            <strong>${movie.Title}</strong>
                            <div><i class="fa-solid fa-star"></i></div>
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
                            <div class="watch-list" data-remove="${movie.imdbID}">
                              <a href="#"> 
                                <i class="fa-solid fa-circle-minus"></i>
                                <label for="">Remove</label>
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

       document.addEventListener("click", (e) => {
        const closestDiv = e.target.closest("div");
        if (closestDiv && closestDiv.dataset.remove) {
            console.log(typeof closestDiv.dataset.remove)
            let myArray = JSON.parse(localStorage.getItem('movies'))
            const indexToRemove = myArray.indexOf(closestDiv.dataset.remove)
            myArray.splice(indexToRemove, 1)
            localStorage.setItem('movies', JSON.stringify(myArray))
            e.target.closest(".movie").remove()
                movieRemoved()
        }

    })
  
      
    }else{
        container.innerHTML=`
        <div class="no-movies">
           <b>Your watchlist is looking little empty...</b>
            <div>
                <a href="index.html">
                    <i class="fa-solid fa-circle-plus"></i>
                    <label for="">Let's add some movies!</label>
                </a>
            <div>
        </div>`
    }
})


function movieRemoved() {
    Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Removed!',
        showConfirmButton: false,
        timer: 1500
    })
   
}


// document.querySelector(".mode").addEventListener("click",(e)=>{
   
// })