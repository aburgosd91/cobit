<?php

include_once '../Modelo/tree_model.php';

$param = array();
if (isset($_POST['param_opcion']))
    $param['param_opcion'] = $_POST['param_opcion'];
if (isset($_POST['param_nodes']))
    $param['param_nodes'] = $_POST['param_nodes'];
if (isset($_POST['parent']))
    $param['parent'] = $_POST['parent'];
$param['param_records'] = '';
if (isset($_POST['param_records']))
    $param['param_records'] = json_decode($_POST['param_records'], true);

if (isset($_POST['param_menNombre']))
    $param['param_menNombre'] = $_POST['param_menNombre'];
$param['param_menPadreId'] = '';
if (isset($_POST['param_menPadreId']))
    $param['param_menPadreId'] = $_POST['param_menPadreId'];
if (isset($_POST['param_menDraggable']))
    $param['param_menDraggable'] = $_POST['param_menDraggable'];
$param['param_menDescripcion'] = '';
if (isset($_POST['param_menDescripcion']))
    $param['param_menDescripcion'] = $_POST['param_menDescripcion'];
if (isset($_POST['param_rolId']))
    $param['param_rolId'] = $_POST['param_rolId'];


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
$Tree = new Tree_Model();
echo $Tree->gestionar($param, NULL);
?>
