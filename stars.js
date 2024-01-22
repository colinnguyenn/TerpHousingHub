const allStar = document.querySelectorAll('.rating .star')

let click = 1;

allStar.forEach((item, idx) => {
    item.addEventListener('click', function () {
        allStar.forEach((i, iIdx) => {
            i.classList.replace('bxs-star', 'bx-star');
            i.classList.remove('active');
        });

        for (let i = 0; i <= idx; i++) {
            allStar[i].classList.replace('bx-star', 'bxs-star');
            allStar[i].classList.add('active');
            allStar[i].setAttribute('data-rating', idx + 1);
        }

        click = idx + 1;
    });
});
