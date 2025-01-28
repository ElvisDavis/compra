//creamos una variable de nombre tabla
var tabla;

//Implementamos la función init que me permite ejecutar mi js
//cuando se lo llama 
function init(){
    //Llamamos a la función mostrarform y le enviamos el valor false
    mostrarform(false);
    //Llamamos a funcion listar que me permite mostrarlos registros
    //de la tabla categoria
    listar();
}
//Implemenetamos un funcion para limpiar los input de mi formulario
function limpiar(){
    $("#idcategoria").val("");
    $("#nombre").val("");
    $("#descripcion").val("");
}

//Implementamos la función mostrarform para ocultar o mostrar el formulario
function mostrarform(flag){
    limpiar();
    if(flag){
        $("#listadoresgistros").hide();
        $("#formularioregistros").show();
        $("#btnGuardar").prop("disabled",false);
        $("#btnagregar").hide();
    }
}
//Implementamos la funcion init que me permite mostrar el fomrulario
init();