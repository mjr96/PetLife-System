$(function () {

    $("#datepicker").datepicker({

        monthNames: ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
            "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"], // Names of months for drop-down and formatting
        monthNamesShort: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"], // For formatting
        dayNames: ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Quarta", "Sábado"], // For formatting
        dayNamesShort: ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"], // For formatting
        dayNamesMin: ["Do", "Se", "Te", "Qa", "Qi", "Se", "Sa"],
        minDate: 1,
        inline: true,
        dateFormat: "dd/mm/yy",
        onSelect: function (dateText, inst) {
            var maria = document.getElementById("datepicker").value;

            d(maria); //Mostrando data em elemento da página
        }
    });
});
;

function d(maria) {
    var out = '<div class="table-title"><div class="row"><div class="col-sm-8"><h3>Agenda dia ' + maria + '</h3></div><div class="col-sm-4"><button type="button" onclick="marcar(\'' + maria + '\')" class="btn btn-info add-new"><i class="fa fa-plus"></i> Agendar</button></div></div></div>';
    out += '<table class="table table-bordered"><thead><tr><th>Horario</th><th>Nome do Animal</th><th>Tipo</th>';


    var xmlHttp_Get_crm = new XMLHttpRequest();
    var url = "http://localhost:8080/PetLife/webresources/Atendimento/listaratendimento";

    xmlHttp_Get_crm.open("PUT", url, true);
    xmlHttp_Get_crm.setRequestHeader('Content-type', 'application/json');

    xmlHttp_Get_crm.send('{"dataini":"' + maria + '"}');

    xmlHttp_Get_crm.onreadystatechange = function () {

        if (xmlHttp_Get_crm.readyState === 4 && xmlHttp_Get_crm.status === 200) {

            var arr = JSON.parse(xmlHttp_Get_crm.responseText);

            var i;

            for (i = 0; i < arr.length; i++) {

                out += '<tr><th scope="row">' + arr[i].horario + '</th><td>' + arr[i].nomeAnimal + '</td> <td>' + arr[i].nomeTipo + '</td></tr>';
            }
            out += '</tbody></table>';

            out += '<div class="row" ><div class="col-sm-12" ><button type="submit" class=" btn btn-info" name="enviar" onclick="voltar()">Voltar</button></div></div></div></div></div>';
            document.getElementById("troca").innerHTML = out;
        }

    };
}
;

function animalpegar() {

    id1 = window.location.href.split("=")[1];
    id = id1.split("#")[0];
    var out = '<select class="form-control" id="animalll">';

    var xmlHttp_Get = new XMLHttpRequest();
    var url = "http://localhost:8080/PetLife/webresources/Animal/listarAnimalDono/" + id;

    xmlHttp_Get.open("GET", url, true);
    xmlHttp_Get.send();
    xmlHttp_Get.onreadystatechange = function () {

        if (xmlHttp_Get.readyState == 4 && xmlHttp_Get.status == 200) {

            arr = JSON.parse(xmlHttp_Get.responseText);

            var i;

            for (i = 0; i < arr.length; i++) {
                out += '<option value = "' + arr[i].idAnimal + '" selected>' + arr[i].nome + '</option>';

            }
            out += '</select>';
            document.getElementById("animal").innerHTML = out;
        }
    };
    return out;
}
;


function buscaMedico() {

    var out = '<select class="form-control" id="dep">';

    var xmlHttp_Get = new XMLHttpRequest();
    var url = "http://localhost:8080/PetLife/webresources/Funcionario/listarMedicos";

    xmlHttp_Get.open("GET", url, true);
    xmlHttp_Get.send();
    xmlHttp_Get.onreadystatechange = function () {

        if (xmlHttp_Get.readyState == 4 && xmlHttp_Get.status == 200) {

            var arrMedico = JSON.parse(xmlHttp_Get.responseText);

            var i;

            for (i = 0; i < arrMedico.length; i++) {
                out += '<option value = "' + arrMedico[i].idfun + '" selected>' + arrMedico[i].nome + '</option>';

            }
            out += '</select>';
            document.getElementById("selMedico").innerHTML = out;
        }
    };
    return out;
}


