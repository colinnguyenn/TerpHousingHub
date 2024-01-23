import { dormCommunityMap, validApartments } from './valid_residencies.js';

const reviewForm = document.querySelector('.review_container form');

reviewForm.addEventListener('submit', function (event) {
    event.preventDefault();

    const residencyInput = document.querySelector('input[name="residency"]');
    const reviewText = document.querySelector('textarea[name="review"]');
    const selectedStars = document.querySelector('.rating .star.active');

    if (!selectedStars) {
        showError("rating-error", "Please submit a valid rating.");
        return;
    }

    if (reviewText.value != "") {
        const selectedRating = selectedStars.getAttribute('data-rating');

        const currentDate = new Date();
        const formattedDate = `${currentDate.getMonth() + 1}/${currentDate.getDate()}/${currentDate.getFullYear()}`;
    
        const storedReviews = JSON.parse(localStorage.getItem('storedReviews')) || [];
    
        const formData = {
            dormName: residencyInput.value,
            review: reviewText.value,
            rating: selectedRating,
            date: formattedDate,
        };
    
        storedReviews.push(formData);
    
        localStorage.setItem('storedReviews', JSON.stringify(storedReviews));
        localStorage.setItem('formData', JSON.stringify(formData));
    
        const dormSubmissionsKey = `submissions_${formData.dormName.toLowerCase()}`;    
        const dormSubmissionsCount = localStorage.getItem(dormSubmissionsKey) || 0;
        localStorage.setItem(dormSubmissionsKey, parseInt(dormSubmissionsCount) + 1);
        
    }

    const dormName = residencyInput.value.toLowerCase().replace(/\s+/g, '_');
    const apartmentName = dormName.replace(/leonardtown_hall/g, '').replace(/hall/g, 'c').replace(/community/g, 'c');

    const currCommunity = dormCommunityMap[dormName];

    function showError(errorElement, errorMessage) {
        document.querySelector("."  +errorElement).classList.add("display-error");
        document.querySelector("." +errorElement).innerHTML = errorMessage;
    }

    function clearError() {
        let errors = document.querySelectorAll(".error");
        for (let error of errors) {
            error.classList.remove("display-error");
        }
    }

    clearError();

    if (currCommunity || validApartments.includes(apartmentName) || reviewText.value != "") {
        if (reviewText.value === "") {
            showError("review-error", "Please write a detailed review.");
            reviewText.value = '';
            return;
        }

        if (validApartments.includes(apartmentName) && (dormName === 'oakland_hall' || dormName === 'leonardtown_community'
            || dormName === 'south_campus_commons')) {
                window.location.href = `/communities/${apartmentName}.html`;
        } else  if (validApartments.includes(apartmentName)) {
            window.location.href = `/apartments/${apartmentName}.html`;
        } else {
            window.location.href = `/communities/${currCommunity}/${dormName}.html`;
        }
    } else {
        showError("residency-error", "Please enter a valid residency (i.e. \"La Plata Hall\")");
        residencyInput.value = '';
        return false;
    }
});
