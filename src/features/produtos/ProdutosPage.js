// src/pages/ListaProdutos.jsx
import React from 'react';
import CardProduto from './components/CardProduto';
import ProdutoService from './services/ProdutoService';
//import { produtos } from './produtos';

const ProdutosPage = () => {

    const [produtos, setprodutos] = React.useState([])

    React.useEffect(() => {
        ProdutoService.getProdutos().then(data => setprodutos(data))
}, [])

  return (
    <div className="p-8">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-10 text-center">
        Nossos Produtos
      </h1>
      
      {/* Grid responsivo para os cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {produtos.map((produto) => (
          <CardProduto key={produto.id} produto={produto} />
        ))}
      </div>
    </div>
  );
};

export default ProdutosPage;