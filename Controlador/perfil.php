<?php
include_once '../Modelo/perfil_model.php';
$param = array();
if (isset($_POST['param_opcion']))
    $param['param_opcion'] = $_POST['param_opcion'];
if (isset($_POST['param_cpts']))
    $param['param_cpts'] = json_decode($_POST['param_cpts'], TRUE);
if (isset($_POST['param_usuId']))
    $param['param_usuId'] = $_POST['param_usuId'];
$PerfilModel=new Perfil_Model();
echo $PerfilModel->gestionar($param);
?>
