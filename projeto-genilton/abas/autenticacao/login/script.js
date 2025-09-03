    const form = document.getElementById('loginForm');
    const usuario = document.getElementById('usuario');
    const senha = document.getElementById('senha');
    const usuarioError = document.getElementById('usuarioError');
    const senhaError = document.getElementById('senhaError');

    form.addEventListener('submit', function(e) {
      let valid = true;

      // Verifica usuário
      if (usuario.value.trim() === '') {
        usuarioError.style.display = 'block';
        usuario.classList.add('error');
        valid = false;
      } else {
        usuarioError.style.display = 'none';
        usuario.classList.remove('error');
      }

      // Verifica senha
      if (senha.value.trim() === '') {
        senhaError.style.display = 'block';
        senha.classList.add('error');
        valid = false;
      } else {
        senhaError.style.display = 'none';
        senha.classList.remove('error');
      }

      if (!valid) {
        e.preventDefault(); // impede envio do form
      }
    });