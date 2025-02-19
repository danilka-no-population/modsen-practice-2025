import styled from 'styled-components';

interface TagColor {
    color: string;
}

export const TaskWrapper = styled.div`
    background: #ffffff;
    border-radius: 16px;
    padding: 16px;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.05);
    display: flex;
    flex-direction: column;
    gap: 8px;
`;

export const Tag = styled.span<TagColor>`
    background: ${({ color = 'black' }) => color}20;
    color: ${({ color = 'black' }) => color};
    font-size: 12px;
    font-weight: bold;
    padding: 4px 10px;
    border-radius: 12px;
    align-self: flex-start;
`;

export const TaskHeader = styled.h3`
    font-size: 16px;
    font-weight: bold;
    margin: 0;
    color: #1e293b;
`;

export const TaskDescription = styled.p`
    font-size: 14px;
    color: #64748b;
    margin: 0;
`;
