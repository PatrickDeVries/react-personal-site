import styled from 'styled-components'
import '../particlematerial'
import { Theme } from '../ThemeContext'

export const BgCanvas = styled.div<{ theme: Theme }>`
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  background-image: ${({ theme }) =>
    `linear-gradient(168deg, ${theme.background}, ${theme.strongHighlight})`};
`

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
`
