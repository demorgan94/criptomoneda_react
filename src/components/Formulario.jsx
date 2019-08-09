import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Criptomoneda from './Criptomoneda';
import Error from './Error';

const Formulario = ({ setMoneda, setCriptomoneda }) => {

   const [criptomonedas, setCriptomonedas] = useState([]);
   const [monedaCotizar, setMonedaCotizar] = useState('');
   const [criptoCotizar, setCriptoCotizar] = useState('');
   const [error, setError] = useState(false);

   useEffect(() => {
      const consultarAPI = async () => {
         const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD';

         const res = await axios.get(url);

         setCriptomonedas(res.data.Data);
      }

      consultarAPI();
   }, []);

   const handleSubmit = e => {
      e.preventDefault();

      if (monedaCotizar === '' || criptoCotizar === '') {
         setError(true);
         return;
      } else {
         setError(false);
      }

      setMoneda(monedaCotizar);
      setCriptomoneda(criptoCotizar);
   }

   const componente = (error) ? <Error mensaje="Ambos campos son obligatorios" /> : null;

   return (
      <form onSubmit={handleSubmit}>
         {componente}
         <div className="row">
            <label htmlFor="moneda">Elige tu Moneda</label>
            <select className="u-full-width" name="moneda" id="moneda" onChange={e => setMonedaCotizar(e.target.value)}>
               <option value="">-- Elige tu Moneda --</option>
               <option value="USD">Dollar Estadounidense</option>
               <option value="MXN">Peso Mexicano</option>
               <option value="GBP">Libras</option>
               <option value="EUR">Euro</option>
            </select>
         </div>

         <div className="row">
            <label htmlFor="criptomoneda">Elige tu Criptomoneda</label>
            <select className="u-full-width" name="criptomoneda" id="criptomoneda" onChange={e => setCriptoCotizar(e.target.value)}>
               <option value="">-- Elige tu Criptomoneda --</option>
               {criptomonedas.map(cripto => (
                  <Criptomoneda key={cripto.CoinInfo.Id} criptomoneda={cripto} />
               ))}
            </select>
         </div>

         <input type="submit" value="Calcular" className="button-primary u-full-width" />
      </form>
   );
};

export default Formulario;