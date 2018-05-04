var id = '';

window.onload = function () {
    id = window.location.href.split("=")[1];
  
};    

function animal() {
    location.href = 'animal.html?id='+id;

}

function agendar() {
    location.href = 'Agendar.html?id='+id;

}
function dados() {
    location.href = 'dados.html?id='+id;

}

function desmarcar() {
    location.href = 'desmarcar.html?id='+id;

}
function historico() {
    location.href = 'historico.html?id='+id;
}
