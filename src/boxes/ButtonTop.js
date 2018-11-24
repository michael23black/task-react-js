import React from 'react';
import styled from 'styled-components';

const Box = styled.button`
    opacity: ${props => props.active
        ? '0' : '1'
    };
    position: fixed;
    top: 5%;
    left: 5%;
    width: 120px;
    height: 60px;
    background-color: #a8b6bf;
    border: none;
    border-radius: 30px;
    color: #fafafa;
    font-size: 16px;
    font-weight: bolder;
    transition: opacity 0.8s ease, background-color 0.2s linear;

    &:hover {
        background-color: #89bdd3;
    }
`

const Task = props => (
    <Box onClick={props.onClick} active={props.active}>Наверх</Box>
)

export default Task;