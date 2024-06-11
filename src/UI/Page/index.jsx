import { Outlet } from "react-router";
import Header from "../../components/Header";

export default function Page(props){
    return(
        <>  
            <Header/>
            <main style={{minHeight:"150vh", border: '2px solid red'}}>{props.children}</main>
            
        </>
    );
}