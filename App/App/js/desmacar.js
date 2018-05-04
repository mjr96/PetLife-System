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


var arr; 
function d(maria) {
    var id1 = window.location.href.split("=")[1];
    var id = id1.split("?")[0];
    var out = '<div class="row"><div class="col-md-12"><div class="table-title"><div class="row"><div class="col-sm-8"><h3>Agenda dia ' + maria + '</h3></div></div></div></div></div>';
    out += '<table class="table table-bordered"><thead><tr><th></th><th>Horario</th><th>Animal</th><th>Tipo</th>';


    var xmlHttp_Get_crm = new XMLHttpRequest();
    var url = "http://localhost:8080/PetLife/webresources/Atendimento/listaratendimentoDono";

    xmlHttp_Get_crm.open("PUT", url, true);
    xmlHttp_Get_crm.setRequestHeader('Content-type', 'application/json');

    xmlHttp_Get_crm.send('{"dataini":"' + maria + '", "idcli":"'+id+'"}');

    xmlHttp_Get_crm.onreadystatechange = function () {

        if (xmlHttp_Get_crm.readyState === 4 && xmlHttp_Get_crm.status === 200) {

            arr = JSON.parse(xmlHttp_Get_crm.responseText);

            var i;

            for (i = 0; i < arr.length; i++) {

                out += '<tr><td><input name="ck" type="radio" value="' +i + '"></td><th scope="row">' + arr[i].horario + '</th><td>' + arr[i].nomeAnimal + '</td> <td>' + arr[i].nomeTipo + '</td></tr>';
            }
            out += '</tbody></table>';

            out += '<div class="row" ><div class="col-sm-12" ><button type="submit" class=" btn btn-danger" name="enviar" onclick="desmarcarAbrir()">Desmarcar</button><button type="submit" class=" btn btn-info" name="enviar" onclick="voltar()">Voltar</button></div></div></div></div></div>';
            out += '</div></div>';
            document.getElementById("troca").innerHTML = out;
        }

    };
}
;


function voltar() {
    id1 = window.location.href.split("=")[1];
    id = id1.split("#")[0];
    location.href = 'desmarcar.html?id=' + id;
}
;

function desmarcarAbrir() {

var rads = document.getElementsByName("ck");
    var valor;
    for (var i = 0; i < rads.length; i++) {
        if (rads[i].checked) {
            valor = rads[i].value;
        }
    }

    var modal = '<h4> Deseja realmente desmarcar o horário do animal ' + arr[valor].nomeAnimal + ' às ' + arr[valor].horario + '?</h4>';
    document.getElementById("confirmarModal").innerHTML = modal;
    var botao = '<button type="button" class="btn btn-secondary" data-dismiss="modal">Cancelar</button><button type="button" class="btn btn-primary" onclick="desmarcarhora(' + arr[valor].idaten + ',\'' + arr[valor].dataini + '\')">Sim</button>'
    document.getElementById("footer").innerHTML = botao;

    $('#confirmar').modal('show');
}
;


function desmarcarhora(i, data) {

    
    var xmlHttp_Put = new XMLHttpRequest();

    var url = "http://localhost:8080/PetLife/webresources/Atendimento/desmarcar";
    xmlHttp_Put.open("PUT", url, false);
    xmlHttp_Put.setRequestHeader('Content-type', 'application/json');

    xmlHttp_Put.send('{"idaten":' + i + '}');

    d('' + data + '');

    $('#confirmar').modal('hide');

}




function cancelar() {
    id1 = window.location.href.split("=")[1];
    id = id1.split("#")[0];
    location.href = 'principal.html?id=' + id;
}
;