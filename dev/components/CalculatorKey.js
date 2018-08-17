import { h } from 'composi'

export function CalculatorKey({ onClick, className, keyValue}) {
  return (
    <button onclick={onClick} class={`calculator-key ${className}`}>{keyValue}</button>
  )
}