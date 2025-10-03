// src/LoginForm.js
import React from 'react';
import { MdEmail, MdLock, MdPerson, MdTypeSpecimen } from 'react-icons/md';
import './LoginForm.css'
import LoginService from '../services/LoginService';
import { useAuth } from '../../../shared/context/AuthContext';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../../../shared/store/auth-store';
import { jwtDecode } from 'jwt-decode';
import useUserStore from '../../../shared/store/user-store';



const RegisterForm = ({goToLogin}) => {

  const navigate = useNavigate();

  //const { login } = useAuth()
  const { setAuthData } = useAuthStore();

  const { setMe } = useUserStore();


  const [form, setForm] = React.useState({ email: "", password: "", tipo: "" })

  const submitForm = async (e) => {
    e.preventDefault();

    // Isso eu pego do backend
    const responseData = await LoginService.register(form)
    const receivedTokenFromBackend = responseData.token;
    localStorage.setItem("accessToken", receivedTokenFromBackend)

    const decodedUser = jwtDecode(receivedTokenFromBackend);
    // Armazena o token e as informações decodificadas no Zustand
    setAuthData(receivedTokenFromBackend, decodedUser);
    console.log('Dados do usuário decodificados e armazenados:', decodedUser);

    const me = await LoginService.me();
    setMe(me.tipo, me)



  }
  return (
    <div className="flex slideIn items-center justify-center  bg-gray-100">
      <div className="bg-white  p-8 rounded-lg shadow-xl w-full max-w-sm animate-slideIn">
        <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">ESTOQUE - FRONT</h1>


        <form>
          {/* Campo de Nome */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
              <div className="flex items-center border rounded-md py-2 px-3 text-gray-700 leading-tight focus-within:ring-2 focus-within:ring-blue-500">
                <MdPerson className="text-gray-400 mr-2" size={20} />
                <input
                  id="name"
                  type="name"
                  name='name'
                  placeholder="Name"
                  onChange={(e) => setForm({ ...form, [e.target.name]: e.target.value })}
                  className="appearance-none border-none w-full bg-transparent text-gray-700 leading-tight focus:outline-none"
                />
              </div>
            </label>
          </div>
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
                  onChange={(e) => setForm({ ...form, [e.target.name]: e.target.value })}
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
                  onChange={(e) => setForm({ ...form, [e.target.name]: e.target.value })}
                  className="appearance-none border-none w-full bg-transparent text-gray-700 leading-tight focus:outline-none"
                />
              </div>
            </label>
          </div>
          {/* Campo de Tipo */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="type">
              <div className="flex items-center border rounded-md py-2 px-3 text-gray-700 leading-tight focus-within:ring-2 focus-within:ring-blue-500">
                <MdTypeSpecimen className="text-gray-400 mr-2" size={20} />
                <div className="flex flex-col items-start space-y-2">
                  <label htmlFor="user-role" className="text-gray-700 font-medium">
                    Select User Role:
                  </label>

                  {/* The core HTML <select> element */}
                  <select
                    id="user-role"
                    name="tipo"
                    value={form.tipo} // Controlled component: binds the selected value to the state
                    onChange={(e) => setForm({ ...form, [e.target.name]: e.target.value })} // Handler for when the user makes a selection
                    className="
          mt-1 block w-48 py-2 px-3 border border-gray-300 bg-white 
          rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 
          focus:border-indigo-500 sm:text-sm appearance-none
        "
                  >
                    {/* The HTML <option> elements */}
                    <option value="Admin">Admin</option>
                    <option value="Standard">Standard</option>
                    <option value="Guest">Guest</option>
                  </select>

                  {/* Display the current selection */}
                  <p className="text-sm text-gray-600 mt-2">
                    Current Role: <span className="font-semibold text-indigo-600">{form.tipo}</span>
                  </p>
                </div>
              </div>
            </label>
          </div>
        

          {/* Botão de Registro */}
          <div className="flex items-center justify-center mb-4">
            <button onClick={submitForm}
              className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline transition-colors duration-200"
              type="button"
            >
              REGISTER
            </button>
          </div>

          {/* Link para Cadastro */}
          <div className="flex items-center justify-center">
            <a onClick={goToLogin}
              className="w-full text-center bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline transition-colors duration-200"
              href="#"
            >
              IR PARA LOGIN
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;