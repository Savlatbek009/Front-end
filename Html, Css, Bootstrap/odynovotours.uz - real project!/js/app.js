const loader = document.querySelector('.loader')
setTimeout(() => {
  setTimeout(() => {
    loader.style.opacity = '0'
  }, 500)
  loader.style.display = 'none'
}, 600);