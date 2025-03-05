import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const NotFoundWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    background-color: #f8f9fa;
`;

export const Title = styled.h1`
    font-size: 96px;
    color: #343a40;
`;

export const Subtitle = styled.h2`
    font-size: 32px;
    color: #6c757d;
`;

export const HomeLink = styled(Link)`
    margin-top: 20px;
    font-size: 20px;
    color: #007bff;
    text-decoration: none;
    &:hover {
        text-decoration: underline;
    }
`;
