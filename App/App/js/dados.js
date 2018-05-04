window.onload = function () {

    cliente();
}

var arrDP = '';

function voltar() {
    id = window.location.href.split("=")[1];
    location.href = 'principal.html?id=' + id;

}

function cliente() {

    var id = window.location.href.split("=")[1];
    var xmlHttp_Get = new XMLHttpRequest();
    var url = "http://localhost:8080/PetLife/webresources/Cliente/listar/" + id;

    xmlHttp_Get.open("GET", url, true);
    xmlHttp_Get.send();
    xmlHttp_Get.onreadystatechange = function () {

        if (xmlHttp_Get.readyState == 4 && xmlHttp_Get.status == 200) {

            arrDp = JSON.parse(xmlHttp_Get.responseText);


            var saida = '<div class="row"><div class="col-md-12"><div class="table-title"><div class="row"><div class="col-sm-12"><h2>Dados do <b>Cliente</b></h2></div></div></div>';
            saida += '<div class="row"><div class="container-fluid"><div class="row"><div class="col-md-12">';
            saida += '<input type="hidden" class="form-control" value = ' + arrDp.idCliente + ' id="idfun" name = "nome" />';
            saida += '<div class="form-group"><label for="nome">Nome do Cliente</label><input  type="text" readonly="true" value = "' + arrDp.nome + '"class="form-control" id="nome" name = "nome" /></div>';
            saida += '<div class="form-group"><label for="cpf">CPF</label><input type="text" class="form-control cpf" readonly="true" value = "' + arrDp.cpf + '"id="cpf" name = "especie" /></div>';
            saida += '<div class="form-group"><label for="dN">Data de Nascimento</label><input type="text" class="form-control data" readonly="true" value = "' + arrDp.dataNascimento + '"id="dN" name = "especie" /></div>';


            /*saida += '<div class="form-group"><label for="sexo">Sexo</label><input type="text" class="form-control" readonly="true" value = "' + arrDp.sexo + '"id="sexo" name = "sexo" /></div>';
             */

            saida += '<div class="form-group"><label for="sexo">Sexo:</label><div class="radio">';
            if (arrDp.sexo === "Masculino") {
                saida += '<label class="radio-inline"><input type="radio" name="radio" value="Masculino" checked>Masculino</label><label class="radio-inline"><input type="radio" name="radio" value="Feminino">Feminino</label></div></div>';
            } else {
                saida += '<label class="radio-inline"><input type="radio" name="radio" value="Masculino">Masculino</label><label class="radio-inline"><input type="radio" name="radio" value="Feminino" checked>Feminino</label></div></div>';
            }



            saida += '<div class="form-group"><label for="endereco">Endereço</label><input type="text" class="form-control" readonly="true" value = "' + arrDp.endereco + '"id="endereco" name = "endero" /></div>';
            saida += '<div class="form-group"><label for="bairro">Bairro</label><input type="text" class="form-control" readonly="true" value = "' + arrDp.bairro + '"id="bairro" name = "endero" /></div>';
            saida += '<div class="form-group"><label for="cep">CEP</label><input type="text" class="form-control cep" readonly="true" value = "' + arrDp.cep + '"id="cep" name = "endero" /></div>';
            saida += '<div class="form-group"><label for="telefone">Telefone</label><input type="text" class="form-control telefone" readonly="true" value = "' + arrDp.telefone + '"id="telefone" name = "endero" /></div>';
            saida += '<div class="form-group"><label for="telefone">Email</label><input type="text" class="form-control" readonly="true" value = "' + arrDp.email + '"id="email" name = "endero" /></div>';
            saida += '<div class="form-group"><label for="telefone">Senha</label><input type="password" class="form-control" readonly="true" value = "' + arrDp.senha + '"id="senha" name = "endero" /></div>';

            saida += '<div class="row"><div class="col-md-12"><button type="submit" class="btn btn-info" name="enviar" onclick=alterar()>Alterar</button>';
            saida += '<button type="button" onclick="voltar()" class="btn btn-info add-new">Voltar</button></div></div>';
            saida += '</div></div></div></div></div></div>';
            document.getElementById("troca").innerHTML = saida;

        }
    };
};





