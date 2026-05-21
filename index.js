import express from "express";
import cookieParser from "cookie-parser";
import session from "express-session";

const host = "0.0.0.0";
const porta =3000;
var listaProdutos = [];

const estiloGlobal = `
<style>
    :root {
        --cor-primaria: #245953;
        --cor-primaria-escura: #173f3a;
        --cor-destaque: #f2c14e;
        --cor-fundo: #f7f9fb;
        --cor-texto: #23313d;
        --cor-borda: #d9e2ec;
    }

    * {
        box-sizing: border-box;
    }

    body {
        min-height: 100vh;
        margin: 0;
        color: var(--cor-texto);
        background:
            radial-gradient(circle at top left, rgba(242, 193, 78, 0.18), transparent 30rem),
            linear-gradient(135deg, #eef6f4 0%, var(--cor-fundo) 50%, #fff8e1 100%);
        font-family: "Segoe UI", Arial, Helvetica, sans-serif;
    }

    .navbar {
        padding: 0.85rem 1rem;
        background: rgba(255, 255, 255, 0.95) !important;
        border-bottom: 1px solid rgba(36, 89, 83, 0.12);
        box-shadow: 0 10px 30px rgba(31, 64, 78, 0.10);
        backdrop-filter: blur(8px);
    }

    .navbar-brand {
        color: var(--cor-primaria) !important;
        font-weight: 800;
    }

    .nav-link,
    .dropdown-item {
        color: #3e5363 !important;
        font-weight: 600;
        border-radius: 0.65rem;
    }

    .nav-link {
        padding: 0.55rem 0.85rem !important;
    }

    .nav-link:hover,
    .nav-link:focus,
    .dropdown-item:hover,
    .dropdown-item:focus {
        color: var(--cor-primaria-escura) !important;
        background: rgba(36, 89, 83, 0.09);
    }

    .dropdown-menu {
        padding: 0.5rem;
        border: 0;
        border-radius: 0.85rem;
        box-shadow: 0 16px 36px rgba(31, 64, 78, 0.16);
    }

    .navbar > .container-fluid + .container-fluid {
        width: auto;
        margin-left: auto;
    }

    .dflex p {
        margin: 0;
        padding: 0.45rem 0.8rem;
        color: var(--cor-primaria);
        background: rgba(36, 89, 83, 0.09);
        border-radius: 999px;
        font-size: 0.92rem;
        font-weight: 700;
    }

    .container {
        max-width: 1080px;
    }

    .container > h1,
    .container > h2 {
        margin-top: 2rem !important;
        margin-bottom: 1.25rem !important;
        color: var(--cor-primaria);
        background: transparent !important;
        border: 0 !important;
        font-weight: 800;
    }

    .container form,
    .row.justify-content-center,
    .table-responsive {
        background: rgba(255, 255, 255, 0.94) !important;
        border: 1px solid rgba(36, 89, 83, 0.12);
        border-radius: 1rem !important;
        box-shadow: 0 18px 45px rgba(31, 64, 78, 0.12) !important;
    }

    .container form {
        padding: 1.5rem !important;
    }

    .container form > .bg-light {
        width: 100%;
        max-width: 620px;
        margin-right: auto !important;
        margin-left: auto !important;
        background: transparent !important;
        box-shadow: none !important;
    }

    .form-label {
        color: #34495e;
        font-weight: 700;
    }

    .form-control {
        padding: 0.75rem 0.9rem;
        border: 1px solid var(--cor-borda);
        border-radius: 0.7rem;
    }

    .form-control:focus {
        border-color: var(--cor-primaria);
        box-shadow: 0 0 0 0.25rem rgba(36, 89, 83, 0.16);
    }

    .btn {
        padding: 0.7rem 1.05rem;
        border: 0;
        border-radius: 0.7rem;
        font-weight: 700;
        box-shadow: 0 10px 18px rgba(31, 64, 78, 0.14);
    }

    .btn-primary {
        background: var(--cor-primaria);
    }

    .btn-primary:hover,
    .btn-primary:focus {
        background: var(--cor-primaria-escura);
    }

    .btn-secondary {
        background: #51606d;
    }

    .btn-danger {
        background: #b43c3c;
    }

    .text-danger {
        margin-top: 0.45rem;
        font-size: 0.92rem;
        font-weight: 700;
    }

    .table-responsive {
        overflow: hidden;
    }

    .table {
        margin-bottom: 0;
        --bs-table-striped-bg: rgba(36, 89, 83, 0.045);
    }

    .table thead th {
        padding: 1rem;
        color: #fff;
        background: var(--cor-primaria) !important;
        border: 0;
    }

    .table tbody td {
        padding: 0.9rem 1rem;
    }

    @media (max-width: 768px) {
        body {
            background: var(--cor-fundo);
        }

        .navbar {
            padding: 0.75rem;
        }

        .navbar > .container-fluid + .container-fluid {
            width: 100%;
            margin-top: 0.65rem;
            margin-left: 0;
        }

        .container {
            padding-right: 1rem;
            padding-left: 1rem;
        }

        .container > h1,
        .container > h2 {
            font-size: 1.7rem;
        }

        .container form {
            margin: 1rem 0 !important;
            padding: 1.1rem !important;
        }

        .btn {
            width: 100%;
            margin: 0.35rem 0 !important;
        }
    }
</style>
`;

