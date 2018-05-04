

window.onload = function () {
    var id = window.location.href.split("=")[1];
    animal(id);
}

var arr;




function animal(id) {
    var out = '<div class="table-title"><div class="row"><div class="col-sm-8"><h2>Animais</h2></div><div class="col-sm-4"><button type="button" onclick="inserirAnimal('+id+')" class="btn btn-info add-new"><i class="fa fa-plus"></i> Adicionar</button></div></div></div>';
    out += '<table class="table table-bordered"><thead><tr><th>ID</th><th>Nome</th><th>Ação</th></tr></thead><tbody id="tabela">';


    var xmlHttp_Get = new XMLHttpRequest();
    var url = "http://localhost:8080/PetLife/webresources/Animal/listarAnimalDono/"+id;

    xmlHttp_Get.open("GET", url, true);
    xmlHttp_Get.send();
    xmlHttp_Get.onreadystatechange = function () {

        if (xmlHttp_Get.readyState == 4 && xmlHttp_Get.status == 200) {

            arr = JSON.parse(xmlHttp_Get.responseText);

            var i;

            for (i = 0; i < arr.length; i++) {
                out += '<tr><th scope="row">' + arr[i].idAnimal + '</th><td>' + arr[i].nome + '</td><td><button type="button" class="btn btn-warning glyphicon glyphicon-pencil" onclick="mostraralterar(' + i + ')"></button></td></tr>';

            }

            out += '</tbody></table>';
            out+='<div class="table-title"><div class="row"><div class="col-sm-12" ><button type="submit" class=" btn btn-info" name="enviar" onclick="cancelar()">Voltar</button></div></div></div>';
            document.getElementById("conteudo").innerHTML = out;
        }
    };
    
    };
     
    
    
 function cancelar() {
    id1 = window.location.href.split("=")[1];
    id = id1.split("#")[0];
    location.href = 'principal.html?id=' + id;
}


function mostraralterar(i){
   
    
    var se = arr[i].dataNascimento;
    var saida = '<div class="table-title"><div class="row"><div class="col-sm-8"><h2>Alterar <b>Animais</b></h2></div></div></div>';
    saida += '<div class="row"><div class="container-fluid"><div class="row"><div class="col-md-6">';
    saida += '<div class="form-group"><input type="hidden" class="form-control" value = ' + arr[i].idAnimal + ' id="id" name = "nome" /></div>';
    saida += '<div class="form-group"><label for="nome">Nome do Animal</label><input  type="text" value = "' + arr[i].nome + '"class="form-control" id="nome" name = "nome" /></div>';
    saida += '<div class="form-group"><label for="dN">Tipo do animal</label><select class="form-control" id="dep">';
    
    if(arr[i].idTipo===1){
     saida +='<option value = "1" selected>Cachorro</option><option value = "2">Gato</option></select></div>';
    }else saida +='<option value = "1" >Cachorro</option><option value = "2" selected>Gato</option></select></div>';
    
    saida += '<div class="form-group"><label for="cpf">Data de Nascimento:</label><input type="text" class="form-control data" id="data" name = "especie" value = "'+se+'" /></div>';
    saida += '<div class="form-group"><label for="cpf">Raca:</label><input type="text" class="form-control" value = "' + arr[i].raca + '"id="raca" name = "especie" /></div>';
    
    if(arr[i].sexo==="Macho"){
        saida+='<div class="form-group"><label for="dN">Sexo:</label><div class="radio"><label class="radio-inline"><input type="radio" value="Macho" name="optradio" checked>Macho</label><label class="radio-inline"><input type="radio" value="Fêmea" name="optradio">Fêmea</label></div></div>'; 
    
    }else{
        saida+='<div class="form-group"><label for="dN">Sexo:</label><div class="radio"><label class="radio-inline"><input type="radio" value="Macho" name="optradio">Macho</label><label class="radio-inline"><input type="radio" value="Fêmea" name="optradio" checked>Fêmea</label></div></div>'; 
    
    }
    
    saida+='<div class="row"><div class="col-md-12"><button type="submit" class=" btn btn-info" name="enviar" onclick=salvarAlteracao('+arr[i].idCliente+')>Salvar</button><button type="button" onclick="animal('+arr[i].idCliente+')" class="btn btn-info add-new">Cancelar</button></div></div>';
    saida+= '</div></div></div></div>';
    
    document.getElementById("conteudo").innerHTML = saida;
}


