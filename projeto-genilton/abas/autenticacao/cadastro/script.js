// =================== CONTROLE DE ABAS ===================
const btnAluno = document.getElementById('btnAluno');
const btnProfessor = document.getElementById('btnProfessor');
const formAluno = document.getElementById('formAluno');
const formProfessor = document.getElementById('formProfessor');

btnAluno.addEventListener('click', () => {
  btnAluno.classList.add('active');
  btnProfessor.classList.remove('active');
  formAluno.classList.add('active');
  formProfessor.classList.remove('active');
});

btnProfessor.addEventListener('click', () => {
  btnProfessor.classList.add('active');
  btnAluno.classList.remove('active');
  formProfessor.classList.add('active');
  formAluno.classList.remove('active');
});

// =================== TOGGLE "OUTRO" ===================
function toggleOutro(selectElem, inputId) {
  const input = document.getElementById(inputId);
  if (selectElem.value === 'Outro') {
    input.style.display = 'block';
    input.required = true;
  } else {
    input.style.display = 'none';
    input.required = false;
    input.value = '';
  }
}

// Setup eventos "Outro"
document.getElementById('curso').addEventListener('change', function() {
  toggleOutro(this, 'curso_outro');
  hideError('error-curso');
  hideError('error-curso_outro');
});
document.getElementById('ano_escolar').addEventListener('change', function() {
  toggleOutro(this, 'ano_escolar_outro');
  hideError('error-ano_escolar');
  hideError('error-ano_escolar_outro');
});
document.getElementById('tipo_escola').addEventListener('change', function() {
  toggleOutro(this, 'tipo_escola_outro');
  hideError('error-tipo_escola');
  hideError('error-tipo_escola_outro');
});
document.getElementById('materia_prof').addEventListener('change', function() {
  toggleOutro(this, 'materia_outro_prof');
  hideError('error-materia_prof');
  hideError('error-materia_outro_prof');
});

// =================== CAMPUS RADIOS ===================
function setupCampusRadios(postfix) {
  const radios = document.querySelectorAll(`input[name='campus${postfix}']`);
  const outroInputId = postfix === '_prof' ? 'campus_outro_text_prof' : 'campus_outro_text_aluno';
  const outroInput = document.getElementById(outroInputId);

  radios.forEach(radio => {
    radio.addEventListener('change', () => {
      if (radio.value === "Outro" && radio.checked) {
        outroInput.style.display = 'inline-block';
        outroInput.required = true;
      } else if (radio.checked) {
        outroInput.style.display = 'none';
        outroInput.required = false;
        outroInput.value = '';
        hideError(`error-campus_outro${postfix}`);
      }
      hideError(`error-campus${postfix}`);
    });
  });
}
setupCampusRadios('');       // aluno
setupCampusRadios('_prof');   // professor

// =================== FUNÇÕES DE ERRO ===================
function showError(id) {
  const elem = document.getElementById(id);
  if (elem) elem.style.display = 'block';
}
function hideError(id) {
  const elem = document.getElementById(id);
  if (elem) elem.style.display = 'none';
}

// =================== LIMPAR ERROS AO DIGITAR / MUDAR RADIOS ===================
function setupInputListeners(formId, fields, radiosName) {
  const form = document.getElementById(formId);
  fields.forEach(id => {
    const elem = document.getElementById(id);
    if (elem) elem.addEventListener('input', () => hideError(`error-${id}`));
  });
  const radios = form.querySelectorAll(`input[name="${radiosName}"]`);
  radios.forEach(e => e.addEventListener('change', () => hideError(`error-${radiosName}`)));
}
setupInputListeners('dadosFormAluno', ['nome_completo_aluno', 'cpf_aluno', 'matricula_aluno', 'email_aluno', 'senha_aluno', 'confirmar_senha_aluno', 'whatsapp', 'campus_outro_text_aluno', 'curso_outro', 'ano_escolar_outro', 'tipo_escola_outro'], 'genero');
setupInputListeners('dadosFormProfessor', ['nome_completo_prof', 'cpf_prof', 'matricula_prof', 'email_prof', 'senha_prof', 'confirmar_senha_prof', 'campus_outro_text_prof', 'materia_outro_prof'], 'genero_prof');

