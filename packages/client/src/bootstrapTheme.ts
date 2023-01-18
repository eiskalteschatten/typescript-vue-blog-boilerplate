type Theme = 'light' | 'dark' | 'auto';

export const storedTheme: Theme = localStorage.getItem('theme') as Theme || 'auto'

export const getPreferredTheme = (): Theme => {
  if (storedTheme) {
    return storedTheme
  }

  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

export const setTheme = (theme: Theme = 'light') => {
  if (theme === 'auto' && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    document.documentElement.setAttribute('data-bs-theme', 'dark')
  }
  else {
    document.documentElement.setAttribute('data-bs-theme', theme)
  }
}

setTheme(getPreferredTheme())

window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
  setTheme(getPreferredTheme())
})
