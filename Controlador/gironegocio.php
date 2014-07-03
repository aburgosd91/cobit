<?php
include_once '../Modelo/generalidades_model.php';
$param = array();
$param['param_opcion']='';
$param['param_inicio']=0;
$param['param_final']=10;
$param['param_consulta']=10;
$param['param_idDatos']=1;
$param['param_giroNegocio']='';
$param['param_resenaHistorica']='';
$param['param_mision']='';
$param['param_vision']='';
$param['param_estrategias']='';
$param['param_organigrama']='';
$param['param_lugar']='';
$param['param_idProyecto']=1;

if (isset($_POST['param_opcion']))
    $param['param_opcion'] = $_POST['param_opcion'];
if (isset($_POST['param_giroNegocio']))
    $param['param_giroNegocio'] = $_POST['param_giroNegocio'];
if (isset($_POST['param_resenaHistorica']))
    $param['param_resenaHistorica'] = $_POST['param_resenaHistorica'];
$gironegocio=new generalidades_model();
echo $gironegocio->gestionar($param);
?>
