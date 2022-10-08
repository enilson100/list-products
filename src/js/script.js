function todosProdutos(produtos) {
  const todos = document.querySelector(".todos-produtos");
  todos.addEventListener("click", function () {
    listarProdutos(produtos);
  });
}
todosProdutos(produtos);

function filtrarHort(produtos) {
  const hort = document.querySelector("#hort");
  hort.addEventListener("click", function () {
    const arrHort = produtos.filter((item) => item.secao == "Hortifruti");
    listarProdutos(arrHort);
  });
}
filtrarHort(produtos);

function filtrarPanificadora(produtos) {
  const panificadora = document.querySelector("#pani");
  panificadora.addEventListener("click", () => {
    const arrPanificadora = produtos.filter(
      (item) => item.secao == "Panificadora"
    );
    listarProdutos(arrPanificadora);
  });
}
filtrarPanificadora(produtos);

function filtrarLaticinios(produtos) {
  const laticinio = document.querySelector("#lati");
  laticinio.addEventListener("click", () => {
    const arrLaticionio = produtos.filter((item) => item.secao == "Laticínio");
    listarProdutos(arrLaticionio);
  });
}
filtrarLaticinios(produtos);

function pesquisarProduto() {
  const button = document.querySelector("#button");
  button.addEventListener("click", pesquise);
  const input = document.querySelector("#valor");
  input.addEventListener("change", pesquise);
  input.addEventListener("input", pesquise);
}
pesquisarProduto();

function pesquise() {
  const valor = document.querySelector("#valor").value;
  if (valor == "") {
    listarProdutos(produtos);
  } else {
    const pesquise = produtos.filter(
      (item) =>
        item.secao.toLowerCase().includes(valor.toLowerCase()) ||
        item.nome.toLowerCase().includes(valor.toLowerCase()) ||
        item.categoria.toLowerCase().includes(valor.toLowerCase())
    );
    listarProdutos(pesquise);
  }
}

function criarProduto(produtos) {
  const ul = document.querySelector(".container-produto");
  const lista = cardProduto(produtos);

  ul.append(lista);
}

function cardProduto(produtos) {
  const li = document.createElement("li");

  const figure = criarFigure(produtos);
  const infoProduto = criarInfoProduto(produtos);

  li.append(figure, infoProduto);

  return li;
}
function criarFigure(produtos) {
  const figure = document.createElement("figure");
  const img = document.createElement("img");

  img.src = produtos.img;

  figure.append(img);
  return figure;
}
function criarInfoProduto(produtos) {
  const section = document.createElement("section");
  const h3 = document.createElement("h3");
  const p = document.createElement("p");
  const h4 = document.createElement("h4");
  const pN = document.createElement("p");
  const button = document.createElement("button");

  section.classList.add("info-produto");
  pN.classList.add("componentes");

  addCart(button, produtos);

  h3.innerText = produtos.nome;
  p.innerText = produtos.secao;
  h4.innerText = `R$ ${produtos.preco},00`;
  pN.innerText = produtos.componentes;
  button.innerHTML = "Adicionar ao carrinho";

  section.append(h3, p, h4, pN, button);
  return section;
}

const listCart = [];
function cart(item) {
  const cartElement = document.querySelector("#addCart");
  cartElement.innerHTML = "";

  for (let i = 0; i < item.length; i++) {
    const produ = item[i];

    const liCart = document.createElement("li");
    const figureCart = document.createElement("figure");
    const imgCart = document.createElement("img");
    const section = document.createElement("section");
    const nomeH3 = document.createElement("h3");
    const valorH4 = document.createElement("h4");
    const buttonCart = document.createElement("button");

    liCart.classList.add("list-cart");
    section.classList.add("info-produtoCart");

    removeCart(buttonCart, i);

    imgCart.src = produ.img;
    nomeH3.innerHTML = produ.nome;
    valorH4.innerHTML = `R$ ${produ.preco},00`;
    buttonCart.innerHTML = "Remover Item";

    figureCart.append(imgCart);
    section.append(nomeH3, valorH4, buttonCart);
    liCart.append(figureCart, section);
    cartElement.append(liCart);
  }
}

function addCart(button, produtos) {
  button.addEventListener("click", () => {
    listCart.push(produtos);
    cart(listCart);
    contador(listCart);
    const quant = document.querySelector("#valorQ");
    quant.innerHTML = `${listCart.length}`;
  });
}
function removeCart(button, i) {
  button.addEventListener("click", () => {
    listCart.splice(i, 1);
    cart(listCart);
    contador(listCart);
    const quant = document.querySelector("#valorQ");
    quant.innerHTML = `${listCart.length}`;
  });
}

function listarProdutos(produtos) {
  const ul = document.querySelector(".container-produto");
  ul.innerHTML = "";
  for (let i = 0; i < produtos.length; i++) {
    criarProduto(produtos[i]);
  }
}
listarProdutos(produtos);

function contador(produtos) {
  const total = document.querySelector("#valo");

  let cont = 0;
  for (let i = 0; i < produtos.length; i++) {
    cont += produtos[i].preco;
  }
  total.innerHTML = `R$${cont},00`;
}
