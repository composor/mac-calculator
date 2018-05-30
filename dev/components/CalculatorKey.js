import {h} from 'composi'

export function CalculatorKey({ onClick, className, keyValue}) {
  return (
    <button onClick={onClick} className={`calculator-key ${className}`}>{keyValue}</button>
  )
}