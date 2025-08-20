
const perfilSelect = document.getElementById('perfil');
const camposProfessor = document.getElementById('camposProfessor');
const camposAluno = document.getElementById('camposAluno');
const msgSucesso = document.getElementById('msgSucesso');
const form = document.getElementById('formCadastro');

perfilSelect.addEventListener('change', function() {
if (this.value === 'professor') {
    camposProfessor.classList.remove('hidden');
    camposAluno.classList.add('hidden');
} else if (this.value === 'aluno') {
    camposAluno.classList.remove('hidden');
    camposProfessor.classList.add('hidden');
} else {
    camposAluno.classList.add('hidden');
    camposProfessor.classList.add('hidden');
}
});

form.addEventListener('submit', function(e) {
e.preventDefault();

// Coletar dados comuns
const dados = {
    perfil: perfilSelect.value,
    nome: form.nome.value.trim(),
    dataNascimento: form.dataNascimento.value,
    cpf: form.cpf.value.trim(),
    escola: form.escola.value.trim(),
    matricula: form.matricula.value.trim(),
    telefone: form.telefone.value.trim(),
    email: form.email.value.trim(),
    senha: form.senha.value
};

if (dados.perfil === 'professor') {
    dados.materia = form.materia.value.trim();
} else if (dados.perfil === 'aluno') {
    dados.serie = form.serie.value.trim();
    dados.turno = form.turno.value;
    dados.endereco = {
    rua: form.rua.value.trim(),
    numero: form.numero.value.trim(),
    complemento: form.complemento.value.trim(),
    bairro: form.bairro.value.trim(),
    cidade: form.cidade.value.trim(),
    estado: form.estado.value.trim(),
    cep: form.cep.value.trim(),
    };
    dados.professorResponsavel = form.professorResponsavel.value.trim();

    // Aqui você poderia adicionar a lógica para notificar atualização da série
    // por exemplo, usando um backend que verifica a data atual e o ano lectivo.
    // Esta funcionalidade requer sistema servidor ou agendamentos.
}

console.log('Dados cadastrados:', dados);

msgSucesso.textContent = 'Cadastro realizado com sucesso!';
form.reset();
camposAluno.classList.add('hidden');
camposProfessor.classList.add('hidden');
});