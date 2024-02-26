import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
    body {
        margin: 0;
        padding: 0;
        color: ${props => props.color} !important;
        background: ${props => props.background} !important;
        font-weight: 700;
        font-family: 'Fredoka', sans-serif;
        font-size: ${props => props.textSize + 'px' || '12px'};
    }
    
    input, select, button, textarea {
        font-family: 'Fredoka', sans-serif;
    }
`;

export default GlobalStyles;