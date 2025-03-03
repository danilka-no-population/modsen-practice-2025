import { theme } from '../../styles/theme';
import styled from 'styled-components';

interface TagColor {
    color: string;
}

export const TaskWrapper = styled.div`
    background: ${theme.colors.white};
    border-radius: ${theme.spacing.md};
    padding: ${theme.spacing.md};
    box-shadow: ${theme.shadows.medium};
    display: flex;
    flex-direction: column;
    gap: ${theme.spacing.sm};
    cursor: grab;
    position: relative;
    &:active {
        cursor: grabbing;
    }
`;

export const Tag = styled.span<TagColor>`
    background: ${({ color = theme.colors.black }) => color}20;
    color: ${({ color = theme.colors.black }) => color};
    font-size: ${theme.fontSizes.small};
    font-weight: bold;
    padding: 4px 10px;
    border-radius: 12px;
    align-self: flex-start;
`;

export const TaskHeader = styled.h3`
    font-size: ${theme.fontSizes.large};
    font-weight: bold;
    margin: 0;
    color: #1e293b;
    word-wrap: break-word;
    white-space: normal;
    max-width: calc(100% - 60px);
`;

export const TaskDescription = styled.p`
    font-size: ${theme.fontSizes.medium};
    color: ${theme.colors.gray};
    margin: 0;
    word-wrap: break-word;
    white-space: normal;
    max-width: calc(100% - 0px);
`;

export const TaskActions = styled.div`
    position: absolute;
    top: 16px;
    right: 12px;
    display: flex;
    gap: 6px;
`;

export const EditButton = styled.button`
    background: ${theme.colors.backgroundTransparent};
    border: none;
    cursor: pointer;
    font-size: ${theme.fontSizes.xlarge};
`;

export const DeleteButton = styled.button`
    background: ${theme.colors.backgroundTransparent};
    border: none;
    cursor: pointer;
    font-size: ${theme.fontSizes.xlarge};
    color: ${theme.colors.danger};
`;

export const TaskContainer = styled.div`
    position: relative;
    width: 100%;
`;
