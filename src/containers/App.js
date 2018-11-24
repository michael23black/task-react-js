import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';

import Task from '../boxes/Task.js';
import ButtonTop from '../boxes/ButtonTop.js';

import data from '../data.json';

const Container = styled.div`
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    background-color: #fafafa;

    & > * {
        margin:10px;
    }
`

class App extends React.Component{
    randomNumber = (min, max) => {
        return Math.floor(Math.random() * (max - min)) + min;
    }
    generateArray = () => {
        const newArray = [];
        const arraySize = this.randomNumber(1, 100);
        for(let i = 1; i <= arraySize; i++){
            newArray.push(this.randomNumber(1, 100));
        }
        return newArray;
    }
    state = {
        top: true,
        turnGamers: true,
        gamerAnswer: '',
        countAttempt: 0,
        number: 0,
        inputValues: new Array(15),
        answers: new Array(15) 
    };
    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll);
        this.setState({
            number: this.randomNumber(1, 10)
        });
    };
    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    };
    handleScroll = () => {
        this.setState({top : window.pageYOffset === 0});
    };
    doTask = (index) => {
        const inputValue = this.state.inputValues[index];
        let answer;
        switch (index) {
            case 0:
                const isCentury = (x) => {
                    const dataArray = x.split(' ');
                    return `Ваше имя: ${dataArray[0]}. ${isNaN(dataArray[1]) || dataArray[1] < 0 ? 'Некорректный возраст!' : dataArray[1] >= 100 ? 'Вы уже отметили столетие. Поздравляем!' : `До столетия ${100 - dataArray[1]}.`}`;
                }
                answer = isCentury(inputValue);
            break;
            case 1:
                const isEven = (x) => {
                    if(isNaN(x)){
                        return `Введите число!`;
                    }else{
                        if(x % 4 === 0){
                            return `Число ${x} четное. Число кратно 4.`;
                        }else if(x % 2 === 0){
                            return `Число ${x} четное.`;
                        }else{
                            return `Число ${x} нечетное.`;
                        }
                    }
                }
                answer = isEven(inputValue);
            break;
            case 2:
                const isLess = (x) => {
                    if(isNaN(x)){
                        return `Введите число!`;
                    }else{
                        const newData = this.generateArray(1, 100).filter((number) => {
                            return number < x; 
                        });
                        return newData.join(', ');
                    }
                }
                answer = isLess(inputValue);
            break;
            case 3:
                const isDividers = (x) => {
                    if(isNaN(x)){
                        return `Введите число!`;
                    }else{
                        const dividers = [];
                        for(let i = 1; i<=x; i++) {
                            if(x % i === 0) {
                                dividers.push(i);
                            }
                        }
                        return dividers.join(', ');
                    }
                }
                answer = isDividers(inputValue);
            break;
            case 4:
                const findCommon = () => {
                    const array = this.generateArray(1, 100).concat(this.generateArray(1, 100));
                    var object = {};
                    array.forEach(element => {
                        object[element] = true;
                    });                     
                    return Object.keys(object).join(', ');
                }
                answer = findCommon();
            break;
            case 5:
                const isPalindrome = (x) => {
                    const letters = x.replace(/ /g, '').toLowerCase().split('');
                    return letters.join('') === letters.reverse().join('') ? `"${x.trim()}" - палиндром.` : `"${x.trim()}" - не палиндром.`;
                }
                answer = isPalindrome(inputValue);
            break;
            case 6:
                const doEvenArray = () => {
                    const newData = this.generateArray(1, 100).filter((number) => {
                        return number % 2 === 0; 
                    });
                    return newData.join(', ');
                }
                answer = doEvenArray();
            break;
            case 7:
                let gameResult = this.state.turnGamers;
                const inputValuesCopy = this.state.inputValues;
                inputValuesCopy[index] = '';
                if(gameResult === true){
                    this.setState({
                        gamerAnswer: inputValue,
                        turnGamers: false,
                        inputValue: inputValuesCopy
                    });
                    answer = 'Ход игрока 2!';
                }else{
                    const one = this.state.gamerAnswer;
                    const two = inputValue;
                    if(one === two) {
                        gameResult = 'Ничья!';
                    }else if(one === 'камень') {
                        if(two === 'ножницы') {
                            gameResult = 'Игрок 1 победил!';
                        }else {
                            gameResult = 'Игрок 2 победил!';
                        }
                    }else if(one === 'бумага') {
                        if(two === 'камень') {
                            gameResult = 'Игрок 1 победил!';
                        }else {
                            gameResult = 'Игрок 2 победил!';
                        }
                    }else if(one === 'ножницы') {
                        if(two === 'бумага') {
                            gameResult = 'Игрок 1 победил!';
                        }else {
                            gameResult = 'Игрок 2 победил!';
                        }
                    }
                    this.setState({
                            gamerAnswer: '',
                            turnGamers: true,
                            inputValue: inputValuesCopy
                    });
                    answer = `${gameResult} Игрок 1: ${one} <=> Игрок 2: ${two}`;
                }
            break;
            case 8:
                if(inputValue.toLowerCase() === 'выход') {
                    answer = `Конец игры. Попыток: ${this.state.countAttempt}.`;
                    this.setState({
                        number: this.randomNumber(1, 10),
                        countAttempt: 0
                    });
                }else if(isNaN(inputValue) === false) {
                    if(this.state.number === +inputValue) {
                        answer = `Вы угадали! Конец игры. Попыток: ${this.state.countAttempt + 1}.`;
                        this.setState({
                            number: this.randomNumber(1, 10),
                            countAttempt: 0
                        });
                    }else{
                        this.setState({
                            countAttempt: this.state.countAttempt + 1
                        });
                        answer = `Вы не угадали! Число ${this.state.number > +inputValue ? 'больше' : 'меньше'}.`
                    }
                }else{
                    answer = `Некорректный ввод("${inputValue}")`;
                }
            break;
            case 9:
                const isPrime = (x) => {
                    for(let i = 2; i < x; i++){
                        if(x % i === 0){
                            return 'Ложь';
                        }
                    }
                    return 'Правда';
                }
                answer = isPrime(inputValue);
            break;
            case 10:
                const doFormatArray = (x) => {
                    const newArray = x.trim().split(' ');
                    if(newArray.length <= 2){
                        return newArray.join(', ');
                    }else{
                        newArray.splice(1, newArray.length-2);
                        return newArray.join(', ..., ');
                    }
                }
                answer = doFormatArray(inputValue);
            break;
            case 11:
                const doFibonacciSeries = (n) => {
                    const newArray = [1, 1];
                    if(n === 1){
                        return 1;
                    }
                    for(let i = 3; i <= n; i++){
                        newArray.push(newArray[i-3]+newArray[i-2]);
                    }
                    return newArray.join(', ');
                }
                answer = doFibonacciSeries(inputValue);
            break;
            case 12:
                const newArray = [];
                for(let i = 1; i <= 100; i++) {
                    newArray.push(i % 15 === 0 ? 'FizzBuzz' : i % 5 === 0 ? 'Buzz' : i % 3 === 0 ? 'Fizz' : i);
                }
                answer = newArray.join(', ');
            break;
            case 13:
                const download = (text, name, type) => {
                    var a = ReactDOM.findDOMNode(this.Link);
                    console.log(a);
                    var file = new Blob([text], {type: type});
                    a.href = URL.createObjectURL(file);
                    a.download = name;
                }
                const doArray = (x) => {
                    const newArray = x.trim().split(' ');
                    var object = {};
                    newArray.forEach(element => {
                        object[element] = true;
                    });                     
                    download(Object.keys(object).join(', '), 'file.txt', 'text/plain');
                    return Object.keys(object).join(', ');
                }
                answer = doArray(inputValue);
            break;
            case 14:
                const object = {
                    1:'q', 2:'w', 3:'e', 4:'r', 5:'t', 6:'y', 7:'u', 8:'i', 9:'o', 10:'p',
                    11:'a', 12:'s', 13:'d', 14:'f', 15:'g', 16:'h', 17:'j', 18:'k', 19:'l', 20:'z',
                    21:'x', 22:'c', 23:'v', 24:'b', 25:'n', 26:'m', 27:'1', 28:'2', 29:'3', 30:'4',
                    31:'5', 32:'6', 33:'7', 34:'8', 35:'9', 36:'0', 37:'!', 38:'№', 39:'$', 40:'%',
                    41:'^', 42:'&', 43:'*', 44:'(', 45:')', 46:'-', 47:'+', 48:'?', 49:';', 50:':'
                };
                const randValue = this.randomNumber(10, 21);
                const passwordArray = [];
                for(let i = 0; i < randValue; i++) {
                    passwordArray.push(object[this.randomNumber(1, 51)])
                }
                answer = passwordArray;
            break;
            default:
                alert('Этой задачи нет!')
            break;
        }
        const answersCopy = this.state.answers;
        answersCopy[index] = answer;
        this.setState({
            answers: answersCopy
        });
    };
    toTopButtonClick = () => {
        window.scrollTo(0, 0);
    };
    handleInputChange =(event, index) => {
        const inputValuesCopy = this.state.inputValues;
        inputValuesCopy[index] = event.target.value;
        this.setState({
            inputValues: inputValuesCopy
        });
    };
    render(){
        return(
            <Container>
                <ButtonTop onClick={this.toTopButtonClick} active={this.state.top} />
                {data.tasks.map((task, index) => 
                    <Task
                        linkRef={(el) => {this.Link = el;}}
                        number={[index+1]}
                        text={task.text}
                        code={task.code}
                        placeholder={task.placeholder}
                        settings={task.settings}
                        answer={this.state.answers[index]}
                        onClick={() => this.doTask(index)}
                        onChange={(event) => this.handleInputChange(event, index)} 
                        key={index}
                    />
                )}
            </Container>
        )
    }
}

export default App;