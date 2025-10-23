import logo from './logo.svg';
import './App.css';
import LoginForm from './features/splash/components/LoginForm';
import SplashScreen from './features/splash/SplashScreen';
import { HashRouter as Router, Route, Routes } from 'react-router-dom'
import HomeScreen from './features/home/HomeScreen';
import PrivateRoute from './shared/components/PrivateRoute';
import { AuthProvider } from './shared/context/AuthContext';
import PublicRoute from './shared/components/PublicRoute';
import Navbar from './shared/components/Navbar';
import React from 'react';

import { Toaster } from 'react-hot-toast'; // Importe o componente Toaster
import { requestForToken, onMessageListener } from './firebase';
import useAuthStore from './shared/store/auth-store';
import StatusModal from './shared/components/StatusModal';
import ProdutosPage from './features/produtos/ProdutosPage';
import ProdutoPage from './features/produtos/[id]/ProdutoPage';

function App() {
  const [token, setToken] = React.useState(null);
  const {setFcmToken} = useAuthStore() 

  // 1. Obtém o Token na montagem do componente
  React.useEffect(() => {
    requestForToken()
      .then((currentToken) => {
        setToken(currentToken);
        setFcmToken(currentToken)
      })
      .catch((err) => {
        console.error("Erro ao solicitar token:", err);
      });
  }, []);

  // 2. Configura o Listener para mensagens em Foreground
  React.useEffect(() => {
    // Registra o listener e obtém a função de limpeza (unsubscribe)
    const unsubscribe = onMessageListener().then(() => {
      // O then é chamado quando uma mensagem chega, mas o listener continua ativo
    });

    // Retorna a função de limpeza para que o listener seja removido ao desmontar o componente
    return () => {
      // Se necessário, implemente o unsubscribe do listener aqui.
      // Para onMessage(), o listener é geralmente ativo enquanto o app está montado.
    };
  }, []);


  return (
    <div className="App">
      <StatusModal />
      {/*<AuthProvider> */}
      <Router>
        <PrivateRoute>
          <Navbar />
          <Routes>
            <Route path='/home' element={<HomeScreen />} />
            {/* Rota para a lista de produtos (página inicial) */}
          <Route path="/produtos" element={<ProdutosPage />} />
          
          {/* Rota para os detalhes do produto, com um parâmetro dinâmico ":id" */}
          <Route path="/produtos/:id" element={<ProdutoPage />} />
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



      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
        <h2 className="text-xl font-semibold mb-3 text-gray-800">Status do Token FCM:</h2>
        {token ? (
          <>
            <p className="text-green-600 font-medium break-words">
              Token Obtido com Sucesso!
            </p>
            <textarea
              readOnly
              value={token}
              rows="4"
              className="mt-2 w-full p-2 border border-gray-300 rounded-md bg-gray-100 text-sm"
            />
            <p className="mt-2 text-sm text-gray-500">
              Envie este token para seu servidor para testes de notificação direcionada.
            </p>
          </>
        ) : (
          <p className="text-red-600 font-medium">
            Aguardando permissão ou token... (Verifique o console para erros)
          </p>
        )}
      </div>
      

      {/* O componente Toaster deve ser renderizado uma única vez em um nível superior */}
      <Toaster />

    </div>
  );
}

export default App;
