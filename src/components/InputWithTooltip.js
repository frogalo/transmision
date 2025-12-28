import React, { useState } from 'react';
import { Input, WarningIcon, Label, TooltipIcon, TooltipDialog } from '../App.styles';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationCircle, faQuestionCircle } from "@fortawesome/free-solid-svg-icons"; 

const InputWithTooltip = ({ label, name, value, onChange, tooltipContent, image }) => {
    const [tooltipVisible, setTooltipVisible] = useState(false);
    const [hasError, setHasError] = useState(false);

    const handleInputChange = (e) => {
        const inputValue = e.target.value;

        // Only allow numerical input with optional decimals
        if (!isNaN(inputValue) && inputValue !== "") {
            onChange(e); // Call the parent onChange handler with the valid input
            setHasError(false);
        } else {
            setHasError(true); // Mark as error for invalid or empty input
        }
    };

    return (
        <Label>
            {label}
            <div style={{ position: "relative", display: "inline-flex", alignItems: "center" }}>
                <TooltipIcon
                    onMouseEnter={() => setTooltipVisible(true)}
                    onMouseLeave={() => setTooltipVisible(false)}
                >
                    <FontAwesomeIcon icon={faQuestionCircle} />
                </TooltipIcon>
                <TooltipDialog visible={tooltipVisible}>
                    {tooltipContent && (
                        <>
                            <p>{tooltipContent.title}</p>
                            <ol>
                                {tooltipContent.steps.map((step, index) => (
                                    <li key={index}>{step}</li>
                                ))}
                            </ol>
                        </>
                    )}
                    {image && <img src={image} alt="Example" style={{ maxWidth: "100%" }} />}
                </TooltipDialog>
            </div>
            <div style={{ display: "flex", alignItems: "center" }}>
                <Input
                    type="number" // Use number input to handle numerical values
                    step="0.01" // Allow decimals with two decimal places
                    name={name}
                    value={value}
                    onChange={handleInputChange}
                    hasError={hasError}
                />
                {hasError && <WarningIcon icon={faExclamationCircle} />}
            </div>
        </Label>
    );
};

export default InputWithTooltip;
