// news.js

document.addEventListener('DOMContentLoaded', function () {
    const apiKey = '363f692f02554663a336082a4ecdfe9b';
    const country = 'in'; // Country code for India

    fetchNews('business-india', 'Top Business Headlines - India', 'business');

    // You can add more sections as needed

    function fetchNews(sectionId, sectionTitle, category) {
        const newsContainer = document.querySelector('.news-section');

        https://newsapi.org/v2/top-headlines?country=in&category=business&apiKey=363f692f02554663a336082a4ecdfe9b

        fetch(`https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${apiKey}`)
            .then(response => response.json())
            .then(data => {
                const articles = data.articles;

                if (!articles || articles.length === 0) {
                    throw new Error('No articles available.');
                }

                const section = document.createElement('div');
                section.innerHTML = `
                    <h2>${sectionTitle}</h2>
                    <ul>
                        ${articles.map(article => `<li><a href="${article.url}" target="_blank">${article.title}</a></li>`).join('')}
                    </ul>
                `;

                newsContainer.appendChild(section);
            })
            .catch(error => {
                console.error('Error fetching news:', error);
                newsContainer.innerHTML = 'Failed to fetch news. Please try again later.';
            });
    }
});
