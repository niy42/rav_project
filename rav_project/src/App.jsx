import { Header, MainContent, Footer, Info } from './components';
import './App.css'

export default function App() {
  return (
    <div className="App">
      <Header />
      <MainContent />
      <div className=''>
        <Info />
      </div>
      <Footer />

    </div>
  );
}