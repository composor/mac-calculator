import {h} from 'composi'
import { getFormattedValue } from '../utils/helper'


export function CalculatorDisplay({ value }) {
  return (
    <div className="calculator-display">
      {getFormattedValue(value)}
    </div>
  )
}
