import { theme } from '../../styles/theme';
import styled from 'styled-components';

export const HeaderContainer = styled.header`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: ${theme.spacing.xl};
    background-color: ${theme.colors.background};
    height: 104px;

    @media (max-width: 768px) {
        background-color: ${theme.colors.white};
        box-shadow: ${theme.shadows.small};
        height: 64px;
        position: sticky;
        top: 0;
        left: 0;
        right: 0;
        z-index: 1000;
    }
`;

export const Title = styled.h1`
    margin: 0;
    font-size: ${theme.fontSizes.xxlarge};
    font-weight: 800;

    @media (max-width: 768px) {
        display: none;
    }
`;

export const AddColumnButton = styled.button`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: ${theme.colors.backgroundTransparent};
    border: 1px solid #cbd5e1;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    padding: 0;

    &:hover {
        background-color: #f0f0f0;
        border-color: #a0a4a8;
        box-shadow: ${theme.shadows.small};
        transition:
            background-color 0.3s,
            border-color 0.3s;
    }

    @media (max-width: 768px) {
        display: none;
    }
`;

export const Icon = styled.img`
    width: 24px;
    height: 24px;

    @media (max-width: 768px) {
        width: 18px;
        height: 14px;
        padding: 0;
    }
`;

export const BurgerButton = styled.button`
    display: none;
    background: none;
    border: none;
    cursor: pointer;
    color: ${theme.colors.white};
    width: 24px;
    height: 24px;

    @media (max-width: 768px) {
        display: block;
        color: #475569;
        font-size: ${theme.fontSizes.large};
        width: 18px;
        height: 14px;
    }
`;

export const MenuWrapper = styled.div`
    position: absolute;
    top: 60px;
    left: 0;
    width: 100%;
    background: ${theme.colors.white};
    box-shadow: ${theme.shadows.small};
    padding: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export const MenuItem = styled.button`
    background: #4f46e530;
    border: 2px solid #4f46e550;
    box-shadow: ${theme.shadows.small};
    border-radius: 10px;
    padding: 10px 15px;
    font-size: ${theme.fontSizes.large};
    color: ${theme.colors.primary};
    font-weight: 700;
    cursor: pointer;
    width: 100%;
    text-align: center;
`;
