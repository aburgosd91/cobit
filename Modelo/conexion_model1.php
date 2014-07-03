<?php

class conexio_model1 {
    public static function getConexion() {
        $conexion = mysql_connect("localhost","root","") or die("Conexion Fallida".mysql_error());
	mysql_select_db("auditoria",$conexion)or die("Error cargando la base de datos".mysql_error());
        mysql_query("SET NAMES 'utf8'");
        return $conexion;
    }
}