// =================== VALIDAÇÃO FORMULÁRIO ALUNO ===================
function validateFormAluno() {
  let valid = true;
  function fail(id, elem=null) {
    showError(id);
    if (elem) elem.classList.add('error');
    valid = false;
  }

  const nome = document.getElementById('nome_completo_aluno');
  if (!nome.value.trim()) fail('error-nome_completo_aluno', nome);

  const dataNasc = document.getElementById('data_nascimento');
  const dataVal = dataNasc.value.trim();
  const dataRegex = /^(0[1-9]|[12]\d|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;
  if (!dataVal || !dataRegex.test(dataVal)) fail('error-data_nascimento', dataNasc);

  const genero = [...document.querySelectorAll('input[name="genero"]:checked')];
  if (genero.length === 0) fail('error-genero');

  const cpf = document.getElementById('cpf_aluno');
  if (!cpf.value.trim()) fail('error-cpf_aluno', cpf);

  const matricula = document.getElementById('matricula_aluno');
  if (!matricula.value.trim()) fail('error-matricula_aluno', matricula);

  const campusChecked = [...document.querySelectorAll('input[name="campus"]:checked')];
  if (campusChecked.length === 0) fail('error-campus');
  else if (campusChecked[0].value === 'Outro') {
    const campusOutro = document.getElementById('campus_outro_text_aluno');
    if (!campusOutro.value.trim()) fail('error-campus_outro', campusOutro);
  }

  const curso = document.getElementById('curso');
  if (!curso.value) fail('error-curso', curso);
  else if (curso.value === 'Outro') {
    const cursoOutro = document.getElementById('curso_outro');
    if (!cursoOutro.value.trim()) fail('error-curso_outro', cursoOutro);
  }

  const turno = document.getElementById('turno');
  if (!turno.value) fail('error-turno', turno);

  const anoEscolar = document.getElementById('ano_escolar');
  if (!anoEscolar.value) fail('error-ano_escolar', anoEscolar);
  else if (anoEscolar.value === 'Outro') {
    const anoOutro = document.getElementById('ano_escolar_outro');
    if (!anoOutro.value.trim()) fail('error-ano_escolar_outro', anoOutro);
  }

  const tipoEscola = document.getElementById('tipo_escola');
  if (!tipoEscola.value) fail('error-tipo_escola', tipoEscola);
  else if (tipoEscola.value === 'Outro') {
    const tipoOutro = document.getElementById('tipo_escola_outro');
    if (!tipoOutro.value.trim()) fail('error-tipo_escola_outro', tipoOutro);
  }

  const email = document.getElementById('email_aluno');
  if (!email.value.trim() || !email.checkValidity()) fail('error-email', email);

  const whatsapp = document.getElementById('whatsapp');
  if (!whatsapp.value.trim()) fail('error-whatsapp', whatsapp);

  const senha = document.getElementById('senha_aluno');
  if (!senha.value || senha.value.length < 6) fail('error-senha', senha);

  const confirmarSenha = document.getElementById('confirmar_senha_aluno');
  if (senha.value !== confirmarSenha.value) fail('error-confirmar_senha', confirmarSenha);

  if (!valid) {
    const firstError = document.querySelector('.error-message[style*="block"]');
    if (firstError) {
      const offset = firstError.getBoundingClientRect().top + window.pageYOffset - 20;
      window.scrollTo({top: offset, behavior: 'smooth'});
    }
  }

  return valid;
}

// =================== VALIDAÇÃO FORMULÁRIO PROFESSOR ===================
function validateFormProfessor() {
  let valid = true;
  function fail(id, elem = null) {
    showError(id);
    if (elem) elem.classList.add('error');
    valid = false;
  }

  const nome = document.getElementById('nome_completo_prof');
  if (!nome.value.trim()) fail('error-nome_completo_prof', nome);

  const genero = [...document.querySelectorAll('input[name="genero_prof"]:checked')];
  if (genero.length === 0) fail('error-genero_prof');

  const cpf = document.getElementById('cpf_prof');
  if (!cpf.value.trim()) fail('error-cpf_prof', cpf);

  const matricula = document.getElementById('matricula_prof');
  if (!matricula.value.trim()) fail('error-matricula_prof', matricula);

  const campusChecked = [...document.querySelectorAll('input[name="campus_prof"]:checked')];
  if (campusChecked.length === 0) fail('error-campus_prof');
  else if (campusChecked[0].value === 'Outro') {
    const campusOutro = document.getElementById('campus_outro_text_prof');
    if (!campusOutro.value.trim()) fail('error-campus_outro_prof', campusOutro);
  }

  const materia = document.getElementById('materia_prof');
  if (!materia.value) fail('error-materia_prof', materia);
  else if (materia.value === 'Outro') {
    const materiaOutro = document.getElementById('materia_outro_prof');
    if (!materiaOutro.value.trim()) fail('error-materia_outro_prof', materiaOutro);
  }

  const email = document.getElementById('email_prof');
  if (!email.value.trim() || !email.checkValidity()) fail('error-email_prof', email);

  const senha = document.getElementById('senha_prof');
  if (!senha.value || senha.value.length < 6) fail('error-senha_prof', senha);

  const confirmarSenha = document.getElementById('confirmar_senha_prof');
  if (senha.value !== confirmarSenha.value) fail('error-confirmar_senha_prof', confirmarSenha);

  if (!valid) {
    const firstError = document.querySelector('.error-message[style*="block"]');
    if (firstError) {
      const offset = firstError.getBoundingClientRect().top + window.pageYOffset - 20;
      window.scrollTo({top: offset, behavior: 'smooth'});
    }
  }

  return valid;
}

// =================== BOTÕES DE CADASTRO ===================
document.getElementById('btnCadastrarAluno')?.addEventListener('click', (e) => {
  e.preventDefault();
  if (validateFormAluno()) {
    document.getElementById('dadosFormAluno').submit();
  }
});

document.getElementById('btnCadastrarProf')?.addEventListener('click', (e) => {
  e.preventDefault();
  if (validateFormProfessor()) {
    document.getElementById('dadosFormProfessor').submit();
  }
});

// =================== AUTOCOMPLETE DE PROFESSORES ===================
const inputProfessor = document.getElementById('inputProfessor');
const autocompleteList = document.getElementById('autocompleteList');
const listaProfessoresSelecionados = document.getElementById('listaProfessoresSelecionados');
const btnAddProfessor = document.getElementById('btnAddProfessor');

const professores = ['Prof. João Silva', 'Profª. Maria Oliveira', 'Prof. Carlos Souza', 'Prof. Ana Lima', 'Prof. Roberto Nunes', 'Prof. Beatriz Fernandes'];

function closeAutocomplete() {
  autocompleteList.innerHTML = '';
  autocompleteList.style.display = 'none';
}

function createAutocompleteItem(text) {
  const div = document.createElement('div');
  div.textContent = text;
  div.addEventListener('click', () => {
    inputProfessor.value = text;
    closeAutocomplete();
  });
  return div;
}

inputProfessor.addEventListener('input', () => {
  const val = inputProfessor.value.trim().toLowerCase();
  closeAutocomplete();
  if (!val) return;
  const matches = professores.filter(p => p.toLowerCase().includes(val));
  if (matches.length === 0) return;
  matches.forEach(m => {
    const item = createAutocompleteItem(m);
    autocompleteList.appendChild(item);
  });
  autocompleteList.style.display = 'block';
});

document.addEventListener('click', (evt) => {
  if (!evt.target.closest('#autocompleteList') && evt.target !== inputProfessor) {
    closeAutocomplete();
  }
});

btnAddProfessor.addEventListener('click', () => {
  const prof = inputProfessor.value.trim();
  if (!prof) return alert('Digite ou selecione um professor para adicionar.');
  if (!professores.includes(prof)) return alert('Professor não encontrado na lista.');
  const nomesAtuais = Array.from(listaProfessoresSelecionados.querySelectorAll('li span')).map(s => s.textContent);
  if (nomesAtuais.includes(prof)) return alert('Este professor já foi adicionado.');
  const li = document.createElement('li');
  const span = document.createElement('span');
  span.textContent = prof;
  li.appendChild(span);
  const btnRemove = document.createElement('button');
  btnRemove.type = 'button';
  btnRemove.className = 'remove-btn';
  btnRemove.textContent = 'x';
  btnRemove.title = 'Remover professor';
  btnRemove.addEventListener('click', () => li.remove());
  li.appendChild(btnRemove);
  listaProfessoresSelecionados.appendChild(li);
  inputProfessor.value = '';
});
