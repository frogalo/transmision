import React, {useState} from 'react';
import styled from 'styled-components';
import {faQuestionCircle} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import routeImage from "./images/totalRoute.png"
import kartaSwiatlowodu from "./images/kartaSwiatlowodu.png"
import lx from "./images/lx.png"
import as from "./images/as.png"
import ac from "./images/ac.png"
import margines from "./images/margines.png"
import wspolczynnikDyspersji from "./images/wspolczynnikDyspersji.png"
import wspolczynnikDyspersjiDCF from "./images/wspolczynnikDyspersjiDCF.png"
import dlugoscFali from "./images/dlugoscFali.png"
import przepustowosci from "./images/przepustowosci.png"
import iloscFotonow from "./images/iloscFotonow.png"
import czuloscFotoidy from "./images/czuloscFotoidy.png"
import tlumienieDCF from "./images/tlumienieDCF.png"
import tlumienieFDCF from "./images/tlumienieFDCF.png"
import Footer from "./Footer";

const Container = styled.div`
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

const Header = styled.h1`
    text-align: center;
    font-size: 1.8rem;
    color: #2c3e50;
    margin-bottom: 20px;
`;

const Input = styled.input`
    width: 100%;
    padding: 6px;
    margin: 8px 0;
    border: 1px solid #d1d9e6;
    border-radius: 4px;
    font-size: 0.9rem;
    box-sizing: border-box;
    transition: all 0.3s ease;

    &:focus {
        border-color: #3eaf7c;
        outline: none;
        box-shadow: 0 0 8px rgba(62, 175, 124, 0.5);
    }

    &:hover {
        border-color: #3eaf7c;
    }
`;

const ReadOnly = styled.div`
    padding: 6px;
    margin: 8px 0;
    background-color: #eef2f6;
    border: 1px solid #d1d9e6;
    border-radius: 4px;
    font-size: 0.9rem;
    color: #2c3e50;
`;

const Label = styled.label`
    font-size: 0.9rem;
    color: #2c3e50;
    display: block;
    margin-top: 10px;
`;
const LowerIndex = styled.span`
    font-size: 0.8em; /* Reduce the font size for the lower index */
    vertical-align: -0.3em; /* Position it lower relative to the baseline */
`;

const Highlight = styled.span`
    color: ${(props) =>
            props.version === "FDCF" ? "#3eaf7c" : props.version === "DCF" ? "#a73eaf" : "inherit"};
    font-weight: bold;
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
;`
const TableTitle = styled.div`
font-weight: bold;
`
const TooltipIcon = styled.span`
    margin-left: 8px;
    cursor: pointer;
    color: #9f9f9f; /* Adjust the color to match your theme */

    &:hover {
        color: #2c8b5f; /* Darker hover color */
    }

    position: relative;
