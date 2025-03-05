import styled from 'styled-components';

import { theme } from '#styles/theme';

export const EditColumnWrapper = styled.div`
    background: ${theme.colors.white};
    border-radius: ${theme.borderRadius.large};
    padding: ${theme.spacing.md};
    height: 160px;
    min-width: 308px;
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
