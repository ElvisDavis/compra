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
        $("#listadoregistros").hide();
        $("#formularioregistros").show();
        $("#btnGuardar").prop("disabled",false);
        $("#btnagregar").hide();
    }else{
        $("#listadoregistros").show();
        $("#formularioregistros").hide();
        $("#btnagregar").show();
    }
}

//function para cancelar el formulario
function cancelarform(){
    limpiar();
    mostrarform(false);
}
//implementamos la funcion listar los registros de la tabla categoria
//Implementamos la funcion init que me permite mostrar el fomrulario

init();