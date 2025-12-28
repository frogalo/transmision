import React from 'react';
import useCalculations from './hooks/useCalculations';
import CalculationForm from './components/CalculationForm';
import ResultsTable from './components/ResultsTable';
import Footer from "./Footer";
import { Container, Header, Button } from './App.styles';

const App = () => {
    const { inputs, handleChange, handleClearAll, results } = useCalculations();

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
            <Container>
                <Header>Ilustracja Obliczeń Światłowodowych</Header>
                <Button type="button" onClick={handleClearAll}>
                    Wyczyść dane
                </Button>
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
                />

                <h2>Wyniki Obliczeń</h2>
                <ResultsTable results={results} inputs={inputs} HzToMw={HzToMw} />
            </Container>
            <Footer/>
        </>
    );
};

export default App;
