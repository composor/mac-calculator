import {h, mount, Component} from 'composi'
import {Title} from './components/Title'
import Calculator from './components/Calculator'

mount(<Title/>, 'header')

const calculator = new Calculator()
window['calculator'] = calculator
