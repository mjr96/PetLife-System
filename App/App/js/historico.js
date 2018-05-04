window.onload = function () {
    var id = window.location.href.split("=")[1];

    animal(id);
}

function voltar() {
    id1 = window.location.href.split("=")[1];
    id = id1.split("#")[0];
    location.href = 'historico.html?id=' + id;
}

function cancelar() {
    id1 = window.location.href.split("=")[1];
    id = id1.split("#")[0];
    location.href = 'principal.html?id=' + id;
}

function ht() {
    var pegarRadio = document.getElementsByName("optradio");
    var tipo;

    for (var i = 0; i < pegarRadio.length; i++) {
        if (pegarRadio[i].checked) {
            tipo = pegarRadio[i].value;
        }
    }
    var idanimal = document.getElementById("dep").value;


    var xmlHttp_Get = new XMLHttpRequest();

    var url;

    if (tipo === '1') {
        
    var out = '<div class="table-title"><div class="row"><div class="col-sm-8"><h3>Histórico de Consultas</h3></div></div></div>';
        url = "http://localhost:8080/PetLife/webresources/Prontuario/listarProntuario/" + idanimal;
        xmlHttp_Get.open("GET", url, true);
        xmlHttp_Get.send();
        xmlHttp_Get.onreadystatechange = function () {


            if (xmlHttp_Get.readyState == 4 && xmlHttp_Get.status == 200) {

                arr = JSON.parse(xmlHttp_Get.responseText);

                var i;

                for (i = 0; i < arr.length; i++) {
                    out += '<div class="row"><div class="col-md-12"><table class="table table-bordered"><tbody>';
                    out += '<tr><td>Data:</td><td>' + arr[i].data + '</td></tr><tr><td>Sintomas</td><td>' + arr[i].queixas + '</td></tr><tr><td>Diagnostico</td><td>' + arr[i].dignostico + '</td></tr><tr><td>Receita</td><td>' + arr[i].receita + '</td></tr><tr><td>Veterinário:</td><td>' + arr[i].nomeVeterinario + '</td></tr>';
                    out += '</tbody></table></div></div>';
                }

                out += '<div class="row"><div class="col-sm-12"><button type="button" onclick="voltar()" class="btn btn-info add-new"> Voltar</button></div></div>';


                document.getElementById("troca").innerHTML = out;
            }


        }
    } else {

    var out = '<div class="table-title"><div class="row"><div class="col-sm-8"><h2>Histórico de vacinas</h2></div></div></div>';
        var url = "http://localhost:8080/PetLife/webresources/Vacina/listarVacina/" + idanimal;
        xmlHttp_Get.open("GET", url, true);
        xmlHttp_Get.send();
        xmlHttp_Get.onreadystatechange = function () {


            if (xmlHttp_Get.readyState == 4 && xmlHttp_Get.status == 200) {

                arr = JSON.parse(xmlHttp_Get.responseText);

                var i;

                for (i = 0; i < arr.length; i++) {
                    out += '<div class="row"><div class="col-md-12"><table class="table table-bordered"><tbody>';
                    out += '<tr><td>Data:</td><td>' + arr[i].data + '</td></tr><tr><td>Nome da vacina:</td><td>' + arr[i].nomeVacina + '</td></tr><tr><td>Veterinário:</td><td>' + arr[i].nomeVeterinario + '</td></tr>';
                    out += '</tbody></table></div></div>';

                }
                out += '<div class="row"><div class="col-sm-12"><button type="button" onclick="voltar()" class="btn btn-info add-new"> Voltar</button></div></div>';



                document.getElementById("troca").innerHTML = out;
            }


        }


    }

};

function animal(id) {

    var out = '<select class="form-control" id="dep">';

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
            document.getElementById("input").innerHTML = out;
        }
    };
    return out;
};