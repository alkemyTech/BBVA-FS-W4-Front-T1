import Header from "../../components/Header";
import Footer from "../../components/Footer";

export default function Page(props){
    return(
        <>  
            <Header/>
            <main style={{paddingTop: '4rem', paddingBottom: '2rem', backgroundColor: "#F1F6F5"}}>{props.children}</main>
            <Footer/>
        </>
    );
}