import { theme } from '../../styles/theme';
import styled from 'styled-components';

interface ColumnHeaderProps {
    color: string;
}

export const BoardWrapper = styled.div`
    display: flex;
    gap: ${theme.spacing.lg};
    padding: ${theme.spacing.lg};
    justify-content: space-evenly;
    overflow-x: auto;
    overflow-y: auto;
    align-items: flex-start;
    height: calc(100vh - 104px);
    position: relative;

    @media (max-width: 768px) {
        flex-direction: column;
        align-items: center;
        background: ${theme.colors.background};
        overflow-x: hidden;
        overflow-y: auto;
        height: auto;
    }
`;

export const ColumnWrapper = styled.div`
    background: ${theme.colors.white};
    border-radius: ${theme.borderRadius.large};
    padding: ${theme.spacing.md};
    min-width: 340px;
    max-width: 400px;
    display: flex;
    flex-direction: column;
    gap: ${theme.spacing.md};
    box-shadow: ${theme.shadows.medium};
    transition: 0.3s ease-in-out;
    background: ${theme.colors.background};

    @media (max-width: 768px) {
        background: ${theme.colors.backgroundTransparent};
        box-shadow: none;
        width: 100%;
        max-width: none;
    }
`;

export const ColumnHeader = styled.div<ColumnHeaderProps>`
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: ${({ color = theme.colors.black }) => color};
    color: ${theme.colors.white};
    padding: 12px;
    border-radius: ${theme.borderRadius.xlarge};
    font-weight: bold;
    font-size: ${theme.fontSizes.large};
    line-height: 22px;
    height: 48px;
    box-shadow: ${theme.shadows.medium};
    min-height: 48px;
    height: auto;
    div {
        display: flex;
        align-items: center;
        gap: ${theme.spacing.sm};
        max-width: 70%;
    }
`;

export const TaskCount = styled.span<ColumnHeaderProps>`
    color: ${({ color = theme.colors.black }) => color}60;
    border-radius: 50%;
    width: 28px;
    height: 28px;
    display: flex;
    background: ${theme.colors.white};
    align-items: center;
    justify-content: center;
    font-size: ${theme.fontSizes.medium};
    font-weight: bold;
    flex-shrink: 0;
`;

export const ColumnTitle = styled.h2`
    font-size: ${theme.fontSizes.large};
    margin: 0;
    word-wrap: break-word;
    white-space: normal;
    max-width: calc(100% - 45px);
    flex-grow: 1;
`;

export const AddTaskButton = styled.button`
    background: ${theme.colors.backgroundTransparent};
    color: #475569;
    border: none;
    cursor: pointer;
    transition: 0.3s ease-in-out;
    display: flex;
    width: 20px;
    height: 20px;
    flex-shrink: 0;
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
    background: ${theme.colors.white};
    padding: 12px;
    border: 1px solid #e2e8f0;
    border-radius: ${theme.borderRadius.xlarge};
    box-shadow: ${theme.shadows.medium};
    height: 48px;
    gap: 12px;
    display: flex;
    align-items: center;
    cursor: pointer;
    div {
        width: 79px;
        height: 24px;
        padding: 4px 8px 4px 8px;
        background: ${({ color = theme.colors.black }) => color}15;
        border-radius: ${theme.borderRadius.large};
        color: ${({ color = theme.colors.black }) => color};
        font-weight: 600;
        font-size: ${theme.fontSizes.small};
    }
`;

export const TasksWrapper = styled.div`
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    gap: 12px;
    min-height: 100px;
`;

export const AddTaskForm = styled.div`
    background: ${theme.colors.white};
    padding: 10px;
    border-radius: ${theme.borderRadius.medium};
    display: flex;
    flex-direction: column;
    align-items: start;
    gap: ${theme.spacing.sm};
    box-shadow: ${theme.shadows.small};
`;

export const TaskPriority = styled.div<{ color: string }>`
    select {
        background: ${theme.colors.backgroundTransparent};
        border: none;
        color: ${({ color = theme.colors.black }) => color};
        font-size: ${theme.fontSizes.small};
        font-weight: bold;
        cursor: pointer;
        outline: none;
    }

    width: 79px;
    height: 24px;
    padding: 4px 8px 4px 8px;
    background: ${({ color = theme.colors.black }) => color}15;
    border-radius: ${theme.borderRadius.large};
    color: ${({ color = theme.colors.black }) => color};
    font-weight: 700;
    font-size: ${theme.fontSizes.small};
`;

export const TaskTitleInput = styled.input`
    font-size: ${theme.fontSizes.large};
    font-weight: bold;
    border: none;
    outline: none;
    padding: ${theme.spacing.xs};
    width: 100%;
`;

export const TaskDescriptionInput = styled.input`
    font-size: ${theme.fontSizes.medium};
    font-wight: 600;
    border: none;
    outline: none;
    padding: ${theme.spacing.xs};
    width: 100%;
    color: ${theme.colors.gray};
`;

export const ButtonsContainer = styled.div`
    display: flex;
    justify-content: flex-end;
    gap: ${theme.spacing.xs};
    margin-top: ${theme.spacing.xs};
`;

export const SaveButton = styled.button`
    background-color: ${theme.colors.backgroundTransparent};
    color: ${theme.colors.success};
    font-weight: 600;
    padding: 5px 5px;
    border: none;
    border-radius: ${theme.borderRadius.small};
    cursor: pointer;
    font-size: ${theme.fontSizes.medium};
`;

export const CancelButton = styled.button`
    background-color: ${theme.colors.backgroundTransparent};
    color: ${theme.colors.danger};
    font-weight: 600;
    padding: 5px 10px;
    border: none;
    border-radius: ${theme.borderRadius.small};
    cursor: pointer;
    font-size: ${theme.fontSizes.medium};
`;

export const Container = styled.div``;

export const DeleteColumnButton = styled.button<ColumnHeaderProps>`
    color: ${({ color = theme.colors.black }) => color}90;
    font-weight: bold;
    font-size: ${theme.fontSizes.small};
    padding: 5px 10px;
    border: none;
    border-radius: ${theme.borderRadius.xlarge};
    cursor: pointer;
    box-shadow: ${theme.shadows.medium};
    flex-shrink: 0;
`;

export const DraggableContainer = styled.div`
    width: 100%;
    height: 100%;
    cursor: grab;
    user-select: none;
`;

export const NoTasksText = styled.div`
    width: 100%;
    height: 100%;
    min-height: 100px;
    display: flex;
    text-align: center;
    justify-content: center;
    align-items: center;
    fontsize: ${theme.fontSizes.medium};
    font-weight: bold;
    padding: 0 40px;
    opacity: 0.5;
`;
