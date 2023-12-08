const imageContainer = document.querySelectorAll('.gradeContainer__image');
const formContainer = document.querySelector('.formContainer');
const nutmegGrade = document.querySelector('.nutmegGrade');

const quoteAnimation = () => {
    imageContainer.forEach((image, i, arr) => image.addEventListener('click', function (e) {
        //De-select the unpicked grade / matching strategy
        const arrNodeList = Object.values(arr).filter((val) => val !== image);

        //Add effect to the unpicked grade
        arrNodeList.forEach(el => {
            image.classList.remove('capture')
            el.classList.add('capture')
        });

        // formContainer.classList.remove('displayNone');
        formContainer.style.display = 'grid';

        //Select the picked grade
        const alt = e.target.getAttribute('alt')
        if (!alt) return;
        nutmegGrade.textContent = `${alt}`
    }));
}

quoteAnimation();