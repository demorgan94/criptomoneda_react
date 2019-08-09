import React, { useState, useEffect } from 'react';
import imagen from './cryptomonedas.png';
import Formulario from './components/Formulario';
import axios from 'axios';
import Spinner from './components/Spinner';
import Cotizacion from './components/Cotizacion';

function App() {

  const [moneda, setMoneda] = useState('');
  const [criptomoneda, setCriptomoneda] = useState('');
  const [cargando, setCargando] = useState(false);
  const [resultado, setResultado] = useState({});

  useEffect(() => {
    const cotizar = async () => {

      if (moneda === '') return;

      const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`;

      const res = await axios.get(url);

      setCargando(true);

      setTimeout(() => {
        setCargando(false);
        setResultado(res.data.DISPLAY[criptomoneda][moneda]);
      }, 3000);
    }

    cotizar();
  }, [moneda, criptomoneda]);

  const componente = (cargando) ? <Spinner /> : <Cotizacion resultado={resultado} />;

  return (
    <div className="App">
      <div className="container">
        <div className="one-half column">
          <img src={imagen} alt="Imagen Criptomonedas" className="logotipo" />
        </div>
        <div className="one-half column">
          <h1>Cotiza Criptomonedas al Instante</h1>
          <Formulario setMoneda={setMoneda} setCriptomoneda={setCriptomoneda} />
          {componente}
        </div>
      </div>
    </div>
  );
}

export default App;
