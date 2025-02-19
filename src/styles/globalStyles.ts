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
        background: #ffffff;
        transition: background 0.3s ease-in-out;
        min-width: 100vw;
        min-height: 100vh;
        @media (max-width: 768px) {
            background: #F1F5F9;
        }
    }
`;

export default GlobalStyles;
