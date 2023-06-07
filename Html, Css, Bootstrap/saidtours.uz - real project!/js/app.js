const loader = document.querySelector('.loader')
setTimeout(() => {
  setTimeout(() => {
    loader.style.opacity = '0'
  }, 1000)
  loader.style.display = 'none'
}, 1500);