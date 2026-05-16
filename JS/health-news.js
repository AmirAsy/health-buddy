fetch("JSON/health-news-data.json")

.then(response => response.json())

.then(data => {

    const container = document.getElementById("news-container");

    // FEATURED NEWS

    container.innerHTML += `

        <div class="line"></div>

        <div class="featured-news">

            <a href="${data[0].articleLink}" target="_blank" rel="noopener noreferrer">
                <img src="${data[0].image}" alt="${data[0].title}">
            </a>

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

                <a href="${data[i].articleLink}" target="_blank" rel="noopener noreferrer">
                    <img src="${data[i].image}" alt="${data[i].title}">
                </a>

                <a href="${data[i].articleLink}" target="_blank" rel="noopener noreferrer">
                    <h2>${data[i].title}</h2>
                </a>

            </div>

        `;
    }

})

.catch(error => {

    console.log(error);

});