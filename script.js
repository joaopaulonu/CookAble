// Dados de exemplo para as receitas
const recipes = {
    1: {
        title: "Bolo de Chocolate",
        ingredients: ["2 xícaras de farinha", "1 xícara de açúcar", "1/2 xícara de chocolate em pó", "1 xícara de leite", "2 ovos", "1 colher de sopa de fermento"],
        instructions: ["Misture os ingredientes secos.", "Adicione os ovos, o leite e o óleo.", "Misture bem até obter uma massa homogênea.", "Asse em forno pré-aquecido a 180°C por 40 minutos."]
    },
    2: {
        title: "Salada de Frango",
        ingredients: ["1 peito de frango cozido e desfiado", "1/2 xícara de maionese", "1/4 xícara de aipo picado", "Sal e pimenta a gosto"],
        instructions: ["Em uma tigela, misture o frango desfiado, a maionese e o aipo.", "Tempere com sal e pimenta.", "Sirva em sanduíches ou como salada."]
    },
    3: {
        title: "Lasanha à Bolonhesa",
        ingredients: ["500g de massa de lasanha", "500g de carne moída", "Molho de tomate", "Queijo mussarela"],
        instructions: ["Prepare o molho à bolonhesa com a carne moída e o molho de tomate.", "Em um refratário, intercale camadas de molho, massa e queijo.", "Leve ao forno por 30 minutos."]
    }
};

// Seleciona os elementos do DOM
const modal = document.getElementById('recipe-modal');
const modalDetails = document.getElementById('modal-details');
const closeButton = document.querySelector('.close-button');
const recipeCards = document.querySelectorAll('.recipe-card');

// Função para abrir o modal
function openModal(recipeId) {
    const recipe = recipes[recipeId];
    if (!recipe) {
        console.error("Receita não encontrada!");
        return;
    }

    // Cria o conteúdo do modal dinamicamente
    let htmlContent = `
        <h3>${recipe.title}</h3>
        <h4>Ingredientes:</h4>
        <ul>
            ${recipe.ingredients.map(ingredient => `<li>${ingredient}</li>`).join('')}
        </ul>
        <h4>Instruções:</h4>
        <ol>
            ${recipe.instructions.map(instruction => `<li>${instruction}</li>`).join('')}
        </ol>
        <button id="voice-assistant-button">Iniciar Assistente de Voz</button>
    `;
    
    modalDetails.innerHTML = htmlContent;
    modal.style.display = 'block';

    // Adiciona o evento de clique ao botão do assistente de voz
    const voiceButton = document.getElementById('voice-assistant-button');
    voiceButton.addEventListener('click', simulateVoiceAssistant);
}

// Função para fechar o modal
function closeModal() {
    modal.style.display = 'none';
}

// Função para simular o assistente de voz
function simulateVoiceAssistant() {
    const originalText = this.innerText;
    this.innerText = "Assistente de voz ativado! Diga 'próximo' para continuar...";
    this.disabled = true;

    // Simulação de tempo de resposta
    setTimeout(() => {
        alert("Comando de voz 'próximo' acionado. Passo 1: Misture os ingredientes secos...");
        this.innerText = originalText;
        this.disabled = false;
    }, 2000);
}

// Adiciona eventos de clique aos botões "Ver Detalhes"
recipeCards.forEach(card => {
    const detailsButton = card.querySelector('.details-button');
    detailsButton.addEventListener('click', () => {
        const recipeId = card.getAttribute('data-recipe-id');
        openModal(recipeId);
    });
});

// Adiciona evento de clique para fechar o modal
closeButton.addEventListener('click', closeModal);

// Fecha o modal ao clicar fora dele
window.addEventListener('click', (event) => {
    if (event.target === modal) {
        closeModal();
    }
});
