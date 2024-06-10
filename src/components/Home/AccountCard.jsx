import { Grid, Card, CardContent, Typography, Box } from '@mui/material';

const AccountCard = ({ accountData }) => {
    return (
        <Grid container spacing={2}>
            {accountData.accountArs.length > 0 && (
                <Grid item xs={12} md={4}>
                    <Card sx={{ backgroundColor: '#007bff', color: '#ffffff', padding: '16px', borderRadius: '8px' }}>
                        <CardContent>
                            <Typography variant="h6" component="div">
                                Cuentas en ARS
                            </Typography>
                            {accountData.accountArs.map((account, index) => (
                                <Box key={index}>
                                    <Typography variant="body1" component="div">
                                        Cuenta {index + 1}: ${account.balance}
                                    </Typography>
                                </Box>
                            ))}
                        </CardContent>
                    </Card>
                </Grid>
            )}
            {accountData.accountUsd && (
                <Grid item xs={12} md={4}>
                    <Card sx={{ backgroundColor: '#007bff', color: '#ffffff', padding: '16px', borderRadius: '8px' }}>
                        <CardContent>
                            <Typography variant="h6" component="div">
                                Cuenta en USD
                            </Typography>
                            <Typography variant="body1" component="div">
                                ${accountData.accountUsd.balance}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            )}
            {accountData.fixedTerms.length > 0 && (
                <Grid item xs={12} md={4}>
                    <Card sx={{ backgroundColor: '#007bff', color: '#ffffff', padding: '16px', borderRadius: '8px' }}>
                        <CardContent>
                            <Typography variant="h6" component="div">
                                Plazos fijos
                            </Typography>
                            {accountData.fixedTerms.map((term, index) => (
                                <Box key={index}>
                                    <Typography variant="body1" component="div">
                                        Plazo {index + 1}: ${term.balance}
                                    </Typography>
                                </Box>
                            ))}
                        </CardContent>
                    </Card>
                </Grid>
            )}
        </Grid>
    );
};

export default AccountCard;
