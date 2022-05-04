import { InputHTMLAttributes } from 'react'

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  type: 'checkbox' | 'date' | 'number' | 'radio' | 'search' | 'text'
  label?: string
  variant?: 'outline' | 'fill'
}
