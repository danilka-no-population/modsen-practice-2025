import styled from 'styled-components';

interface ColumnHeaderProps {
    color: string;
}

export const BoardWrapper = styled.div`
    display: flex;
    gap: 20px;
    padding: 20px;
    justify-content: center;

    @media (max-width: 768px) {
        flex-direction: column;
        align-items: center;
        background: #f1f5f9;
    }
`;

export const ColumnWrapper = styled.div`
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

export const ColumnHeader = styled.div<ColumnHeaderProps>`
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: ${({ color = 'black' }) => color};
    color: white;
    padding: 12px;
    border-radius: 25px;
    font-weight: bold;
    font-size: 16px;
    line-height: 22px;
    height: 48px;
    div {
        display: flex;
        align-items: center;
        gap: 10px;
    }
`;

export const TaskCount = styled.span<ColumnHeaderProps>`
    color: ${({ color = 'black' }) => color}60;
    border-radius: 50%;
    width: 28px;
    height: 28px;
    display: flex;
    background: white;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    font-weight: bold;
`;

export const ColumnTitle = styled.h2`
    font-size: 16px;
    margin: 0;
`;

export const AddTaskButton = styled.button`
    background: transparent;
    color: #475569;
    border: none;
    cursor: pointer;
    transition: 0.3s ease-in-out;
    display: flex;
    width: 20px;
    height: 20px;
    &:hover {
        transition: 0.3s ease-in-out;
        width: 24px;
        height: 24px;
        img {
            transition: 0.3s ease-in-out;
            width: 24px;
            height: 24px;
        }
    }
    img {
        width: 20px;
        height: 20px;
    }
`;

export const AddTask = styled.button<ColumnHeaderProps>`
    background: #ffffff;
    padding: 12px;
    border: 1px solid #e2e8f0;
    border-radius: 24px;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
    height: 48px;
    gap: 12px;
    display: flex;
    align-items: center;
    cursor: pointer;
    div {
        width: 79px;
        height: 24px;
        padding: 4px 8px 4px 8px;
        background: ${({ color = 'black' }) => color}15;
        border-radius: 15px;
        color: ${({ color = 'black' }) => color};
        font-weight: 600;
        font-size: 12px;
    }
`;

export const TasksWrapper = styled.div`
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    gap: 12px;
`;
