const express = require('express');
const bd = require('body-parser');
const app = express()
 
app.use(bd.json());
//API de Gestão de Produtos
 
//lista de array
 
let listaProdutos = [];
//rota para postar produto
app.post('/produtos', (req,res) =>{
    const {nome,decricao,preco,estoque,marca} = req.body;
    const produto = {
        id: listaProdutos.length + 1,
        nome,
        decricao,
        preco,
        estoque,
        marca
    };
    listaProdutos.push(produto)
    res.status(201).json({message:'Produto Cadastrado!'});
 
});
 
app.get('/produtos/:id', (req ,res)=>{
    const {id} = req.params;
    const produtoEncontrado  = listaProdutos.find(produto => produto.id === parseInt(id))
    if (!produtoEncontrado){
        res.status(404).json({message: 'Produto não encontrado'});
    }else{
        res.json(produtoEncontrado);
    }
});
 
 
 
 
app.get('/produtosall', (req,res) =>{
    res.json(listaProdutos);
 
});
 
app.put('/produtos/:id',(req,res)=>{
    const{id} = req.params
    const dadosAtualizados = req.body
    const index = listaProdutos.findIndex(produto => produto.id === parseInt(id));
 
    if(index === -1){
        return res.status(404).json({message: 'produto não encontrado'})
       
    }
 
    listaProdutos[index] = { ...listaProdutos[index], ...dadosAtualizados };
    res.json({message: 'Dados do produto atualizado com sucesso'})
});
 
 
app.delete('/produtos/:id', (req,res)=>{
    const { id } = req.params;
    listaProdutos = listaProdutos.filter(produto => produto.id !== parseInt(id));
    res.json({ message: 'Produto deletado com sucesso!' });
});
 
 
//API de Gestão de Pedidos
 
 
let listaPedidos = [];
//rota para postar produto
app.post('/pedidos', (req,res) =>{
    const {quantidade,endereco,detalhes,cliente} = req.body;
    const pedido = {
        id: listaPedidos.length + 1,
        quantidade,
        endereco,
        detalhes,
        cliente,
        status: 'pendente'
    };
   
    listaPedidos.push(pedido)
    res.status(201).json({message:'Pedido Cadastrado!'});
 
});
app.get('/pedidos/:id', (req, res) => {
    
    const {id} = req.params;
    
    const pedidoEncontrado = listaPedidos.find(pedido => pedido.id === parseInt(id));
    if (!pedidoEncontrado) {
        res.status(404).json({ message: 'Pedido não encontrado' });
    } else {
        res.json(pedidoEncontrado);
    }
});
 
app.get('/pedidos', (req,res) => {
    const {status} = req.query
    let  pedidosFiltrados = listaPedidos;
    if (status){
        pedidosFiltrados = pedidosFiltrados.filter(pedido => pedido.status === status);
    }
    res.json(pedidosFiltrados);
});
 
app.put('/pedidos/:id/status', (req,res)=>{
    const{id} = req.params
    const dadosAtualizados = req.body
    const index = listaPedidos.findIndex(pedido => pedido.id === parseInt(id));
   
    if(index === -1){
        return res.status(404).json({message: 'produto não encontrado'});
       
    }
    listaPedidos [index] = { ...listaPedidos[index], ...dadosAtualizados};
    res.json = ({message: 'Dados Atualizados com sucesso!'});
});
 
app.delete('/pedidos/:id',(req,res) => {
    const { id } = req.params;
    listaPedidos = listaPedidos.filter(pedido => pedido.id !== parseInt(id));
    res.json({ message: 'Pedido deletado com sucesso!' });
});
 
 
 
 
 
 
 
 
 
 
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
 
