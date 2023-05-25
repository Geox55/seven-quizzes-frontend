import React, { type MouseEventHandler } from 'react'
import { Button } from 'antd'

import './QuizzesButton.css'

export interface Props {
  className: string
  children: React.ReactNode
  onChange: MouseEventHandler<HTMLButtonElement>
  disabled: boolean
}

function QuizzesButton (
  { children, className, onChange, disabled = false }: Props
): JSX.Element {
  return (<Button className={`button ${disabled ? `card_button_disabled ${className}` : `${className}`}`}
                  onClick={onChange as MouseEventHandler} disabled={disabled}> {children} </Button>)
}

export default QuizzesButton
