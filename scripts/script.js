document.addEventListener('DOMContentLoaded', function() {
    // Seleciona os elementos do DOM
    const cartLink = document.getElementById('cart-link'); // Link para abrir o painel do carrinho
    const cartPanel = document.querySelector('.cart-panel'); // Painel do carrinho
    const closeBtn = document.querySelector('.close-btn'); // Botão para fechar o painel do carrinho
    const addToCartButtons = document.querySelectorAll('.btn-default'); // Botões de adicionar ao carrinho
    const cartItems = document.getElementById('cart-items'); // Lista de itens no painel do carrinho
    const cartTotal = document.getElementById('cart-total'); // Elemento para exibir o total do carrinho
    const checkoutBtn = document.querySelector('.checkout-btn'); // Botão para realizar a compra
    
    let total = 0; // Variável para armazenar o total do carrinho

    // Verifica se o usuário está logado
    const isLoggedIn = localStorage.getItem('loggedIn');

    // Altera a visibilidade do carrinho e do link de login
    if (isLoggedIn) {
        cartLink.style.display = 'block'; // Exibe o carrinho
        document.querySelector('.login-link').style.display = 'none'; // Oculta o link de login
    } else {
        cartLink.style.display = 'none'; // Oculta o carrinho
        document.querySelector('.login-link').style.display = 'block'; // Exibe o link de login
    }

    // Evento para abrir ou fechar o painel do carrinho
    cartLink.addEventListener('click', function(e) {
        e.preventDefault(); // Previne o comportamento padrão do link
        cartPanel.classList.toggle('open'); // Alterna a visibilidade do painel do carrinho
    });

    // Evento para fechar o painel do carrinho
    closeBtn.addEventListener('click', function() {
        cartPanel.classList.remove('open'); // Remove a classe que faz o painel aparecer
    });

    // Adiciona um item ao carrinho
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            if (!isLoggedIn) {
                // Se não estiver logado, redireciona para a página de login
                window.location.href = 'login.html'; // Substitua com o caminho correto para sua página de login
                return;
            }
            
            const productName = this.getAttribute('data-product'); // Nome do produto
            const productPrice = parseFloat(this.getAttribute('data-price')); // Preço do produto
            
            // Cria um item de lista para o carrinho
            const listItem = document.createElement('div');
            listItem.classList.add('cart-item');
            listItem.innerHTML = `
                <img src="${this.getAttribute('data-image')}" alt="${productName}">
                <span>${productName} - R$ ${productPrice.toFixed(2)}</span>
                <button class="remove-from-cart" data-price="${productPrice}">-</button>
            `;
            cartItems.appendChild(listItem);

            // Atualiza o total do carrinho
            total += productPrice;
            cartTotal.textContent = `Total: R$ ${total.toFixed(2)}`;
            
            // Adiciona um evento de clique para remover o item
            listItem.querySelector('.remove-from-cart').addEventListener('click', function() {
                const itemPrice = parseFloat(this.getAttribute('data-price'));
                total -= itemPrice; // Subtrai o preço do item removido
                cartTotal.textContent = `Total: R$ ${total.toFixed(2)}`;
                listItem.remove(); // Remove o item da lista
            });
        });
    });

    // Evento para finalizar a compra
    checkoutBtn.addEventListener('click', function() {
        if (!isLoggedIn) {
            // Se não estiver logado, redireciona para a página de login
            window.location.href = 'login.html'; // Substitua com o caminho correto para sua página de login
        } else {
            // Lógica para finalizar a compra
            const message = `Olá! Gostaria de fazer um pedido no valor de R$ ${total.toFixed(2)}. Qual a forma de pagamento?`;
            const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(message)}`;
            window.open(whatsappUrl, '_blank');
        }
    });
});