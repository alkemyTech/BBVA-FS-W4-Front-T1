import { Container } from '@mui/material';
import BankAccountCard from './AccountCard';
import TransactionList from './TransactionList';

const Home = () => {
    return (
        <Container>
            <BankAccountCard />
            <TransactionList />
        </Container>
    );
};

export default Home;
