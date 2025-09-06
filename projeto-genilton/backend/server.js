import {fastify} from 'fastify';
import fastifyCors from '@fastify/cors';
import {TabelaAluno, TabelaProfessor} from './database/tabelas.js'
import { GeminiAI } from './gemini/gemini.js';

const server= fastify();

const gemini= new GeminiAI();

const tAluno= new TabelaAluno();
const tProf= new TabelaProfessor();

server.register(fastifyCors, {
    origin : '*' //permite qq outro endereço fazer a requisição
});

server.post('/aluno', async (res, rep)=>{
    await tAluno.add(res.body);

    

    return rep.send(res.body)
})
server.post('/professor', async (res, rep)=>{


    

    return res.body
})

server.get('/', async (res, rep)=>{

    return rep.send(res.body)
})

server.put('/', async ()=>{
    return ''
})

server.patch('/', async ()=>{
    return ''
})

server.delete('/', async ()=>{
    return ''
})

server.listen({
    host: '0.0.0.0',
    port: process.env.PORT ?? 3333
})
const teste={
    "nome" : "Jonas Davi de Souza Rocha",
    "professores" : ["Genilton", "Macedo"],
    "data_nascimento" : "2006-08-22",
    "genero" : "Masculino",
    "cpf" : "123456789",
    "matricula" : "20231164010003",
    "campus" : "SGA",
    "curso" : "info",
    "turno" : "Vespertino",
    "ano_escolar" : "3 do médio",
    "email" : "jonas.davi@escolar.ifrn",
    "whatsapp" : "84999434390",
    "senha" : "123456",
    "medalhas" : ["teste1", 1],
    "olimpiadas" : ["teste1", 1, "teste1"]
};



//rotas para usar o gemini:

server.post('/gemini/responderimg', async (req, rep)=>{
    const {prompt, imgbase64}= req.body
    


    const respostaIA= await gemini.responderImg(prompt, imgbase64);

    return rep.send(respostaIA);

})

server.post('/gemini/respondertexto', async (req, rep)=>{
    const {prompt}= req.body
    
    const respostaIA= await gemini.responderTexto(prompt);

    return rep.send(respostaIA);

})


server.listen({
    host: '0.0.0.0',
    port: process.env.PORT ?? 3333
});

//fim do gemini