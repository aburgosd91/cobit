<?php

include_once '../Modelo/permiso_model.php';

$param = array();
if (isset($_POST['param_opcion']))
    $param['param_opcion'] = $_POST['param_opcion'];

if (isset($_POST['param_cpts']))
    $param['param_cpts'] = json_decode($_POST['param_cpts'], true);
if (isset($_POST['param_rolId']))
    $param['param_rolId'] = $_POST['param_rolId'];
$PermisoModel=new Permiso_Model();

echo $PermisoModel->gestionar($param);
?>