//var usuarioLogado = false; // isso é errado

const server = express ();

//Preparar o servidor para processar dados vindo no corpo da requisicao

//aula 04 nos vamos estudar o uso de sessão e de cookies para o servidor e ao cliente
//capacidade de manter informações entre requisições e resposta
//nesta aula iremos implementar o uso de cookies: Informações sobre o ultimo acesso
//uso de sessão: login no sistema
// para manipular cookies será necessario instalar o modulo cookie-parser
//para gerenciar uma sessão, sera necessario instalar o modulo express-session

//preparar o servidor a fim de identificar se um determinado esta logado ou nao
//sera preciso criar sessões na aplicacão
server.use(session({
    secret:"Minh4Ch4v3S3cre3t4",
    resave: true, //Não vai salvar se nao mudar a sessão
    saveUninitialized: true, //não salvar sessão vazia
    cookie: {
        maxAge: 1000 * 60 * 15   //1000 ms = 1 segundo * 60 = 1 minuto * 15 = 15 minutos, sempre começa de ms para hora
    }

}))


server.use(express.urlencoded({extended: true}));
//qs se for true
//querystring se for false

//preparar o servidor a fim de processar os cookies
server.use(cookieParser());

server.get("/", verificarUsuarioLogado, (requisicao, resposta) =>{
//disponilizar o menu para o usuario
//verificar a existencia do cookie
    let ultimoAcesso = requisicao.cookies?.ultimoAcesso;

    /*if(usuarioLogado)
    {
        resposta.redirect("/cadastroFornecedor");
    }
    //criando o cookie que será devolvido para o cliente/usuario*/

    const data = new Date();
    resposta.cookie("ultimoAcesso", data.toLocaleString());
    resposta.setHeader("Content-Type", "text/html");
    resposta.write(`  
        <!doctype html>
        <html lang="pt-br">
        <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <title>Menu</title>
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-sRIl4kxILFvY47J16cr9ZwB07vP4J8+LH7qKQnuqkuIAvNWLzeN8tE5YBujZqJLB" crossorigin="anonymous">
            ${estiloGlobal}
        </head>
        <body>
                <nav class="navbar navbar-expand-lg bg-body-tertiary">
                <div class="container-fluid">
                    <a class="navbar-brand" href="/">Menu</a>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                        <li class="nav-item">
                        <a class="nav-link active" aria-current="page" href="/">Home</a>
                        </li>
                        <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            Cadastro
                        </a>
                        <ul class="dropdown-menu">
                            <li class="nav-item"><a class="nav-link active" href="/cadastroProduto">Cadastro cadastroProduto</a></li>
                            <li class="nav-item"><a class="nav-link active" href="/listaProdutos">Listar Produtos</a></li>
                        </ul>
                        <li class="nav-item">
                        <a class="nav-link active" aria-current="/" href="/logout">Sair</a>
                        </li>
                    </ul>
                    </div>
                </div>
                <div class ="container-fluid">
                    <div class="dflex">
                        <div class ="p-2">
                            <p> ultimo acesso: ${ultimoAcesso || "Primeiro Acesso"}</p>
                        </div> 
                    </div>
                </div>
                </nav>
                <div class="container">
                <h1 class="text-center border m-3 p-3 bg-light">Login</h1>

                <form method="POST" action="/" class="m-3 p-4 bg-light rounded shadow-sm col-md-6 mx-auto">
                    <div class="m-3 p-4 bg-light rounded shadow-sm col-md-6 mx-auto text-center">
                        <h2 class="mb-4">Bem-vindo!</h2>

                        <p class="fs-5">
                            Seja bem-vindo ao sistema! Use o menu acima para navegar entre as opções.
                        </p>

                        <div class="mt-4">
                            <a href="/cadastroProduto" class="btn btn-primary m-2">Cadastrar Produto</a>
                            <a href="/listaProdutos" class="btn btn-secondary m-2">Listar Produtos</a>
                        </div>
                    </div>
                </form>
            </div>
                <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/js/bootstrap.bundle.min.js" integrity="sha384-FKyoEForCGlyvwx9Hj09JcYn3nv7wiPVlz7YYwJrWVcXK/BmnVDxM+D2scQbITxI" crossorigin="anonymous"></script>
            </body>
            </html>
        `);

        resposta.end();
});

