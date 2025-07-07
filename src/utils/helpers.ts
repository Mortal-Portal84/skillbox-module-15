export const validateTypedText = (e: Event) => {
  const target = e.target as HTMLInputElement
  target.value = target.value.replace(/[^a-zA-Zа-яА-ЯёЁ0-9_.-]/g, '')
}
