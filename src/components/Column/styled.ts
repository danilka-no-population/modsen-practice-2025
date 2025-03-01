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
    box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.2);
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

export const AddTaskForm = styled.div`
    background: white;
    padding: 10px;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    align-items: start;
    gap: 8px;
    box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
`;

export const TaskPriority = styled.div<{ color: string }>`
    select {
        background: transparent;
        border: none;
        color: ${({ color = 'black' }) => color};
        font-size: 12px;
        font-weight: bold;
        cursor: pointer;
        outline: none;
    }

    width: 79px;
    height: 24px;
    padding: 4px 8px 4px 8px;
    background: ${({ color = 'black' }) => color}15;
    border-radius: 15px;
    color: ${({ color = 'black' }) => color};
    font-weight: 700;
    font-size: 12px;
`;

export const TaskTitleInput = styled.input`
    font-size: 16px;
    font-weight: bold;
    border: none;
    outline: none;
    padding: 5px;
    width: 100%;
`;

export const TaskDescriptionInput = styled.input`
    font-size: 14px;
    font-wight: 600;
    border: none;
    outline: none;
    padding: 5px;
    width: 100%;
    color: #64748b;
`;

export const ButtonsContainer = styled.div`
    display: flex;
    justify-content: flex-end;
    gap: 5px;
    margin-top: 5px;
`;

export const SaveButton = styled.button`
    background-color: transparent;
    color: #4caf50;
    font-weight: 600;
    padding: 5px 5px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 14px;
`;

export const CancelButton = styled.button`
    background-color: transparent;
    color: #e74c3c;
    font-weight: 600;
    padding: 5px 10px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 14px;
`;

export const Container = styled.div``;

export const DeleteColumnButton = styled.button<ColumnHeaderProps>`
    color: ${({ color = 'black' }) => color}90;
    font-weight: bold;
    font-size: 12px;
    padding: 5px 10px;
    border: none;
    border-radius: 24px;
    cursor: pointer;
    box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.1);
`;
