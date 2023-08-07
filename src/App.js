import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import MainApp from "./pages/MainPage/MainApp";
import SearchApp from "./pages/SearchPage/SearchApp";
import LoginModal from "./pages/LoginPage/LoginModal";
import SignUpModal from "./pages/LoginPage/SignUpModal";
import QaPage from "./pages/Q&aPage/QaPage";

import { RecoilRoot } from "recoil";

function App() {
  return (
    <RecoilRoot>
      <div>
        <Header />
        <LoginModal />
        <SignUpModal />
        <Routes>
          <Route path="/" element={<MainApp />} />
          <Route path="/search" element={<SearchApp />} />
          <Route path="/QaPage" element={<QaPage />} />
        </Routes>
        <Footer />
      </div>
    </RecoilRoot>
  );
}

export default App;
