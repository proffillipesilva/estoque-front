// src/LoginForm.js
import React from 'react';
import { MdEmail, MdLock } from 'react-icons/md';
import './LoginForm.css'
import LoginService from '../services/LoginService';
import { useAuth } from '../../../shared/context/AuthContext';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../../../shared/store/auth-store';
import { jwtDecode } from 'jwt-decode';



const LoginForm = () => {

  const navigate = useNavigate();

  //const { login } = useAuth()
  const {setAuthData} = useAuthStore();


  const [form,setForm] = React.useState({email: "", password: ''})

    const submitForm = async (e) => {
        e.preventDefault();
        
        // Isso eu pego do backend
        const responseData = await LoginService.login(form)
        const receivedTokenFromBackend = responseData.token;
        localStorage.setItem("accessToken", receivedTokenFromBackend)

        const decodedUser = jwtDecode(receivedTokenFromBackend);
        // Armazena o token e as informações decodificadas no Zustand
        setAuthData(receivedTokenFromBackend, decodedUser);
        console.log('Dados do usuário decodificados e armazenados:', decodedUser);
        
        navigate("/home")

    }
  return (
    <div className="flex slideIn items-center justify-center  bg-gray-100">
      <div className="bg-white  p-8 rounded-lg shadow-xl w-full max-w-sm animate-slideIn">
        <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">ESTOQUE - FRONT</h1>


        <form>
          {/* Campo de Email */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              <div className="flex items-center border rounded-md py-2 px-3 text-gray-700 leading-tight focus-within:ring-2 focus-within:ring-blue-500">
                <MdEmail className="text-gray-400 mr-2" size={20} />
                <input
                  id="email"
                  type="email"
                  name='email'
                  placeholder="Email"
                  onChange={(e) => setForm({...form, [e.target.name]: e.target.value})}
                  className="appearance-none border-none w-full bg-transparent text-gray-700 leading-tight focus:outline-none"
                />
              </div>
            </label>
          </div>

          {/* Campo de Senha */}
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              <div className="flex items-center border rounded-md py-2 px-3 text-gray-700 leading-tight focus-within:ring-2 focus-within:ring-blue-500">
                <MdLock className="text-gray-400 mr-2" size={20} />
                <input
                  id="password"
                  type="password"
                  name='password'
                  placeholder="********"
                  onChange={(e) => setForm({...form, [e.target.name]: e.target.value})}
                  className="appearance-none border-none w-full bg-transparent text-gray-700 leading-tight focus:outline-none"
                />
              </div>
            </label>
          </div>

          {/* Botão de Login */}
          <div className="flex items-center justify-center mb-4">
            <button onClick={submitForm}
              className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline transition-colors duration-200"
              type="button"
            >
              LOGIN
            </button>
          </div>

          {/* Link para Cadastro */}
          <div className="flex items-center justify-center">
            <a
              className="w-full text-center bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline transition-colors duration-200"
              href="#"
            >
              IR PARA CADASTRO
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;