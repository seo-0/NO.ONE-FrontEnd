import {Routes, Route} from 'react-router-dom';
import Header from "./components/Header";
import Footer from './components/Footer';
import MainApp from './pages/MainPage/MainApp';
import DetailApp from './pages/DetailPage/DetailApp';


function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<MainApp />} />
        <Route path="/detail" element={<DetailApp />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
