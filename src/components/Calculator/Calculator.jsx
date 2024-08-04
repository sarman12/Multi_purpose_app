import React, { useState } from 'react';
import './Calculator.css';

function Calculator() {
    const [displayValue, setDisplayValue] = useState("");
    const [factMode, setFactMode] = useState(false);

    const append = (value) => {
        setDisplayValue(displayValue + value);
    };

    const calculate = () => {
        if (factMode) {
            calculateFactorial();
        } else {
            try {
                setDisplayValue(eval(displayValue).toString());
            } catch (error) {
                setDisplayValue('Error');
            }
        }
    };

    const deleteLast = () => {
        setDisplayValue(displayValue.slice(0, -1));
    };

    const clearAll = () => {
        setDisplayValue('');
    };

    const activateFactMode = () => {
        setDisplayValue(displayValue + '!');
        setFactMode(true);
    };

    const factorial = (num) => {
        if (num === 0 || num === 1) {
            return 1;
        } else {
            return num * factorial(num - 1);
        }
    };

    const calculateFactorial = () => {
        const inputValue = parseFloat(displayValue);
        if (!isNaN(inputValue) && inputValue >= 0 && Number.isInteger(inputValue)) {
            setDisplayValue(factorial(inputValue).toString());
        } else {
            setDisplayValue('Invalid Input');
        }
        setFactMode(false);
    };

    return (
        <div className="calculator_container">
            <h1 style={{ marginTop: '0rem', marginBottom: '0.5rem', fontSize: '2.5rem', textAlign: 'center', color: '#FAFAFA' }}>
                Calculator
            </h1>
            <section id="main">
                <div className="container">
                    <div className="display">
                        <input className="form-control" name="display" type="text" value={displayValue} readOnly placeholder='Enter your number' />
                    </div>
                    <div className="components">
                        <div className="row1">
                            <button onClick={deleteLast} className="btn">Del</button>
                            <button onClick={clearAll} className="btn">Clear</button>
                            <input type="button" className="btn" value="+" onClick={() => append('+')} />
                            <input type="button" className="btn" value="-" onClick={() => append('-')} />
                        </div>
                        <div className="row2">
                            <div>
                                <button onClick={() => append('1')} className="btn"><b>1</b></button>
                                <button onClick={() => append('2')} className="btn"><b>2</b></button>
                                <button onClick={() => append('3')} className="btn"><b>3</b></button>
                                <input type="button" className="btn" value="/" onClick={() => append('/')} />
                            </div>
                            <div>
                                <button onClick={() => append('4')} className="btn"><b>4</b></button>
                                <button onClick={() => append('5')} className="btn"><b>5</b></button>
                                <button onClick={() => append('6')} className="btn"><b>6</b></button>
                                <input type="button" className="btn" value="X" onClick={() => append('*')} />
                            </div>
                            <div>
                                <button onClick={() => append('7')} className="btn"><b>7</b></button>
                                <button onClick={() => append('8')} className="btn"><b>8</b></button>
                                <button onClick={() => append('9')} className="btn"><b>9</b></button>
                                <input type="button" className="btn" value="%" onClick={() => append('%')} />
                            </div>
                        </div>
                        <div className="row3">
                            <button onClick={() => append('.')}><b>.</b></button>
                            <button onClick={() => append('0')}>0</button>
                            <button type="button" onClick={activateFactMode}><b>!</b></button>
                            <button onClick={calculate} >Enter</button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Calculator;
