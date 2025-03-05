import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { theme } from '#styles/theme';

export const NotFoundWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    background-color: #f8f9fa;
    user-select: none;
`;

export const Title = styled.h1`
    font-size: 96px;
    color: #343a40;
`;

export const Subtitle = styled.h2`
    font-size: 32px;
    color: #6c757d;
    text-align: center;
`;

export const HomeLink = styled(Link)`
    margin-top: 20px;
    font-size: 20px;
    font-weight: bold;
    color: #007bff;
    text-decoration: none;
    border: 2px solid black;
    border-radius: 10px;
    background: #007bff30;
    padding: 15px;
    box-shadow: ${theme.shadows.small};
    &:hover {
        transition: all 0.3s ease-in-out;
        box-shadow: ${theme.shadows.large};
    }
`;
