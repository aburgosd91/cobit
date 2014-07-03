
<?php

include_once '../Modelo/PersonaModel.php';
$param = array();
if (isset($_POST['tipo']))
    $param['tipo'] = $_POST['tipo'];
if (isset($_POST['start']))
    $param['start'] = $_POST['start'];
if (isset($_POST['limit']))
    $param['limit'] = $_POST['limit'];
if (isset($_POST['query']))
    $param['query'] = $_POST['query'];
if (isset($_POST['usuario_id']))
    $param['usuario_id'] = $_POST['usuario_id'];
if (isset($_POST['usuario_usuario']))
    $param['usuario_usuario'] = $_POST['usuario_usuario'];
if (isset($_POST['usuario_apellidos']))
    $param['usuario_apellidos'] = $_POST['usuario_apellidos'];
if (isset($_POST['usuario_nombres']))
    $param['usuario_nombres'] = $_POST['usuario_nombres'];
if (isset($_POST['usuario_sueldo']))
    $param['usuario_sueldo'] = $_POST['usuario_sueldo'];
if (isset($_POST['usuario_fechaentrada']))
    $param['usuario_fechaentrada'] = $_POST['usuario_fechaentrada'];
if (isset($_POST['usuario_password']))
    $param['usuario_password'] = $_POST['usuario_password'];
if (isset($_POST['usuario_comision']))
    $param['usuario_comision'] = $_POST['usuario_comision'];
if (isset($_POST['usuario_fechasalida']))
    $param['usuario_fechasalida'] = $_POST['usuario_fechasalida'];

if (isset($_POST['activo'])) {
    if ($_POST['activo'] == true)
        $param['activo'] = 1;
    if ($_POST['activo'] == false)
        $param['activo'] = 0;
}

$Persona = new PersonaModel();
echo $Persona->gestionar($param);
?>
