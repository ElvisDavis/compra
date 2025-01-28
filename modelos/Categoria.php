<?php
//Incluimos inicilamente la conexión a la base de datos
require "../config/Conexion.php";
//Creamos una clase de tipo categoria
//Una clase es un molde para objetos
//Aqui vamos a porgrmar todas las funcionalidades
//del objeto
class Categoria{
    //Implementamos un constructor vacio
    //Un constructor es un metodo especial 
    //de una clase
    public function __construct(){

    }

    //Implementamos un metodo para insertar registros
    public function insertar($nombre,$descripcion)
    {
        $sql="INSERT INTO categoria (nombre,descripcion,condicion)
        VALUES('$nombre','$descripcion','1')";
        return ejecutarConsulta($sql);
        
    }
    //Implementamos un función para editar un registro 
    public function editar($idcategoria,$nombre,$descripcion){
        $sql="UPDATE categoria SET nombre='$nombre',descripcion='$descripcion'
        WHERE idcategoria='$idcategoria'";
        return ejecutarConsulta($sql);
    }
    //Implementamos un método para desactivar la categoria 
    public function desactivar($idcategoria){
        $sql="UPDATE categoria SET condicion=0 WHERE idcategoria='$idcategoria'";
        return ejecutarConsulta($sql);
    }
    //Implementamos un método para activar la categoria
    public function activar($idcategoria){
        $sql="UPDATE categoria SET condicion=1 WHERE idcategoria='$idcategoria'";
        return ejecutarConsulta($sql);
    }
    //Implementamos un método para mostrar un regristro a modificar
    public function mostrar($idcategoria){
        $sql="SELECT * FROM categoria WHERE idcategoria='$idcategoria'";
        return ejecutarConsultaSimpleFila($sql);
    }

    //implementamos un método para listar los datos de categoria
    public function listar(){
        $sql="SELECT * FROM categoria";
        return ejecutarConsulta($sql);
    }




}
?>