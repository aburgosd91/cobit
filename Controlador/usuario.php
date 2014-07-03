<?php
include_once '../Modelo/usuario_model.php';
$param = array();
if (isset($_POST['param_opcion']))
    $param['param_opcion'] = $_POST['param_opcion'];
if (isset($_POST['start']))
    $param['param_inicio'] = $_POST['start'];
if (isset($_POST['limit']))
    $param['param_final'] = $_POST['limit'];
if (isset($_POST['param_usuId']))
    $param['param_usuId'] = $_POST['param_usuId'];
if (isset($_POST['param_usuUsuario']))
    $param['param_usuUsuario'] = $_POST['param_usuUsuario'];
if (isset($_POST['param_usuClave']))
    $param['param_usuClave'] = $_POST['param_usuClave'];
if (isset($_POST['param_usuNombre']))
    $param['param_usuNombre'] = $_POST['param_usuNombre'];
if (isset($_POST['param_usuApePaterno']))
    $param['param_usuApePaterno'] = $_POST['param_usuApePaterno'];
if (isset($_POST['param_usuApeMaterno']))
    $param['param_usuApeMaterno'] = $_POST['param_usuApeMaterno'];
if (isset($_POST['query']))
    $param['param_consulta'] = $_POST['query'];

$Usuario=new Usuario_Model();
echo $Usuario->gestionar($param);
?>
