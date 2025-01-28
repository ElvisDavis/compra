<?php
//Enlazo la clase conexión a las variables globales de global.php
//Para poderlas utilizar
require_once "global.php";

//Creaamos una variable donde vamos a guardar la conexión
//en base a las constantes de global.php
$conexion = new mysqli(DB_HOST, DB_USER, DB_PASSWORD, DB_NAME);

//Generamos la conexión a la base de datos
//Si no se puede conectar, mostramos un mensaje de error
mysqli_query($conexion, 'SET NAMES "'.DB_ENCODE.'"');

if(mysqli_connect_errno()){
    printf("Fallo la conexión a la base de datos: %s\n", mysqli_connect_error());
    exit();
}

// Si todo sale bien, voy a crear una condiciones para que
//verifique si existe una función qeu se llama "ejecutarConsulta"
//Si no existe la función la creo.
if(!function_exists('ejecutarConsulta'))
{
    function ejecutarConsulta($sql)
    {
        global $conexion;
        $query =$conexion->query($sql);
        //Retornamos lo que a consultado
        return $query;
    }

    /*
    Creamos una función para consultar un solo registro
    de mi tabla en base al id del registro */
    function ejecutarConsultaSimpleFila($sql){
        global $conexion;
        $query=$conexion->query($sql);
        $row=$query->fetch_assoc();
        return $row;
    }

    //creamos una función para consultar un valor especi
    //fico de un registro
    function ejecutarConsulta_retornarID($sql){
        
        global $conexion;
        $query=$conexion->query($sql);
        return $conexion->insert_id;
    }
    /*
    Creamos una función para limpiar cadenas de texto
     */

    function limpiarCadena($str){
        global $conexion;
        $str=mysqli_real_escape_string($conexion, trim($str));
        return htmlspecialchars($str);
    }


}

?>