import styled, { keyframes, css } from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// Colors
const colors = {
    text: '#e0e7f3',
    background: '#0a101c',
    primary: '#96abd7',
    secondary: '#673181',
    accent: '#b947ab',
    inputBg: '#151b2b',
    inputBorder: '#2c3e50',
    error: '#ffadad', // Lighter red to contrast with dark bg
    success: '#3eaf7c',
    highlightFDCF: '#3eaf7c',
    highlightDCF: '#b947ab'
};

const blinkRed = keyframes`
    0%, 100% { border-color: ${colors.error}; }
    50% { border-color: transparent; }
`;

export const Container = styled.div`
    padding: 32px;
    margin: 40px auto;
    max-width: 900px;
    background-color: ${colors.background};
    border-radius: 16px;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.5), 0 4px 10px rgba(0, 0, 0, 0.3);
    color: ${colors.text};
    border: 1px solid #2a3b55;

    h2 {
        color: ${colors.primary};
        font-size: 2rem;
        margin-top: 32px;
        margin-bottom: 16px;
        font-weight: 700;
        border-bottom: 2px solid ${colors.secondary};
        padding-bottom: 8px;
    }
`;

export const Header = styled.h1`
    text-align: center;
    font-size: 3rem;
    color: ${colors.text};
    margin-bottom: 32px;
    font-weight: 700;
    text-shadow: 0 2px 4px rgba(0,0,0,0.5);
    background: linear-gradient(to right, ${colors.primary}, ${colors.accent});
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
`;

export const Input = styled.input`
    width: 100%;
    padding: 12px 14px;
    margin: 8px 0;
    border: 1px solid ${({ hasError }) => (hasError ? colors.error : colors.inputBorder)};
    border-radius: 8px;
    font-size: 1rem;
    box-sizing: border-box;
    transition: all 0.2s ease-in-out;
    background-color: ${colors.inputBg};
    color: ${colors.text};
    font-family: 'Glegoo', serif;

    ${({ hasError }) => hasError && css`
        animation: ${blinkRed} 1s infinite;
        background-color: rgba(255, 173, 173, 0.1);
    `};

    &:focus {
        border-color: ${({ hasError }) => (hasError ? colors.error : colors.primary)};
        outline: none;
        box-shadow: 0 0 0 3px ${({ hasError }) => (hasError ? "rgba(255, 173, 173, 0.2)" : "rgba(150, 171, 215, 0.2)")};
        background-color: #1a2236;
    }

    &:hover {
        border-color: ${({ hasError }) => (hasError ? colors.error : colors.accent)};
    }
`;

export const WarningIcon = styled(FontAwesomeIcon)`
    margin-left: 12px;
    color: ${colors.error};
`;

export const ReadOnly = styled.div`
    padding: 12px 14px;
    margin: 8px 0;
    background-color: #1a2236;
    border: 1px solid ${colors.inputBorder};
    border-radius: 8px;
    font-size: 1rem;
    color: ${colors.primary};
    font-weight: 500;
    font-family: 'Glegoo', serif;
`;

export const Label = styled.label`
    font-size: 1rem;
    color: ${colors.text};
    display: block;
    margin-top: 20px;
    font-weight: 400;
    letter-spacing: 0.02em;
`;

export const LowerIndex = styled.span`
    font-size: 0.75em;
    vertical-align: sub;
`;

export const Highlight = styled.span`
    color: ${(props) =>
        props.version === "FDCF" ? colors.highlightFDCF : props.version === "DCF" ? colors.highlightDCF : "inherit"};
    font-weight: 700;
`;

export const TableWrapper = styled.div`
    margin-bottom: 24px;
`;

