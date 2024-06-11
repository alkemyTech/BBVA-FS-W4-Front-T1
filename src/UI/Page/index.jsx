import { Outlet } from "react-router";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

export default function Page(props){
    return(
        <>  
            <Header/>
            <main style={{minHeight:"150vh", border: '2px solid red', marginTop: '30px'}}>{props.children}</main>
            <Footer/>
        </>
    );
}