import React, { useState } from 'react';
import { Input, WarningIcon, Label, TooltipIcon, TooltipDialog } from './App.styles';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faExclamationCircle, faQuestionCircle} from "@fortawesome/free-solid-svg-icons"; // Import styled components

const InputWithTooltip = ({ label, name, value, onChange, tooltipContent, image }) => {
    const [tooltipVisible, setTooltipVisible] = useState(false);
    const [hasError, setHasError] = useState(false);

    const handleInputChange = (e) => {
        onChange(e);
        setHasError(e.target.value.trim() === ""); // Mark as error if input is empty
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
                    <p>{tooltipContent.title}</p>
                    <ol>
                        {tooltipContent.steps.map((step, index) => (
                            <li key={index}>{step}</li>
                        ))}
                    </ol>
                    {image && <img src={image} alt="Example" style={{ maxWidth: "100%" }} />}
                </TooltipDialog>
            </div>
            <div style={{ display: "flex", alignItems: "center" }}>
                <Input
                    type="text"
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
