fetch("JSON/health-news-data.json")

.then(response => response.json())

.then(data => {

    const container = document.getElementById("news-container");

    // FEATURED NEWS

    container.innerHTML += `

        <div class="line"></div>

        <div class="featured-news">

            <img src="${data[0].image}">

            <div class="featured-content">

                <h2>${data[0].title}</h2>

                <p>${data[0].description}</p>

            </div>

        </div>

        <div class="line"></div>

        <div class="news-grid" id="small-news"></div>

    `;

    // SMALL NEWS

    const smallNews = document.getElementById("small-news");

    for(let i = 1; i < data.length; i++){

        smallNews.innerHTML += `

            <div class="news-card">

                <img src="${data[i].image}">

                <h2>${data[i].title}</h2>

            </div>

        `;
    }

})

.catch(error => {

    console.log(error);

});