document.addEventListener('DOMContentLoaded', function() {
    const registerForm = document.getElementById('register-form');

    registerForm.addEventListener('submit', function(e) {
        e.preventDefault(); // Evita o envio padrão do formulário

        const username = document.getElementById('new-username').value;
        const password = document.getElementById('new-password').value;

        // Verifica se o nome de usuário já existe
        const existingUsers = JSON.parse(localStorage.getItem('users')) || [];
        const userExists = existingUsers.some(user => user.username === username);

        if (userExists) {
            alert('Usuário já existe!'); // Mensagem de erro
        } else {
            // Adiciona novo usuário ao array
            existingUsers.push({ username, password });
            localStorage.setItem('users', JSON.stringify(existingUsers));

            alert('Cadastro realizado com sucesso!');
            window.location.href = 'login.html'; // Redireciona para a página de login
        }
    });
});