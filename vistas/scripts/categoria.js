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
function listar(){
    tabla=$('#tbllistado').dataTable({
        //Activamos el procesamiento del datatable
        "aProcessing": true,
        //Paginación y filtrado realizado por el servidor
        "aServiceSide": true,
        //Definimos lo elementos del control de la tabla 
        dom: 'Brtilp',
        //Definimos los botones de exportación 
        buttons: [
            'copyHtml5',
            'excelHtml5',
            'csvHtml5',
            'pdf'
        ],
        //definimos o llenamos la tabla con los registros de la base de datos
        "ajax":
        {
            url: '../ajax/categoria.php?op=listar',
            type: "get",
            dataType : "json",
            error : function(e){
                console.timeLog(e.responseText);
            }
        },
        "bDestroy":true,
        "iDisplayLength":5,//Paginación
        //Ordene los datos de forma descendente
        "order": [[0,"desc"]] //ordenar la columna, orden 
    }).DataTable();
}
//Implementamos la funcion init que me permite mostrar el fomrulario

init();