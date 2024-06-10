import { useState, useEffect } from 'react';
import { Container, Typography, CircularProgress, Grid, Card, CardContent, Box } from '@mui/material';

const AccountCard = () => {
    const [balanceData, setBalanceData] = useState(null);
    
    const fakeUserEmail = 'user@example.com';

    const fetchBalanceData = async () => {
        const fakeResponse = {
            accountArs: [{ balance: 10000 }],
            accountUsd: [{ balance: 1000 }],
            fixedTerms: [{ balance: 5000 }]
        };

        // Emula un tiempo de respuesta de la API
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(fakeResponse);
            }, 1000);
        });
    };

    useEffect(() => {
        fetchBalanceData(fakeUserEmail).then(data => setBalanceData(data));
    }, []);

    if (!balanceData) {
        return <Container><CircularProgress /></Container>;
    }

    return (
        <Grid container>
          <Grid item xs={6} md={4}>
            <Card sx={{ backgroundColor: '#007bff', color: '#ffffff', padding: '16px', borderRadius: '8px' }}>
                <CardContent>
                    <Typography variant="h6" component="div">
                        Cuenta en AR$
                    </Typography>
                    <Box display="flex" alignItems="center" mt={2}>
                        <Typography variant="h3" component="div" sx={{ flexGrow: 1 }}>
                            ${balanceData.accountArs[0].balance}
                        </Typography>
                    </Box>
                    <Typography variant="body2" mt={1}>
                        Total Balance
                    </Typography>
                </CardContent>
            </Card>
          </Grid>
        </Grid>
    );
};

export default AccountCard;
