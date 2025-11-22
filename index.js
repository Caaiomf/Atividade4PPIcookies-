import express from "express";

const host = "0.0.0.0";
const porta =3000;
var listaFornecedor = [];

const server = express ();

//Preparar o servidor para processar dados vindo no corpo da requisicao

server.use(express.urlencoded({extended: true}));
//qs se for true
//querystring se for false

server.get("/", (requisicao, resposta) =>{
    resposta.send(`  
        <!doctype html>
        <html lang="pt-br">
        <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <title>Menu</title>
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-sRIl4kxILFvY47J16cr9ZwB07vP4J8+LH7qKQnuqkuIAvNWLzeN8tE5YBujZqJLB" crossorigin="anonymous">
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
                            <li class="nav-item"><a class="nav-link active" href="/cadastroFornecedor">Cadastro Fornecedor</a></li>
                            <li class="nav-item"><a class="nav-link active" href="/listaFornecedores">Listar Fornecedores</a></li>
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

                <form method="POST" action="/" class="m-3 p-4 bg-light rounded shadow-sm col-md-6 mx-auto">
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
        `);
});

server.post("/", (requisicao, resposta) => {
    const usuario = requisicao.body.usuario;
    const senha = requisicao.body.senha;
    if(usuario && senha)
        resposta.redirect("/cadastroFornecedor");
    else
    {let login =`<!doctype html>
        <html lang="pt-br">
        <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <title>Menu</title>
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-sRIl4kxILFvY47J16cr9ZwB07vP4J8+LH7qKQnuqkuIAvNWLzeN8tE5YBujZqJLB" crossorigin="anonymous">
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
                            <li class="nav-item"><a class="nav-link active" href="/cadastroFornecedor">Cadastro Fornecedor</a></li>
                            <li class="nav-item"><a class="nav-link active" href="/listaFornecedores">Listar Fornecedores</a></li>
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

                <form method="POST" action="/" class="m-3 p-4 bg-light rounded shadow-sm col-md-6 mx-auto">
                    <div class="mb-3">
                        <label for="usuario" class="form-label">Usuário</label>
                        <input type="text" class="form-control" id="usuario" name="usuario" placeholder="Digite seu usuário" value=${usuario}>`;
                    if(!usuario)
                        {login +=`
                        <div>
                            <p class="text-danger">Porfavor, informe o seu Usuario </p>
                        </div>`;
                        };
                    login +=`</div>
                    <div class="mb-3">
                        <label for="senha" class="form-label">Senha</label>
                        <input type="password" class="form-control" id="senha" name="senha" placeholder="Digite sua senha">`;         
                    if(!senha)
                        {login += `
                        <div>
                            <p class="text-danger">Porfavor, Informe sua senha</p>
                        </div>`;
                        };
                    login +=`</div>
                    <div class="text-center">
                        <button type="submit" class="btn btn-primary">Entrar</button>
                        <a href="/" class="btn btn-secondary">Voltar</a>
                    </div>
                </form>
            </div>
                <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/js/bootstrap.bundle.min.js" integrity="sha384-FKyoEForCGlyvwx9Hj09JcYn3nv7wiPVlz7YYwJrWVcXK/BmnVDxM+D2scQbITxI" crossorigin="anonymous"></script>
            </body>
            </html>`;
            resposta.send(login);
    }
})

