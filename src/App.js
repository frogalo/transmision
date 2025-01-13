import React, {useState} from 'react';
import styled from 'styled-components';

const Container = styled.div`
    padding: 20px;
    margin: 12px auto;
    max-width: 800px;
    font-family: Arial, sans-serif;
    line-height: 1.6;
    background-color: rgba(204, 204, 204, 0.24);
    border: 1px solid #ddd;
    border-radius: 8px;
`;

const Table = styled.table`
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
`;

const Header = styled.h1`
    text-align: center;
    color: #333;
`;

const Input = styled.input`
    width: 100%;
    padding: 8px;
    margin: 5px 0;
    border: 1px solid #ddd;
    border-radius: 4px;
    box-sizing: border-box;
`;

const ReadOnly = styled.div`
    padding: 8px;
    margin: 5px 0;
    background-color: #e9ecef;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 0.9rem;
`;

const App = () => {
    const [inputs, setInputs] = useState({
        routeLength: 104, // km
        attenuationCoefficient: 0.25, // dB/km
        spliceDistance: 6, // km
        spliceLoss: 0.5, // dB
        connectorCountFDCF: 1, // FDCF
        connectorLossFDCF: 0.1, // dB
        connectorCountDCF: 3, // DCF
        connectorLossDCF: 0.1, // dB
        dispersionCoefficient: 10, // ps/nm/km
        spectralWidth: 1, // nm
        DSMF: 8, // ps/nm/km
        DDCF: -38, // ps/nm/km
        wavelength: 0.00000155, // m
        speedOfLight: 300000000, // m/s
        bandwidth: 1, // GBit/s
        bandwidth2: 5, // GBit/s
        bandwidth3: 10, // GBit/s
        photonsPerBit: 1000, // n0
        photodiodeEfficiency: 0.5, // η
        planckConstant: 6.6261 * Math.pow(10, -34), // η
        margin: 8,
        dcfAttenuationAlfa: 0.265,
        fdcfAttenuation: 6.4,

    });

    const handleChange = (e) => {
        const {name, value} = e.target;
        setInputs((prev) => ({
            ...prev,
            [name]: parseFloat(value) || 0,
        }));
    };
    const splicesCount = Math.floor(inputs.routeLength / inputs.spliceDistance);
    const spliceAttenuation = splicesCount * inputs.spliceLoss;
    const connectorAttenuationFDCF = inputs.connectorCountFDCF * inputs.connectorLossFDCF;
    const connectorAttenuationDCF = inputs.connectorCountDCF * inputs.connectorLossDCF;
    const totalAttenuationFDCF = spliceAttenuation + connectorAttenuationFDCF;
    const totalAttenuationDCF = spliceAttenuation + connectorAttenuationDCF;
    const dispersion = inputs.routeLength * inputs.dispersionCoefficient * inputs.spectralWidth;
    const LDCF = -((inputs.DSMF * inputs.routeLength) / inputs.DDCF).toFixed(2);
    const frequency = (inputs.speedOfLight / inputs.wavelength).toFixed(2);
    // Tłumienie na odcinku
    const segmentAttenuation = (inputs.routeLength * inputs.attenuationCoefficient).toFixed(2);
    // Czułość i predkowsc
    const speed1 = (inputs.bandwidth * Math.pow(10, 9));
    const speed2 = (inputs.bandwidth2 * Math.pow(10, 9));
    const speed3 = (inputs.bandwidth3 * Math.pow(10, 9));
    const sensitivity1 = Math.log10((parseFloat(speed1) * parseFloat(frequency) * parseFloat(inputs.planckConstant) * parseFloat(inputs.photonsPerBit) / ((Math.pow(10, -3) * parseFloat(inputs.photodiodeEfficiency))))) * 10
    const sensitivity2 = Math.log10((parseFloat(speed2) * parseFloat(frequency) * parseFloat(inputs.planckConstant) * parseFloat(inputs.photonsPerBit) / ((Math.pow(10, -3) * parseFloat(inputs.photodiodeEfficiency))))) * 10
    const sensitivity3 = Math.log10((parseFloat(speed3) * parseFloat(frequency) * parseFloat(inputs.planckConstant) * parseFloat(inputs.photonsPerBit) / ((Math.pow(10, -3) * parseFloat(inputs.photodiodeEfficiency))))) * 10

    // console.log('sensitivity1',Math.log10((parseFloat(speed1) * parseFloat(frequency) * parseFloat(inputs.planckConstant) * parseFloat(inputs.photonsPerBit)/ ((Math.pow(10, -3) * parseFloat(inputs.photodiodeEfficiency)))))*10 );
    //moce
    const dcfAttenuation = parseFloat(parseFloat(inputs.dcfAttenuationAlfa) * parseFloat(LDCF))
    const powerFDCF1 = (parseFloat(sensitivity1) + parseFloat(inputs.margin) + totalAttenuationFDCF + parseFloat(segmentAttenuation) + parseFloat(inputs.fdcfAttenuation))
    const powerFDCF2 = (parseFloat(sensitivity2) + parseFloat(inputs.margin) + totalAttenuationFDCF + parseFloat(segmentAttenuation) + parseFloat(inputs.fdcfAttenuation))
    const powerFDCF3 = (parseFloat(sensitivity3) + parseFloat(inputs.margin) + totalAttenuationFDCF + parseFloat(segmentAttenuation) + parseFloat(inputs.fdcfAttenuation))
    const powerDCF1 = (parseFloat(sensitivity1) + parseFloat(inputs.margin) + totalAttenuationDCF + parseFloat(segmentAttenuation) + parseFloat(inputs.dcfAttenuationAlfa) * parseFloat(LDCF))
    const powerDCF2 = (parseFloat(sensitivity2) + parseFloat(inputs.margin) + totalAttenuationDCF + parseFloat(segmentAttenuation) + parseFloat(parseFloat(inputs.dcfAttenuationAlfa) * parseFloat(LDCF)))
    const powerDCF3 = (parseFloat(sensitivity3) + parseFloat(inputs.margin) + totalAttenuationDCF + parseFloat(segmentAttenuation) + parseFloat(parseFloat(inputs.dcfAttenuationAlfa) * parseFloat(LDCF)))

    function HzToMw(HzValue) {
        // Calculate MvValue
        return Math.pow(10, HzValue / 10).toFixed(2);
    }

    return (
        <>
            <Container>
                <Header>Ilustracja Obliczeń Światłowodowych</Header>

                <h2>Zmienne Wejściowe</h2>
                <form>
                    <label>
                        Długość trasy [L] (km):
                        <Input
                            type="number"
                            name="routeLength"
                            value={inputs.routeLength}
                            onChange={handleChange}
                        />
                    </label>
                    <label>
                        Współczynnik tłumienia (dB/km):
                        <Input
                            type="number"
                            name="attenuationCoefficient"
                            value={inputs.attenuationCoefficient}
                            onChange={handleChange}
                        />
                    </label>
                    <label>
                        Tłumienie na odcinku (dB):
                        <ReadOnly>{segmentAttenuation} dB</ReadOnly>
                    </label>
                    <label>
                        Odległość między spawami [Lx] (km):
                        <Input
                            type="number"
                            name="spliceDistance"
                            value={inputs.spliceDistance}
                            onChange={handleChange}
                        />
                    </label>
                    <label>
                        Ilość spawów [ns]:
                        <Input
                            type="text"
                            value={splicesCount}
                            readOnly
                            style={{backgroundColor: '#f0f0f0'}}
                        />
                    </label>
                    <label>
                        Strata na spawie [Ac] (dB):
                        <Input
                            type="number"
                            name="spliceLoss"
                            value={inputs.spliceLoss}
                            onChange={handleChange}
                        />
                    </label>
                    <label>
                        Ilość złącz FDCF [ns]:
                        <Input
                            type="number"
                            name="connectorCount"
                            value={inputs.connectorCountFDCF}
                            onChange={handleChange}
                        />
                    </label>
                    <label>
                        Strata na złączu FDCF [As] (dB):
                        <Input
                            type="number"
                            name="connectorLoss"
                            value={inputs.connectorLossFDCF}
                            onChange={handleChange}
                        />
                    </label>
                    <label>
                        Ilość złącz DCF [ns]:
                        <Input
                            type="number"
                            name="connectorCount"
                            value={inputs.connectorCountDCF}
                            onChange={handleChange}
                        />
                    </label>
                    <label>
                        Strata na złączu DCF [As] (dB):
                        <Input
                            type="number"
                            name="connectorLoss"
                            value={inputs.connectorLossDCF}
                            onChange={handleChange}
                        />
                    </label>
                    <label>
                        Współczynnik dyspersji [Dc] (ps/nm/km):
                        <Input
                            type="number"
                            name="dispersionCoefficient"
                            value={inputs.dispersionCoefficient}
                            onChange={handleChange}
                        />
                    </label>
                    <label>
                        Szerokość widma [d\λ] (nm):
                        <Input
                            type="number"
                            name="spectralWidth"
                            value={inputs.spectralWidth}
                            onChange={handleChange}
                        />
                    </label>
                    <label>
                        Dyspersja [ps/nm]:
                        <Input
                            type="text"
                            value={dispersion.toFixed(2)}
                            readOnly
                            style={{backgroundColor: '#f0f0f0'}}
                        />
                    </label>
                    <label>
                        Współczynnik dyspersji światłowodu badanego [DSMF] (ps/nm/km):
                        <Input
                            type="number"
                            name="DSMF"
                            value={inputs.DSMF}
                            onChange={handleChange}
                        />
                    </label>
                    <label>
                        Współczynnik dyspersji światłowodu kompensującego [DDCF] (ps/nm/km):
                        <Input
                            type="number"
                            name="DDCF"
                            value={inputs.DDCF}
                            onChange={handleChange}
                        />
                    </label>
                    <label>
                        Długość światłowodu do kompensacji dyspersji [LDCF]:
                        <Input
                            type="text"
                            value={LDCF.toFixed(2)}
                            readOnly
                            style={{backgroundColor: '#f0f0f0'}}
                        />
                    </label>
                    <label>
                        Długość fali [λ] (m):
                        <Input
                            type="number"
                            name="wavelength"
                            value={inputs.wavelength}
                            onChange={handleChange}
                        />
                    </label>
                    <label>
                        Prędkość w próżni (m/s):
                        <Input
                            type="text"
                            style={{backgroundColor: '#f0f0f0'}}
                            value={inputs.speedOfLight}
                            readOnly
                        />
                    </label>
                    <label>
                        Przepustowość 1 [GBit/s]:
                        <Input
                            type="number"
                            name="bandwidth"
                            value={inputs.bandwidth}
                            onChange={handleChange}
                        />
                    </label>
                    <label>
                        Przepustowość 2 [GBit/s]:
                        <Input
                            type="number"
                            name="bandwidth2"
                            value={inputs.bandwidth2}
                            onChange={handleChange}
                        />
                    </label>
                    <label>
                        Przepustowość 3 [GBit/s]:
                        <Input
                            type="number"
                            name="bandwidth3"
                            value={inputs.bandwidth3}
                            onChange={handleChange}
                        />
                    </label>
                    <label>
                        Ilość fotonów na bit [n0]:
                        <Input
                            type="number"
                            name="photonsPerBit"
                            value={inputs.photonsPerBit}
                            onChange={handleChange}
                        />
                    </label>
                    <label>
                        Sprawność fotodiody [η]:
                        <Input
                            type="number"
                            name="photodiodeEfficiency"
                            value={inputs.photodiodeEfficiency}
                            onChange={handleChange}
                        />
                    </label>
                    <label>
                        Stała plancka:
                        <Input
                            type="text"
                            value={inputs.planckConstant}
                            readOnly
                            style={{backgroundColor: '#f0f0f0'}}
                        />
                    </label>
                    <label>
                        Szybkość transmisji dla {inputs.bandwidth} GBit/s [B0]
                        <Input
                            type="text"
                            value={speed1}
                            readOnly
                            style={{backgroundColor: '#f0f0f0'}}
                        />
                    </label>
                    <label>
                        Szybkość transmisji dla {inputs.bandwidth2} GBit/s [B0]
                        <Input
                            type="text"
                            value={speed2}
                            readOnly
                            style={{backgroundColor: '#f0f0f0'}}
                        />
                    </label>
                    <label>
                        Szybkość transmisji dla {inputs.bandwidth3} GBit/s [B0]
                        <Input
                            type="text"
                            value={speed3}
                            readOnly
                            style={{backgroundColor: '#f0f0f0'}}
                        />
                    </label>
                    <label>
                        Margines [Pm]:
                        <Input
                            type="number"
                            name="magin"
                            value={inputs.margin}
                            onChange={handleChange}
                        />
                    </label>
                    <label>
                        Alfa tłumienia światłowodu kompensującego dyspersję DCF:
                        <Input
                            type="number"
                            name="dcfAttenuationAlfa"
                            value={inputs.dcfAttenuationAlfa}
                            onChange={handleChange}
                        />
                    </label>
                    <label>
                        Tłumienie światłowodu kompensującego dyspersję FDCF:
                        <Input
                            type="number"
                            name="fdcfAttenuationAlfa"
                            value={inputs.fdcfAttenuation}
                            onChange={handleChange}
                        />
                    </label>
                </form>

                <h2>Wyniki Obliczeń</h2>
                <Table>
                    <thead>
                    <h4>Podstawowe wyniki</h4>
                    <tr>
                        <th>Parametr</th>
                        <th>Wynik</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>Tłumienie na spawach</td>
                        <td>{spliceAttenuation.toFixed(2)} dB</td>
                    </tr>
                    <tr>
                        <td>Tłumienie na złączach FDCF</td>
                        <td>{connectorAttenuationFDCF.toFixed(2)} dB</td>
                    </tr>
                    <tr>
                        <td>Tłumienie na złączach DCF</td>
                        <td>{connectorAttenuationDCF.toFixed(2)} dB</td>
                    </tr>
                    <tr>
                        <td>Całkowite tłumienie na złączach i spawach FDCF</td>
                        <td>{totalAttenuationFDCF.toFixed(2)} dB</td>
                    </tr>
                    <tr>
                        <td>Całkowite tłumienie na złączach i spawach DCF</td>
                        <td>{totalAttenuationDCF.toFixed(2)} dB</td>
                    </tr>
                    <tr>
                        <td>Dyspersja</td>
                        <td>{dispersion.toFixed(2)} ps/nm</td>
                    </tr>
                    <tr>
                        <td>Długość światłowodu do kompensacji dyspersji</td>
                        <td>{LDCF} km</td>
                    </tr>
                    <tr>
                        <td>Częstotliwość</td>
                        <td>{frequency} Hz</td>
                    </tr>
                    <tr>
                        <td>Tłumienie światłowodu kompensującego dyspersję DCF</td>
                        <td>{dcfAttenuation.toFixed(2)} Hz</td>
                    </tr>
                    </tbody>
                </Table>
                <Table>
                    <thead>
                    <h4>Czułość</h4>
                    <tr>
                        <th>Parametr</th>
                        <th>Wynik</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>Czułość dla przepustowości {inputs.bandwidth} MBit/s</td>
                        <td>{sensitivity1.toFixed(2)} dB</td>
                    </tr>
                    <tr>
                        <td>Czułość dla przepustowości {inputs.bandwidth2} MBit/s</td>
                        <td>{sensitivity2.toFixed(2)} dB</td>
                    </tr>
                    <tr>
                        <td>Czułość dla przepustowości {inputs.bandwidth3} MBit/s</td>
                        <td>{sensitivity3.toFixed(2)} dB</td>
                    </tr>

                    </tbody>
                </Table>
                <Table>
                    <thead>
                    <h4>Moc nadajnika [dBm]</h4>
                    <tr>
                        <th>Parametr</th>
                        <th>Wynik</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>Moc nadajnika dla {inputs.bandwidth} MBit/s FDCF</td>
                        <td>{powerFDCF1.toFixed(2)} mW</td>
                    </tr>
                    <tr>
                        <td>Moc nadajnika dla {inputs.bandwidth2} MBit/s FDCF</td>
                        <td>{powerFDCF2.toFixed(2)} mW</td>
                    </tr>
                    <tr>
                        <td>Moc nadajnika dla {inputs.bandwidth3} MBit/s FDCF</td>
                        <td>{powerFDCF3.toFixed(2)} mW</td>
                    </tr>
                    <tr>
                        <td>Moc nadajnika dla {inputs.bandwidth} MBit/s DCF</td>
                        <td>{powerDCF1.toFixed(2)} mW</td>
                    </tr>
                    <tr>
                        <td>Moc nadajnika dla {inputs.bandwidth2} MBit/s DCF</td>
                        <td>{powerDCF2.toFixed(2)} mW</td>
                    </tr>
                    <tr>
                        <td>Moc nadajnika dla {inputs.bandwidth3} MBit/s DCF</td>
                        <td>{powerDCF3.toFixed(2)} mW</td>
                    </tr>
                    </tbody>
                </Table>
                <Table>
                    <thead>
                    <h4>Moc nadajnika [mW]</h4>
                    <tr>
                        <th>Parametr</th>
                        <th>Wynik</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>Moc nadajnika dla {inputs.bandwidth} MBit/s FDCF</td>
                        <td>{HzToMw(powerFDCF1.toFixed(2))} dBm</td>
                    </tr>
                    <tr>
                        <td>Moc nadajnika dla {inputs.bandwidth2} MBit/s FDCF</td>
                        <td>{HzToMw(powerFDCF2.toFixed(2))} dBm</td>
                    </tr>
                    <tr>
                        <td>Moc nadajnika dla {inputs.bandwidth3} MBit/s FDCF</td>
                        <td>{HzToMw(powerFDCF3.toFixed(2))} dBm</td>
                    </tr>
                    <tr>
                        <td>Moc nadajnika dla {inputs.bandwidth} MBit/s DCF</td>
                        <td>{HzToMw(powerDCF1.toFixed(2))} dBm</td>
                    </tr>
                    <tr>
                        <td>Moc nadajnika dla {inputs.bandwidth2} MBit/s DCF</td>
                        <td>{HzToMw(powerDCF2.toFixed(2))} dBm</td>
                    </tr>
                    <tr>
                        <td>Moc nadajnika dla {inputs.bandwidth3} MBit/s DCF</td>
                        <td>{HzToMw(powerDCF3.toFixed(2))} dBm</td>
                    </tr>
                    </tbody>
                </Table>
            </Container>
        </>
    );
};

export default App;
