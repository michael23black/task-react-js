import React from 'react';
import styled from 'styled-components';

const Box = styled.a`
    flex: 1;
    background-color: #a8b6bf;
    border: none;
    border-radius: 10px;
    font-size: 16px;
    font-weight: bolder;
    color: #fafafa;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    user-select: none;
    margin-left: 5px;
    text-decoration: none;
    transition: background-color 0.2s linear;

    &:hover {
        background-color: #89bdd3;
    }
`

const Link = props => (
    <Box ref={props.linkRef}>Скачать</Box>
)

export default Link;