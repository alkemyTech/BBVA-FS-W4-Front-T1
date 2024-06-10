import { Card, CardContent, Typography, List, ListItem, Divider, Box } from '@mui/material';

const TransactionList = ({ transactions }) => {
    return (
        <Card sx={{ backgroundColor: '#f5f5f5', padding: '16px', borderRadius: '8px', marginTop: '16px' }}>
            <CardContent>
                <Typography variant="h6" component="div" sx={{ color: '#007bff' }}>
                    Últimos movimientos
                </Typography>
                <List>
                    {transactions.map((transaction, index) => (
                        <Box key={index}>
                            <ListItem>
                                {/* Renderizar cada transacción */}
                                {/* ...código omitido para brevedad */}
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
