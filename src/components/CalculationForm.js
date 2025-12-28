import React from 'react';
import {
    Input,
    Label,
    ReadOnly,
    LowerIndex,
    Highlight
} from '../App.styles';
import InputWithTooltip from "./InputWithTooltip";

// Images
import routeImage from "../images/totalRoute.png"
import kartaSwiatlowodu from "../images/kartaSwiatlowodu.png"
import lx from "../images/lx.png"
import as from "../images/as.png"
import ac from "../images/ac.png"
import margines from "../images/margines.png"
import wspolczynnikDyspersji from "../images/wspolczynnikDyspersji.png"
import wspolczynnikDyspersjiDCF from "../images/wspolczynnikDyspersjiDCF.png"
import dlugoscFali from "../images/dlugoscFali.png"
import przepustowosci from "../images/przepustowosci.png"
import iloscFotonow from "../images/iloscFotonow.png"
import czuloscFotoidy from "../images/czuloscFotoidy.png"
import tlumienieDCF from "../images/tlumienieDCF.png"
import tlumienieFDCF from "../images/tlumienieFDCF.png"

const CalculationForm = ({ inputs, handleChange, segmentAttenuation, splicesCount, dispersion, LDCF, wavelength, speed1, speed2, speed3 }) => {
    return (
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
                        Strata na spawie [A<sub>s</sub>] (dB):
                    </>
                }
                name="spliceLoss"
                value={inputs.spliceLoss}
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
                        Strata na złączu <Highlight
                        version={"FDCF"}>FDCF</Highlight> [A<LowerIndex>c</LowerIndex>] (dB):
                    </>
                }
                name="connectorLossFDCF"
                value={inputs.connectorLossFDCF}
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
            <Label>
                Ilość złącz <Highlight version={"DCF"}>DCF</Highlight> [n<LowerIndex>c</LowerIndex>]:
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
                        version={"DCF"}>DCF</Highlight> [A<LowerIndex>c</LowerIndex>] (dB):
                    </>
                }
                name="connectorLossDCF"
                value={inputs.connectorLossDCF}
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
                <ReadOnly>{parseFloat(dispersion).toFixed(2)}</ReadOnly>
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
                <ReadOnly>{LDCF} km</ReadOnly>
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
                    Tłumienie światłowodu kompensującego dyspersję na kilometr <Highlight
                    version={"DCF"}>DCF</Highlight>:
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
                        `Znajdź moduł obejmujący twoją dyspersję = ${parseFloat(dispersion).toFixed(2)}`,
                        "Znajdź wartość tłumienia dla swojej długości fali (ang. Attenuation)",
                        "Wprowadź wartość w dB/km"
                    ],
                }}
                image={tlumienieFDCF}
            />
        </form>
    );
};

export default CalculationForm;
