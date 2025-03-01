import styled from 'styled-components';

interface ColumnHeaderProps {
    color: string;
}

export const AddColumnWrapper = styled.div`
    background: #ffffff;
    border-radius: 16px;
    padding: 16px;
    flex: 1;
    min-width: 280px;
    max-width: 400px;
    display: flex;
    flex-direction: column;
    gap: 16px;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.05);
    transition: 0.3s ease-in-out;
    background: #f8fafc;

    @media (max-width: 768px) {
        background: transparent;
        box-shadow: none;
        width: 100%;
        max-width: none;
    }
`;

export const AddColumnHeader = styled.div<ColumnHeaderProps>`
    display: flex;
    align-items: center;
    gap: 10px;
    background: ${({ color = 'black' }) => color};
    color: white;
    padding: 12px;
    border-radius: 25px;
    font-weight: bold;
    font-size: 16px;
    line-height: 22px;
    height: 48px;
`;

export const AddColumnTitle = styled.input`
    background-color: transparent;
    font-size: 16px;
    font-weight: bold;
    border: none;
    outline: none;
    padding: 3px 5px 0 0;
    width: 90%;
    color: #ffffff;
    &::placeholder {
        color: rgb(255, 255, 255);
        opacity: 0.8;
    }
`;

export const AddButtonsContainer = styled.div`
    display: flex;
    justify-content: flex-start;
    gap: 5px;
    margin-top: 5px;
`;

export const ColorWrapper = styled.div`
    padding: 5px;
    z-index: 1000;
`;

export const NoColumnsText = styled.div`
    width: 100%;
    height: 400px;
    display: flex;
    text-align: center;
    justify-content: center;
    align-items: center;
    font-size: 26px;
    font-weight: bold;
    padding: 0 40px;
`;