server.get("/cadastroFornecedor", (requisicao,resposta) =>{
        resposta.send(`
        <!doctype html>
        <html lang="pt-br">
        <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <title>Cadastro Fornecedor</title>
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-sRIl4kxILFvY47J16cr9ZwB07vP4J8+LH7qKQnuqkuIAvNWLzeN8tE5YBujZqJLB" crossorigin="anonymous">
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
                            <li class="nav-item"><a class="nav-link active" href="/cadastroFornecedor">Cadastro Fornecedor</a></li>
                            <li class="nav-item"><a class="nav-link active" href="/listaFornecedores">Listar Fornecedores</a></li>
                        </ul>
                        <li class="nav-item">
                        <a class="nav-link active" aria-current="/" href="/logout">Sair</a>
                        </li>
                    </ul>
                    </div>
                </div>
                </nav>
            <div class="container">
                <h1 class="text-center border m-3 p-3 bg-light">Cadastro de Fornecedor </h1>
                <form method="POST" action="/adicionarFornecedor" class="row g-3 needs-validation m-3 p-3 bg-light">
                <div class="col-md-4">
                    <label for="nomeFantasia" class="form-label">Nome Fantasia</label>
                    <input type="text" class="form-control" id="nomeFantasia" name="nomeFantasia" value="">
                </div>
                <div class="col-md-4">
                    <label for="razaoSocial" class="form-label">Razão Social</label>
                    <input type="text" class="form-control" id="razaoSocial" name="razaoSocial" value="">
                </div>
                  <div class="col-md-4">
                      <label for="CNPJ" class="form-label">CNPJ</label>
                      <input type="text" class="form-control" id="CNPJ" name="CNPJ" placeholder="00.000.000/0000-00" maxlength="14">
                  </div>      
                <div class="row g-3">
                    <div class="col-md-3">
                        <label for="CEP" class="form-label">CEP</label>
                        <input type="text" id="CEP" name="CEP"  class="form-control" placeholder="00000-000" maxlength="8">
                    </div>
                    <div class="col-md-5">
                        <label for="logradouro" class="form-label">Logradouro</label>
                        <input type="text" id="logradouro" name="logradouro" class="form-control">
                    </div>
                    <div class="col-md-2">
                        <label for="numero" class="form-label">Número</label>
                        <input type="text" id="numero" name="numero" class="form-control">
                    </div>
                    <div class="col-md-2">
                        <label for="complemento" class="form-label">Complemento</label>
                        <input type="text" id="complemento" name="complemento"  class="form-control">
                    </div>
                    <div class="col-md-4">
                        <label for="bairro" class="form-label">Bairro</label>
                        <input type="text" id="bairro" name="bairro"  class="form-control">
                    </div>
                    <div class="col-md-4">
                        <label for="cidade" class="form-label">Cidade</label>
                        <input type="text" id="cidade" name="cidade"  class="form-control">
                    </div>
                    <div class="col-md-4">
                        <label for="UF" class="form-label">Estado (UF)</label>
                            <select class="form-select" id="UF" name="UF">
                                <option value="">Selecione o estado...</option>
                                <option value="AC">Acre (AC)</option>
                                <option value="AL">Alagoas (AL)</option>
                                <option value="AP">Amapá (AP)</option>
                                <option value="AM">Amazonas (AM)</option>
                                <option value="BA">Bahia (BA)</option>
                                <option value="CE">Ceará (CE)</option>
                                <option value="DF">Distrito Federal (DF)</option>
                                <option value="ES">Espírito Santo (ES)</option>
                                <option value="GO">Goiás (GO)</option>
                                <option value="MA">Maranhão (MA)</option>
                                <option value="MT">Mato Grosso (MT)</option>
                                <option value="MS">Mato Grosso do Sul (MS)</option>
                                <option value="MG">Minas Gerais (MG)</option>
                                <option value="PA">Pará (PA)</option>
                                <option value="PB">Paraíba (PB)</option>
                                <option value="PR">Paraná (PR)</option>
                                <option value="PE">Pernambuco (PE)</option>
                                <option value="PI">Piauí (PI)</option>
                                <option value="RJ">Rio de Janeiro (RJ)</option>
                                <option value="RN">Rio Grande do Norte (RN)</option>
                                <option value="RS">Rio Grande do Sul (RS)</option>
                                <option value="RO">Rondônia (RO)</option>
                                <option value="RR">Roraima (RR)</option>
                                <option value="SC">Santa Catarina (SC)</option>
                                <option value="SP">São Paulo (SP)</option>
                                <option value="SE">Sergipe (SE)</option>
                                <option value="TO">Tocantins (TO)</option>
                            </select>
                    </div>
                    <div class="col-md-4">
                        <label for="email" class="form-label">E-mail</label>
                        <input type="text" id="email" name="email"  class="form-control">
                    </div>
                    <div class="col-md-4">
                        <label for="telefone" class="form-label">Telefone</label>
                        <input type="text" id="telefone" name="telefone"  class="form-control">
                    </div>
                </div>
                <div class="col-12">
                    <br><button class="btn btn-primary" type="submit">Cadastrar</button>
                    <a class="btn btn-secondary" href="/">Voltar</a>
                </div>
            </div>
            </form>
        </div>     
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/js/bootstrap.bundle.min.js" integrity="sha384-FKyoEForCGlyvwx9Hj09JcYn3nv7wiPVlz7YYwJrWVcXK/BmnVDxM+D2scQbITxI" crossorigin="anonymous"></script>
        </body>
</html>
`);
});

