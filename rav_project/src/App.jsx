import { Header, MainContent, Footer, AuthScreen } from './components';
import './App.css'

export default function App() {
  return (
    <div className="App">
      <Header />
      <MainContent />
      <div className=''>
        <Footer />
      </div>

    </div>
  );
}