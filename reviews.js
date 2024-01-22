/* Function to convert dorm name to page URL
function dormNameToPage(dormName) {
    return dormName.toLowerCase().replace(/\s+/g, '_') + '.html';
} */

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

    const dormCommunityMap = {
        'bel_air_hall': 'cambridge_c',
        'cambridge_hall': 'cambridge_c',
        'chestertown_hall': 'cambridge_c',
        'cumberland_hall': 'cambridge_c',
        'centreville_hall': 'cambridge_c',
        'denton_hall': 'denton_c',
        'easton_hall': 'denton_c',
        'elkton_hall': 'denton_c',
        'ellicott_hall': 'ellicott_c',
        'hagerstown_hall': 'ellicott_c',
        'la_plata_hall': 'ellicott_c',
        'pyon-chen_hall': 'heritage_c',
        'johnson-whittle_hall': 'heritage_c',
        'oakland_hall': 'oakland_c',
        'leonardtown_hall': 'leonardtown_c',
        'leonardtown_community': 'leonardtown_c',
        'anne_arundel_hall': 'northhill_c',
        'caroline_hall': 'northhill_c',
        'carroll_hall': 'northhill_c',
        'dorchester_hall': 'northhill_c',
        'prince_frederick_hall': 'northhill_c',
        'queen_anne\'s_hall': 'northhill_c',
        'st._mary\'s_hall': 'northhill_c',
        'somerset_hall': 'northhill_c',
        'wicomico_hall': 'northhill_c',
        'worcester_hall': 'northhill_c',
        'allegany_hall': 'southhill_c',
        'baltimore_hall': 'southhill_c',
        'calvert_hall': 'southhill_c',
        'cecil_hall': 'southhill_c',
        'charles_hall': 'southhill_c',
        'frederick_hall': 'southhill_c',
        'garrett_hall': 'southhill_c',
        'harford_hall': 'southhill_c',
        'howard_hall': 'southhill_c',
        'kent_hall': 'southhill_c',
        'montgomery_hall': 'southhill_c',
        'prince_george\'s_hall': 'southhill_c',
        'talbot_hall': 'southhill_c',
        'washington_hall': 'southhill_c'
    };

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

    if (currCommunity || reviewText.value != "") {
        if (reviewText.value === "") {
            showError("review-error", "Please write a detailed review.");
            reviewText.value = '';
            return;
        }

        if (currCommunity === 'oakland_c' || currCommunity === 'leonardtown_c') {
            window.location.href = `/communities/${currCommunity}.html`;
        } else {
            window.location.href = `/communities/${currCommunity}/${dormName}.html`;
        }
    } else {
        showError("residency-error", "Please enter a valid residency (i.e. \"La Plata Hall\")");
        residencyInput.value = '';
        return false;
    }

});
