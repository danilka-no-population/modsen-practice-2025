import styled from 'styled-components';

import { SIZES } from '#constants/sizes';
import { theme } from '#styles/theme';

export const AddTaskWrapper = styled.div`
    background: ${theme.colors.white};
    padding: 10px;
    border-radius: ${theme.borderRadius.medium};
    display: flex;
    flex-direction: column;
    align-items: start;
    gap: ${theme.spacing.sm};
    box-shadow: ${theme.shadows.small};
`;

export const ButtonsContainer = styled.div`
    display: flex;
    justify-content: flex-end;
    gap: ${theme.spacing.xs};
    margin-top: ${theme.spacing.xs};
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

    width: ${SIZES.TASK.BUTTON_WIDTH};
    height: ${SIZES.TASK.BUTTON_HEIGHT};
    padding: 4px 8px 4px 8px;
    background: ${({ color = theme.colors.black }) => color}15;
    border-radius: ${theme.borderRadius.large};
    color: ${({ color = theme.colors.black }) => color};
    font-weight: 700;
    font-size: ${theme.fontSizes.small};
`;