function inserirAnimal(i){
   
    
    var saida = '<div class="table-title"><div class="row"><div class="col-md-8"><h2>Inserir Animais</h2></div></div></div>';
    saida += '<div class="row"><div class="container-fluid"><div class="row"><div class="col-md-12">';
    saida += '<div class="form-group"><input type="hidden" class="form-control"  id="id" name = "nome" /></div>';
    saida += '<div class="form-group"><label for="nome">Nome do Animal</label><input  type="text" class="form-control" id="nome" name = "nome" /></div>';
    saida += '<div class="form-group"><label for="dN">Tipo do animal</label><select class="form-control" id="dep">';
    
    
     saida +='<option value = "1" selected>Cachorro</option><option value = "2">Gato</option></select></div>';
    
    saida += '<div class="form-group"><label for="cpf">Data de Nascimento:</label><input type="text" class="form-control data" id="data" name = "especie" /></div>';
    saida += '<div class="form-group"><label for="cpf">Raça:</label><input type="text" class="form-control" id="raca" name = "especie" /></div>';
    saida+='<div class="form-group"><label for="dN">Sexo:</label><div class="radio"><label class="radio-inline"><input type="radio" value="Macho" name="optradio">Macho</label><label class="radio-inline"><input type="radio" value="Fêmea" name="optradio">Fêmea</label></div></div>'; 
    
    saida+='<div class="row"><div class="col-md-12"><button type="submit" class=" btn btn-info" name="enviar" onclick=salvar('+i+')>Salvar</button><button type="button" onclick="animal('+i+')" class="btn btn-info add-new">Cancelar</button></div></div>';
    saida+= '</div></div></div></div>';
    
    document.getElementById("conteudo").innerHTML = saida;
}



function salvarAlteracao(idCliente){
    
    var id = document.getElementById("id").value;
    var nome = document.getElementById("nome").value;
    var dep = document.getElementById("dep").value;
    var raca = document.getElementById("raca").value;
    var data = document.getElementById("data").value;
     var pegarRadio = document.getElementsByName("optradio");
   
    var sexo;
    for (var i = 0; i < pegarRadio.length; i++) {
        if (pegarRadio[i].checked) {
            sexo = pegarRadio[i].value;
        }
    }

    var xmlHttp_Put = new XMLHttpRequest();

    var url = "http://localhost:8080/PetLife/webresources/Animal/alterarAnimal";
    xmlHttp_Put.open("PUT", url, false);
        xmlHttp_Put.setRequestHeader('Content-type', 'application/json');

        xmlHttp_Put.send('{"dataNascimento":"'+data+'","idAnimal":'+id+',"idCliente":'+idCliente+',"idTipo":'+dep+',"nome":"'+nome+'","raca":"'+raca+'","sexo":"'+sexo+'"}');
        
    animal(idCliente);

}



function salvar(idCliente){
    
    var id = document.getElementById("id").value;
    var nome = document.getElementById("nome").value;
    var dep = document.getElementById("dep").value;
    var raca = document.getElementById("raca").value;
     var pegarRadio = document.getElementsByName("optradio");
   
    var sexo;
    for (var i = 0; i < pegarRadio.length; i++) {
        if (pegarRadio[i].checked) {
            sexo = pegarRadio[i].value;
        }
    }
    var data = document.getElementById("data").value;
    
    var xmlHttp_Put = new XMLHttpRequest();

    var url = "http://localhost:8080/PetLife/webresources/Animal/inserirAnimal";
    xmlHttp_Put.open("PUT", url, false);
        xmlHttp_Put.setRequestHeader('Content-type', 'application/json');

        xmlHttp_Put.send('{"dataNascimento":"'+data+'","idCliente":'+idCliente+',"idTipo":'+dep+',"nome":"'+nome+'","raca":"'+raca+'","sexo":"'+sexo+'"}');
        
    animal(idCliente);

}