server.get("/cadastroProduto", verificarUsuarioLogado, (requisicao,resposta) =>{
        resposta.send(`
<!doctype html>
<html lang="pt-br">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Cadastro Produto</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-sRIl4kxILFvY47J16cr9ZwB07vP4J8+LH7qKQnuqkuIAvNWLzeN8tE5YBujZqJLB" crossorigin="anonymous">
    ${estiloGlobal}
</head>
<body>
    <nav class="navbar navbar-expand-lg bg-body-tertiary">
        <div class="container-fluid">
            <a class="navbar-brand" href="/">Menu</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                        <a class="nav-link active" aria-current="page" href="/">Home</a>
                    </li>
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            Cadastro
                        </a>
                        <ul class="dropdown-menu">
                            <li class="nav-item"><a class="nav-link active" href="/cadastroProduto">Cadastro Produto</a></li>
                            <li class="nav-item"><a class="nav-link active" href="/listaProdutos">Listar Produtos</a></li>
                        </ul>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link active" aria-current="/" href="/logout">Sair</a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>

    <div class="container">
        <h1 class="text-center border m-3 p-3 bg-light">Cadastro de Produto</h1>

        <form method="POST" action="/cadastroProduto" class="row g-3 needs-validation m-3 p-3 bg-light">

            <div class="col-md-4">
                <label for="codigoBarras" class="form-label">Código de Barras</label>
                <input type="text" class="form-control" id="codigoBarras" name="codigoBarras">
            </div>

            <div class="col-md-8">
                <label for="descricao" class="form-label">Descrição do Produto</label>
                <input type="text" class="form-control" id="descricao" name="descricao">
            </div>

            <div class="col-md-4">
                <label for="precoCusto" class="form-label">Preço de Custo</label>
                <input type="number" step="0.01" class="form-control" id="precoCusto" name="precoCusto">
            </div>

            <div class="col-md-4">
                <label for="precoVenda" class="form-label">Preço de Venda</label>
                <input type="number" step="0.01" class="form-control" id="precoVenda" name="precoVenda">
            </div>

            <div class="col-md-4">
                <label for="validade" class="form-label">Data de Validade</label>
                <input type="date" class="form-control" id="validade" name="validade">
            </div>

            <div class="col-md-4">
                <label for="estoque" class="form-label">Quantidade em Estoque</label>
                <input type="number" class="form-control" id="estoque" name="estoque">
            </div>

            <div class="col-md-8">
                <label for="fabricante" class="form-label">Nome do Fabricante</label>
                <input type="text" class="form-control" id="fabricante" name="fabricante">
            </div>

            <div class="col-12">
                <br>
                <button class="btn btn-primary" type="submit">Cadastrar</button>
                <a class="btn btn-secondary" href="/">Voltar</a>
            </div>

        </form>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/js/bootstrap.bundle.min.js" integrity="sha384-FKyoEForCGlyvwx9Hj09JcYn3nv7wiPVlz7YYwJrWVcXK/BmnVDxM+D2scQbITxI" crossorigin="anonymous"></script>
</body>
</html>

`);
});

