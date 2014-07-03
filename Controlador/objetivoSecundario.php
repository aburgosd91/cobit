<?php
include_once '../Modelo/planificacion_model.php';
$param = array();
$param['param_opcion']='';
$param['param_inicio']=0;
$param['param_final']=10;
$param['param_consulta']=10;
$param['param_idobespecifico']=1;
$param['param_idobgeneral']=1;
$param['param_descripcionE']='';

if (isset($_POST['param_opcion']))
    $param['param_opcion'] = $_POST['param_opcion'];
if (isset($_POST['param_idobespecifico']))
    $param['param_idobespecifico'] = $_POST['param_idobespecifico'];
if (isset($_POST['param_idobgeneral']))
    $param['param_idobgeneral'] = $_POST['param_idobgeneral'];
if (isset($_POST['param_descripcionE']))
    $param['param_descripcionE'] = $_POST['param_descripcionE'];
$objetivoEspecifico=new planificacion_model();
echo $objetivoEspecifico->gestionar($param);
?>
