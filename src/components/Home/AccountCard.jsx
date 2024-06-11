import { Grid, Card, CardContent, Typography, Box } from '@mui/material';
import PropTypes from 'prop-types';

const AccountCard = ({ accountData }) => {
    return (
        <Grid container spacing={2}>
            {accountData.accountArs.map((account, index) => (
                <Grid key={index} item xs={12} sm={6} md={4} lg={3}>
                    <Card sx={{ backgroundColor: '#4B56D2', color: '#ffffff', padding: '16px', borderRadius: '8px' }}>
                        <CardContent>
                            <Typography variant="h6" component="div">
                                ${account.balance.toFixed(2)}
                            </Typography>
                            <Box>
                                <Typography variant="body1" component="div">
                                    {account.accountType === "CAJA_AHORRO" ? "Caja de Ahorro" : "Cuenta Corriente"} en AR$
                                </Typography>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
            ))}

            {accountData.accountUsd && (
                <Grid item xs={12} sm={6} md={4} lg={3}>
                    <Card sx={{ backgroundColor: '#472183', color: '#ffffff', padding: '16px', borderRadius: '8px' }}>
                        <CardContent>
                            <Typography variant="h6" component="div">
                                U$S {accountData.accountUsd.balance.toFixed(2)}
                            </Typography>
                            <Typography variant="body1" component="div">
                                Cuenta en USD
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            )}

            {accountData.fixedTerms.map((term, index) => (
                <Grid key={index} item xs={12} sm={6} md={4} lg={3}>
                    <Card sx={{ backgroundColor: '#82C3EC', color: '#ffffff', padding: '16px', borderRadius: '8px' }}>
                        <CardContent>
                            <Typography variant="h6" component="div">
                                ${term.amount}
                            </Typography>
                            <Box>
                                <Typography variant="body1" component="div">
                                    Plazo fijo
                                </Typography>
                            </Box>
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
            })
        ).isRequired,
        accountUsd: PropTypes.shape({
            balance: PropTypes.number.isRequired,
        }),
        fixedTerms: PropTypes.arrayOf(
            PropTypes.shape({
                amount: PropTypes.number.isRequired,
            })
        ).isRequired,
    }).isRequired,
};

export default AccountCard;