server.post("/cadastroProduto", verificarUsuarioLogado, (requisicao, resposta) =>{
const codigoBarras = requisicao.body.codigoBarras;
const descricao = requisicao.body.descricao;
const precoCusto = requisicao.body.precoCusto;
const precoVenda = requisicao.body.precoVenda;
const validade = requisicao.body.validade;
const estoque = requisicao.body.estoque;
const fabricante = requisicao.body.fabricante;

if (codigoBarras && descricao && precoCusto && precoVenda && validade && estoque && fabricante) {
    listaProdutos.push({ codigoBarras, descricao, precoCusto, precoVenda, validade, estoque, fabricante });
    resposta.redirect("/listaProdutos");
}
else {
    let conteudo = `
    <!doctype html>
    <html lang="pt-br">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Cadastro de Produto</title>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css" rel="stylesheet">
        ${estiloGlobal}
    </head>
    <body>
        <div class="container">
            <h1 class="text-center border m-3 p-3 bg-light">Cadastro de Produto</h1>

            <form method="POST" action="/cadastroProduto" class="row g-3 needs-validation m-3 p-3 bg-light">

                <div class="col-md-4">
                    <label for="codigoBarras" class="form-label">Código de Barras</label>
                    <input type="text" class="form-control" id="codigoBarras" name="codigoBarras" value="${codigoBarras}">
    `;
    if (!codigoBarras) {
        conteudo += `
            <div>
                <p class="text-danger">Por favor, informe o código de barras.</p>
            </div>`;
    }
    conteudo += `</div>

                <div class="col-md-8">
                    <label for="descricao" class="form-label">Descrição do Produto</label>
                    <input type="text" class="form-control" id="descricao" name="descricao" value="${descricao}">
    `;
    if (!descricao) {
        conteudo += `
            <div>
                <p class="text-danger">Por favor, informe a descrição do produto.</p>
            </div>`;
    }
    conteudo += `</div>

                <div class="col-md-4">
                    <label for="precoCusto" class="form-label">Preço de Custo</label>
                    <input type="number" step="0.01" class="form-control" id="precoCusto" name="precoCusto" value="${precoCusto}">
    `;
    if (!precoCusto) {
        conteudo += `
            <div>
                <p class="text-danger">Por favor, informe o preço de custo.</p>
            </div>`;
    }
    conteudo += `</div>

                <div class="col-md-4">
                    <label for="precoVenda" class="form-label">Preço de Venda</label>
                    <input type="number" step="0.01" class="form-control" id="precoVenda" name="precoVenda" value="${precoVenda}">
    `;
    if (!precoVenda) {
        conteudo += `
            <div>
                <p class="text-danger">Por favor, informe o preço de venda.</p>
            </div>`;
    }
    conteudo += `</div>

                <div class="col-md-4">
                    <label for="validade" class="form-label">Data de Validade</label>
                    <input type="date" class="form-control" id="validade" name="validade" value="${validade}">
    `;
    if (!validade) {
        conteudo += `
            <div>
                <p class="text-danger">Por favor, informe a data de validade.</p>
            </div>`;
    }
    conteudo += `</div>

                <div class="col-md-4">
                    <label for="estoque" class="form-label">Quantidade em Estoque</label>
                    <input type="number" class="form-control" id="estoque" name="estoque" value="${estoque}">
    `;
    if (!estoque) {
        conteudo += `
            <div>
                <p class="text-danger">Por favor, informe a quantidade em estoque.</p>
            </div>`;
    }
    conteudo += `</div>

                <div class="col-md-8">
                    <label for="fabricante" class="form-label">Fabricante</label>
                    <input type="text" class="form-control" id="fabricante" name="fabricante" value="${fabricante}">
    `;
    if (!fabricante) {
        conteudo += `
            <div>
                <p class="text-danger">Por favor, informe o fabricante.</p>
            </div>`;
    }

    conteudo += `
                </div>

                <div class="col-12">
                    <br>
                    <button class="btn btn-primary" type="submit">Cadastrar</button>
                    <a class="btn btn-secondary" href="/">Voltar</a>
                </div>

            </form>
        </div>

        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/js/bootstrap.bundle.min.js"></script>
    </body>
    </html>
`;
        resposta.send(conteudo);
}
});

