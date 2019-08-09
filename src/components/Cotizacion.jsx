import React from 'react';

const Cotizacion = ({ resultado }) => {

   if (Object.keys(resultado).length === 0) return null;

   return (
      <div className="resultado">
         <h2>Resultado</h2>
         <p className="precio">El precio es <span>{resultado.PRICE}</span></p>
         <p>Precio mas alto del día: <span>{resultado.HIGHDAY}</span></p>
         <p>Precio mas bajo del día: <span>{resultado.LOWDAY}</span></p>
         <p>Variación de las ultimas 24 hrs: <span>{resultado.CHANGEPCT24HOUR}</span></p>
         <p>Ultima actualización: <span>{resultado.LASTUPDATE}</span></p>
      </div>
   );
};

export default Cotizacion;