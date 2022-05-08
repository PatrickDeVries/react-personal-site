import { createGlobalStyle } from 'styled-components'

export const Global = createGlobalStyle`
  html {
    font-size: 12px;
    font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell,
    Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
    color: ${({ theme }) => theme.text};
  }

  input {
    font-size: inherit;
    color: inherit;
  }

  *, *::before, *::after  {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  transition: background-color 100ms ease-out, color 100ms ease;
}
`