function marcar(data) {
    animalpegar();
    buscaMedico();
    var saida = '<div class="table-title"><div class="row"><div class="col-sm-8"><h4>Agendar Atendimento Animais </h4></div></div></div>';
    saida += '<div class="row"><div class="container-fluid"><div class="row"><div class="col-md-12">';
    saida += '<div class="form-group"><input type="hidden" class="form-control" id="id" name = "nome" /></div>';
    saida += '<div class="form-group"><label for="dN">Tipo Atendimento</label><div class="radio"><label class="radio-inline"><input type="radio" value="1" name="optradio">Consulta</label><label class="radio-inline"><input type="radio" value="2" name="optradio">Vacina</label></div></div>';
    saida += '<div class="form-group"><label for="dN">Nome Animal</label><div id="animal"></div></div>';
    saida += '<div class="form-group"><label for="dN">Médico veterinário</label><div id="selMedico">';
    saida += '</div></div><div class="form-group"><label for="dN">Horario</label><input type="text" class="form-control horario" id="hora" name = "nome" /></div>';

    saida += '<div class="row"><div class="col-sm-12" ><button type="submit" class=" btn btn-info" name="enviar" onclick=salvar(\'' + data + '\')>Salvar</button><button type="button" onclick="voltar()" class="btn btn-info add-new">Cancelar</button></div></div>';

    saida += '</div></div></div></div>';

    document.getElementById("troca").innerHTML = saida;

}
;

function  salvar(data) {

    var nome = document.getElementById("animalll").value;
    var medico = document.getElementById("dep").value;
    var horario = document.getElementById("hora").value;
    var pegarRadio = document.getElementsByName("optradio");

    
    var id1 = window.location.href.split("=")[1];
    var id = id1.split("#")[0];
    
    var tipo;
    for (var i = 0; i < pegarRadio.length; i++) {
        if (pegarRadio[i].checked) {
            tipo = pegarRadio[i].value;
        }
    }

    var xmlHttp_Put = new XMLHttpRequest();

    var url = "http://localhost:8080/PetLife/webresources/Atendimento";
    xmlHttp_Put.open("PUT", url, false);
    xmlHttp_Put.setRequestHeader('Content-type', 'application/json');

    xmlHttp_Put.send('{"dataini":"' + data + '","horario":"' + horario + '","idfun":'+medico+', "idcli":' + id + ', "idanimal":' + nome + ',"idtipoaten":' + tipo + ',"status":true,"aberta":true}');
    voltar();
}
;

function voltar() {
    id1 = window.location.href.split("=")[1];
    id = id1.split("#")[0];
    location.href = 'Agendar.html?id=' + id;
}
;

function desmarcar() {
    var maria = document.getElementById("datepicker").value;
    id1 = window.location.href.split("=")[1];
    id = id1.split("#")[0];
    var out = '<div class="table-title"><div class="row"><div class="col-sm-8"><h2>Agenda dia:' + maria + '</b></h2></div><div class="col-sm-4"><button type="button" onclick="marcar()" class="btn btn-info add-new"><i class="fa fa-plus"></i> Agendar</button></div></div></div>';
    out += '<table class="table table-bordered"><thead><tr><th>Horario</th><th>Nome do Animal</th><th>Tipo</th><th>Ações</th></thead><tbody>';


    var xmlHttp_Get_crm = new XMLHttpRequest();
    var url = "http://localhost:8080/PetLife/webresources/Atendimento/listaratendimento";

    xmlHttp_Get_crm.open("PUT", url, true);
    xmlHttp_Get_crm.setRequestHeader('Content-type', 'application/json');

    xmlHttp_Get_crm.send('{"dataini":"' + maria + '"}');

    xmlHttp_Get_crm.onreadystatechange = function () {

        if (xmlHttp_Get_crm.readyState === 4 && xmlHttp_Get_crm.status === 200) {

            var arr = JSON.parse(xmlHttp_Get_crm.responseText);

            var i;

            for (i = 0; i < arr.length; i++) {

                if (arr[i].idcli === id) {
                    out += '<tr><th scope="row">' + arr[i].horario + '</th><td>' + arr[i].idanimal + '</td><td>' + arr[i].idanten + '</td><td><button type="button" class="btn btn-warning glyphicon glyphicon-pencil" onclick="mostraralterar(' + i + ')"></button><button type="button" class="btn btn-secondary glyphicon glyphicon-trash"></button></td></tr>';
                }
            }
            document.getElementById("troca").innerHTML = out;
        }



    };
}
;

function cancelar() {
    id1 = window.location.href.split("=")[1];
    id = id1.split("#")[0];
    location.href = 'principal.html?id=' + id;
}
;