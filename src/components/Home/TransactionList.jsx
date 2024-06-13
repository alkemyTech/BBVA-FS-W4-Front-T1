import PropTypes from 'prop-types';
import { Card, CardContent, Typography, List, ListItem, Divider, Box, ListItemText, useMediaQuery, Pagination } from '@mui/material';
import { useState } from 'react';

const TransactionList = ({ transactions }) => {

    const isWideScreen = useMediaQuery('(min-width:600px)');
    const [currentPage, setCurrentPage] = useState(1);
    const transactionsPerPage = 10;

    const formatDate = (dateArray) => {
        const [year, month, day] = dateArray;
        return `${day}/${month}/${year} `;
    };

    const indexOfLastTransaction = currentPage * transactionsPerPage;
    const indexOfFirstTransaction = indexOfLastTransaction - transactionsPerPage;
    const currentTransactions = transactions.slice(indexOfFirstTransaction, indexOfLastTransaction);

    const handleChangePage = (event, page) => {
        setCurrentPage(page);
    };

    return (
        <Card sx={{ backgroundColor: '#f5f5f5', padding: '16px', borderRadius: '8px', marginTop: '16px' }}>
            <CardContent>
                <Typography variant="h6" component="div" sx={{ color: '#007bff' }}>
                    Últimos movimientos
                </Typography>
                <List>
                    {currentTransactions.map((transaction, index) => {
                        const currencySymbol = transaction.accountCurrency === 'USD' ? 'U$S' : '$';
                        const formattedDate = formatDate(transaction.transactionDate);

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
                                                {transaction.accountCurrency} - {formattedDate}
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
                <Pagination count={Math.ceil(transactions.length / transactionsPerPage)}
                            page={currentPage}
                            onChange={handleChangePage}/>
            </Box>
        </Card>
    );
};

TransactionList.propTypes = {
    transactions: PropTypes.arrayOf(
        PropTypes.shape({
            description: PropTypes.string.isRequired,
            amount: PropTypes.number.isRequired,
            type: PropTypes.string.isRequired,
            accountIdAccount: PropTypes.number.isRequired,
            accountCurrency: PropTypes.string.isRequired,
            transactionDate: PropTypes.arrayOf(PropTypes.number).isRequired
        })
    ).isRequired
};

export default TransactionList;
