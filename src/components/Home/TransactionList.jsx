import { useEffect, useState } from 'react';
import { Card, CardContent, Typography, List, ListItem, ListItemText, Divider, Box } from '@mui/material';

const fakeResponse = {
    history: [
        { id: 1, description: 'Depósito', amount: 1000 },
        { id: 2, description: 'Transferencia', amount: -200 },
        { id: 3, description: 'Depósito', amount: 500 },
        { id: 4, description: 'Compra', amount: -300 },
        { id: 5, description: 'Depósito', amount: 2000 },
    ],
};

const TransactionList = () => {
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        const fetchTransactions = () => {
            setTimeout(() => {
                setTransactions(fakeResponse.history);
            }, 1000);
        };

        fetchTransactions();
    }, []);

    return (
        <Card sx={{ backgroundColor: '#f5f5f5', padding: '16px', borderRadius: '8px', marginTop: '16px' }}>
            <CardContent>
                <Typography variant="h6" component="div" sx={{ color: '#007bff' }}>
                    Últimos movimientos
                </Typography>
                <List>
                    {transactions.map((transaction, index) => (
                        <Box key={transaction.id}>
                            <ListItem>
                                <ListItemText 
                                    primary={
                                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                            <span style={{ fontWeight: 'bold' }}>{transaction.description}</span>
                                            <span>${transaction.amount}</span>
                                        </Box>
                                    }
                                />
                            </ListItem>
                            {index < transactions.length - 1 && <Divider />}
                        </Box>
                    ))}
                </List>
            </CardContent>
        </Card>
    );
};

export default TransactionList;
