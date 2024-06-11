import { Outlet } from "react-router";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

export default function Page(props){
    return(
        <>  
            <Header/>
            <main style={{minHeight:"150vh", marginTop: '30px'}}>{props.children}</main>
            <Footer/>
        </>
    );
}