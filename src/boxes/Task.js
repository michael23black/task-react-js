import React from 'react';
import styled from 'styled-components';

import Link from '../boxes/Link.js';

const Box = styled.div`
    display: flex;
    flex-flow: column nowrap;
    width: 50%;
`
const Title = styled.div`
    display: flex;
    align-items: center;
    background-color: #847370;
    border-radius: 30px 30px 10px 10px;
    color: #fafafa;
`
const Count = styled.div`
    display: flex;
    justify-content: center;
    flex: 1;
    padding: 10px 10px 10px 10px;
    font-size: 30px;
    user-select: none;
`
const Text = styled.div`
    flex:6;
    padding: 10px 10px 10px 0px;
`
const Inner = styled.div`
    display: flex;
    position: relative;
    margin-top: 5px;
`
const Answer = styled.code`
    display: flex;
    flex: 1;
    flex-flow: column nowrap;
    justify-content: center;
    align-items: flex-start;
    padding: 10px 10px 10px 10px;
    background-color: #efefee;
    border: 5px solid #847370;
    border-radius: 10px 10px 10px 10px;
    font-size:16px;
    color: #847370;

`
const InputBlock = styled.div`
    display: flex;
    height: 50px;
    margin-top: 5px;
    overflow: hidden;
`
const Input = styled.input`
    visibility: ${props => props.inputNotNeed ? 'collapse' : 'visible'};
    flex: 3;
    padding: 5px;
    margin-right: 5px;
    background-color: #efefee;
    border: 5px solid #a8b6bf;
    border-radius: 10px;
    font-size: 16px;
    font-weight: bolder;
    color: #847370;
    transition: border-color 0.2s linear;

    &:focus {
        border-color: #89bdd3;
    }
    
`
const Button = styled.button`
    flex: 1;
    background-color: #a8b6bf;
    border: none;
    border-radius: 10px;
    font-size: 16px;
    font-weight: bolder;
    color: #fafafa;
    cursor: pointer;
`
const HoverButton = styled(Button)`
    transition: background-color 0.2s linear;

    &:hover {
        background-color: #89bdd3;
    }
`
const Decision = styled(Answer)`
    align-items: center;
    margin-top: 5px;
    min-height: 50px;
    border-radius: 10px 10px 30px 30px;
    word-wrap: break-word
;
`
const StyledButton = styled(Button)`
    display: ${props => props.active 
        ? 'block' : 'none'
    };
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 1;

    &:hover {
        background:linear-gradient(to bottom, rgba(137, 189, 211, 0.7) 10px, #89bdd3 50%, #89bdd3 100%);
        transition: background 0.2s linear;
    }
`

class Task extends React.Component{
    state = {
        active: true
    };
    render() {
        const answer = this.props.code.split(/\n/).map((item, key) =>
                <React.Fragment key={key}>
                    {item.replace(/\t/g, '\u00a0\u00a0\u00a0\u00a0')}<br/>
                </React.Fragment>
            )
        return(
            <Box>
                <Title>
                    <Count>№{this.props.number}</Count>
                    <Text>{this.props.text}</Text>
                </Title>
                <Inner>
                    <StyledButton 
                        onClick={() => this.setState({active: !this.state.active})} 
                        active={this.state.active}
                    >
                        Ответ
                    </StyledButton>
                    <Answer>
                        {answer}
                    </Answer>
                </Inner>
                <InputBlock>
                    <Input 
                        value={this.props.value} 
                        onChange={this.props.onChange} 
                        type="text" 
                        placeholder={this.props.placeholder} 
                        inputNotNeed={this.props.settings.inputNotNeed}
                    />
                    <HoverButton onClick={this.props.onClick} type="button">Рассчитать</HoverButton>
                    {this.props.settings.linkNeed ? <Link linkRef={this.props.linkRef} /> : ''}
                </InputBlock>
                <Decision as="div">{this.props.answer}</Decision>
            </Box>
        )
    }
}

export default Task;