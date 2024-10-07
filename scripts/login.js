document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('login-form');

    loginForm.addEventListener('submit', function(e) {
        e.preventDefault(); // Impede o envio padrão do formulário

        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        // Aqui você pode adicionar sua lógica de verificação de usuário
        // Por exemplo, verificar se o usuário e a senha estão corretos

        // Supondo que o login seja bem-sucedido
        localStorage.setItem('loggedIn', 'true'); // Marcar como logado

        // Redirecionar para a página principal
        window.location.href = 'index.html'; // Aqui é o redirecionamento para a página inicial
    });
});