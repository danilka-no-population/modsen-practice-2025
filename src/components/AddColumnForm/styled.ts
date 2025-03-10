import styled from 'styled-components';

import { SIZES } from '#constants/sizes';
import { theme } from '#styles/theme';

interface ColumnHeaderProps {
    color: string;
}

export const AddButtonsContainer = styled.div`
    display: flex;
    justify-content: flex-start;
    gap: ${theme.spacing.xs};
    margin-top: ${theme.spacing.xs};
`;

export const AddColumnHeader = styled.div<ColumnHeaderProps>`
    display: flex;
    align-items: center;
    gap: ${theme.spacing.sm};
    background: ${({ color = theme.colors.black }) => color};
    color: ${theme.colors.white};
    padding: ${theme.spacing.sm};
    border-radius: ${theme.borderRadius.xlarge};
    font-weight: bold;
    font-size: ${theme.fontSizes.large};
    line-height: 22px;
    height: 48px;
`;

export const AddColumnTitle = styled.input`
    background-color: transparent;
    font-size: ${theme.fontSizes.large};
    font-weight: bold;
    border: none;
    outline: none;
    padding: 3px 5px 0 0;
    width: 90%;
    color: ${theme.colors.white};
    &::placeholder {
        color: ${theme.colors.white};
        opacity: 0.8;
    }
`;

export const AddColumnWrapper = styled.div`
    background: ${theme.colors.white};
    border-radius: ${theme.borderRadius.large};
    padding: ${theme.spacing.md};
    height: ${SIZES.COLUMN.HEIGHT};
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

export const ColorWrapper = styled.div`
    padding: ${theme.spacing.xs};
    z-index: 1000;
`;

export const CharCounter = styled.p<{ isLimitReached: boolean }>`
    font-size: 12px;
    color: ${({ isLimitReached }) => (isLimitReached ? 'red' : 'white')};
`;
