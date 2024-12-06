async function fetchNews() {
    const apiUrl = 'https://f1-motorsport-data.p.rapidapi.com/news';
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-host': 'f1-motorsport-data.p.rapidapi.com',
            'x-rapidapi-key': '73e12fc717mshb9d1a02a698bc14p138f57jsne7fc0ec991f6'
        }
    };

    try {
        const response = await fetch(apiUrl, options);
        const data = await response.json();

        const newsSection = document.getElementById('news-section');
        newsSection.innerHTML = '';

        const newsToShow = data.slice(0, 4);

        newsToShow.forEach((news, index) => {
            const newsCard = document.createElement('div');
            newsCard.classList.add('news-card');
            if (index > 1) {
                newsCard.classList.add('small-card');
            }

            const newsImage = document.createElement('img');
            newsImage.src = https://picsum.photos/id/237/200/300 || 'default_image_url.jpg';
            newsImage.alt = news.title;

            const newsContent = document.createElement('div');
            newsContent.classList.add('news-card-content');

            const newsTitle = document.createElement('h3');
            newsTitle.classList.add('news-card-title');
            newsTitle.textContent = news.headline;

            const newsDescription = document.createElement('p');
            newsDescription.classList.add('news-card-description');
            newsDescription.textContent = news.description;

            newsContent.appendChild(newsTitle);
            newsContent.appendChild(newsDescription);
            newsCard.appendChild(newsImage);
            newsCard.appendChild(newsContent);

            newsSection.appendChild(newsCard);
        });
    } catch (error) {
        console.error('Error al obtener las noticias:', error);
    }
}

window.onload = fetchNews;
