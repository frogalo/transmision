import { useState } from 'react';

const initialInputs = {
    routeLength: "104", // km
    attenuationCoefficient: "0.25", // dB/km
    spliceDistance: "6", // km
    spliceLoss: "0.1", // dB
    connectorCountFDCF: "1", // FDCF
    connectorLossFDCF: "0.5", // dB
    connectorCountDCF: "3", // DCF
    connectorLossDCF: "0.5", // dB
    dispersionCoefficient: "10", // ps/nm/km
    spectralWidth: "1", // nm
    DSMF: "8", // ps/nm/km
    DDCF: "-38", // ps/nm/km
    wavelengthNM: "1550", // m
    speedOfLight: "300000000", // m/s
    bandwidth: "1", // GBit/s
    bandwidth2: "5", // GBit/s
    bandwidth3: "10", // GBit/s
    photonsPerBit: "1000", // n0
    photodiodeEfficiency: "0.5", // η
    planckConstant: (6.6261 * Math.pow(10, -34)).toString(), // η
    margin: "6",
    dcfAttenuationAlfa: "0.265",
    fdcfAttenuation: "6.4",
};

const useCalculations = () => {
    const [inputs, setInputs] = useState(initialInputs);

    const handleClearAll = () => {
        setInputs({
            routeLength: "0",
            attenuationCoefficient: "0",
            spliceDistance: "0",
            spliceLoss: "0",
            connectorCountFDCF: "0",
            connectorLossFDCF: "0",
            connectorCountDCF: "0",
            connectorLossDCF: "0",
            dispersionCoefficient: "0",
            spectralWidth: "0",
            DSMF: "0",
            DDCF: "0",
            wavelengthNM: "0",
            speedOfLight: "0",
            bandwidth: "0",
            bandwidth2: "0",
            bandwidth3: "0",
            photonsPerBit: "0",
            photodiodeEfficiency: "0",
            planckConstant: "0",
            margin: "0",
            dcfAttenuationAlfa: "0",
            fdcfAttenuation: "0",
        });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInputs((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // Helper to safely parse inputs
    const safeParse = (value) => {
        const parsed = parseFloat(value);
        return isNaN(parsed) ? 0 : parsed;
    };

    // Parse inputs for calculations
    const routeLength = safeParse(inputs.routeLength);
    const spliceDistance = safeParse(inputs.spliceDistance);
    const spliceLoss = safeParse(inputs.spliceLoss);
    const connectorCountFDCF = safeParse(inputs.connectorCountFDCF);
    const connectorLossFDCF = safeParse(inputs.connectorLossFDCF);
    const connectorCountDCF = safeParse(inputs.connectorCountDCF);
    const connectorLossDCF = safeParse(inputs.connectorLossDCF);
    const dispersionCoefficient = safeParse(inputs.dispersionCoefficient);
    const spectralWidth = safeParse(inputs.spectralWidth);
    const DDCF = safeParse(inputs.DDCF);
    const wavelengthNM = safeParse(inputs.wavelengthNM);
    const speedOfLight = safeParse(inputs.speedOfLight);
    const bandwidth = safeParse(inputs.bandwidth);
    const bandwidth2 = safeParse(inputs.bandwidth2);
    const bandwidth3 = safeParse(inputs.bandwidth3);
    const photonsPerBit = safeParse(inputs.photonsPerBit);
    const photodiodeEfficiency = safeParse(inputs.photodiodeEfficiency);
    const planckConstant = safeParse(inputs.planckConstant);
    const margin = safeParse(inputs.margin);
    const dcfAttenuationAlfa = safeParse(inputs.dcfAttenuationAlfa);
    const fdcfAttenuation = safeParse(inputs.fdcfAttenuation);
    const attenuationCoefficient = safeParse(inputs.attenuationCoefficient);

    // Calculations logic
    const splicesCount = spliceDistance > 0 ? Math.floor(routeLength / spliceDistance) : 0;
    const spliceAttenuation = splicesCount * spliceLoss;
    const connectorAttenuationFDCF = connectorCountFDCF * connectorLossFDCF;
    const connectorAttenuationDCF = connectorCountDCF * connectorLossDCF;
    const totalAttenuationFDCF = spliceAttenuation + connectorAttenuationFDCF;
    const totalAttenuationDCF = spliceAttenuation + connectorAttenuationDCF;
    const dispersion = routeLength * dispersionCoefficient * spectralWidth;
    
    // Avoid division by zero
    const LDCF = DDCF !== 0 
        ? -((dispersionCoefficient * routeLength) / DDCF).toFixed(2) 
        : "0.00";

    const wavelength = (wavelengthNM * Math.pow(10, -9)); // m
    
    // Avoid division by zero
    const frequency = wavelength > 0 
        ? (speedOfLight / wavelength) 
        : 0;

    // Tłumienie na odcinku
    const segmentAttenuation = (routeLength * attenuationCoefficient).toFixed(2);

    // Czułość i predkowsc
    const speed1 = (bandwidth * Math.pow(10, 9));
    const speed2 = (bandwidth2 * Math.pow(10, 9));
    const speed3 = (bandwidth3 * Math.pow(10, 9));

    const calculateSensitivity = (speed) => {
      if (photodiodeEfficiency === 0) return 0;
      const res = Math.log10((parseFloat(speed) * parseFloat(frequency) * parseFloat(planckConstant) * parseFloat(photonsPerBit) / ((Math.pow(10, -3) * parseFloat(photodiodeEfficiency))))) * 10
      return isNaN(res) ? 0 : res;
    }

    const sensitivity1 = calculateSensitivity(speed1);
    const sensitivity2 = calculateSensitivity(speed2);
    const sensitivity3 = calculateSensitivity(speed3);

    const dcfAttenuation = parseFloat(dcfAttenuationAlfa * parseFloat(LDCF));

    const calculatePowerFDCF = (sensitivity) => {
        return (parseFloat(sensitivity) + margin + totalAttenuationFDCF + parseFloat(segmentAttenuation) + fdcfAttenuation);
    }

    const powerFDCF1 = calculatePowerFDCF(sensitivity1);
    const powerFDCF2 = calculatePowerFDCF(sensitivity2);
    const powerFDCF3 = calculatePowerFDCF(sensitivity3);

    const calculatePowerDCF = (sensitivity) => {
        return (parseFloat(sensitivity) + margin + totalAttenuationDCF + parseFloat(segmentAttenuation) + dcfAttenuationAlfa * parseFloat(LDCF));
    }

    const powerDCF1 = calculatePowerDCF(sensitivity1);
    const powerDCF2 = calculatePowerDCF(sensitivity2);
    const powerDCF3 = calculatePowerDCF(sensitivity3);

    return {
        inputs,
        handleChange,
        handleClearAll,
        results: {
            splicesCount,
            spliceAttenuation,
            connectorAttenuationFDCF,
            connectorAttenuationDCF,
            totalAttenuationFDCF,
            totalAttenuationDCF,
            dispersion,
            LDCF,
            wavelength,
            frequency,
            segmentAttenuation,
            speed1,
            speed2,
            speed3,
            sensitivity1,
            sensitivity2,
            sensitivity3,
            dcfAttenuation,
            powerFDCF1,
            powerFDCF2,
            powerFDCF3,
            powerDCF1,
            powerDCF2,
            powerDCF3
        }
    };
};

export default useCalculations;
