import { sql } from "./conexao.js";



export class DatabaseCadastro{
    async add(usuario){
        const {id, nome, email, senha} = usuario;
        await sql`
            INSERT INTO public."cadastro-basico" (id, nome, email, senha) VALUES (${id}, ${nome}, ${email}, ${senha})
        `; 
    }
    async update(usuario){
        const {id, nome, email, senha} = usuario;
        await sql`
            UPDATE public."cadastro-basico" SET nome = ${nome}, email = ${email}, senha = ${senha} WHERE id = ${id};
        `
    }

    async delete(id){
        await sql`
            DELETE FROM public."cadastro-basico" WHERE id = ${id};
        `; 
    }

    
    async get(filtro = '', comSenha){
        let usuarios = await sql`
            SELECT * FROM public."professor";
        `; 
        //console.log(usuarios);
        
        usuarios = this.#filtrarUsuarios(usuarios, filtro, comSenha); 
        
        return usuarios;
    }

    #filtrarUsuarios(array, search, comSenha) { //filtra em função do id ou nome ou email e nao envia a senha junto
        return array.filter(obj => {
            if(!comSenha)delete obj.senha;
            const {id, nome, email} = obj;
            return id.toLowerCase().includes(search.toLowerCase()) || nome.toLowerCase().includes(search.toLowerCase()) || email.toLowerCase().includes(search.toLowerCase());
        }
        );
    }
}

const bd= new DatabaseCadastro();
bd.get('2', false).then(result =>{
    console.log(result)
});