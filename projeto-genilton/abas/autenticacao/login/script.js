const form = document.getElementById('loginForm');
const usuario = document.getElementById('usuario');
const senha = document.getElementById('senha');
const usuarioError = document.getElementById('usuarioError');
const senhaError = document.getElementById('senhaError');

form.addEventListener('submit', function(e) {
  let usuarioValido = true;
  let senhaValida = true;

  // Verifica usuário
  if (verificarUsuarioExiste(usuario.value.trim())) {
    usuarioError.style.display = 'none';
    usuario.classList.remove('error');

  } else {
    usuarioError.style.display = 'block';
    usuario.classList.add('error');

    usuarioValido = false;
  }

  // Verifica senha
  if (verificarSenhaCorreta(usuario.value.trim(), senha.value.trim()) && usuarioValido) {
    senhaError.style.display = 'none';
    senha.classList.remove('error');

  } else {
    senhaError.style.display = 'block';
    senha.classList.add('error');

    senhaValida = false;
  }

  if (usuarioValido) {
    if(senhaValida){ //entrar
      alert("bem vindo")
    }
    else{ // senha incorreta
      alert("senha incorreta")
      e.preventDefault(); // impede envio do form
    }
  }
  else{ //usuario nao encontrado
    alert("usuario nao encontrado")
    e.preventDefault(); // impede envio do form
  }
  
});

//Jonas - backend
function verificarUsuarioExiste(usuario){
  return true
}
function verificarSenhaCorreta(usuario, senha){
  return true
}