import React, { useState } from 'react';
import { Heart, Sparkles } from 'lucide-react';

export default function KawaiiCalculator() {
  const [display, setDisplay] = useState('0');
  const [prevValue, setPrevValue] = useState(null);
  const [operation, setOperation] = useState(null);
  const [newNumber, setNewNumber] = useState(true);
  const [expression, setExpression] = useState('');

  const handleNumber = (num) => {
    if (newNumber) {
      setDisplay(num);
      setNewNumber(false);
    } else {
      setDisplay(display === '0' ? num : display + num);
    }
  };

  const handleOperation = (op) => {
    const current = parseFloat(display);
    
    if (prevValue === null) {
      setPrevValue(current);
      setExpression(`${current} ${op}`);
    } else if (operation) {
      const result = calculate(prevValue, current, operation);
      setDisplay(String(result));
      setPrevValue(result);
      setExpression(`${result} ${op}`);
    }
    
    setOperation(op);
    setNewNumber(true);
  };

  const calculate = (a, b, op) => {
    switch(op) {
      case '+': return a + b;
      case '-': return a - b;
      case '×': return a * b;
      case '÷': return b !== 0 ? a / b : 'Error';
      default: return b;
    }
  };

  const handleEquals = () => {
    if (operation && prevValue !== null) {
      const current = parseFloat(display);
      const result = calculate(prevValue, current, operation);
      setDisplay(String(result));
      setExpression(`${prevValue} ${operation} ${current} =`);
      setPrevValue(null);
      setOperation(null);
      setNewNumber(true);
    }
  };

  const handleClear = () => {
    setDisplay('0');
    setPrevValue(null);
    setOperation(null);
    setNewNumber(true);
    setExpression('');
  };

  const handleDecimal = () => {
    if (!display.includes('.')) {
      setDisplay(display + '.');
      setNewNumber(false);
    }
  };

  const Button = ({ children, onClick, className = '', variant = 'default' }) => {
    const baseStyle = 'text-xl font-bold rounded-2xl transition-all duration-200 active:scale-95 shadow-lg';
    const variants = {
      default: 'bg-gradient-to-br from-pink-200 to-pink-300 hover:from-pink-300 hover:to-pink-400 text-pink-800',
      operation: 'bg-gradient-to-br from-purple-300 to-purple-400 hover:from-purple-400 hover:to-purple-500 text-white',
      equals: 'bg-gradient-to-br from-rose-400 to-pink-500 hover:from-rose-500 hover:to-pink-600 text-white',
      clear: 'bg-gradient-to-br from-red-300 to-red-400 hover:from-red-400 hover:to-red-500 text-white'
    };
    
    return (
      <button
        onClick={onClick}
        className={`${baseStyle} ${variants[variant]} ${className}`}
      >
        {children}
      </button>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100 flex items-center justify-center p-4">
      <div className="relative">
        {/* Decoraciones flotantes */}
        <Sparkles className="absolute -top-8 -left-8 text-yellow-400 animate-pulse" size={32} />
        <Heart className="absolute -top-6 -right-6 text-pink-400 animate-bounce" size={28} />
        <Sparkles className="absolute -bottom-6 -right-8 text-purple-400 animate-pulse" size={24} />
        
        {/* Calculadora */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 w-80 border-4 border-pink-200">
          {/* Carita kawaii */}
          <div className="text-center mb-4">
            {/* <div className="text-6xl mb-2">ฅ^•ﻌ•^ฅ</div> */}
            <div className="text-pink-500 font-bold text-lg">Calculadora Kawaii</div>
          </div>

          {/* Expresión */}
          <div className="bg-pink-50 rounded-xl p-2 mb-2 h-8 text-right text-pink-400 text-sm overflow-hidden">
            {expression}
          </div>

          {/* Display */}
          <div className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-2xl p-6 mb-6 border-2 border-pink-200">
            <div className="text-right text-4xl font-bold text-pink-600 truncate">
              {display}
            </div>
          </div>

          {/* Botones */}
          <div className="grid grid-cols-4 gap-3">
            <Button variant="clear" onClick={handleClear} className="col-span-2 py-4">
              AC
            </Button>
            <Button variant="operation" onClick={() => handleOperation('÷')} className="py-4">
              ÷
            </Button>
            <Button variant="operation" onClick={() => handleOperation('×')} className="py-4">
              ×
            </Button>

            <Button onClick={() => handleNumber('7')} className="py-4">7</Button>
            <Button onClick={() => handleNumber('8')} className="py-4">8</Button>
            <Button onClick={() => handleNumber('9')} className="py-4">9</Button>
            <Button variant="operation" onClick={() => handleOperation('-')} className="py-4">
              -
            </Button>

            <Button onClick={() => handleNumber('4')} className="py-4">4</Button>
            <Button onClick={() => handleNumber('5')} className="py-4">5</Button>
            <Button onClick={() => handleNumber('6')} className="py-4">6</Button>
            <Button variant="operation" onClick={() => handleOperation('+')} className="py-4">
              +
            </Button>

            <Button onClick={() => handleNumber('1')} className="py-4">1</Button>
            <Button onClick={() => handleNumber('2')} className="py-4">2</Button>
            <Button onClick={() => handleNumber('3')} className="py-4">3</Button>
            <Button variant="equals" onClick={handleEquals} className="row-span-2 py-4">
              =
            </Button>

            <Button onClick={() => handleNumber('0')} className="col-span-2 py-4">
              0
            </Button>
            <Button onClick={handleDecimal} className="py-4">.</Button>
          </div>

          {/* Mensaje kawaii */}
          <div className="text-center mt-4 text-pink-400 text-sm">
            ♡ By @valencastrillon.co ♡
          </div>
        </div>
      </div>
    </div>
  );
}