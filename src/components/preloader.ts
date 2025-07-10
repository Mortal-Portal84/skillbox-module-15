const renderLoader = () => {
  const preloader = document.createElement('div')
  preloader.className = 'preloader'

  for (let i = 1; i <= 2; i++) {
    const div = document.createElement('div')
    preloader.append(div)
  }

  return preloader
}

export default renderLoader