server.post("/adicionarFornecedor",(requisicao, resposta) =>{
    const nomeFantasia = requisicao.body.nomeFantasia;
    const razaoSocial = requisicao.body.razaoSocial;
    const CNPJ = requisicao.body.CNPJ;
    const CEP = requisicao.body.CEP;
    const logradouro = requisicao.body.logradouro;
    const numero = requisicao.body.numero;
    const complemento = requisicao.body.complemento;
    const bairro = requisicao.body.bairro;
    const cidade = requisicao.body.cidade;
    const UF = requisicao.body.UF;
    const email = requisicao.body.email;
    const telefone = requisicao.body.telefone;

    if (nomeFantasia && razaoSocial && CNPJ && CEP && logradouro && numero && complemento && bairro && cidade && UF && email && telefone) {
    listaFornecedor.push({nomeFantasia,razaoSocial,CNPJ,CEP,logradouro,numero,complemento,bairro,cidade,UF,email,telefone});
    resposta.redirect("/listaFornecedores");
}
else{
    let conteudo = `
        <!doctype html>
        <html lang="pt-br">
        <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <title>Cadastro Fornecedor</title>
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-sRIl4kxILFvY47J16cr9ZwB07vP4J8+LH7qKQnuqkuIAvNWLzeN8tE5YBujZqJLB" crossorigin="anonymous">
        </head>
        <body>
            <div class="container">
                <h1 class="text-center border m-3 p-3 bg-light">Cadastro de Fornecedor </h1>
                <form method="POST" action="/adicionarFornecedor" class="row g-3 needs-validation m-3 p-3 bg-light">
                <div class="col-md-4">
                    <label for="nomeFantasia" class="form-label">Nome Fantasia</label>
                    <input type="text" class="form-control" id="nomeFantasia" name="nomeFantasia" value=${nomeFantasia}>
                `;
            if(!nomeFantasia){
                conteudo += `
                <div>
                    <p class="text-danger">Porfavor, informe o nome fantasia </p>
                </div>`;
            };
            conteudo +=`</div>
                <div class="col-md-4">
                    <label for="razaoSocial" class="form-label">Razão Social</label>
                    <input type="text" class="form-control" id="razaoSocial" name="razaoSocial" value=${razaoSocial}>
                `;
            if(!razaoSocial){
                conteudo += `
                <div>
                    <p class="text-danger">Porfavor, informe a Razão Social </p>
                </div>`;
            };
            conteudo +=`</div>
                  <div class="col-md-4">
                      <label for="CNPJ" class="form-label">CNPJ</label>
                      <input type="text" class="form-control" id="CNPJ" name="CNPJ" placeholder="00.000.000/0000-00" maxlength="18" value=${CNPJ}>
                  `;
            if(!CNPJ){
            conteudo += `
                <div>
                    <p class="text-danger">Porfavor, informe o CNPJ </p>
                </div>`;
            };
            conteudo +=`</div>      
                <div class="row g-3">
                    <div class="col-md-3">
                        <label for="CEP" class="form-label">CEP</label>
                        <input type="text" id="CEP" name="CEP"  class="form-control" placeholder="00000-000" maxlength="9" value=${CEP}>
                    `;
            if(!CEP){
                conteudo += `
                <div>
                    <p class="text-danger">Porfavor, informe o CEP do fornecedor </p>
                </div>`;
            };
            conteudo +=`</div>
                    <div class="col-md-5">
                        <label for="logradouro" class="form-label">Logradouro</label>
                        <input type="text" id="logradouro" name="logradouro" class="form-control" value=${logradouro}>
                    `;
            if(!logradouro){
                conteudo += `
                <div>
                    <p class="text-danger">Porfavor, informe o Logradouro do fornecedor </p>
                </div>`;
            };
            conteudo +=`</div>
                    <div class="col-md-2">
                        <label for="numero" class="form-label">Número</label>
                        <input type="number" id="numero" name="numero" class="form-control" value=${numero}>
                    `;
            if(!numero){
                conteudo += `
                <div>
                    <p class="text-danger">Porfavor, informe o Número </p>
                </div>`;
            };
            conteudo +=`</div>
                    <div class="col-md-2">
                        <label for="complemento" class="form-label">Complemento</label>
                        <input type="text" id="complemento" name="complemento"  class="form-control" value=${complemento}>
`;
            if(!complemento){`
                <div>
                    <p class="text-danger">Porfavor, informe o complemento </p>
                </div>`;
            };
                    `</div>
                    <div class="col-md-4">
                        <label for="bairro" class="form-label">Bairro</label>
                        <input type="text" id="bairro" name="bairro"  class="form-control" value=${bairro}>
                    `;
            if(!bairro){
                conteudo += `
                <div>
                    <p class="text-danger">Porfavor, informe o Bairro do fornecedor </p>
                </div>`;
            };
            conteudo +=`</div>
                    <div class="col-md-4">
                        <label for="cidade" class="form-label">Cidade</label>
                        <input type="text" id="cidade" name="cidade"  class="form-control" value=${cidade}>
                    `;
            if(!cidade){
                conteudo += `
                <div>
                    <p class="text-danger">Porfavor, informe a cidade do fornecedor </p>
                </div>`;
            };
            conteudo +=`</div>
                    <div class="col-md-4">
                        <label for="UF" class="form-label">Estado (UF)</label>
                            <select class="form-select" id="UF" name="UF" value=${UF}>
                                <option value="">Selecione o estado...</option>
                                <option value="AC">Acre (AC)</option>
                                <option value="AL">Alagoas (AL)</option>
                                <option value="AP">Amapá (AP)</option>
                                <option value="AM">Amazonas (AM)</option>
                                <option value="BA">Bahia (BA)</option>
                                <option value="CE">Ceará (CE)</option>
                                <option value="DF">Distrito Federal (DF)</option>
                                <option value="ES">Espírito Santo (ES)</option>
                                <option value="GO">Goiás (GO)</option>
                                <option value="MA">Maranhão (MA)</option>
                                <option value="MT">Mato Grosso (MT)</option>
                                <option value="MS">Mato Grosso do Sul (MS)</option>
                                <option value="MG">Minas Gerais (MG)</option>
                                <option value="PA">Pará (PA)</option>
                                <option value="PB">Paraíba (PB)</option>
                                <option value="PR">Paraná (PR)</option>
                                <option value="PE">Pernambuco (PE)</option>
                                <option value="PI">Piauí (PI)</option>
                                <option value="RJ">Rio de Janeiro (RJ)</option>
                                <option value="RN">Rio Grande do Norte (RN)</option>
                                <option value="RS">Rio Grande do Sul (RS)</option>
                                <option value="RO">Rondônia (RO)</option>
                                <option value="RR">Roraima (RR)</option>
                                <option value="SC">Santa Catarina (SC)</option>
                                <option value="SP">São Paulo (SP)</option>
                                <option value="SE">Sergipe (SE)</option>
                                <option value="TO">Tocantins (TO)</option>
                            </select>
                    `;
            if(!UF){
                conteudo += `
                <div>
                    <p class="text-danger">Porfavor, informe o estado do fornecedor </p>
                </div>`;
            };
            conteudo +=`</div>
                    <div class="col-md-4">
                        <label for="email" class="form-label">E-mail</label>
                        <input type="text" id="email" name="email"  class="form-control" value=${email}>
                    `;
            if(!email){
                conteudo += `
                <div>
                    <p class="text-danger">Porfavor, informe o E-mail do fornecedor </p>
                </div>`;
            };
            conteudo +=`</div>
                    <div class="col-md-4">
                        <label for="telefone" class="form-label">Telefone</label>
                        <input type="text" id="telefone" name="telefone"  class="form-control" value=${telefone}>
                    `;
            if(!telefone){
                conteudo += `
                <div>
                    <p class="text-danger">Porfavor, informe o Telefone do fornecedor </p>
                </div>`;
            };
            conteudo +=`</div>
                </div>
                <div class="col-12">
                    <br><button class="btn btn-primary" type="submit">Cadastrar</button>
                    <a class="btn btn-secondary" href="/">Voltar</a>
                </div>
            </div>
            </form>
        </div>     
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/js/bootstrap.bundle.min.js" integrity="sha384-FKyoEForCGlyvwx9Hj09JcYn3nv7wiPVlz7YYwJrWVcXK/BmnVDxM+D2scQbITxI" crossorigin="anonymous"></script>
        </body>
</html>
`;
        resposta.send(conteudo);
}
});