server.get("/listaProdutos", verificarUsuarioLogado, (requisicao, resposta) => {
    let conteudo = `
        <!doctype html>
        <html lang="pt-br">
        <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <title>Lista de Produtos do Sistema</title>
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css" rel="stylesheet">
            ${estiloGlobal}
        </head>
        <body>

            <nav class="navbar navbar-expand-lg bg-body-tertiary">
                <div class="container-fluid">
                    <a class="navbar-brand" href="/">Menu</a>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" 
                        data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" 
                        aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>

                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul class="navbar-nav me-auto mb-2 mb-lg-0">

                            <li class="nav-item">
                                <a class="nav-link active" aria-current="page" href="/">Home</a>
                            </li>

                            <li class="nav-item dropdown">
                                <a class="nav-link dropdown-toggle" href="#" role="button" 
                                    data-bs-toggle="dropdown" aria-expanded="false">
                                    Cadastro
                                </a>
                                <ul class="dropdown-menu">
                                    <li><a class="dropdown-item" href="/cadastroProduto">Cadastro de Produto</a></li>
                                    <li><a class="dropdown-item" href="/listaProdutos">Listar Produtos</a></li>
                                </ul>
                            </li>

                            <li class="nav-item">
                                <a class="nav-link active" href="/logout">Sair</a>
                            </li>

                        </ul>
                    </div>
                </div>
            </nav>

            <div class="container mt-5">
                <h2 class="text-center mb-4">Lista de Produtos Cadastrados</h2>

                <div class="table-responsive shadow-sm rounded-3">
                    <table class="table table-striped table-hover align-middle">
                        <thead class="table-primary text-center">
                            <tr>
                                <th>Código de Barras</th>
                                <th>Descrição</th>
                                <th>Preço de Custo</th>
                                <th>Preço de Venda</th>
                                <th>Validade</th>
                                <th>Estoque</th>
                                <th>Fabricante</th>
                            </tr>
                        </thead>
                        <tbody id="tabela-produtos">`;

        for (let i = 0; i < listaProdutos.length; i++) {
            conteudo += `
                <tr>
                    <td>${listaProdutos[i].codigoBarras}</td>
                    <td>${listaProdutos[i].descricao}</td>
                    <td>R$ ${parseFloat(listaProdutos[i].precoCusto).toFixed(2)}</td>
                    <td>R$ ${parseFloat(listaProdutos[i].precoVenda).toFixed(2)}</td>
                    <td>${listaProdutos[i].validade}</td>
                    <td>${listaProdutos[i].estoque}</td>
                    <td>${listaProdutos[i].fabricante}</td>
                </tr>
            `;
        }

        conteudo += `
                        </tbody>
                    </table>
                </div>

                <a class="btn btn-secondary mt-3" href="/">Voltar</a>

            </div>

            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/js/bootstrap.bundle.min.js"></script>
        </body>
        </html>
    `;

    resposta.send(conteudo);
});

