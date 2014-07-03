<?php
include_once '../Modelo/planificacion_model.php';
$param = array();
$param['param_opcion']='';
$param['param_inicio']=0;
$param['param_final']=10;
$param['param_consulta']=10;
$param['param_idplan_auditoria']=1;
$param['param_alcances']='';
$param['param_aclaraciones']='';
$param['param_limitaciones']='';
$param['param_idProyecto']=1;

if (isset($_POST['param_opcion']))
    $param['param_opcion'] = $_POST['param_opcion'];
if (isset($_POST['param_idplan_auditoria']))
    $param['param_idplan_auditoria'] = $_POST['param_idplan_auditoria'];
if (isset($_POST['param_alcances']))
    $param['param_alcances'] = $_POST['param_alcances'];
if (isset($_POST['param_aclaraciones']))
    $param['param_aclaraciones'] = $_POST['param_aclaraciones'];
if (isset($_POST['param_limitaciones']))
    $param['param_limitaciones'] = $_POST['param_limitaciones'];
if (isset($_POST['param_idProyecto']))
    $param['param_idProyecto'] = $_POST['param_idProyecto'];
$planauditoria=new planificacion_model();
echo $planauditoria->gestionar($param);
?>
