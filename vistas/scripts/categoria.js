//creamos una variable de nombre tabla
var tabla;

//Implementamos la función init que me permite ejecutar mi js
//cuando se lo llama 
function init() {
    //Llamamos a la función mostrarform y le enviamos el valor false
    mostrarform(false);
    //Llamamos a funcion listar que me permite mostrarlos registros
    //de la tabla categoria
    listar();

    //capturamos el evento submit del formulario y llamamos a la función
    $("#formulario").on("submit", function (e) {
        //llamamos a la función guardaryeditar y le enviamos el evento e
        guardaryeditar(e);
    })
}
//Implemenetamos un funcion para limpiar los input de mi formulario
function limpiar() {
    $("#idcategoria").val("");
    $("#nombre").val("");
    $("#descripcion").val("");
}

//Implementamos la función mostrarform para ocultar o mostrar el formulario
function mostrarform(flag) {
    limpiar();
    if (flag) {
        $("#listadoregistros").hide();
        $("#formularioregistros").show();
        $("#btnGuardar").prop("disabled", false);
        $("#btnagregar").hide();
    } else {
        $("#listadoregistros").show();
        $("#formularioregistros").hide();
        $("#btnagregar").show();
    }
}

//function para cancelar el formulario
function cancelarform() {
    limpiar();
    mostrarform(false);
}
//implementamos la funcion listar los registros de la tabla categoria
function listar() {
    tabla = $('#tbllistado').dataTable({
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
            dataType: "json",
            error: function (e) {
                console.timeLog(e.responseText);
            }
        },
        "bDestroy": true,
        "iDisplayLength": 5,//Paginación
        //Ordene los datos de forma descendente
        "order": [[0, "desc"]] //ordenar la columna, orden 
    }).DataTable();
}
//Implementamos una función para guardar y editar
function guardaryeditar(e) {
    //Evitamos que el formulario se envie de manera tradicional (recargando la página)
    e.preventDefault();

    //Deshabilitar el botón de guardar para evitar multiples envios del formulario
    $("#btnGuardar").prop("disabled", true);
    //Capturamos los daros del formulario en un objeto formData, permitiendo el envio de archivos
    var formData = new FormData($("#formulario")[0]);

    //Realizamso un petición AJAX para enviar los datos del formulario al servidor y guardar 
    //en la base de datos.
    $.ajax({
        //url del archivo php que procesará la solicitud
        url: "../ajax/categoria.php?op=guardaryeditar",
        //Enviamos el método de petición al servidor
        type: "POST",
        //Envia los datos capturados del formulario
        data: formData,
        //Evito que Jquery establezca automáticamente el tipo de contenido 
        contentType: false,
        //Evitamos que jQuery procese los datos, permitiendo el envio de archivos
        processData: false,

        //Se jecuta si la solicitud AJAX es exitosa
        success: function (datos) {
            //Muestra un mensaje del servidor en consola
            console.log("Respuesta AJAX : ", datos);
            //Muestra una alerta con el mensaje de respuesta del servidor 
            bootbox.alert(datos);
            //Ocultanos el formulario, posiblemente par indicar que la operación 
            //termino
            mostrarform(false);
            //Recargamoslos datos de la tabla paa reflejar los cambios
            //en la base de datos
            tabla.ajax.reload();
        }
    });
    //limpiamos nuevamente el formulario
    limpiar();
}

//Implementamos un función mostrar para traer una categoria
function mostrar(idcategoria) {
    //hacemos una petición AJAX al controladro categoria.php
    $.post("../ajax/categoria.php?op=mostrar", { idcategoria: idcategoria }, function (data, status) {
        //mostramos los datos de la categoria en el formulario
        data = JSON.parse(data);
        mostrarform(true);

        $("#nombre").val(data.nombre);
        $("#descripcion").val(data.descripcion);
        $("#idcategoria").val(data.idcategoria);
    })
}

//Implementamso una funcion para descativar la categoria
function desactivar(idcategoria) {
    //confirmamos un mensaje de confirmación 
    bootbox.confirm("¿Está seguro de desactivar la Categoria?", function (result) {
        //si el usuario confirma la acción 
        if (result) {
            //hacemos una petición AJAX al controlador categoria.php
            $.post("../ajax/categoria.php?op=desactivar", { idcategoria: idcategoria }, function (e) {
                bootbox.alert(e);
                tabla.ajax.reload();
            });
        }
    });
}
//Implementamso una funcion para descativar la categoria
function activar(idcategoria) {
    //confirmamos un mensaje de confirmación 
    bootbox.confirm("¿Está seguro de desactivar la Categoria?", function (result) {
        //si el usuario confirma la acción 
        if (result) {
            //hacemos una petición AJAX al controlador categoria.php
            $.post("../ajax/categoria.php?op=activar", { idcategoria: idcategoria }, function (e) {
                bootbox.alert(e);
                tabla.ajax.reload();
            });
        }
    });
}



//Implementamos la funcion init que me permite mostrar el fomrulario

init();