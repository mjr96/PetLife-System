function salvarCliente() {

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
    var email = document.getElementById("email").value;
    var senha = document.getElementById("senha").value;
    var telefone = document.getElementById("telefone").value;
        
    /*var t ='<div class="form-group"><label for="crm">CRM</label><input type="text" class="form-control" id="crmt" name = "endero" /></div>';
    document.getElementById("teste").innerHTML = t;*/
   

    
    var xmlHttp_Put = new XMLHttpRequest();

    var url = "http://localhost:8080/PetLife/webresources/Cliente/inserirCliente";
    xmlHttp_Put.open("PUT", url, false);
        xmlHttp_Put.setRequestHeader('Content-type', 'application/json');

        xmlHttp_Put.send('{"bairro":"' + bairro + '","cep":"' + cep + '","cpf":"' + cpf + '","dataNascimento":"' + dataNa + '","email":"' + email + '","endereco":"' + end + '","nome":"' + nome + '","senha":"' + senha + '","sexo":"' + sexo + '","telefone":"' + telefone + '"}');

    location.href = 'index.html';

}

    