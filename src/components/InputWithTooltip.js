import React, { useState } from 'react';
import { Input, WarningIcon, Label, TooltipIcon, TooltipDialog, ClearButton } from '../App.styles';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationCircle, faQuestionCircle, faTimes } from "@fortawesome/free-solid-svg-icons"; 

const InputWithTooltip = ({ label, name, value, onChange, tooltipContent, image }) => {
    const [tooltipVisible, setTooltipVisible] = useState(false);
    const [hasError, setHasError] = useState(false);

    const handleInputChange = (e) => {
        const inputValue = e.target.value;

        // Only allow numerical input with optional decimals
        // Use a regex that allows digits, a single decimal point, or an empty string
        // Also allow negative numbers if needed, assuming yes for things like dispersion
        const regex = /^-?\d*\.?\d*$/;
        
        if (regex.test(inputValue) || inputValue === "") {
             onChange(e); 
             if (inputValue === "" || (inputValue === "-" || inputValue === ".")) {
                 setHasError(true); // Technically incomplete, but let them type
             } else {
                 setHasError(false);
             }
        } else {
           // Invalid character, don't update state but maybe show error momentarily?
           // For now, React controlled component won't allow the character.
        }
    };
    
    const handleClear = () => {
        // Create a synthetic event
        const syntheticEvent = {
            target: {
                name: name,
                value: ""
            }
        };
        onChange(syntheticEvent);
        setHasError(true); // Empty is error usually in this context
    }

    const showTooltip = tooltipContent || image;

    return (
        <Label>
            {label}
            {showTooltip && (
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
            )}
            <div style={{ display: "flex", alignItems: "center" }}>
                <ClearButton onClick={handleClear} type="button" title="Wyczyść pole">
                     <FontAwesomeIcon icon={faTimes} />
                </ClearButton>
                <Input
                    type="text" // Use text to allow fuller control over regex validation, allows '-.'
                    inputMode="decimal"
                    name={name}
                    value={value}
                    onChange={handleInputChange}
                    hasError={hasError}
                    autoComplete="off"
                />
                {hasError && <WarningIcon icon={faExclamationCircle} />}
            </div>
        </Label>
    );
};

export default InputWithTooltip;
