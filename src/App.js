import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import MainApp from "./pages/MainPage/MainApp";
import SearchApp from "./pages/SearchPage/SearchApp";
import { RecoilRoot } from "recoil";
import LoginModal from "./pages/LoginPage/LoginModal";
import SignUpModal from "./pages/LoginPage/SignUpModal";

function App() {
  return (
    <RecoilRoot>
      <Header />
      <LoginModal />
      <SignUpModal />
      <Routes>
        <Route path="/" element={<MainApp />} />
        <Route path="/search" element={<SearchApp />} />
      </Routes>
      <Footer />
    </RecoilRoot>
  );
}

export default App;
