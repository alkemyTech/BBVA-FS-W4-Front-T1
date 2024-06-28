import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { BarChart } from '@mui/x-charts';
import { getTransactionsSummaryByIdAccount } from '../../../api/Transaction';
import { Card, CardContent, Grid, Typography } from '@mui/material';

const SummaryBarChart = ({ account }) => {
    const accountId = account.idAccount;
    const token = useSelector((state) => state.user.token);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchTransactionsSummary();
    }, []);

    const fetchTransactionsSummary = async () => {
        try {
            const response = await getTransactionsSummaryByIdAccount(accountId, token);
            setData(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching transactions summary:', error);
            setLoading(false);
        }
    };

    if (loading) {
        return <p>Cargando...</p>;
    }

    const months = data.map(item => item.month);
    const deposits = data.map(item => item.deposit);
    const payments = data.map(item => item.payment);
    const incomes = data.map(item => item.income);

    return (
        <Grid item xs={12}>
      <Card
        sx={{
          backgroundColor: "#ffffff",
          color: "#000000",
          borderRadius: "2vh",
          padding: "1vh",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
          "&:hover": {
            boxShadow: "0 16px 24px rgba(0, 0, 0, 0.2)",
          },
          marginTop:"2vh"
        }}
      >
        <CardContent sx={{paddingLeft:"10vh"}}>
            <Typography>Resumen de Transacciones por Año</Typography>
            <BarChart
                xAxis={[{ scaleType: 'band', label: 'Meses', data: months }]}
                //yAxis={[{ label: 'Monto' }]}
                series={[
                    { label: 'Depósito', data: deposits },
                    { label: 'Pago', data: payments },
                    { label: 'Ingreso', data: incomes }
                ]}
                
                height={500}
            />
        </CardContent>
       
        </Card>
        </Grid>
    );
};

export default SummaryBarChart;
