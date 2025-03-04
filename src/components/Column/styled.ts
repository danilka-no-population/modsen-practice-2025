import styled from 'styled-components';

import { SIZES } from '../../constants/sizes';
import { theme } from '../../styles/theme';

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
    min-width: ${SIZES.COLUMN.MIN_WIDTH};
    max-width: ${SIZES.COLUMN.MAX_WIDTH};
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
    padding: ${SIZES.SPACING.SMALL};
    border-radius: ${theme.borderRadius.xlarge};
    font-weight: bold;
    font-size: ${theme.fontSizes.large};
    line-height: 22px;
    height: ${SIZES.COLUMN.HEADER_HEIGHT};
    box-shadow: ${theme.shadows.medium};
    min-height: ${SIZES.COLUMN.HEADER_HEIGHT};
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
    width: ${SIZES.COLUMN.TASK_COUNT_SIZE};
    height: ${SIZES.COLUMN.TASK_COUNT_SIZE};
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
    padding: ${SIZES.SPACING.SMALL};
    border: 1px solid #e2e8f0;
    border-radius: ${theme.borderRadius.xlarge};
    box-shadow: ${theme.shadows.medium};
    height: 48px;
    gap: ${SIZES.SPACING.SMALL};
    display: flex;
    align-items: center;
    cursor: pointer;
    div {
        width: ${SIZES.TASK.BUTTON_WIDTH};
        height: ${SIZES.TASK.BUTTON_HEIGHT};
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
    gap: ${SIZES.SPACING.SMALL};
    min-height: 100px;
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
