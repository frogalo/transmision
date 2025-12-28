import React, { useState } from 'react';
import useCalculations from './hooks/useCalculations';
import CalculationForm from './components/CalculationForm';
import ResultsTable from './components/ResultsTable';
import Footer from "./Footer";
import { Container, Header, ControlsContainer, LayoutButtonGroup, LayoutButton, Button } from './App.styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faList, faThLarge } from '@fortawesome/free-solid-svg-icons';

const App = () => {
    const { inputs, handleChange, handleClearAll, results } = useCalculations();
    const [layout, setLayout] = useState('standard'); // 'standard' or 'grid'

    const {
        segmentAttenuation,
        splicesCount,
        dispersion,
        LDCF,
        wavelength,
        speed1,
        speed2,
        speed3
    } = results;

    function HzToMw(HzValue) {
        // Calculate MvValue
        return Math.pow(10, HzValue / 10).toFixed(2);
    }

    return (
        <>
            <Container layout={layout}>
                <Header>Fizyczne Podstawy Transmisji</Header>
                
                <ControlsContainer>
                    <LayoutButtonGroup>
                        <LayoutButton 
                            active={layout === 'standard'} 
                            onClick={() => setLayout('standard')}
                            title="Lista"
                        >
                            <FontAwesomeIcon icon={faList} /> Standard
                        </LayoutButton>
                        <LayoutButton 
                            active={layout === 'grid'} 
                            onClick={() => setLayout('grid')}
                            title="Siatka"
                        >
                            <FontAwesomeIcon icon={faThLarge} /> Kafelki
                        </LayoutButton>
                    </LayoutButtonGroup>

                    <Button type="button" onClick={handleClearAll}>
                        Wyczyść dane
                    </Button>
                </ControlsContainer>

                <h2>Zmienne Wejściowe</h2>
                
                <CalculationForm 
                    inputs={inputs} 
                    handleChange={handleChange}
                    segmentAttenuation={segmentAttenuation}
                    splicesCount={splicesCount}
                    dispersion={dispersion}
                    LDCF={LDCF}
                    wavelength={wavelength}
                    speed1={speed1}
                    speed2={speed2}
                    speed3={speed3}
                    layout={layout}
                />

                <h2>Wyniki Obliczeń</h2>
                <ResultsTable results={results} inputs={inputs} HzToMw={HzToMw} layout={layout} />
            </Container>
            <Footer/>
        </>
    );
};

export default App;
