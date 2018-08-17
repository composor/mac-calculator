import { h, Component } from 'composi'
import { CalculatorDisplay } from './CalculatorDisplay'
import { CalculatorKey } from './CalculatorKey'
import { CalculatorOperations, DigitKeys } from '../utils/helper'


class Calculator extends Component {
  state = {
    value: null,
    displayValue: '0',
    operator: null,
    scale: 1,
    waitingForOperand: false
  }
  container = 'section'

  clearAll () {
    this.setState({
      value: null,
      displayValue: '0',
      operator: null,
      waitingForOperand: false
    })
  }

  clearDisplay () {
    this.setState({
      displayValue: '0'
    })
  }

  clearLastChar () {
    const { displayValue } = this.state

    this.setState({
      displayValue: displayValue.substring(0, displayValue.length - 1) || '0'
    })
  }

  toggleSign () {
    const { displayValue } = this.state
    const newValue = parseFloat(displayValue) * -1

    this.setState({
      displayValue: String(newValue)
    })
  }

  inputPercent () {
    const { displayValue } = this.state
    const currentValue = parseFloat(displayValue)

    if (currentValue === 0) { return }

    const fixedDigits = displayValue.replace(/^-?\d*\.?/, '')
    const newValue = parseFloat(displayValue) / 100

    this.setState({
      displayValue: String(newValue.toFixed(fixedDigits.length + 2))
    })
  }

  performOperation (nextOperator) {
    const { value, displayValue, operator } = this.state
    const inputValue = parseFloat(displayValue)

    if (value == null) {
      this.setState({
        value: inputValue
      })
    } else if (operator) {
      const currentValue = value || 0
      const operation = CalculatorOperations.find(item => operator == item.key)
      const newValue = operation.func(currentValue, inputValue)

      this.setState({
        value: newValue,
        displayValue: String(newValue)
      })
    }

    this.setState({
      waitingForOperand: true,
      operator: nextOperator
    })
  }

  inputDigit = digit => {
    const { displayValue, waitingForOperand } = this.state

    if (waitingForOperand) {
      this.setState({
        displayValue: String(digit),
        waitingForOperand: false
      })
    } else {
      this.setState({
        displayValue: displayValue === '0' ? String(digit) : displayValue + digit
      })
    }
  }

  inputDot = () => {
    const { displayValue, waitingForOperand } = this.state
    if (waitingForOperand) {
      this.setState({
        displayValue: '0.',
        waitingForOperand: false
      })
    } else if (!(/\./).test(displayValue)) {
      this.setState({
        displayValue: displayValue + '.',
        waitingForOperand: false
      })
    }
  }

  handleKeyDown = event => {
    let { key } = event

    if (key === 'Enter') { key = '=' }

    if ((/\d/).test(key)) {
      event.preventDefault()
      this.inputDigit(parseInt(key, 10))
    } else if (key in CalculatorOperations) {
      event.preventDefault()
      this.performOperation(key)
    } else if (key === '.') {
      event.preventDefault()
      this.inputDot()
    } else if (key === '%') {
      event.preventDefault()
      this.inputPercent()
    } else if (key === 'Backspace') {
      event.preventDefault()
      this.clearLastChar()
    } else if (key === 'Clear') {
      event.preventDefault()

      if (this.state.displayValue !== '0') {
        this.clearDisplay()
      } else {
        this.clearAll()
      }
    }
  }

  componentDidMount () {
    document.addEventListener('keydown', this.handleKeyDown)
  }

  componentWillUnmount () {
    document.removeEventListener('keydown', this.handleKeyDown)
  }

  render () {
    const { displayValue } = this.state
    const clearDisplay = displayValue !== '0'
    const clearText = clearDisplay ? 'C' : 'AC'

    return (
      <div class="calculator">
        <CalculatorDisplay value={displayValue} />
        <div class="calculator-keypad">
          <div class="input-keys">
            <div class="function-keys">
              <CalculatorKey
                className="key-clear"
                onClick={() => clearDisplay ? this.clearDisplay() : this.clearAll()}
                keyValue={ clearText }
              >
                
              </CalculatorKey>
              <CalculatorKey
                className="key-sign"
                onClick={() => this.toggleSign()}
                keyValue='±'>
                
              </CalculatorKey>
              <CalculatorKey
                className="key-percent"
                onClick={() => this.inputPercent()}
                keyValue='%'
              >
                
              </CalculatorKey>
            </div>
            <div className="digit-keys">
              {
                DigitKeys.map(number =>
                  <CalculatorKey
                    className={`key-${number}`}
                    onClick={() => this.inputDigit(number)}
                    keyValue={number}
                  >
                  </CalculatorKey>
                )
              }
              <CalculatorKey
                className="key-dot"
                onClick={this.inputDot}
                keyValue='●'
              >
                
              </CalculatorKey>
            </div>
          </div>
          <div className="operator-keys">
            {
              CalculatorOperations.map(item => (
                <CalculatorKey
                className={`key-${item.name}`}
                onClick={() => this.performOperation(item.key)}
                keyValue={item.symbol}
                >
                </CalculatorKey>
              ))
            }
          </div>
        </div>
      </div>
    )
  }
}
export default Calculator
