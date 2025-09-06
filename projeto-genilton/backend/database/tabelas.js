import { sql } from "./conexao.js";

export class TabelaAluno{
    async add(usuario){

        const {nome, professores, data_nascimento, genero, cpf, matricula, campus, curso, turno, ano_escolar, tipo_escola, email, whatsapp, senha, medalhas, olimpiadas} = usuario;
        await sql`

            INSERT INTO alunos (nome, professores, data_nascimento, genero, cpf, matricula, campus, curso, turno, ano_escolar, tipo_escola, email, whatsapp, senha, medalhas, olimpiadas) VALUES (${nome}, ARRAY[${professores.map(item=>{
                
            })}], ${data_nascimento}, ${genero}, ${cpf}, ${matricula}, ${campus}, ${curso}, ${turno}, ${ano_escolar}, ${tipo_escola}, ${email}, ${whatsapp}, ${senha}, ARRAY[${medalhas}], ARRAY[${olimpiadas}])

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
        
        //usuarios = this.#filtrarUsuarios(usuarios, filtro, comSenha); 
        
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

export class TabelaProfessor{

}