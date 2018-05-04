function  logar(){
       
    var email = document.getElementById("email").value;
    var senha = document.getElementById("senha").value;
    var retorno  = '';
    var xmlHttp = new XMLHttpRequest();
    var url = "http://localhost:8080/PetLife/webresources/PL/loginCliente";
    
    xmlHttp.open("PUT", url, false);
    xmlHttp.setRequestHeader('Content-type', 'application/json');
    xmlHttp.send('{"login":"'+email+'","senha":"'+senha+'"}');
    
    retorno = xmlHttp.responseText;
    
    
    if (retorno === '0'){
               $('#login').modal('show');
    }
    else location.href = 'principal.html?id='+retorno;
    
    
}