import Navbar from './Navbar';
import { useSelector } from 'react-redux';

export default function Header(){
  const token = useSelector((state) => state.user.token);
  console.log(token)
  return (
    <>
    { token && <Navbar/>}
    </>
  );
}