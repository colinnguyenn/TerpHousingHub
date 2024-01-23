const storedData = JSON.parse(localStorage.getItem('storedReviews'));
const newForm = JSON.parse(localStorage.getItem('formData'));

console.log(newForm);


/* Increments review counter */
document.addEventListener('DOMContentLoaded', function () {
    const dormContainers = document.querySelectorAll('.dorm_container');

    dormContainers.forEach(container => {
        const dormName = container.dataset.dormName.toLowerCase();
        const dormSubmissionsKey = `submissions_${dormName}`;
        const dormSubmissionsCount = localStorage.getItem(dormSubmissionsKey) || 0;

        const reviewsElement = container.querySelector('[data-dorm-reviews]');
        if (reviewsElement) {
            reviewsElement.textContent = dormSubmissionsCount;
        }
    });
});

/* Creates Review */
document.addEventListener('DOMContentLoaded', function () {
    const storedReviews = JSON.parse(localStorage.getItem('storedReviews')) || [];
    const newForm = JSON.parse(localStorage.getItem('formData'));

    const reviewsByDorm = {};

    storedReviews.forEach(formData => {
        const dormName = formData.dormName
        .toLowerCase()
        .replace(/\s+/g, '_')      
        .replace(/'/g, "\\'")      
        .replace(/\./g, '\\.\\');   

        if (!reviewsByDorm[dormName]) {
            reviewsByDorm[dormName] = [];
        }

        reviewsByDorm[dormName].push(formData);
    });

    Object.keys(reviewsByDorm).forEach(dormName => {
        const dormReviews = reviewsByDorm[dormName];
        console.log(dormReviews);

        const averageRating = calculateAverageRating(dormReviews);
        console.log(dormName);

        const averageRatingElement = document.querySelector(`.${dormName}_average_rating`)
        
        if (averageRatingElement) {
            averageRatingElement.textContent = `${averageRating.toFixed(2)}`;
        }

        displayAverageRatingStars(dormName, averageRating, dormReviews.length);

        const reviewContainer = document.querySelector(`.${dormName}_list_reviews`);

        if (reviewContainer) {
            dormReviews.forEach(formData => {
                createReviewContainer(reviewContainer, formData);
            });
        }
    });
});

/* Display average stars */
function displayAverageRatingStars(dormName, averageRating) {
    const starContainers = document.querySelectorAll(`.${dormName}_average_star`);

    starContainers.forEach(starContainer => {
        if (starContainer) {
            starContainer.innerHTML = generateStarIcons(averageRating);
        }
    });
}

/* Generate average stars */
function generateStarIcons(averageRating) {
    const fullStars = Math.floor(averageRating);
    const hasHalfStar = averageRating % 1 !== 0;

    const starIcons = [];

    /* Generate all full stars */
    for (let i = 1; i <= fullStars; i++) {
        starIcons.push('<i class="bx bxs-star"></i>');
    }

    if (hasHalfStar) {
        starIcons.push('<i class="bx bxs-star-half"></i>');
    }

    const remainingEmptyStars = 5 - starIcons.length;
    for (let i = 1; i <= remainingEmptyStars; i++) {
        starIcons.push('<i class="bx bx-star"></i>');
    }

    return starIcons.join('');
}

/* Calculate average rating */
function calculateAverageRating(reviews) {
    if (reviews.length === 0) {
        return 0;
    }

    const totalRating = reviews.reduce((sum, review) => sum + parseFloat(review.rating), 0);
    return totalRating / reviews.length;
}

function createReviewContainer(container, formData) {
    const newReviewContainer = document.createElement('div');
    newReviewContainer.className = 'review_container';

    const detailsContainer = document.createElement('div');
    detailsContainer.className = 'details';

    const nameElement = document.createElement('div');
    nameElement.className = 'name';
    nameElement.textContent = 'Anonymous';

    const ratingElement = document.createElement('div');
    ratingElement.className = 'rating';
    ratingElement.innerHTML = createStars(formData.rating);

    const dateElement = document.createElement('div');
    dateElement.className = 'date_of_review';
    dateElement.textContent = formData.date;

    const writtenContainer = document.createElement('div');
    writtenContainer.className = 'written_review';
    writtenContainer.textContent = formData.review;

    detailsContainer.appendChild(nameElement);
    detailsContainer.appendChild(ratingElement);
    detailsContainer.appendChild(dateElement);

    newReviewContainer.appendChild(detailsContainer);
    newReviewContainer.appendChild(writtenContainer);

    container.appendChild(newReviewContainer);
}

function createStars(rating) {
    const starElements = [];
    for (let i = 1; i <= 5; i++) {
        const starIcon = document.createElement('i');
        starIcon.className = `bx ${i <= rating ? 'bxs-star' : 'bx-star'} star`;
        starElements.push(starIcon);
    }

    return starElements.map(star => star.outerHTML).join('')
}

document.addEventListener('DOMContentLoaded', function() {
    const storedReviews = JSON.parse(localStorage.getItem('storedReviews')) || [];
    const newForm = JSON.parse(localStorage.getItem('formData'));

});

/* Clears Website */
//localStorage.clear();



