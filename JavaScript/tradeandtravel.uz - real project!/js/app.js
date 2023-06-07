const loader = document.querySelector('.loader')
setTimeout(() => {
  setTimeout(() => {
    loader.style.opacity = '0'
  }, 1200)
  loader.style.display = 'none'
}, 2000);