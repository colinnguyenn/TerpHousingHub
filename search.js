import { dormCommunityMap, validApartments } from './valid_residencies.js';

function performSearch() {
    const searchInput = document.querySelector('input[name="search"]');

    if (searchInput.value === '') {
        window.location.href = '/'
        return;
    }

    const searchName = searchInput.value.toLowerCase().replace(/\s+/g, '_');
    const apartmentName = searchName.replace(/leonardtown_hall/g, '').replace(/hall/g, 'c').replace(/community/g, 'c');

    const currCommunity = dormCommunityMap[searchName];

    if (currCommunity) {
        window.location.href = `/TerpHousingHub/communities/${currCommunity}/${searchName}.html`;
    } else if (validApartments.includes(apartmentName)) {
        window.location.href = `/TerpHousingHub/communities/${apartmentName}.html`;
    } else {
        window.location.href = 'error.html'
    }

}

document.getElementById('searchForm').addEventListener('submit', function (event) {
    event.preventDefault();

    performSearch();
});