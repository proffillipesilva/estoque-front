import logo from './logo.svg';
import './App.css';
import LoginForm from './features/splash/components/LoginForm';
import SplashScreen from './features/splash/SplashScreen';
import {HashRouter as Router, Route, Routes} from 'react-router-dom'
import HomeScreen from './features/home/HomeScreen';

function App() {
  return (
    <div className="App">
      <Router>
       <Routes>
          <Route index element={<SplashScreen />} />
          <Route path='/home' element={<HomeScreen />} />
          <Route path='*' element={<SplashScreen />} />
       </Routes>


      </Router>
    </div>
  );
}

export default App;
