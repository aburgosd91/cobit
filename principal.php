<?php
session_start();
if (!isset($_SESSION['usuUsuario'])) {
    header("Location:index.php");
}
?>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <?php include_once 'Vistas/head.php' ?>
    </head>
    <body>
    </body>
</html>