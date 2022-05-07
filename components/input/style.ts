import styled, { css } from 'styled-components'
import { InputProps } from '../../types/input'

export const OUTLINE_WIDTH = `0.1em`

export const TEXT_FIELD = css<InputProps>`
  appearance: none;
  padding: 0.5em 0.75em;
  font: inherit;
  box-sizing: border-box;

  background-color: ${({ variant, color, theme }) =>
    variant === 'fill' ? color : theme.backgroundHighlight};
  border-radius: calc(1em / 3);
  border: ${({ variant }) => (variant === 'outline' ? OUTLINE_WIDTH : '0')} solid
    ${({ color }) => color};
  outline: none;

  color: ${({ theme }) => theme.text};

  &:focus-within {
    border-color: ${({ theme }) => theme.focus};
  }
`

export const TextLabel = styled.label`
  display: flex;
  flex-direction: column;
  gap: 0.5em;
  text-indent: calc(${OUTLINE_WIDTH} + 0.75em);
`

export const ToggleLabel = styled.label<{ disabled?: boolean }>`
  display: flex;
  gap: 1em;
  align-items: center;
  user-select: none;
  ${({ disabled }) =>
    disabled &&
    css`
      cursor: pointer;
    `}

  input {
    cursor: inherit;
  }
`
