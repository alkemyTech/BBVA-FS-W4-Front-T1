import { useState, useEffect } from 'react';
import { CircularProgress, Container } from '@mui/material';
import BankAccountCard from './AccountCard';
import TransactionList from './TransactionList';
import { getAccountBalance } from '../../api/Account';

const Home = () => {
    const [loading, setLoading] = useState(true);
    const [accountData, setAccountData] = useState(null);
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getAccountBalance();
                setAccountData(data);
                setTransactions(data.history);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setLoading(false);
            }
        };

        fetchData();
    }, [loading]);

    return (
        <Container>
            {loading ? (
                <CircularProgress />
            ) : (
                <>
                    <BankAccountCard accountData={accountData} />
                    <TransactionList accountData={accountData} />
                </>
            )}
        </Container>
    );
};

export default Home;
