// src/ImageBackgroundForm.js
import React from 'react';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';


const SplashScreen = () => {

  const [isRegister, setIsRegister] = React.useState(false)
  
  return (
    <div
      className="relative flex items-center justify-center min-h-screen bg-cover bg-center"
      style={{
        backgroundImage: `url('https://www.phsoft.com.br/wp-content/uploads/2020/10/controle-estoque.png')`
      }}
    >
      {/* Overlay com opacidade de 0.5 */}
      <div className="absolute inset-0 bg-black opacity-50"></div>

      {/* Formulário sobreposto com z-index para ficar acima do overlay */}
      <div className="relative z-10 w-full max-w-sm">
        {!isRegister ?<LoginForm goToRegister={() => setIsRegister(true)} /> :
        <RegisterForm goToLogin={() => setIsRegister(false)} /> }
      </div>
    </div>
  );
};

export default SplashScreen;