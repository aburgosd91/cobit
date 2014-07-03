<?php
session_start();
if (isset($_SESSION['usuUsuario'])) {
    echo $_SESSION['usuUsuario'];
}  else {
    echo "Invitado";
}
?>