server.get("/logout", (requisicao,resposta) =>{ 
    requisicao.session.destroy();
    resposta.send(`
        <!doctype html>
        <html lang="pt-br">
        <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <title>Logout</title>
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-sRIl4kxILFvY47J16cr9ZwB07vP4J8+LH7qKQnuqkuIAvNWLzeN8tE5YBujZqJLB" crossorigin="anonymous">
            ${estiloGlobal}
        </head>
        <body>
            <div class="container">
                <h1 class="text-center border m-3 p-3 bg-light">Logout</h1>

                <div class="row justify-content-center m-3 p-3 bg-light rounded shadow-sm">
                    <div class="col-md-8 text-center">
                        <p class="fs-5">Obrigado pela visita</p>
                            <a href="/login" class="btn btn-danger m-2">Voltar</a>
                    </div>
                </div>
            </div>

            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/js/bootstrap.bundle.min.js" integrity="sha384-FKyoEForCGlyvwx9Hj09JcYn3nv7wiPVlz7YYwJrWVcXK/BmnVDxM+D2scQbITxI" crossorigin="anonymous"></script>
        </body>
        </html>
`);
});

    server.get("/login",(requisicao, resposta)=>{
        resposta.send(`
        <!doctype html>
        <html lang="pt-br">
        <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <title>Menu</title>
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-sRIl4kxILFvY47J16cr9ZwB07vP4J8+LH7qKQnuqkuIAvNWLzeN8tE5YBujZqJLB" crossorigin="anonymous">
            ${estiloGlobal}
        </head>
        <body>
                <nav class="navbar navbar-expand-lg bg-body-tertiary">
                <div class="container-fluid">
                    <a class="navbar-brand" href="/">Menu</a>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                        <li class="nav-item">
                        <a class="nav-link active" aria-current="page" href="/">Home</a>
                        </li>
                        <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            Cadastro
                        </a>
                        <ul class="dropdown-menu">
                            <li class="nav-item"><a class="nav-link active" href="/cadastroProduto">Cadastro de Produto</a></li>
                            <li class="nav-item"><a class="nav-link active" href="/listaProdutos">Listar Produtos</a></li>
                        </ul>
                        <li class="nav-item">
                        <a class="nav-link active" aria-current="/" href="/logout">Sair</a>
                        </li>
                    </ul>
                    </div>
                </div>
                </nav>
                <div class="container">
                <h1 class="text-center border m-3 p-3 bg-light">Login</h1>

                <form method="POST" action="/login" class="m-3 p-4 bg-light rounded shadow-sm col-md-6 mx-auto">
                    <div class="mb-3">
                        <label for="usuario" class="form-label">Usuário</label>
                        <input type="text" class="form-control" id="usuario" name="usuario" placeholder="Digite seu usuário">
                        </div>
                    <div class="mb-3">
                        <label for="senha" class="form-label">Senha</label>
                        <input type="password" class="form-control" id="senha" name="senha" placeholder="Digite sua senha">
                    </div>

                    <div class="text-center">
                        <button type="submit" class="btn btn-primary">Entrar</button>
                        <a href="/" class="btn btn-secondary">Voltar</a>
                    </div>
                </form>
            </div>
                <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/js/bootstrap.bundle.min.js" integrity="sha384-FKyoEForCGlyvwx9Hj09JcYn3nv7wiPVlz7YYwJrWVcXK/BmnVDxM+D2scQbITxI" crossorigin="anonymous"></script>
            </body>
            </html>
            `)
    });

    server.post("/login",(requisicao,resposta) => {
    const usuario = requisicao.body.usuario;
    const senha = requisicao.body.senha;
    if(usuario === "admin" && senha === "admin"){
        requisicao.session.dadosLogin={nome: "Administrador", logado: true};
        resposta.redirect("/");
    }
    else
    {let login =`
        <!doctype html>
        <html lang="pt-br">
        <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <title>Menu</title>
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-sRIl4kxILFvY47J16cr9ZwB07vP4J8+LH7qKQnuqkuIAvNWLzeN8tE5YBujZqJLB" crossorigin="anonymous">
            ${estiloGlobal}
        </head>
        <body>
                <nav class="navbar navbar-expand-lg bg-body-tertiary">
                <div class="container-fluid">
                    <a class="navbar-brand" href="/">Menu</a>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                        <li class="nav-item">
                        <a class="nav-link active" aria-current="page" href="/">Home</a>
                        </li>
                        <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            Cadastro
                        </a>
                        <ul class="dropdown-menu">
                            <li class="nav-item"><a class="nav-link active" href="/cadastroProduto">Cadastro de Produto</a></li>
                            <li class="nav-item"><a class="nav-link active" href="/listaProdutos">Listar Produtos</a></li>
                        </ul>
                        <li class="nav-item">
                        <a class="nav-link active" aria-current="/" href="/logout">Sair</a>
                        </li>
                    </ul>
                    </div>
                </div>
                </nav>
                <div class="container">
                <h1 class="text-center border m-3 p-3 bg-light">Login</h1>

                <form method="POST" action="/login" class="m-3 p-4 bg-light rounded shadow-sm col-md-6 mx-auto">
                    <div class="mb-3">
                        <label for="usuario" class="form-label">Usuário</label>
                        <input type="text" class="form-control" id="usuario" name="usuario" placeholder="Digite seu usuário">
                        </div>
                    <div class="mb-3">
                        <label for="senha" class="form-label">Senha</label>
                        <input type="password" class="form-control" id="senha" name="senha" placeholder="Digite sua senha">
                    </div>

                    <div class="text-center">
                        <button type="submit" class="btn btn-primary">Entrar</button>
                        <a href="/" class="btn btn-secondary">Voltar</a>
                    </div>
                
                <div class="col-12 mt-2">
                    <p class="text-danger">Usuario ou senha Invalido</p>
                </div>
                </form>
            </div>
                <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/js/bootstrap.bundle.min.js" integrity="sha384-FKyoEForCGlyvwx9Hj09JcYn3nv7wiPVlz7YYwJrWVcXK/BmnVDxM+D2scQbITxI" crossorigin="anonymous"></script>
            </body>
            </html>`;
            resposta.send(login);
            }
    });

    //funcao para verficiar se o usuario esta logado (middleware)
    function verificarUsuarioLogado(requisicao,resposta,proximo){
        if(requisicao.session.dadosLogin?.logado){
            proximo();
        }else{
            resposta.redirect("/login");
        }
    }
server.listen(porta, host, ()=>{
    console.log (`servidor rodando em http://${host}:${porta}`)
});
