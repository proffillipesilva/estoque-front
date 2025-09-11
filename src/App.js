import logo from './logo.svg';
import './App.css';
import LoginForm from './features/splash/components/LoginForm';
import SplashScreen from './features/splash/SplashScreen';
import {HashRouter as Router, Route, Routes} from 'react-router-dom'
import HomeScreen from './features/home/HomeScreen';
import PrivateRoute from './shared/components/PrivateRoute';
import { AuthProvider } from './shared/context/AuthContext';
import PublicRoute from './shared/components/PublicRoute';
import Navbar from './shared/components/Navbar';

function App() {
  return (
    <div className="App">
      {/*<AuthProvider> */}
        <Router>
          <PrivateRoute>
            <Navbar />
            <Routes>
              <Route path='/home' element={<HomeScreen /> } />
            </Routes>
          </PrivateRoute>
          <PublicRoute>
            <Routes>
              <Route index element={<SplashScreen />} />  
              <Route path='*' element={<SplashScreen />} />
            </Routes>
          </PublicRoute>
        </Router>
       {/*</AuthProvider> */}
    </div>
  );
}

export default App;
