<?php
include_once 'conexion_model1.php';
class objetosAuditables_model {
    private $param = array();
    private $conexion = null;
    private $result =null;
    function __construct() {
        $this->conexion = conexio_model1::getConexion();
    }
    function gestionar($param) {
        $this->param = $param;
        switch ($this->param['param_opcion']) {
            case "listarProblematica":
                echo $this->_listarProblematica();
                break;
            case "actualizarProblematica":
                echo $this->_UpdateProblematica();
                break;
            case "listarMotivo":
                echo $this->_listarMotivo();
                break;
            case "actualizarMotivo":
                echo $this->_UpdateMotivo();
                break;
        }
    }
    function _PrepararConsulta($opcion='') {
        $consultaSql = "call sp_objetosAuditables(";
        $consultaSql.="'".$opcion. "',";
        $consultaSql.=$this->param['param_inicio']. ",";
        $consultaSql.=$this->param['param_final']. ",";
        $consultaSql.="'" .$this->param['param_consulta'] . "',";
        $consultaSql.=$this->param['param_idObjetos'] . ",";
        $consultaSql.="'".$this->param['param_motivoAud']. "',";
        $consultaSql.="'".$this->param['param_realidadProblematica']. "',";
        $consultaSql.=$this->param['param_idProyecto'].")";
        //echo 'respuesta: '.$consultaSql;
        $this->result = mysql_query($consultaSql);
        //$this->prueba=$consultaSql;
      
    }
    function ejecutarConsultaNonSelect($opcion = '') {
        $this->_PrepararConsulta($opcion);
        mysql_close($this->conexion);
        //echo $this->prueba;
        if ($this->result) {
            echo '1';
        } else {
            echo '0';
        }
    }
    function _listarProblematica() {
        $this->_PrepararConsulta('listarProblematica');
        //echo $this->prueba;
        $total = mysql_num_rows($this->result);
        $data = array();
        $cadena='';
        while ($row = mysql_fetch_array($this->result)) {
            array_push($data, array(
                "param_realidadProblematica" => $row["realidadProblematica"]
            ));
        }
        $json = json_encode($data);
        mysql_close($this->conexion);
        echo '({"total":"' . $total . '", "datos": ' . $json . '})';
    }
    function _UpdateProblematica() {
        $this->ejecutarConsultaNonSelect('actualizarProblematica');
    }
    function _listarMotivo() {
        $this->_PrepararConsulta('listarMotivo');
        //echo $this->prueba;
        $total = mysql_num_rows($this->result);
        $data = array();
        while ($row = mysql_fetch_array($this->result)) {
            array_push($data, array(
                "param_motivoAud" => $row["motivoAud"],
            ));
        }
        $json = json_encode($data);
        mysql_close($this->conexion);
        echo '({"total":"' . $total . '", "datos": ' . $json . '})';
    }
    function _UpdateMotivo() {
        $this->ejecutarConsultaNonSelect('actualizarMotivo');
    }
}

