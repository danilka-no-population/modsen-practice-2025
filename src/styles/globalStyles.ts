import { theme } from './theme';
import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    body {
        font-family: "Plus Jakarta Sans", "Roboto", serif;
        font-optical-sizing: auto;
        font-style: normal;
        color: #1E293B;
        background: ${theme.colors.white};
        transition: background 0.3s ease-in-out;
        min-width: 100vw;
        min-height: 100vh;
        scroll-behavior: smooth;

        ::-webkit-scrollbar {
            width: 13px;
            height: 13px;
        }

        ::-webkit-scrollbar-track {
            background: #f0f0f0;
            border-radius: 10px;
        }

        ::-webkit-scrollbar-thumb {
            background: linear-gradient(45deg, #6a11cb, #2575fc);
            transition: background 1s ease;
            border-radius: 10px;
            border: 2px solid #f0f0f0;
        }

        ::-webkit-scrollbar-thumb:hover {
            transition: background 1s ease;
            background: linear-gradient(45deg,rgb(14, 55, 203), #1b5bfc);
        }
    }
`;

export default GlobalStyles;
