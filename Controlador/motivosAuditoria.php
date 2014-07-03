<?php
include_once '../Modelo/objetosAuditables_model.php';
$param = array();
$param['param_opcion']='';
$param['param_inicio']=0;
$param['param_final']=10;
$param['param_consulta']=10;
$param['param_idObjetos']=1;
$param['param_motivoAud']='';
$param['param_realidadProblematica']='';
$param['param_idProyecto']=1;

if (isset($_POST['param_opcion']))
    $param['param_opcion'] = $_POST['param_opcion'];
if (isset($_POST['param_motivoAud']))
    $param['param_motivoAud'] = $_POST['param_motivoAud'];
$motivo=new objetosAuditables_model();
echo $motivo->gestionar($param);
?>
