document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const errorMessage = document.getElementById('error-message');

    // Verificação simples de credenciais
    if (username === 'admin' && password === 'admin123') {
        alert('Login bem-sucedido!');
// Redireciona o usuário para uma nova página
window.location.href = "index1.html";
       
    } else {
        errorMessage.textContent = 'Usuário ou senha incorretos';
    }
});
