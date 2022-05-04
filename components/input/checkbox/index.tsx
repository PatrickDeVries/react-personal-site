import React from 'react'
import { InputProps } from '../../../types/input'
import { ToggleLabel } from '../style'
import { CheckboxInput } from './style'

const Checkbox: React.FC<InputProps> = props => (
  <ToggleLabel>
    <CheckboxInput {...props} />
    {props.label ?? ''}
  </ToggleLabel>
)

export default Checkbox
