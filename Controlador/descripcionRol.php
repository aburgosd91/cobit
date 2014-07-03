<?php
include_once '../Modelo/planificacion_model.php';
$param = array();
$param['param_opcion']='';
$param['param_inicio']=0;
$param['param_final']=10;
$param['param_consulta']=10;
$param['param_cabecerarol']='';
$param['param_iddescripcion_rol']=1;
$param['param_descripcion']='';
$param['param_rolId']=1;

if (isset($_POST['param_opcion']))
    $param['param_opcion'] = $_POST['param_opcion'];
if (isset($_POST['param_cabecerarol']))
    $param['param_cabecerarol'] = $_POST['param_cabecerarol'];
if (isset($_POST['param_iddescripcion_rol']))
    $param['param_iddescripcion_rol'] = $_POST['param_iddescripcion_rol'];
if (isset($_POST['param_descripcion']))
    $param['param_descripcion'] = $_POST['param_descripcion'];
if (isset($_POST['param_rolId']))
    $param['param_rolId'] = $_POST['param_rolId'];
$descripcionRol=new planificacion_model();
echo $descripcionRol->gestionar($param);
?>