// src/pages/DetalheProduto.jsx
import React from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import ProdutoService from '../services/ProdutoService';
// import { produtos } from '../produtos';

const ProdutoPage = () => {
  
  // Captura o 'id' da URL (definido na rota como :id)
  const { id } = useParams();
    let [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  // Encontra o produto correspondente (o id capturado é uma string, converta para número)
  // const produto = produtos.find((p) => p.id === parseInt(id));

  const [produto, setproduto] = React.useState(null)

  React.useEffect(() => {
    ProdutoService.getProdutosById(id).then(data => setproduto(data));
  }, [])

  if (!produto) {
    return (
      <div className="p-8 text-center">
        <h2 className="text-2xl font-bold text-red-600">Produto não encontrado!</h2>
        <button 
          onClick={() => navigate('/')}
          className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
        >
          Voltar para a Lista
        </button>
      </div>
    );
  }

  const precoFormatado = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(produto.preco);

  return (
    <div className="p-10 max-w-4xl mx-auto bg-white shadow-xl rounded-xl mt-10">
      <button 
        onClick={() => navigate('/')}
        className="mb-6 px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition-colors"
      >
        &larr; Voltar para os Produtos
      </button>

      <span>{searchParams.get("henrique")}</span>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Imagem */}
        <div className="md:w-1/2">
          <img 
            src={produto.imagem} 
            alt={produto.nome} 
            className="w-full h-auto object-cover rounded-lg shadow-md"
          />
        </div>

        {/* Detalhes */}
        <div className="md:w-1/2">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {produto.nome}
          </h1>
          <p className="text-xl text-gray-600 mb-6">
            Detalhes completos sobre o {produto.nome}. Aqui você teria uma descrição longa e especificações técnicas.
          </p>
          <p className="text-5xl font-extrabold text-indigo-600 mb-8">
            {precoFormatado}
          </p>
          <button className="w-full py-3 bg-green-500 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-green-600 transition-colors">
            Adicionar ao Carrinho
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProdutoPage;