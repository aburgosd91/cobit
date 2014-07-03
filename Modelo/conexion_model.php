<?php

class Conexion_Model {

    public static function getConexion() {

        //la @ es para ocultar el Warning(Mensaje de Error Color Anaranjado)
        @$mysqli = new mysqli("localhost", "root","", "auditoria");
        if ($mysqli->connect_errno) {
            echo "Fallo al contenctar a MySQL: (" . $mysqli->connect_errno . ") " . $mysqli->connect_error;
        }
        $mysqli->set_charset("utf8");
        return $mysqli;
//        $mysqli = mysql_connect("localhost","root","") or die("Conexion Fallida".mysql_error());
//	mysql_select_db("auditoria",$conexion)or die("Error cargando la base de datos".mysql_error());    
//        $mysqli->set_charset("utf8");
//        return $mysqli;
    }

}

?>