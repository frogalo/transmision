import styled, {keyframes, css} from "styled-components";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const blinkRed = keyframes`
    0%, 100% {
        border-color: #ff0000;
    }
    50% {
        border-color: transparent;
    }
`;

export const Container = styled.div`
    padding: 16px;
    margin: 16px auto;
    max-width: 750px;
    background-color: #f7f9fc;
    border: 1px solid #d1d9e6;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    font-family: "Roboto", Arial, sans-serif;
    line-height: 1.5;
`;

export const Header = styled.h1`
    text-align: center;
    font-size: 1.8rem;
    color: #2c3e50;
    margin-bottom: 20px;
`;


export const Input = styled.input`
    width: 100%;
    padding: 6px;
    margin: 8px 0;
    border: 1px solid ${({hasError}) => (hasError ? "#ff0000" : "#d1d9e6")};
    border-radius: 4px;
    font-size: 0.9rem;
    box-sizing: border-box;
    transition: all 0.3s ease;

    ${({hasError}) =>
            hasError &&
            css`
                animation: ${blinkRed} 1s infinite;
            `};

    &:focus {
        border-color: ${({hasError}) => (hasError ? "#ff0000" : "#3eaf7c")};
        outline: none;
        box-shadow: ${({hasError}) =>
                hasError ? "none" : "0 0 8px rgba(62, 175, 124, 0.5)"};
    }

    &:hover {
        border-color: ${({hasError}) => (hasError ? "#ff0000" : "#3eaf7c")};
    }
`;

export const WarningIcon = styled(FontAwesomeIcon)`

    margin-top: 12px;
    margin-left: 12px;
    transform: translateY(-50%);
    color: #ff0000;
`;
export const ReadOnly = styled.div`
    padding: 6px;
    margin: 8px 0;
    background-color: #eef2f6;
    border: 1px solid #d1d9e6;
    border-radius: 4px;
    font-size: 0.9rem;
    color: #2c3e50;
`;

export const Label = styled.label`
    font-size: 0.9rem;
    color: #2c3e50;
    display: block;
    margin-top: 10px;
`;
export const LowerIndex = styled.span`
    font-size: 0.8em; /* Reduce the font size for the lower index */
    vertical-align: -0.3em; /* Position it lower relative to the baseline */
`;

export const Highlight = styled.span`
    color: ${(props) =>
            props.version === "FDCF" ? "#3eaf7c" : props.version === "DCF" ? "#a73eaf" : "inherit"};
    font-weight: bold;
`;

export const Table = styled.table`
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 20px;

    th, td {
        border: 1px solid #ddd;
        padding: 8px;
        text-align: center;
    }

    th {
        background-color: #bceff6;
        font-weight: bold;
    }
;`
export const Button = styled.button`
    padding: 10px 20px;
    background-color: #3eaf7c;
    color: white;
    border: none;
    border-radius: 4px;
    font-size: 1rem;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
        background-color: #329a67;
    }

    &:active {
        background-color: #278a56;
    }

    &:disabled {
        background-color: #cccccc;
        cursor: not-allowed;
    }
`;
export const TableTitle = styled.div`
    font-weight: bold;
`
export const TooltipIcon = styled.span`
    margin-left: 8px;
    cursor: pointer;
    color: #9f9f9f; /* Adjust the color to match your theme */

    &:hover {
        color: #2c8b5f; /* Darker hover color */
    }

    position: relative;
`;

export const TooltipDialog = styled.div`
    display: ${({visible}) => (visible ? "block" : "none")};
    position: absolute;
    top: 25px;
    left: 0;
    width: 300px;
    padding: 16px;
    background: #fff;
    border: 1px solid #ccc;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    z-index: 10;
    font-size: 14px;
    color: #333;
    border-radius: 8px;

    img {
        max-width: 100%;
        margin-top: 8px;
        border-radius: 4px;
    }`;


