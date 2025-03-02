import styled from 'styled-components';

export const HeaderContainer = styled.header`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 32px;
    background-color: #f8fafc;
    height: 104px;

    @media (max-width: 768px) {
        background-color: #ffffff;
        box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
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
    font-size: 1.5rem;
    font-weight: 800;

    @media (max-width: 768px) {
        display: none;
    }
`;

export const AddColumnButton = styled.button`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: transparent;
    border: 1px solid #cbd5e1;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    padding: 0;

    &:hover {
        background-color: #f0f0f0;
        border-color: #a0a4a8;
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
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
    color: white;
    width: 24px;
    height: 24px;

    @media (max-width: 768px) {
        display: block;
        color: #475569;
        font-size: 1rem;
        width: 18px;
        height: 14px;
    }
`;

export const MenuWrapper = styled.div`
    position: absolute;
    top: 60px;
    left: 0;
    width: 100%;
    background: white;
    box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
    padding: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export const MenuItem = styled.button`
    background: #4f46e530;
    border: 2px solid #4f46e550;
    box-shadow: 0px 2px 5px rgba(45, 1, 245, 0.2);
    border-radius: 10px;
    padding: 10px 15px;
    font-size: 1rem;
    color: #4f46e5;
    font-weight: 700;
    cursor: pointer;
    width: 100%;
    text-align: center;
`;
