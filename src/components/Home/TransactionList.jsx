import PropTypes from 'prop-types';
import { Card, CardContent, Typography, List, ListItem, Divider, Box, ListItemText, useMediaQuery, Pagination, TextField, FormControl, InputLabel, Select, MenuItem, } from '@mui/material';
import { useEffect, useState } from 'react';

const TransactionList = ({ accountData }) => {
    const isWideScreen = useMediaQuery('(min-width:600px)');
    const [currentPage, setCurrentPage] = useState(1);
    const transactionsPerPage = 10;
    const [minAmount, setMinAmount] = useState('');
    const [maxAmount, setMaxAmount] = useState('');
    const [currency, setCurrency] = useState('');
    const [type, setType] = useState('');
    const [concept, setConcept] = useState('');

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

    const handleChangePage = (event, page) => {
        setCurrentPage(page);
    };

    useEffect(() => {
        setCurrentPage(1);
    }, [minAmount, maxAmount, type, currency, concept]);

    const filteredTransactions = sortedTransactions.filter(transaction => {
        const amountValid = (!minAmount || transaction.amount >= parseFloat(minAmount)) &&
                            (!maxAmount || transaction.amount <= parseFloat(maxAmount));
        const typeValid = !type || transaction.type === type;
        const currencyValid = !currency || transaction.accountCurrency === currency;
        const conceptValid = !concept || transaction.concept === concept;
        return amountValid && typeValid && currencyValid && conceptValid;
    });

    const indexOfLastTransaction = currentPage * transactionsPerPage;
    const indexOfFirstTransaction = indexOfLastTransaction - transactionsPerPage;
    const currentTransactions = filteredTransactions.slice(indexOfFirstTransaction, indexOfLastTransaction);

    return (
        <Card sx={{ backgroundColor: '#f5f5f5', padding: '16px', borderRadius: '8px', marginTop: '16px', marginBottom: '10vh' }}>
            <CardContent>
                <Typography variant="h6" component="div" sx={{ color: '#4B56D2' }}>
                    Últimos movimientos
                </Typography>
                <Box sx={{ display: 'flex', gap: '8px', marginBottom: '16px', marginTop: '16px' }}>
                    <Typography variant="h9" component="div" sx={{ color: '#4B56D2', alignContent: 'center' }}>
                        Filtrar por:
                    </Typography>
                    <TextField
                        label="Monto mínimo"
                        variant="outlined"
                        value={minAmount}
                        onChange={(e) => setMinAmount(e.target.value)}
                    />
                    <TextField
                        label="Monto máximo"
                        variant="outlined"
                        value={maxAmount}
                        onChange={(e) => setMaxAmount(e.target.value)}
                    />
                    <FormControl variant="outlined" sx={{ minWidth: 120 }}>
                        <InputLabel>Tipo</InputLabel>
                        <Select
                            value={type}
                            onChange={(e) => setType(e.target.value)}
                            label="Tipo"
                        >
                            <MenuItem value=""><em>-----</em></MenuItem>
                            <MenuItem value="DEPOSIT">DEPOSITO</MenuItem>
                            <MenuItem value="INCOME">INGRESO</MenuItem>
                            <MenuItem value="PAYMENT">PAGO</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl variant="outlined" sx={{ minWidth: 120 }}>
                        <InputLabel>Moneda</InputLabel>
                        <Select
                            value={currency}
                            onChange={(e) => setCurrency(e.target.value)}
                            label="Moneda"
                        >
                            <MenuItem value=""><em>-----</em></MenuItem>
                            <MenuItem value="USD">USD</MenuItem>
                            <MenuItem value="ARS">ARS</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl variant="outlined" sx={{ minWidth: 120 }}>
                        <InputLabel>Concepto</InputLabel>
                        <Select
                            value={concept}
                            onChange={(e) => setConcept(e.target.value)}
                            label="Concepto"
                        >
                            <MenuItem value=""><em>-----</em></MenuItem>
                            <MenuItem value="VARIOS">VARIOS</MenuItem>
                            <MenuItem value="ALQUILERES">ALQUILERES</MenuItem>
                            <MenuItem value="CUOTAS">CUOTAS</MenuItem>
                            <MenuItem value="EXPENSAS">EXPENSAS</MenuItem>
                            <MenuItem value="HONORARIOS">HONORARIOS</MenuItem>
                            <MenuItem value="FACTURAS">FACTURAS</MenuItem>
                            <MenuItem value="HABERES">HABERES</MenuItem>
                            <MenuItem value="PRESTAMOS">PRESTAMOS</MenuItem>
                            <MenuItem value="SEGUROS">SEGUROS</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
                <List>
                    {currentTransactions.map((transaction, index) => {
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
                                {index < currentTransactions.length - 1 && <Divider />}
                            </Box>
                        );
                    })}
                </List>
            </CardContent>
            <Box justifyContent={'center'} display={'flex'}>
                <Pagination count={Math.ceil(filteredTransactions.length / transactionsPerPage)}
                            page={currentPage}
                            onChange={handleChangePage}/>
            </Box>
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