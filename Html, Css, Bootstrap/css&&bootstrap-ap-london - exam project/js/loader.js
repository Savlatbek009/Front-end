const loader = document.querySelector(".loader").style.display = 'none';
setTimeout(() => {
    setTimeout(() => {
        loader.style.display = 'none'

    }, 600);
    loader.style.opacity = '0'
}, 1000);