`;

const TooltipDialog = styled.div`
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
const InputWithTooltip = ({label, name, value, onChange, tooltipContent, image}) => {
    const [tooltipVisible, setTooltipVisible] = useState(false);

    return (
        <Label>
            {/* Render the label using JSX components */}
            {label}
            <div style={{position: "relative", display: "inline-flex", alignItems: "center"}}>
                <TooltipIcon
                    onMouseEnter={() => setTooltipVisible(true)}
                    onMouseLeave={() => setTooltipVisible(false)}
                >
                    <FontAwesomeIcon icon={faQuestionCircle}/>
                </TooltipIcon>
                <TooltipDialog visible={tooltipVisible}>
                    <p>{tooltipContent.title}</p>
                    <ol>
                        {tooltipContent.steps.map((step, index) => (
                            <li key={index}>{step}</li>
                        ))}
                    </ol>
                    {image && <img src={image} alt="Example" style={{maxWidth: "100%"}}/>}
                </TooltipDialog>
            </div>
            <Input type="number" name={name} value={value} onChange={onChange}/>
        </Label>
    );
};


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
        wavelengthNM: 1550, // m
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
    const LDCF = -((inputs.dispersionCoefficient * inputs.routeLength) / inputs.DDCF).toFixed(2);
    const wavelength = (parseFloat(inputs.wavelengthNM) * Math.pow(10, -9)); // m
    const frequency = (inputs.speedOfLight / (parseFloat(inputs.wavelengthNM) * Math.pow(10, -9)));
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
                    <InputWithTooltip
                        label="Długość trasy [L] (km):"
                        name="routeLength"
                        value={inputs.routeLength}
                        onChange={handleChange}
                        tooltipContent={{
                            title: "Jak obliczyć odległość:",
                            steps: [
                                "Oblicz dystans używając mapy (np. Google Maps)",
                                "Korzystaj z dróg krajowych jeśli to możliwe",
                                "Wprowadź wartość w kilometrach",
                            ],
                        }}
                        image={routeImage}
                    />
                    <InputWithTooltip
                        label="Współczynnik tłumienia (dB/km):"
                        name="attenuationCoefficient"
                        value={inputs.attenuationCoefficient}
                        onChange={handleChange}
                        tooltipContent={{
                            title: "Jak znaleźć współczynnik:",
                            steps: [
                                "Otwórz kartę katalogową światłowodu",
                                "Znajdź wartość tłumienia dla swojej długości fali (ang. Attenuation)",
                                "Wprowadź wartość w dB/km"
                            ],
                        }}
                        image={kartaSwiatlowodu}
                    />
                    <Label>
                        Tłumienie na odcinku (dB):
                        <ReadOnly>{segmentAttenuation} dB</ReadOnly>
                    </Label>
                    <InputWithTooltip
                        label={
                            <>
                                Odległość między spawami [L<sub>x</sub>] (km):
                            </>
                        }
                        name="spliceDistance"
                        value={inputs.spliceDistance}
                        onChange={handleChange}
                        tooltipContent={{
                            title: "Jak znaleźć odległość:",
                            steps: [
                                "Odczytaj wartość LX[km] z treści projektu",
                                "Wprowadź wartość w kilometrach",
                            ],
                        }}
                        image={lx}
                    />
                    <Label>
                        Ilość spawów [n<LowerIndex>s</LowerIndex>]:
                        <ReadOnly>{splicesCount}</ReadOnly>
                    </Label>
                    <InputWithTooltip
                        label={
                            <>
                                Strata na spawie [A<sub>C</sub>] (dB):
                            </>
                        }
                        name="spliceLoss"
                        value={inputs.spliceLoss}
                        onChange={handleChange}
                        tooltipContent={{
                            title: "Jak znaleźć stratę:",
                            steps: [
                                "Odczytaj wartość Ac (dB) z treści projektu",
                                "Wprowadź wartość w dB",
                            ],
                        }}
                        image={ac}
                    />
                    <InputWithTooltip
                        label={
                            <>
                                Strata na złączu <Highlight
                                version={"FDCF"}>FDCF</Highlight> [A<LowerIndex>S</LowerIndex>] (dB):
                            </>
                        }
                        name="connectorLossFDCF"
                        value={inputs.connectorLossFDCF}
                        onChange={handleChange}
                        tooltipContent={{
                            title: "Jak znaleźć stratę:",
                            steps: [
                                "Odczytaj wartość As (dB) z treści projektu",
                                "Wprowadź wartość w dB",
                            ],
                        }}
                        image={as}
                    />
                    <Label>
                        Ilość złącz <Highlight version={"DCF"}>DCF</Highlight> [n<LowerIndex>s</LowerIndex>]:
                        <Input
                            type="number"
                            name="connectorCountDCF"
                            value={inputs.connectorCountDCF}
                            onChange={handleChange}
                        />
                    </Label>
                    <InputWithTooltip
                        label={
                            <>
                                Strata na złączu <Highlight
                                version={"DCF"}>DCF</Highlight> [A<LowerIndex>S</LowerIndex>] (dB):
                            </>
                        }
                        name="connectorLossDCF"
                        value={inputs.connectorLossDCF}
                        onChange={handleChange}
                        tooltipContent={{
                            title: "Jak znaleźć stratę:",
                            steps: [
                                "Odczytaj wartość As (dB) z treści projektu",
                                "Wprowadź wartość w dB",
                            ],
                        }}
                        image={as}
                    />
                    <InputWithTooltip
                        label={
                            <>
                                Współczynnik dyspersji [D<LowerIndex>SMF</LowerIndex>][D<LowerIndex>C</LowerIndex>]
                                (ps/nm/km):
                            </>
                        }
                        name="dispersionCoefficient"
                        value={inputs.dispersionCoefficient}
                        onChange={handleChange}
                        tooltipContent={{
                            title: "Jak znaleźć współczynnik:",
                            steps: [
                                "Odczytaj wartość z karty katalogowej (ang. Dispersion) dla swojej długości fali",
                                "Możesz przyjąć wartość pesymistyczną dla swojej fali",
                                "Wprowadź wartość w ps/[nm.km]",
                            ],
                        }}
                        image={wspolczynnikDyspersji}
                    />
                    <Label>
                        Szerokość widma [d\λ] (nm):
                        <Input
                            type="number"
                            name="spectralWidth"
                            value={inputs.spectralWidth}
                            onChange={handleChange}
                        />
                    </Label>
                    <Label>
                        Dyspersja [ps/nm]:
                        <ReadOnly>{dispersion.toFixed(2)}</ReadOnly>
                    </Label>
                    <InputWithTooltip
                        label={
                            <>
                                Współczynnik dyspersji światłowodu kompensującego [D<LowerIndex>DCF</LowerIndex>]
                                (ps/nm/km):
                            </>
                        }
                        name="DDCF"
                        value={inputs.DDCF}
                        onChange={handleChange}
                        tooltipContent={{
                            title: "Jak znaleźć współczynnik:",
                            steps: [
                                "Odczytaj wartość z karty katalogowej (ang. Dispersion) dla swojej długości fali",
                                "Możesz przyjąć wartość średnią albo pesymistyczną dla swojej fali",
                                "Wprowadź wartość w ps/[nm.km]",
                            ],
                        }}
                        image={wspolczynnikDyspersjiDCF}
                    />
                    <Label>
                        Długość światłowodu do kompensacji dyspersji [L<LowerIndex>DCF</LowerIndex>] (km):
                        <ReadOnly>{LDCF.toFixed(2)}</ReadOnly>
                    </Label>
                    <Label>
                        Długość fali [nm] (nm):
                        <Input
                            type="number"
                            name="wavelengthNM"
                            value={inputs.wavelengthNM}
                            onChange={handleChange}
                        />
                    </Label>
                    <InputWithTooltip
                        label={
                            <>
                                Długość fali [nm] (nm):
                            </>
                        }
                        name="wavelengthNM"
                        value={inputs.wavelengthNM}
                        onChange={handleChange}
                        tooltipContent={{
                            title: "Jak znaleźć długość fali:",
                            steps: [
                                "Odczytaj wartość treści projektu",
                                "Wprowadź wartość w nm",
                            ],
                        }}
                        image={dlugoscFali}
                    />
                    <Label>
                        Długość fali [λ] (m):
                        <ReadOnly>{(wavelength).toFixed(9)}</ReadOnly>
                    </Label>
                    <Label>
                        Prędkość w próżni (m/s):
                        <ReadOnly>{inputs.speedOfLight}</ReadOnly>
                    </Label>
                    <InputWithTooltip
                        label={
                            <>
                                Przepustowość 1 (GBit/s):
                            </>
                        }
                        name="bandwidth"
                        value={inputs.bandwidth}
                        onChange={handleChange}
                        tooltipContent={{
                            title: "Jak znaleźć przepsutowości:",
                            steps: [
                                "Odczytaj wartość treści projektu",
                                "Wprowadź wartość w GBit/s",
                            ],
                        }}
                        image={przepustowosci}
                    />
                    <Label>
                        Przepustowość 2 (GBit/s):
                        <Input
                            type="number"
                            name="bandwidth2"
                            value={inputs.bandwidth2}
                            onChange={handleChange}
                        />
                    </Label>
                    <Label>
                        Przepustowość 3 (GBit/s):
                        <Input
                            type="number"
                            name="bandwidth3"
                            value={inputs.bandwidth3}
                            onChange={handleChange}
                        />
                    </Label>
                    <InputWithTooltip
                        label={<>
                            Ilość fotonów na bit [n<LowerIndex>0</LowerIndex>]:
                        </>
                        }
                        name="photonsPerBit"
                        value={inputs.photonsPerBit}
                        onChange={handleChange}
                        tooltipContent={{
                            title: "Jak znaleźć ilość fotonów:",
                            steps: [
                                "Otwórz podręcznik i znajdź informację",
                                "Weź średnią lub pesymistyczną wartość",
                                "Wprowadź wartość fotonów/bit"
                            ],
                        }}
                        image={iloscFotonow}
                    />
                    <InputWithTooltip
                        label={<>
                            Sprawność fotodiody [η]:
                        </>
                        }
                        name="photodiodeEfficiency"
                        value={inputs.photodiodeEfficiency}
                        onChange={handleChange}
                        tooltipContent={{
                            title: "Jak znaleźć sprawność:",
                            steps: [
                                "Odczytaj wartość treści projektu",
                                "Wprowadź wartość"
                            ],
                        }}
                        image={czuloscFotoidy}
                    />
                    <Label>
                        Stała plancka:
                        <ReadOnly>{inputs.planckConstant}</ReadOnly>
                    </Label>
                    <Label>
                        Szybkość transmisji dla {inputs.bandwidth} GBit/s [B<LowerIndex>0</LowerIndex>]
                        <ReadOnly>{speed1}</ReadOnly>
                    </Label>
                    <Label>
                        Szybkość transmisji dla {inputs.bandwidth2} GBit/s [B<LowerIndex>0</LowerIndex>]
                        <ReadOnly>{speed2}</ReadOnly>
                    </Label>
                    <Label>
                        Szybkość transmisji dla {inputs.bandwidth3} GBit/s [B<LowerIndex>0</LowerIndex>]
                        <ReadOnly>{speed3}</ReadOnly>
                    </Label>
                    <InputWithTooltip
                        label={<>
                            Margines [P<LowerIndex>m</LowerIndex>]:
                        </>
                        }
                        name="margin"
                        value={inputs.margin}
                        onChange={handleChange}
                        tooltipContent={{
                            title: "Jak znaleźć margines:",
                            steps: [
                                "Odczytaj wartość treści projektu",
                                "Wprowadź wartość w dB"
                            ],
                        }}
                        image={margines}
                    />
                    <InputWithTooltip
                        label={<>
                            Tłumienie światłowodu kompensującego dyspersję <Highlight version={"DCF"}>DCF</Highlight>:
                        </>
                        }
                        name="dcfAttenuationAlfa"
                        value={inputs.dcfAttenuationAlfa}
                        onChange={handleChange}
                        tooltipContent={{
                            title: "Jak znaleźć tłumienie:",
                            steps: [
                                "Otwórz kartę katalogową światłowodu",
                                "Znajdź wartość tłumienia dla swojej długości fali (ang. Attenuation)",
                                "Wprowadź wartość w dB/km"
                            ],
                        }}
                        image={tlumienieDCF}
                    />
                    <InputWithTooltip
                        label={<>
                            Tłumienie światłowodu kompensującego dyspersję <Highlight version={"FDCF"}>FDCF</Highlight>:
                        </>
                        }
                        name="fdcfAttenuation"
                        value={inputs.fdcfAttenuation}
                        onChange={handleChange}
                        tooltipContent={{
                            title: "Jak znaleźć tłumienie:",
                            steps: [
                                "Otwórz kartę katalogową światłowodu",
                                `Znajdź moduł obejmujący twoją dyspersję = ${dispersion}`,
                                "Znajdź wartość tłumienia dla swojej długości fali (ang. Attenuation)",
                                "Wprowadź wartość w dB/km"
                            ],
                        }}
                        image={tlumienieFDCF}
                    />
                </form>

                <h2>Wyniki Obliczeń</h2>
                <Table>
                    <thead>
                    <TableTitle>Podstawowe wyniki</TableTitle>
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
                        <td>Tłumienie na złączach <Highlight version={"FDCF"}>FDCF</Highlight></td>
                        <td>{connectorAttenuationFDCF.toFixed(2)} dB</td>
                    </tr>
                    <tr>
                        <td>Tłumienie na złączach <Highlight version={"DCF"}>DCF</Highlight></td>
                        <td>{connectorAttenuationDCF.toFixed(2)} dB</td>
                    </tr>
                    <tr>
                        <td>Całkowite tłumienie na złączach i spawach <Highlight version={"FDCF"}>FDCF</Highlight></td>
                        <td>{totalAttenuationFDCF.toFixed(2)} dB</td>
                    </tr>
                    <tr>
                        <td>Całkowite tłumienie na złączach i spawach <Highlight version={"DCF"}>DCF</Highlight></td>
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
                        <td>Tłumienie światłowodu kompensującego dyspersję DCF<Highlight version={"DCF"}>DCF</Highlight>
                        </td>
                        <td>{dcfAttenuation.toFixed(2)} Hz</td>
                    </tr>
                    </tbody>
                </Table>
                <Table>
                    <thead>
                    <TableTitle>Czułość</TableTitle>
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
                    <TableTitle>Moc nadajnika [dBm]</TableTitle>
                    <tr>
                        <th>Parametr</th>
                        <th>Wynik</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>Moc nadajnika dla {inputs.bandwidth} MBit/s <Highlight version={"FDCF"}>FDCF</Highlight>
                        </td>
                        <td>{powerFDCF1.toFixed(2)} dBm</td>
                    </tr>
                    <tr>
                        <td>Moc nadajnika dla {inputs.bandwidth2} MBit/s <Highlight version={"FDCF"}>FDCF</Highlight>
                        </td>
                        <td>{powerFDCF2.toFixed(2)} dBm</td>
                    </tr>
                    <tr>
                        <td>Moc nadajnika dla {inputs.bandwidth3} MBit/s <Highlight version={"FDCF"}>FDCF</Highlight>
                        </td>
                        <td>{powerFDCF3.toFixed(2)} dBm</td>
                    </tr>
                    <tr>
                        <td>Moc nadajnika dla {inputs.bandwidth} MBit/s <Highlight version={"DCF"}>DCF</Highlight></td>
                        <td>{powerDCF1.toFixed(2)} dBm</td>
                    </tr>
                    <tr>
                        <td>Moc nadajnika dla {inputs.bandwidth2} MBit/s <Highlight version={"DCF"}>DCF</Highlight></td>
                        <td>{powerDCF2.toFixed(2)} dBm</td>
                    </tr>
                    <tr>
                        <td>Moc nadajnika dla {inputs.bandwidth3} MBit/s <Highlight version={"DCF"}>DCF</Highlight></td>
                        <td>{powerDCF3.toFixed(2)} dBm</td>
                    </tr>
                    </tbody>
                </Table>
                <Table>
                    <thead>
                    <TableTitle>Moc nadajnika [mW]</TableTitle>
                    <tr>
                        <th>Parametr</th>
                        <th>Wynik</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>Moc nadajnika dla {inputs.bandwidth} MBit/s <Highlight version={"FDCF"}>FDCF</Highlight>
                        </td>
                        <td>{HzToMw(powerFDCF1.toFixed(2))} mW</td>
                    </tr>
                    <tr>
                        <td>Moc nadajnika dla {inputs.bandwidth2} MBit/s <Highlight version={"FDCF"}>FDCF</Highlight>
                        </td>
                        <td>{HzToMw(powerFDCF2.toFixed(2))} mW</td>
                    </tr>
                    <tr>
                        <td>Moc nadajnika dla {inputs.bandwidth3} MBit/s <Highlight version={"FDCF"}>FDCF</Highlight>
                        </td>
                        <td>{HzToMw(powerFDCF3.toFixed(2))} mW</td>
                    </tr>
                    <tr>
                        <td>Moc nadajnika dla {inputs.bandwidth} MBit/s <Highlight version={"DCF"}>DCF</Highlight></td>
                        <td>{HzToMw(powerDCF1.toFixed(2))} mW</td>
                    </tr>
                    <tr>
                        <td>Moc nadajnika dla {inputs.bandwidth2} MBit/s <Highlight version={"DCF"}>DCF</Highlight></td>
                        <td>{HzToMw(powerDCF2.toFixed(2))} mW</td>
                    </tr>
                    <tr>
                        <td>Moc nadajnika dla {inputs.bandwidth3} MBit/s <Highlight version={"DCF"}>DCF</Highlight></td>
                        <td>{HzToMw(powerDCF3.toFixed(2))} mW</td>
                    </tr>
                    </tbody>
                </Table>
            </Container>
            <Footer/>
        </>
    );
};


export default App;
