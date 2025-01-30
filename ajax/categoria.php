<?php
//MAndamos a llamar a la calase Categoria
require_once "../modelos/Categoria.php";

//Instaciomos la clase Categoria
$categoria=new Categoria();

//declaramos las variables para procesar los datos del formulario
$idcategoria=isset($_POST["idcategoria"])? limpiarCadena($_POST['idcategoria']):"";
$nombre=isset($_POST["nombre"])? limpiarCadena($_POST['nombre']):"";
$descripcion=isset($_POST["descripcion"])? limpiarCadena($_POST['descripcion']):"";

//Le vamos a decir o le vamos a dar a elegir
// al usuario que opcion necesita realizar

switch($_GET["op"]){
    case 'guardaryeditar':
        if(empty($idcategoria)){
            $rspta=$categoria->insertar($nombre,$descripcion);
            echo $rspta ? "Categoria registrada correctamente" : "No se pudo registrar la categoria";
        }else{
            $rspta=$categoria->editar($idcategoria,$nombre,$descripcion);
            echo $rspta ? "Categoria actualizada correctamente" : "No se pudo actualizarla categoria";
        }
        break;
    case 'desactivar':
        $rspta=$categoria->desactivar($idcategoria);
        echo $rspta ? "Categoria desactivada correctamente" : "No se pudo desactivar";
        break;
    case 'activar':
        $rspta=$categoria->activar($idcategoria);
        echo $rspta ? "Categoria activada correctamente" : "No se pudo activar";
        break;
    case 'mostrar':
        $rspta=$categoria->mostrar($idcategoria);
        //Codiificar el resultado utilizando json 
        echo json_encode($rspta);
        break;
    case 'listar':
        $rspta=$categoria->listar();
        //vamos a declara un array
        $data = Array();

        //realizamo un ciclo repetitivo para mostrar toda la información 
        //de la tabla ctaegoria
        while($reg=$rspta->fetch_object()){
            $data[]=array(
                "0"=>($reg->condicion)?'<button class="btn btn-warning" onclick="mostrar('.$reg->idcategoria.')"><i class="fa fa-pencil"></i></button>'.
                '<button class="btn btn-danger" onclick="desactivar('.$reg->idcategoria.')"><i class="fa fa-close"></i></button>':
                '<button class="btn btn-warning" onclick="mostrar('.$reg->idcategoria.')"><i class="fa fa-pencil"></i></button>'. 
                '<button class="btn btn-primary" onclick="activar('.$reg->idcategoria.')"><i class="fa fa-check"></i></button>',
                "1"=>$reg->nombre,
                "2"=>$reg->descripcion,
                "3"=>($reg->condicion)?'<span class="label bg-green">Activado</span>':
                '<span class="label bg-red">Desactivado</span>'
            );
        }
        $result=array(
            "sEcho"=>1, //Información para el datatables
            "iTotalRecords"=>count($data), //enviamos el total de registros al datatables 
            "iTotalDisplayRecords"=>count($data), //enviamos el totalk de registros a visualizar
            "aaData"=>$data);
            echo json_encode($result);
        break;
}
?>