server.get("/listaFornecedores", (requisicao, resposta) => {
    let conteudo = `
            <!doctype html>
        <html lang="pt-br">
        <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <title>Lista de fornecedor do sistema</title>
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-sRIl4kxILFvY47J16cr9ZwB07vP4J8+LH7qKQnuqkuIAvNWLzeN8tE5YBujZqJLB" crossorigin="anonymous">
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
                            <li class="nav-item"><a class="nav-link active" href="/cadastroFornecedor">Cadastro Fornecedor</a></li>
                            <li class="nav-item"><a class="nav-link active" href="/listaFornecedores">Listar Fornecedores</a></li>
                        </ul>
                        <li class="nav-item">
                        <a class="nav-link active" aria-current="/" href="/logout">Sair</a>
                        </li>
                    </ul>
                    </div>
                </div>
                </nav>
            <div class="container mt-5">
            <h2 class="text-center mb-4">Lista de Fornecedores Cadastrados</h2>
            
            <div class="table-responsive shadow-sm rounded-3">
                <table class="table table-striped table-hover align-middle">
                <thead class="table-primary text-center">
                    <tr>
                        <th>Razão Social</th>
                        <th>Nome Fantasia</th>
                        <th>CNPJ</th>
                        <th>CEP</th>
                        <th>Logradouro</th>
                        <th>Numero</th>
                        <th>Complemento</th>
                        <th>Bairro</th>
                        <th>Cidade</th>
                        <th>Estado</th>
                        <th>E-mail</th>
                        <th>Telefone</th>
                    </tr>
                </thead>
                <tbody id="tabela-fornecedores">`;
        for(let i = 0; i < listaFornecedor.length; i++){
            conteudo += `
                <tr>
                    <td>${listaFornecedor[i].razaoSocial}</td>
                    <td>${listaFornecedor[i].nomeFantasia}</td>
                    <td>${listaFornecedor[i].CNPJ}</td>
                    <td>${listaFornecedor[i].CEP}</td>
                    <td>${listaFornecedor[i].logradouro}</td>
                    <td>${listaFornecedor[i].numero}</td>
                    <td>${listaFornecedor[i].complemento}</td>
                    <td>${listaFornecedor[i].bairro}</td>
                    <td>${listaFornecedor[i].cidade}</td>
                    <td>${listaFornecedor[i].UF}</td>
                    <td>${listaFornecedor[i].email}</td>
                    <td>${listaFornecedor[i].telefone}</td>
                </tr>
            `;
        }
        conteudo +=`
            </tbody>
                    </div>
                </table>
            </div>
            <a class="btn btn-secondary" href="/">Voltar</a>
        </body>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/js/bootstrap.bundle.min.js" integrity="sha384-FKyoEForCGlyvwx9Hj09JcYn3nv7wiPVlz7YYwJrWVcXK/BmnVDxM+D2scQbITxI" crossorigin="anonymous"></script>
        </html>
        `;
                resposta.send(conteudo);
});
server.get("/logout", (requisicao,resposta) =>{ 
    resposta.send(`
        <!doctype html>
        <html lang="pt-br">
        <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <title>Logout</title>
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-sRIl4kxILFvY47J16cr9ZwB07vP4J8+LH7qKQnuqkuIAvNWLzeN8tE5YBujZqJLB" crossorigin="anonymous">
        </head>
        <body>
            <div class="container">
                <h1 class="text-center border m-3 p-3 bg-light">Logout</h1>

                <div class="row justify-content-center m-3 p-3 bg-light rounded shadow-sm">
                    <div class="col-md-8 text-center">
                        <p class="fs-5">Obrigado pela visita</p>
                            <a href="/" class="btn btn-danger m-2">Voltar</a>
                    </div>
                </div>
            </div>

            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/js/bootstrap.bundle.min.js" integrity="sha384-FKyoEForCGlyvwx9Hj09JcYn3nv7wiPVlz7YYwJrWVcXK/BmnVDxM+D2scQbITxI" crossorigin="anonymous"></script>
        </body>
        </html>
`);
});
server.listen(porta, host, ()=>{
    console.log (`servidor rodando em http://${host}:${porta}`)
});