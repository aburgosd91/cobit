<?php

session_start();
include_once '../Modelo/conexion_model.php';

$ve_opcion = 'opc_buscar_por_usuario_clave';
$ve_inicio = 0;
$ve_final = 0;
$ve_consulta = '';
$ve_usuId = 0;
$ve_usuUsuario = '';
$ve_usuClave = '';
$ve_usuApePaterno = '';
$ve_usuApeMaterno = '';
$ve_usuNombre = '';
if (isset($_POST['param_usuUsuario']))
    $ve_usuUsuario = $_POST['param_usuUsuario'];
if (isset($_POST['param_usuClave']))
    $ve_usuClave = $_POST['param_usuClave'];

$cs = null;
$mysqli = Conexion_Model::getConexion();
if (!($cs = $mysqli->prepare("call sp_usuario(?,?,?,?,?,?,?,?,?,?)"))) {
    echo "{error:'Falló la preparación (" . $mysqli->errno . ") " . $mysqli->error . "'}";
}
if (!$cs->bind_param('siisisssss', $ve_opcion, $ve_inicio, $ve_final, $ve_consulta, $ve_usuId, $ve_usuUsuario, $ve_usuClave, $ve_usuApePaterno, $ve_usuApeMaterno, $ve_usuNombre)) {
    echo "{error:'Falló la vinculación de parámetros: (" . $cs->errno . ") " . $cs->error . "'}";
}
if (!$cs->execute()) {
    $cs->close();
    echo "{error:'Falló la ejecución (" . $mysqli->errno . ") " . $mysqli->error . "'}";
}
$array = array();
$result = array();
$result = $cs->get_result();
$array = getArray($result->fetch_all());
$cs->close();
if (count($array) > 0) {
    $_SESSION['usuId'] = $array[0]['usuId'];
    $_SESSION['usuUsuario'] = $array[0]['usuUsuario'];
    $_SESSION['usuNombreCompleto'] = $array[0]['usuNombreCompleto'];
    echo '{"success":true,"message":{"reason": "Bienvenido"}}';
} else {
    echo '{"success":false,"message":{"reason": "Usuario y Clave Incorrectas"}}';
}

function getArray($datos) {
    $array = array();
    for ($i = 0; $i < count($datos); $i++) {
        $array[] = array(
            "usuId" => $datos[$i][0],
            "usuUsuario" => $datos[$i][1],
            "usuNombreCompleto" => $datos[$i][6]);
    }
    return $array;
}

?>
