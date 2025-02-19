import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    body {
        font-family: "Plus Jakarta Sans", serif;
        font-optical-sizing: auto;
        font-style: normal;
        color: #1E293B;
    }
`;

export default GlobalStyles;
