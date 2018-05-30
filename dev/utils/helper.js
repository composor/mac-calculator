export const DigitKeys = [7, 8, 9, 4, 5, 6, 1, 2, 3, 0]

export const CalculatorOperations = [
  {
    key: '/',
    name: 'divide',
    symbol: '÷',
    func: (prevValue, nextValue) => prevValue / nextValue
  },
  {
    key: '*',
    name: 'multiply',
    symbol: '×',
    func: (prevValue, nextValue) => prevValue * nextValue
  },
  {
    key: '-',
    name: 'subtract',
    symbol: '−',
    func: (prevValue, nextValue) => prevValue - nextValue
  },
  {
    key: '+',
    name: 'add',
    symbol: '+',
    func: (prevValue, nextValue) => prevValue + nextValue
  },
  {
    key: '=',
    name: 'equals',
    symbol: '=',
    func: (prevValue, nextValue) => nextValue
  }
]

export const getFormattedValue = value => {
  const language = navigator.language || 'en-US'

  let formattedValue = parseFloat(value).toLocaleString(language, {
    useGrouping: true,
    maximumFractionDigits: 6
  })

  const match = value.match(/\.\d*?(0*)$/)

  if (match) { formattedValue += (/[1-9]/).test(match[0]) ? match[1] : match[0] }

  return formattedValue.length >= 14 ? String(parseFloat(value).toExponential()) : formattedValue
}