export const Table = styled.table`
    width: 100%;
    table-layout: fixed; /* Ensures fixed column widths */
    border-collapse: separate; 
    border-spacing: 0;
    border: 1px solid ${colors.inputBorder};
    border-radius: 12px;
    /* overflow: hidden; Removed to allow tooltips */
    background-color: #111827;

    th, td {
        padding: 14px 18px;
        text-align: left;
        border-bottom: 1px solid ${colors.inputBorder};
        vertical-align: middle;
        word-wrap: break-word; /* Prevents overflow */
    }

    /* Fixed column widths */
    th:first-child, td:first-child {
        width: 65%;
    }
    th:last-child, td:last-child {
        width: 35%;
        text-align: right; /* Values align right for better readability */
    }

    th {
        background-color: #1a2236;
        font-weight: 700;
        color: ${colors.primary};
        text-transform: uppercase;
        font-size: 0.85rem;
        letter-spacing: 0.05em;
    }
    
    /* Rounded corners for the table content */
    tr:first-child th:first-child { border-top-left-radius: 12px; }
    tr:first-child th:last-child { border-top-right-radius: 12px; }
    tr:last-child td:first-child { border-bottom-left-radius: 12px; }
    tr:last-child td:last-child { border-bottom-right-radius: 12px; }

    tr:last-child td {
        border-bottom: none;
    }

    tr:nth-child(even) {
        background-color: #151b2b;
    }

    tr:hover {
        background-color: #1f283d;
    }
`;

export const ResultTooltip = styled.span`
    position: relative;
    cursor: help;
    border-bottom: 1px dotted ${colors.primary};
    
    &:hover::after {
        content: attr(data-tooltip);
        position: absolute;
        bottom: 100%;
        left: 50%;
        transform: translateX(-100%); /* Shift left to avoid being cut off by screen edge if convenient, or align center */
        background-color: ${colors.secondary};
        color: #fff;
        padding: 6px 10px;
        border-radius: 6px;
        white-space: nowrap;
        z-index: 100;
        margin-bottom: 8px;
        font-size: 0.85rem;
        box-shadow: 0 4px 6px rgba(0,0,0,0.3);
        font-family: 'Glegoo', serif;
        pointer-events: none;
        border: 1px solid ${colors.accent};
    }
    
    &:hover::before {
        content: '';
        position: absolute;
        bottom: 100%;
        left: 50%;
        margin-left: -5px;
        margin-bottom: 2px;
        border-width: 5px;
        border-style: solid;
        border-color: ${colors.secondary} transparent transparent transparent;
        z-index: 100;
    }
`;

export const Button = styled.button`
    padding: 14px 28px;
    background-color: ${colors.secondary};
    color: white;
    border: none;
    border-radius: 8px;
    font-size: 1.1rem;
    font-weight: 700;
    cursor: pointer;
    transition: all 0.2s ease;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
    font-family: 'Glegoo', serif;

    &:hover {
        background-color: ${colors.accent};
        transform: translateY(-2px);
        box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3);
    }

    &:active {
        transform: translateY(0);
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    }

    &:disabled {
        background-color: #555;
        cursor: not-allowed;
    }
`;

export const TableTitle = styled.div`
    font-weight: 700;
    font-size: 1.3rem;
    margin-bottom: 12px;
    margin-top: 12px;
    color: ${colors.text};
    border-left: 4px solid ${colors.accent};
    padding-left: 12px;
`;

export const TooltipIcon = styled.span`
    margin-left: 8px;
    cursor: pointer;
    color: ${colors.primary};
    transition: color 0.2s;

    &:hover {
        color: ${colors.accent};
    }

    position: relative;
    top: 2px;
`;

export const TooltipDialog = styled.div`
    display: ${({ visible }) => (visible ? "block" : "none")};
    position: absolute;
    top: calc(100% + 10px);
    left: 10px;
    width: 340px;
    padding: 24px;
    background: #1a2236;
    border: 1px solid ${colors.inputBorder};
    box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.6), 0 8px 10px -6px rgba(0, 0, 0, 0.4);
    z-index: 50;
    font-size: 0.95rem;
    color: ${colors.text};
    border-radius: 12px;

    ol {
        padding-left: 20px;
        margin: 12px 0;
        color: #cfd8e8;
    }
    
    li {
        margin-bottom: 6px;
    }
    
    p {
        font-weight: bold;
        color: ${colors.primary};
        margin-top: 0;
    }

    img {
        max-width: 100%;
        margin-top: 16px;
        border-radius: 8px;
        border: 1px solid ${colors.inputBorder};
    }
    
    &::before {
        content: '';
        position: absolute;
        top: -6px;
        left: 20px;
        width: 12px;
        height: 12px;
        background: #1a2236;
        transform: rotate(45deg);
        border-left: 1px solid ${colors.inputBorder};
        border-top: 1px solid ${colors.inputBorder};
    }
`;
