import React from 'react';
import { useLocation } from "react-router";
const Transferencia = () => {
    const location = useLocation();
    const { account } = location.state || {};
    console.log("Transferencia account",account);
    return (
        <div>
            Transferencia
        </div>
    );
}

export default Transferencia;
