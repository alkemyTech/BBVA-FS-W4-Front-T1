import Header from "../../components/Header";
import Footer from "../../components/Footer";

export default function Page(props) {
  return (
    <>
      <Header />
      <main
        style={{
          paddingTop: "5rem",
          paddingBottom: "5rem",
          backgroundColor: "#F1F6F5",
        }}
      >
        {props.children}
      </main>
      <Footer />
    </>
  );
}
