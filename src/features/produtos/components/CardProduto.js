// src/components/CardProduto.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const CardProduto = ({ produto }) => {
  // Formata o preço para o padrão BRL
  const precoFormatado = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(produto.preco);

  return (
    // O componente Link envolve todo o card.
    // O 'to' define a rota para a tela de detalhes: /produto/:id
    <Link to={`/produtos/${produto.id}?henrique=caio`} className="block">
      <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden cursor-pointer transform hover:scale-[1.02]">
        
        {/* Imagem do Produto */}
        <img 
          className="w-full h-48 object-cover" 
          src={produto.imagem} 
          alt={produto.nome} 
        />
        
        {/* Detalhes do Produto */}
        <div className="p-4">
          
          {/* Nome do Produto */}
          <h3 className="text-xl font-semibold text-gray-800 mb-2 truncate">
            {produto.nome}
          </h3>
          
          {/* Preço do Produto */}
          <p className="text-2xl font-bold text-indigo-600">
            {precoFormatado}
          </p>

        </div>
      </div>
    </Link>
  );
};

export default CardProduto;