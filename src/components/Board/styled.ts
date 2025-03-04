import styled from 'styled-components';

import { SIZES } from '../../constants/sizes';
import { theme } from '../../styles/theme';

export const NoColumnsText = styled.div`
    width: 100%;
    height: 100%;
    min-height: 100px;
    display: flex;
    text-align: center;
    justify-content: center;
    align-items: center;
    font-size: ${theme.fontSizes.xxlarge};
    font-weight: bold;
    padding: 0 ${theme.spacing.xl};
    opacity: 0.6;
`;

export const Wrapper = styled.div`
    border-radius: 16px;
    flex: 1;
    min-width: ${SIZES.COLUMN.MIN_WIDTH};
    max-width: ${SIZES.COLUMN.MAX_WIDTH};
    display: flex;
    flex-direction: column;
    gap: ${theme.spacing.md};
    transition: 0.3s ease-in-out;
    background: ${theme.colors.backgroundTransparent};

    @media (max-width: 768px) {
        background: ${theme.colors.backgroundTransparent};
        box-shadow: none;
        width: 100%;
        max-width: none;
    }
`;
