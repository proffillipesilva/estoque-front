import api from "../../../shared/utils/api";

const ProdutoService = {

  /**
   * Realiza a requisicao para pegar produtos.
   * @returns {Promise<object>} - Uma Promise que resolve os produtos do usuario
   */
  async getProdutos() {
    try {
      // Usa a instância 'api' para fazer a chamada. A baseURL já está configurada.
      const response = await api.get('/v1/api/produtos');
      return response.data;
    } catch (error) {
      console.error('Erro na consulta:', error.response || error);
      
      
      
    }
  },

  /**
   * Realiza a requisicao para pegar produtos.
   * @returns {Promise<object>} - Uma Promise que retorna os detalhes do Produto
   */
  async getProdutosById(id) {
    try {
      // Usa a instância 'api' para fazer a chamada. A baseURL já está configurada.
      const response = await api.get('/v1/api/produtos/'+id);
      return response.data;
    } catch (error) {
      console.error('Erro na consulta:', error.response || error);
      
      
    }
  },

}

export default ProdutoService;