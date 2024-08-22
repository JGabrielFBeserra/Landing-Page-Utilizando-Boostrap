let editingElement = null;

// criando o array de objetvos pré cadastrados
document.addEventListener("DOMContentLoaded", function () {
    const iniciativasPreCadastradas = [
        { nome: "Reciclagem de Plásticos", descricao: "Iniciativa para coletar e reciclar plásticos domésticos." },
        { nome: "Coleta de Pilhas e Baterias", descricao: "Pontos de coleta específicos para pilhas e baterias usadas." },
        { nome: "Reutilização de Materiais", descricao: "Projeto para reutilizar materiais de construção." },
        { nome: "Reciclagem de Papel", descricao: "Campanha para reciclagem de papel em escritórios." }
    ];
    // o forEach percorre o array de objetos e chama a função addIniciativa para cada objeto, pegando o nome e a descrição como parametro da função
    iniciativasPreCadastradas.forEach(iniciativa => addIniciativa(iniciativa.nome, iniciativa.descricao));
});

// escutador do evento do botão de submit do formulário
document.getElementById("form").addEventListener("submit", function (event) {
    event.preventDefault();

    const nome = document.getElementById("nome").value;
    const descricao = document.getElementById("descricao").value; 
    // se tiver nome e descrição, chama a função addIniciativa passando o nome e a descrição como parametro
    if (nome && descricao) {
        addIniciativa(nome, descricao);
        document.getElementById("form").reset();
    }
});

function addIniciativa(nome, descricao) {
    // pega o lugar onde ficara o card da iniciativa
    const iniciativaList = document.getElementById("iniciativas");
    // cria um novo card com o nome e a descrição da iniciativa
    const newIniciativa = document.createElement("div");
    newIniciativa.classList.add("col-12", "col-md-3", "col-lg-3", "mb-3");
    newIniciativa.innerHTML = `
        <div class="card bg-light mb-3">
            <div class="position-relative">
                <img src="/images/coleta3.png" class="img-fluid" alt="">
                <button class="position-absolute top-0 end-0 btn bg-danger text-light fw-bold mt-1 me-1" onclick="deleteIniciativa(this)">X</button>
            </div>
            <div class="card-header">${nome}</div>
            <div class="card-body">
                <p class="card-text">${descricao}</p>
            </div>
        </div>
    `;

    // adiciona um evento de click no card para abrir o modal de edição da iniciativa, se ele clicar no botão de excluir, não abre o modal
    newIniciativa.querySelector('.card').addEventListener('click', function (event) {
        if (event.target.tagName !== 'BUTTON') {
            openEditModal(this);
        }
    });

    iniciativaList.appendChild(newIniciativa);
}


// dele a iniativa, pegando da div pai do card
function deleteIniciativa(button) {
    const iniciativaCard = button.closest(".col-12");
    iniciativaCard.remove();
}

// abre o modal de edição da iniciativa
function openEditModal(cardElement) {
    // muda a variavel global para o card que esta sendo editado
    editingElement = cardElement;
    // pega o nome e a descrição do card e coloca nos inputs do modal
    const nome = cardElement.querySelector(".card-header").innerText;
    const descricao = cardElement.querySelector(".card-text").innerText;
    // pega os inputs do modal
    document.getElementById("editNome").value = nome;
    document.getElementById("editDescricao").value = descricao;
    // abre o modal
    const editModal = new bootstrap.Modal(document.getElementById('editModal'));
    editModal.show();
}

// escuta o evento de click do botão de salvar alterações do modal
document.getElementById("saveChangesBtn").addEventListener("click", function () {
    // passa o que esta no input como valor do nome e da descrição do card
    const nome = document.getElementById("editNome").value;
    const descricao = document.getElementById("editDescricao").value;

    // se tiver um card sendo editado, muda o nome e a descrição do card
    if (editingElement && nome && descricao) {
        editingElement.querySelector(".card-header").innerText = nome;
        editingElement.querySelector(".card-text").innerText = descricao;
    }
    // fecha o modal
    const editModal = bootstrap.Modal.getInstance(document.getElementById('editModal'));
    editModal.hide();
});
