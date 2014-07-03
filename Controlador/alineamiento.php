<?php
include_once '../Modelo/planificacion_model.php';
$param = array();
$param['param_opcion']='';
$param['param_inicio']=0;
$param['param_final']=10;
$param['param_consulta']=10;
$param['param_idalineamiento']=1;
$param['param_idplan_auditoriaA']=1;
$param['param_alineamiento']='';
$param['param_estrategia']='';


if (isset($_POST['param_opcion']))
    $param['param_opcion'] = $_POST['param_opcion'];
if (isset($_POST['param_idalineamiento']))
    $param['param_idalineamiento'] = $_POST['param_idalineamiento'];
if (isset($_POST['param_idplan_auditoriaA']))
    $param['param_idplan_auditoriaA'] = $_POST['param_idplan_auditoriaA'];
if (isset($_POST['param_alineamiento']))
    $param['param_alineamiento'] = $_POST['param_alineamiento'];
if (isset($_POST['param_estrategia']))
    $param['param_estrategia'] = $_POST['param_estrategia'];
$alineamiento=new planificacion_model();
echo $alineamiento->gestionar($param);
?>

