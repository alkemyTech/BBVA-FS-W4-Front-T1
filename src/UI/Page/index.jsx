import { Outlet } from "react-router";
import Header from "../../components/Header";

export default function Page(props){
    return(
        <>  
            <Header/>
            <main>{props.children}</main>
            
        </>
    );
}