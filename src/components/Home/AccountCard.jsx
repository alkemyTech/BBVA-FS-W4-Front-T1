import { Grid, Card, CardContent, Typography } from '@mui/material';
import PropTypes from 'prop-types';

const AccountCard = ({ accountData }) => {

    const formatDate = (dateArray) => {
        const [year, month, day] = dateArray;
        return `${day}/${month}/${year} `;
    };

    const formatCurrency = (amount, currency) => {
        return new Intl.NumberFormat('es-AR', { style: 'currency', currency }).format(amount);
    };

    return (
        <Grid container spacing={2} sx={{marginTop: '5vh'}}>
            {accountData.accountArs.map((account, index) => (
                <Grid key={index} item xs={12} sm={6} md={4} lg={3}>
                    <Card sx={{ backgroundColor: '#4B56D2', color: '#ffffff', padding: '16px', borderRadius: '8px', height: '100px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                        <CardContent>
                            <Typography variant="h6" component="div">
                                <strong>{formatCurrency(account.balance, account.currency)}</strong>
                            </Typography>
                            <Typography variant="subtitle1" component="div">
                                {account.accountType === "CAJA_AHORRO" ? "Caja de Ahorro" : "Cuenta Corriente"}
                            </Typography>
                            <Typography variant="body2" component="div">
                                {account.currency}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            ))}

            {accountData.accountUsd && (
                <Grid item xs={12} sm={6} md={4} lg={3}>
                    <Card sx={{ backgroundColor: '#82C3EC', color: '#ffffff', padding: '16px', borderRadius: '8px', height: '100px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                        <CardContent>
                            <Typography variant="h6" component="div">
                                <strong>{formatCurrency(accountData.accountUsd.balance, accountData.accountUsd.currency)}</strong>
                            </Typography>
                            <Typography variant="subtitle1" component="div">
                                Caja de Ahorro
                            </Typography>
                            <Typography variant="body2" component="div">
                                {accountData.accountUsd.currency}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            )}

            {accountData.fixedTerms.map((term, index) => (
                <Grid key={index} item xs={12} sm={6} md={4} lg={3}>
                    <Card sx={{ backgroundColor: '#D1D8C5', color: '#ffffff', padding: '16px', borderRadius: '8px', height: '100px', display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
                        <CardContent>
                            <Typography variant="h6" component="div">
                                <strong>{formatCurrency(term.amount, 'ARS')}</strong>
                            </Typography>
                            <Typography variant="subtitle1" component="div">
                                Plazo fijo
                            </Typography>
                            <Typography variant="body2" component="div">
                                Fecha de cierre: {formatDate(term.closingDate)}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            ))}
        </Grid>
    );
};

AccountCard.propTypes = {
    accountData: PropTypes.shape({
        accountArs: PropTypes.arrayOf(
            PropTypes.shape({
                balance: PropTypes.number.isRequired,
                accountType: PropTypes.string.isRequired,
                currency: PropTypes.string.isRequired,
            })
        ).isRequired,
        accountUsd: PropTypes.shape({
            balance: PropTypes.number.isRequired,
            currency: PropTypes.string.isRequired,
        }),
        fixedTerms: PropTypes.arrayOf(
            PropTypes.shape({
                amount: PropTypes.number.isRequired,
                closingDate: PropTypes.arrayOf(PropTypes.number).isRequired,
            })
        ).isRequired,
    }).isRequired,
};

export default AccountCard;
