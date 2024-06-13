import PropTypes from 'prop-types';
import { Card, CardContent, Typography, List, ListItem, Divider, Box, ListItemText, useMediaQuery } from '@mui/material';

const TransactionList = ({ accountData }) => {
    const isWideScreen = useMediaQuery('(min-width:600px)');

    const formatDate = (dateArray) => {
        const [year, month, day, hour, minutes] = dateArray;
        return `${day}/${month}/${year} ${hour}:${minutes < 10 ? '0' + minutes: minutes}`;
    };

    // Ordenar las transacciones fuera del componente
    const sortedTransactions = accountData.history.sort((a, b) => {
        const dateA = new Date(a.transactionDate[0], a.transactionDate[1] - 1, a.transactionDate[2], a.transactionDate[3], a.transactionDate[4]);
        const dateB = new Date(b.transactionDate[0], b.transactionDate[1] - 1, b.transactionDate[2], b.transactionDate[3], b.transactionDate[4]);
        return dateB - dateA;
    });

    const getTypeOfAccount = (transaction) => {
        const accountArs = accountData.accountArs.find(account => account.idAccount === transaction.accountIdAccount);
        const accountUsd = accountData.accountUsd;
        if (accountArs) {
            return accountArs.accountType;
        } else if (accountUsd) {
            return accountUsd.accountType;
        }
        return null;
    };

    return (
        <Card sx={{ backgroundColor: '#f5f5f5', padding: '16px', borderRadius: '8px', marginTop: '16px', marginBottom: '10vh' }}>
            <CardContent>
                <Typography variant="h6" component="div" sx={{ color: '#007bff' }}>
                    Últimos movimientos
                </Typography>
                <List>
                    {sortedTransactions.map((transaction, index) => {
                        const currencySymbol = transaction.accountCurrency === 'USD' ? 'U$S' : '$';
                        const formattedDate = formatDate(transaction.transactionDate);
                        const accountType = getTypeOfAccount(transaction);

                        return (
                            <Box key={index}>
                                <ListItem>
                                    <ListItemText 
                                        primary={
                                            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                                <span style={{ fontWeight: 'bold' }}>
                                                    {transaction.type === "INCOME" ? "Ingreso" :
                                                    transaction.type === "PAYMENT" ? "Pago" :
                                                    "Depósito"}
                                                </span>
                                                <span>{currencySymbol} {transaction.amount}</span>
                                            </Box>
                                        }
                                        secondary={
                                            <span>
                                                {accountType === "CAJA_AHORRO" ? "Caja de Ahorro" : "Cuenta Corriente"} {transaction.accountCurrency} - {formattedDate}
                                                {isWideScreen && transaction.description && ` - ${transaction.description}`}
                                            </span>
                                        }
                                    />
                                </ListItem>
                                {index < sortedTransactions.length - 1 && <Divider />}
                            </Box>
                        );
                    })}
                </List>
            </CardContent>
        </Card>
    );
};

TransactionList.propTypes = {
    accountData: PropTypes.shape({
        history: PropTypes.arrayOf(
            PropTypes.shape({
                description: PropTypes.string.isRequired,
                amount: PropTypes.number.isRequired,
                type: PropTypes.string.isRequired,
                accountIdAccount: PropTypes.number.isRequired,
                accountCurrency: PropTypes.string.isRequired,
                transactionDate: PropTypes.arrayOf(PropTypes.number).isRequired
            })
        ).isRequired,
        accountArs: PropTypes.arrayOf(
            PropTypes.shape({
                idAccount: PropTypes.number.isRequired,
                accountType: PropTypes.string.isRequired
            })
        ).isRequired,
        accountUsd: PropTypes.shape({
            accountType: PropTypes.string.isRequired
        }).isRequired
    }).isRequired
};

export default TransactionList;
