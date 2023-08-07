import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import MainApp from "./pages/MainPage/MainApp";
import SearchApp from "./pages/SearchPage/SearchApp";
import { RecoilRoot } from "recoil";

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<MainApp />} />
        <Route
          path="/search"
          element={
            <RecoilRoot>
              <SearchApp />
            </RecoilRoot>
          }
        />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