function alterar() {
    var saida = '<div class="row"><div class="col-md-12"><div class="table-title"><div class="row"><div class="col-sm-12"><h2>Alterar <b>Cliente</b></h2></div></div></div>';
    saida += '<div class="row"><div class="container-fluid"><div class="row"><div class="col-sm-6">';
    saida += '<input type="hidden" class="form-control" value = ' + arrDp.idCliente + ' id="id" name = "nome" />';
    saida += '<div class="form-group"><label for="nome">Nome do Cliente</label><input  type="text"  value = "' + arrDp.nome + '"class="form-control" id="nome" name = "nome" /></div>';
    saida += '<div class="form-group"><label for="cpf">CPF</label><input type="text" class="form-control cpf"  value = "' + arrDp.cpf + '"id="cpf" name = "especie" /></div>';
    saida += '<div class="form-group"><label for="dN">Data de Nascimento</label><input type="text" class="form-control data" value = "' + arrDp.dataNascimento + '"id="dN" name = "especie" /></div>';
    /*    saida += '<div class="form-group"><label for="sexo">Sexo</label><input type="text" class="form-control" value = "' + arrDp.sexo + '"id="sexo" name = "sexo" /></div>';*/
    saida += '<div class="form-group"><label for="sexo">Sexo:</label><div class="radio">';
    if (arrDp.sexo === "Masculino") {
        saida += '<label class="radio-inline"><input type="radio" name="radio" value="Masculino" checked>Masculino</label><label class="radio-inline"><input type="radio" name="radio" value="Feminino">Feminino</label></div></div>';
    } else {
        saida += '<label class="radio-inline"><input type="radio" name="radio" value="Masculino">Masculino</label><label class="radio-inline"><input type="radio" name="radio" value="Feminino" checked>Feminino</label></div></div>';
    }

    saida += '<div class="form-group"><label for="endereco">Endereço</label><input type="text" class="form-control"  value = "' + arrDp.endereco + '"id="endereco" name = "endero" /></div>';
    saida += '<div class="form-group"><label for="bairro">Bairro</label><input type="text" class="form-control"  value = "' + arrDp.bairro + '"id="bairro" name = "endero" /></div>';
    saida += '<div class="form-group"><label for="cep">CEP</label><input type="text" class="form-control cep" value = "' + arrDp.cep + '"id="cep" name = "endero" /></div>';
    saida += '<div class="form-group"><label for="telefone">Telefone</label><input type="text" class="form-control telefone" value = "' + arrDp.telefone + '"id="telefone" name = "endero" /></div>';
    saida += '<div class="form-group"><label for="telefone">Email</label><input type="text" class="form-control" value = "' + arrDp.email + '"id="email" name = "endero" /></div>';
    saida += '<div class="form-group"><label for="telefone">Senha</label><input type="password" class="form-control" value = "' + arrDp.senha + '"id="senha" name = "endero" /></div>';

    saida += '<div class="row"><div class="col-md-12"><button type="submit" class="btn btn-info" name="enviar" onclick=alterarCliente()>Salvar</button>';
    saida += '<button type="button" onclick="voltar()" class="btn btn-info add-new">Voltar</button></div></div>';

    saida += '</div></div></div></div></div>';

    document.getElementById("troca").innerHTML = saida;


}

function alterarCliente() {


    var id = document.getElementById("id").value;
    var nome = document.getElementById("nome").value;
    var cpf = document.getElementById("cpf").value;
    var dataNa = document.getElementById("dN").value;

    var pegarRadio = document.getElementsByName("radio");


    var sexo;
    for (var i = 0; i < pegarRadio.length; i++) {
        if (pegarRadio[i].checked) {
            sexo = pegarRadio[i].value;
        }
    }





    var end = document.getElementById("endereco").value;
    var bairro = document.getElementById("bairro").value;
    var cep = document.getElementById("cep").value;
    var telefone = document.getElementById("telefone").value;
    var email = document.getElementById("email").value;
    var senha = document.getElementById("senha").value;



    /*var t ='<div class="form-group"><label for="crm">CRM</label><input type="text" class="form-control" id="crmt" name = "endero" /></div>';
     document.getElementById("teste").innerHTML = t;*/


    var xmlHttp_Put = new XMLHttpRequest();

    var url = "http://localhost:8080/PetLife/webresources/Cliente/alterarCliente";
    xmlHttp_Put.open("PUT", url, false);
    xmlHttp_Put.setRequestHeader('Content-type', 'application/json');

    xmlHttp_Put.send('{"bairro":"' + bairro + '","idCliente":' + id + ',"cep":"' + cep + '","cpf":"' + cpf + '","dataNascimento":"' + dataNa + '","email":"' + email + '","endereco":"' + end + '","nome":"' + nome + '","senha":"' + senha + '","sexo":"' + sexo + '","telefone":"' + telefone + '"}');

    cliente();
}