
app_id = 'a74c3b0a'
app_key = '0e2dbdc07241f63abca5bbefb290fe56'
let searchBtn = document.getElementById("searchBtn")
let searchResult = document.getElementById("searchResult")
let searchInput = document.getElementById("search-input")
let form = document.querySelector('form')
let query = ""
let clearTime = 0
let i = document.getElementById("i")


i.addEventListener('click',(e)=>{
 e.preventDefault()
 searchResult.innerHTML = "";
 searchInput.value = ""
 
})
form.addEventListener('keyup',(e) =>{
    
       clearTimeout(clearTime);
        clearTime = setTimeout(() => { 
        let value = form.querySelector("input").value;
        fetchAPI(value)
       },1000);
  
})

form.addEventListener('submit',(e) => {
    e.preventDefault()
     let query = form.firstElementChild.value;

     fetchAPI()
     searchInput.value = ""
})


async function fetchAPI(){
    let value = form.querySelector("input").value;
    let result = ''
    let url = `https://api.edamam.com/search?q=${value||query}&app_id=${app_id}&app_key=${app_key}&to=20`;
    const response = await fetch(url);
    const data = await response.json()
    console.log(data)
      return data.hits.map(items => {
        result += 
        `
        <div class="card" data-aos="fade-left">
                    <div id="image">
                        <img src="${items.recipe.image}" alt="">
                    </div>
                    
                    <div id="content">
                        <div>
                        <h3>Recipe:${items.recipe.label}</h3>
                        <p>Calories: ${Math.floor(items.recipe.calories)}</p>
                        <p>Diet:${items.recipe.dietLabels > 0 ?items.recipe.dietLabels:"No Data Available"}</p>
                        <p>Health Label:${items.recipe.healthLabels.slice(0,6)}</p>
                        </div>
                        

                        <div id="link">
                            <a href="${items.recipe.url}" target="_blank">View More</a>
                        </div>
                       
        
                    </div>
                </div>
        `
        searchResult.innerHTML = result;
    })

}


