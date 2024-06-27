import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { useSelector } from "react-redux";

export default function Page(props) {
  const token = useSelector((state) => state.user.token);
  return (
    <>
      <Header />
      <main
        style={{
          backgroundColor: "#F1F6F5",
          paddingBottom: token ? "5rem" : "0",
          minHeight: "31.3vw"
        }}
      >
        {props.children}
      </main>
      <Footer />
    </>
  );
}
