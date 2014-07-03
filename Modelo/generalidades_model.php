<?php
include_once 'conexion_model1.php';
class generalidades_model {
    private $param = array();
    private $conexion = null;
    private $result =null;
    private $prueba='';
    function __construct() {
        $this->conexion = conexio_model1::getConexion();
    }
    function gestionar($param) {
        $this->param = $param;
        switch ($this->param['param_opcion']) {
            case "listarGironegocio":
                echo $this->_listarGironegocio();
                break;
            case "actualizarGironegocio":
                echo $this->_UpdateGironegocio();
                break;
            case "listarDireccionamiento":
                echo $this->_listarDireccionamiento();
                break;
            case "actualizarDireccionamiento":
                echo $this->_UpdateDireccionamiento();
                break;
            case "show":
                echo $this->_Show();
                break;
            case "drop":
                echo $this->_Drop();
                break;
            case "grabar":
                echo $this->_Add();
                break;
            case "modelo":
                echo $this->Modelo();break;
            case "color":
                echo $this->Color();break;
            default: $this->_Load();
        }
    }
    function _PrepararConsulta($opcion='') {
        $consultaSql = "call sp_generalidades(";
        $consultaSql.="'".$opcion. "',";
        $consultaSql.=$this->param['param_inicio']. ",";
        $consultaSql.=$this->param['param_final']. ",";
        $consultaSql.="'" .$this->param['param_consulta'] . "',";
        $consultaSql.=$this->param['param_idDatos'] . ",";
        $consultaSql.="'".$this->param['param_giroNegocio']. "',";
        $consultaSql.="'".$this->param['param_resenaHistorica']. "',";
        $consultaSql.="'".$this->param['param_mision']. "',";
        $consultaSql.="'".$this->param['param_vision']. "',";
        $consultaSql.="'".$this->param['param_estrategias']. "',";
        $consultaSql.="'".$this->param['param_organigrama']. "',";
        $consultaSql.="'".$this->param['param_lugar']. "',";
        $consultaSql.=$this->param['param_idProyecto'].")";
        //echo 'respuesta: '.$consultaSql;
        $this->result = mysql_query($consultaSql);
        //$this->prueba=$consultaSql;
      
    }
    function ejecutarConsultaNonSelect($opcion = '') {
        $this->_PrepararConsulta($opcion);
        mysql_close($this->conexion);
        echo $this->prueba;
        if ($this->result) {
            echo '1';
        } else {
            echo '0';
        }
    }
    function _listarGironegocio() {
        $this->_PrepararConsulta('listarGironegocio');
        //echo $this->prueba;
        $total = mysql_num_rows($this->result);
        $data = array();
        $cadena='';
        while ($row = mysql_fetch_array($this->result)) {
            array_push($data, array(
                "param_giroNegocio" => $row["giroNegocio"],
                "param_resenaHistorica" => $row["resenaHistorica"],
            ));
        }
        $json = json_encode($data);
        mysql_close($this->conexion);
        echo '({"total":"' . $total . '", "datos": ' . $json . '})';
    }
    function _UpdateGironegocio() {
        $this->ejecutarConsultaNonSelect('actualizarGironegocio');
    }
    function _listarDireccionamiento() {
        $this->_PrepararConsulta('listarDireccionamiento');
        //echo $this->prueba;
        $total = mysql_num_rows($this->result);
        $data = array();
        while ($row = mysql_fetch_array($this->result)) {
            array_push($data, array(
                "param_mision" => $row["mision"],
                "param_vision" => $row["vision"],
                "param_estrategias" => $row["estrategias"]
            ));
        }
        $json = json_encode($data);
        mysql_close($this->conexion);
        echo '({"total":"' . $total . '", "datos": ' . $json . '})';
    }
    function _UpdateDireccionamiento() {
        $this->ejecutarConsultaNonSelect('actualizarDireccionamiento');
    }
    
    
    function reporte(){
        $this->_PrepararConsulta('reporte');
        $total = mysql_num_rows($this->result);
        $data = array();
        while ($row = mysql_fetch_array($this->result)) {
            array_push($data, array(
                "param_CodCalzado" => $row["calId"],
                "param_idModelo" => $row["modId"],
                "param_idcolor" => $row["calColor"],
                "param_talla" => $row["calTalla"],
                "param_tipo" => $row["calTipo"],
                "param_genero" => $row["calGeneroD"],
                "idModelo"=>$row["idModelo"],
                "idColor"=>$row["idColor"],
                "idTipo"=>$row["idTipo"],
                "idGenero"=>$row["calGenero"],
                "activo"=>$row["activo"]
            ));
        }
        $json = json_encode($data);
        mysql_close($this->conexion);
        echo '({"total":"' . $total . '", "datos": ' . $json . '})';
    }
    function Color(){
        $this->_PrepararConsulta('combo_color');
        $total = mysql_num_rows($this->result);
        $data = array();
        while ($row = mysql_fetch_array($this->result)) {
            array_push($data, array(
                "valor" => $row["mulValor"],
                "descripcion" => $row["mulDescripcion"]
            ));
        }
        $json = json_encode($data);
        mysql_close($this->conexion);
        echo '({"total":"' . $total . '", "datos": ' . $json . '})';
    }
    function Modelo(){
        $this->_PrepararConsulta('combo_modelo');
        $total = mysql_num_rows($this->result);
        $data = array();
        while ($row = mysql_fetch_array($this->result)) {
            array_push($data, array(
                "valor" => $row["modId"],
                "descripcion" => $row["modDescripcion"]
            ));
        }
        $json = json_encode($data);
        mysql_close($this->conexion);
        echo '({"total":"' . $total . '", "datos": ' . $json . '})';
    }
    

    
    function _Add() {
        $this->ejecutarConsultaNonSelect('opc_grabar');
    }
    function filtroR(){
        $this->_PrepararConsulta('opc_filtrarR');
        $total = mysql_num_rows($this->result);
        $data = array();
        while ($row = mysql_fetch_array($this->result)) {
            array_push($data, array(
                "param_CodCalzado" => $row["calId"],
                "param_idModelo" => $row["modId"],
                "param_idcolor" => $row["calColor"],
                "param_talla" => $row["calTalla"],
                "param_tipo" => $row["calTipo"],
                "param_genero" => $row["calGeneroD"],
                "idModelo"=>$row["idModelo"],
                "idColor"=>$row["idColor"],
                "idTipo"=>$row["idTipo"],
                "idGenero"=>$row["calGenero"],
                "activo"=>$row["activo"]
            ));
        }
        $json = json_encode($data);
        mysql_close($this->conexion);
        echo '({"total":"' . $total . '", "datos": ' . $json . '})';
    }
    function filtro(){
       $this->_PrepararConsulta('opc_filtrar');
        $total = mysql_num_rows($this->result);
        $data = array();
        while ($row = mysql_fetch_array($this->result)) {
            array_push($data, array(
                "param_CodCalzado" => $row["calId"],
                "param_idModelo" => $row["modId"],
                "param_idcolor" => $row["calColor"],
                "param_talla" => $row["calTalla"],
                "param_tipo" => $row["calTipo"],
                "param_genero" => $row["calGeneroD"],
                "idModelo"=>$row["idModelo"],
                "idColor"=>$row["idColor"],
                "idTipo"=>$row["idTipo"],
                "idGenero"=>$row["calGenero"],
                "activo"=>$row["activo"]
            ));
        }
        $json = json_encode($data);
        mysql_close($this->conexion);
        echo '({"total":"' . $total . '", "datos": ' . $json . '})'; 
    }
    function _Drop() {
        $this->ejecutarConsultaNonSelect('opc_eliminar');
    }
    
    function _UpdateR() {
        $this->ejecutarConsultaNonSelect('opc_actualizarR');
    }
}
