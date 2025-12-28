import { Table, TableTitle, Highlight, TableWrapper, ResultTooltip } from '../App.styles';

const ResultsTable = ({ results, inputs, HzToMw }) => {
    const {
        spliceAttenuation,
        connectorAttenuationFDCF,
        connectorAttenuationDCF,
        totalAttenuationFDCF,
        totalAttenuationDCF,
        dispersion,
        LDCF,
        frequency,
        dcfAttenuation,
        sensitivity1,
        sensitivity2,
        sensitivity3,
        powerFDCF1,
        powerFDCF2,
        powerFDCF3,
        powerDCF1,
        powerDCF2,
        powerDCF3
    } = results;

    return (
        <>
            <TableWrapper>
                <TableTitle>Podstawowe wyniki</TableTitle>
                <Table>
                    <thead>
                        <tr>
                            <th>Parametr</th>
                            <th>Wynik</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Tłumienie na spawach</td>
                            <td>{parseFloat(spliceAttenuation).toFixed(2)} dB</td>
                        </tr>
                        <tr>
                            <td>Tłumienie na złączach <Highlight version={"FDCF"}>FDCF</Highlight></td>
                            <td>{parseFloat(connectorAttenuationFDCF).toFixed(2)} dB</td>
                        </tr>
                        <tr>
                            <td>Tłumienie na złączach <Highlight version={"DCF"}>DCF</Highlight></td>
                            <td>{parseFloat(connectorAttenuationDCF).toFixed(2)} dB</td>
                        </tr>
                        <tr>
                            <td>Całkowite tłumienie na złączach i spawach <Highlight version={"FDCF"}>FDCF</Highlight></td>
                            <td>{parseFloat(totalAttenuationFDCF).toFixed(2)} dB</td>
                        </tr>
                        <tr>
                            <td>Całkowite tłumienie na złączach i spawach <Highlight version={"DCF"}>DCF</Highlight></td>
                            <td>{parseFloat(totalAttenuationDCF).toFixed(2)} dB</td>
                        </tr>
                        <tr>
                            <td>Dyspersja</td>
                            <td>{parseFloat(dispersion).toFixed(2)} ps/nm</td>
                        </tr>
                        <tr>
                            <td>Długość światłowodu do kompensacji dyspersji</td>
                            <td>{LDCF} km</td>
                        </tr>
                        <tr>
                            <td>Częstotliwość</td>
                            <td>
                                <ResultTooltip data-tooltip={`${(frequency / 1e14).toFixed(4)} · 10¹⁴ Hz`}>
                                    {frequency} Hz
                                </ResultTooltip>
                            </td>
                        </tr>
                        <tr>
                            <td>Tłumienie światłowodu kompensującego dyspersję <Highlight version={"DCF"}>DCF</Highlight></td>
                            <td>{parseFloat(dcfAttenuation).toFixed(2)} Hz</td>
                        </tr>
                    </tbody>
                </Table>
            </TableWrapper>

            <TableWrapper>
                <TableTitle>Czułość</TableTitle>
                <Table>
                    <thead>
                        <tr>
                            <th>Parametr</th>
                            <th>Wynik</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Czułość dla przepustowości {inputs.bandwidth} MBit/s</td>
                            <td>{parseFloat(sensitivity1).toFixed(2)} dB</td>
                        </tr>
                        <tr>
                            <td>Czułość dla przepustowości {inputs.bandwidth2} MBit/s</td>
                            <td>{parseFloat(sensitivity2).toFixed(2)} dB</td>
                        </tr>
                        <tr>
                            <td>Czułość dla przepustowości {inputs.bandwidth3} MBit/s</td>
                            <td>{parseFloat(sensitivity3).toFixed(2)} dB</td>
                        </tr>
                    </tbody>
                </Table>
            </TableWrapper>

            <TableWrapper>
                <TableTitle>Moc nadajnika [dBm]</TableTitle>
                <Table>
                    <thead>
                        <tr>
                            <th>Parametr</th>
                            <th>Wynik</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Moc nadajnika dla {inputs.bandwidth} MBit/s <Highlight version={"FDCF"}>FDCF</Highlight></td>
                            <td>{parseFloat(powerFDCF1).toFixed(2)} dBm</td>
                        </tr>
                        <tr>
                            <td>Moc nadajnika dla {inputs.bandwidth2} MBit/s <Highlight version={"FDCF"}>FDCF</Highlight></td>
                            <td>{parseFloat(powerFDCF2).toFixed(2)} dBm</td>
                        </tr>
                        <tr>
                            <td>Moc nadajnika dla {inputs.bandwidth3} MBit/s <Highlight version={"FDCF"}>FDCF</Highlight></td>
                            <td>{parseFloat(powerFDCF3).toFixed(2)} dBm</td>
                        </tr>
                        <tr>
                            <td>Moc nadajnika dla {inputs.bandwidth} MBit/s <Highlight version={"DCF"}>DCF</Highlight></td>
                            <td>{parseFloat(powerDCF1).toFixed(2)} dBm</td>
                        </tr>
                        <tr>
                            <td>Moc nadajnika dla {inputs.bandwidth2} MBit/s <Highlight version={"DCF"}>DCF</Highlight></td>
                            <td>{parseFloat(powerDCF2).toFixed(2)} dBm</td>
                        </tr>
                        <tr>
                            <td>Moc nadajnika dla {inputs.bandwidth3} MBit/s <Highlight version={"DCF"}>DCF</Highlight></td>
                            <td>{parseFloat(powerDCF3).toFixed(2)} dBm</td>
                        </tr>
                    </tbody>
                </Table>
            </TableWrapper>

            <TableWrapper>
                <TableTitle>Moc nadajnika [mW]</TableTitle>
                <Table>
                    <thead>
                        <tr>
                            <th>Parametr</th>
                            <th>Wynik</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Moc nadajnika dla {inputs.bandwidth} MBit/s <Highlight version={"FDCF"}>FDCF</Highlight></td>
                            <td>{HzToMw(parseFloat(powerFDCF1).toFixed(2))} mW</td>
                        </tr>
                        <tr>
                            <td>Moc nadajnika dla {inputs.bandwidth2} MBit/s <Highlight version={"FDCF"}>FDCF</Highlight></td>
                            <td>{HzToMw(parseFloat(powerFDCF2).toFixed(2))} mW</td>
                        </tr>
                        <tr>
                            <td>Moc nadajnika dla {inputs.bandwidth3} MBit/s <Highlight version={"FDCF"}>FDCF</Highlight></td>
                            <td>{HzToMw(parseFloat(powerFDCF3).toFixed(2))} mW</td>
                        </tr>
                        <tr>
                            <td>Moc nadajnika dla {inputs.bandwidth} MBit/s <Highlight version={"DCF"}>DCF</Highlight></td>
                            <td>{HzToMw(parseFloat(powerDCF1).toFixed(2))} mW</td>
                        </tr>
                        <tr>
                            <td>Moc nadajnika dla {inputs.bandwidth2} MBit/s <Highlight version={"DCF"}>DCF</Highlight></td>
                            <td>{HzToMw(parseFloat(powerDCF2).toFixed(2))} mW</td>
                        </tr>
                        <tr>
                            <td>Moc nadajnika dla {inputs.bandwidth3} MBit/s <Highlight version={"DCF"}>DCF</Highlight></td>
                            <td>{HzToMw(parseFloat(powerDCF3).toFixed(2))} mW</td>
                        </tr>
                    </tbody>
                </Table>
            </TableWrapper>
        </>
    );
};

export default ResultsTable;
