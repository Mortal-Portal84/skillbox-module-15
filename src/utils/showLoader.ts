import renderLoader from '../components/preloader.ts'

export const showLoader = (
  container: HTMLElement,
  callback: () => void,
  delay: number = 1800
) => {
  const loader = renderLoader()

  container.replaceChildren()

  container.append(loader)

  setTimeout(() => {
    container.replaceChildren()
    callback()
  }, delay)
}
