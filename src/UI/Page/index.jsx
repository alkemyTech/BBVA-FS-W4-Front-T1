import { Outlet } from "react-router";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

export default function Page(props){
    return(
        <>  
            <Header/>
            <main>{props.children}</main>
            <Footer/>
        </>
    );
}