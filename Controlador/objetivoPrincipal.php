<?php
include_once '../Modelo/planificacion_model.php';
$param = array();
$param['param_opcion']='';
$param['param_inicio']=0;
$param['param_final']=10;
$param['param_consulta']=10;
$param['param_idobgeneral']=1;
$param['param_idplan_auditoria']=1;
$param['param_descripcion']='';

if (isset($_POST['param_opcion']))
    $param['param_opcion'] = $_POST['param_opcion'];
if (isset($_POST['param_idobgeneral']))
    $param['param_idobgeneral'] = $_POST['param_idobgeneral'];
if (isset($_POST['param_idplan_auditoria']))
    $param['param_idplan_auditoria'] = $_POST['param_idplan_auditoria'];
if (isset($_POST['param_descripcion']))
    $param['param_descripcion'] = $_POST['param_descripcion'];
$objetivoGeneral=new planificacion_model();
echo $objetivoGeneral->gestionar($param);
?>
