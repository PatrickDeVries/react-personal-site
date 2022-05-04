import React from 'react'
import { InputProps } from '../../types/input'
import Checkbox from './checkbox'
import Text from './text'

const inputs = {
  checkbox: Checkbox,
  text: Text,
}

const Input: React.FC<InputProps> = ({ type, ...props }) =>
  React.createElement(inputs[type ?? 'text'], {
    type: type,
    ...props,
  })

export default Input
