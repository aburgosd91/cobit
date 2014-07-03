<?php
include_once 'conexion_model1.php';
class planificacion_model {
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
            case "listarObjgeneral":
                echo $this->_listarObjgeneral();
                break;
            case "actualizarObjgeneral":
                echo $this->_UpdateObjgeneral();
                break;
            case "agregarObjgeneral":
                echo $this->_AddObjgeneral();
                break;
            case "eliminarObjgeneral":
                echo $this->_DropObjgeneral();
                break;
            case "listarObjespecifico":
                echo $this->_listarObjEspecifico();
                break;
            case "actualizarObjespecifico":
                echo $this->_UpdateObjEspecifico();
                break;
            case "agregarObjespecifico":
                echo $this->_AddObjEspecifico();
                break;
            case "eliminarObjespecifico":
                echo $this->_DropObjEspecifico();
                break;
            case "objetivogeneral":
                echo $this->comboObjGeneral();
                break;
            case "listarPlanauditoria":
                echo $this->_listarPlanauditoria();
                break;
            case "actualizarPlanauditoria":
                echo $this->_UpdatePlanauditoria();
                break;
            case "agregarAlineamiento":
                echo $this->_AddAlineamiento();
                break;
            case "listarAlineamiento":
                echo $this->_listarAlineamiento();
                break;
            case "actualizarAlineamiento":
                echo $this->_UpdateAlineamiento();
                break;
            case "eliminarAlineamiento":
                echo $this->_DropAlineamiento();
                break;
            case "proyecto":
                echo $this->comboProyecto();
                break;
            /*+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
            case "agregarDescripcionrol":
                echo $this->_AddDescripcionRol();
                break;
            case "listarDescripcionrol":
                echo $this->_listarDescripcionRol();
                break;
            case "actualizarDescripcionrol":
                echo $this->_UpdateDescripcionRol();
                break;
            case "comboRol":
                echo $this->comboRol();
                break;
            default: $this->_Load();
        }
    }
    function _PrepararConsultaObjGeneral($opcion='') {
        $consultaSql = "call sp_obgeneral(";
        $consultaSql.="'".$opcion. "',";
        $consultaSql.=$this->param['param_inicio']. ",";
        $consultaSql.=$this->param['param_final']. ",";
        $consultaSql.="'" .$this->param['param_consulta'] . "',";
        $consultaSql.=$this->param['param_idobgeneral'] . ",";
        $consultaSql.=$this->param['param_idplan_auditoria']. ",";
        $consultaSql.="'".$this->param['param_descripcion']."')";
        //echo 'respuesta: '.$consultaSql;
        $this->result = mysql_query($consultaSql);
        $this->prueba=$consultaSql;
    }
    function ejecutarConsultaNonSelectObjGeneral($opcion = '') {
        $this->_PrepararConsultaObjGeneral($opcion);
        mysql_close($this->conexion);
        //echo $this->prueba;
        if ($this->result) {
            echo '1';
        } else {
            echo '0';
        }
    }
    function _listarObjgeneral() {
        $this->_PrepararConsultaObjGeneral('listarObjgeneral');
        //echo $this->prueba;
        $total = mysql_num_rows($this->result);
        $data = array();
        $cadena='';
        while ($row = mysql_fetch_array($this->result)) {
            array_push($data, array(
                "param_idobgeneral" => $row["idobgeneral"],
                "param_idplan_auditoria" => $row["idplan_auditoria"],
                "param_descripcion" => $row["descripcion"],
            ));
        }
        $json = json_encode($data);
        mysql_close($this->conexion);
        echo '({"total":"' . $total . '", "datos": ' . $json . '})';
    }
    function _UpdateObjgeneral() {
        $this->ejecutarConsultaNonSelectObjGeneral('actualizarObjgeneral');
    }
    function _AddObjgeneral() {
        $this->ejecutarConsultaNonSelectObjGeneral('agregarObjgeneral');
    }
    function _DropObjgeneral() {
        $this->ejecutarConsultaNonSelectObjGeneral('eliminarObjgeneral');
    }
    
    function _PrepararConsultaObjEspecifico($opcion='') {
        $consultaSql = "call sp_obespecifico(";
        $consultaSql.="'".$opcion. "',";
        $consultaSql.=$this->param['param_inicio']. ",";
        $consultaSql.=$this->param['param_final']. ",";
        $consultaSql.="'" .$this->param['param_consulta'] . "',";
        $consultaSql.=$this->param['param_idobespecifico']. ",";
        $consultaSql.=$this->param['param_idobgeneral'] . ",";
        $consultaSql.="'".$this->param['param_descripcionE']."')";
        //echo 'respuesta: '.$consultaSql;
        $this->result = mysql_query($consultaSql);
        //$this->prueba=$consultaSql;
    }
    function ejecutarConsultaNonSelectObjEspecifico($opcion = '') {
        $this->_PrepararConsultaObjEspecifico($opcion);
        mysql_close($this->conexion);
        //echo $this->prueba;
        if ($this->result) {
            echo '1';
        } else {
            echo '0';
        }
    }
    function _listarObjEspecifico() {
        $this->_PrepararConsultaObjEspecifico('listarObjespecifico');
        //echo $this->prueba;
        $total = mysql_num_rows($this->result);
        $data = array();
        $cadena='';
        while ($row = mysql_fetch_array($this->result)) {
            array_push($data, array(
                "param_idobespecifico" => $row["idobespecifico"],
                "param_idobgeneral" => $row["idobgeneral"],
                "param_descripcionE" => $row["descripcion"],
            ));
        }
        $json = json_encode($data);
        mysql_close($this->conexion);
        echo '({"total":"' . $total . '", "datos": ' . $json . '})';
    }
    function _UpdateObjEspecifico() {
        $this->ejecutarConsultaNonSelectObjEspecifico('actualizarObjespecifico');
    }
    function _AddObjEspecifico() {
        $this->ejecutarConsultaNonSelectObjEspecifico('agregarObjespecifico');
    }
    function _DropObjEspecifico() {
        $this->ejecutarConsultaNonSelectObjEspecifico('eliminarObjespecifico');
    }   

    function _PrepararConsultaPlanAuditoria($opcion='') {
        $consultaSql = "call sp_planAuditoria(";
        $consultaSql.="'".$opcion. "',";
        $consultaSql.=$this->param['param_inicio']. ",";
        $consultaSql.=$this->param['param_final']. ",";
        $consultaSql.="'" .$this->param['param_consulta'] . "',";
        $consultaSql.=$this->param['param_idplan_auditoria'] . ",";
        $consultaSql.="'".$this->param['param_alcances']. "',";
        $consultaSql.="'".$this->param['param_aclaraciones']. "',";
        $consultaSql.="'".$this->param['param_limitaciones']. "',";
        $consultaSql.=$this->param['param_idProyecto'].")";
        //echo 'respuesta: '.$consultaSql;
        $this->result = mysql_query($consultaSql);
        $this->prueba=$consultaSql;
        
    }
    function ejecutarConsultaNonSelectPlanAuditoria($opcion = '') {
        $this->_PrepararConsultaPlanAuditoria($opcion);
        mysql_close($this->conexion);
        //echo $this->prueba;
        if ($this->result) {
            echo '1';
        } else {
            echo '0';
        }
    }
    function _listarPlanAuditoria() {
        $this->_PrepararConsultaPlanAuditoria('listarPlanauditoria');
        //echo $this->prueba;
        $total = mysql_num_rows($this->result);
        $data = array();
        $cadena='';
        while ($row = mysql_fetch_array($this->result)) {
            array_push($data, array(
                "param_idplan_auditoria" => $row["idplan_auditoria"],
                "param_alcances" => $row["alcances"],
                "param_aclaraciones" => $row["aclaraciones"],
                "param_limitaciones" => $row["limitaciones"],
                "param_idProyecto" => $row["idProyecto"],
            ));
        }
        $json = json_encode($data);
        mysql_close($this->conexion);
        echo '({"total":"' . $total . '", "datos": ' . $json . '})';
    }
    function _UpdatePlanAuditoria() {
        $this->ejecutarConsultaNonSelectPlanAuditoria('actualizarPlanauditoria');
    }
    function comboObjGeneral(){
        $this->_PrepararConsultaObjGeneral('objetivogeneral');
        $total = mysql_num_rows($this->result);
        $data = array();
        while ($row = mysql_fetch_array($this->result)) {
            array_push($data, array(
                "valor" => $row["idobgeneral"],
                "descripcion" => $row["descripcion"]
            ));
        }
        $json = json_encode($data);
        mysql_close($this->conexion);
        echo '({"total":"' . $total . '", "datos": ' . $json . '})';
    }
    function comboProyecto(){
        $this->_PrepararConsultaAlineamiento('proyecto');
        //echo $this->prueba;
        $total = mysql_num_rows($this->result);
        $data = array();
        while ($row = mysql_fetch_array($this->result)) {
            array_push($data, array(
                "valor" => $row["valor"],
                "descripcion" => $row["descripcion"]
            ));
        }
        $json = json_encode($data);
        mysql_close($this->conexion);
        echo '({"total":"' . $total . '", "datos": ' . $json . '})';
    }
    
    function _PrepararConsultaAlineamiento($opcion='') {
        $consultaSql = "call sp_alineamiento(";
        $consultaSql.="'".$opcion. "',";
        $consultaSql.=$this->param['param_inicio']. ",";
        $consultaSql.=$this->param['param_final']. ",";
        $consultaSql.="'" .$this->param['param_consulta'] . "',";
        $consultaSql.=$this->param['param_idalineamiento']. ",";
        $consultaSql.=$this->param['param_idplan_auditoriaA'] . ",";
        $consultaSql.="'" .$this->param['param_alineamiento'] . "',";
        $consultaSql.="'".$this->param['param_estrategia']."')";
        //echo 'respuesta: '.$consultaSql;
        $this->result = mysql_query($consultaSql);
        //$this->prueba=$consultaSql;
    }
    function ejecutarConsultaNonSelectAlineamiento($opcion = '') {
        $this->_PrepararConsultaAlineamiento($opcion);
        mysql_close($this->conexion);
        //echo $this->prueba;
        if ($this->result) {
            echo '1';
        } else {
            echo '0';
        }
    }
    function _listarAlineamiento() {
        $this->_PrepararConsultaAlineamiento('listarAlineamiento');
        //echo $this->prueba;
        $total = mysql_num_rows($this->result);
        $data = array();
        while ($row = mysql_fetch_array($this->result)) {
            array_push($data, array(
                "param_idalineamiento" => $row["idalineamiento"],
                "param_idplan_auditoriaA" => $row["idplan_auditoria"],
                "param_alineamiento" => $row["alineamiento"],
                "param_estrategia" => $row["estrategia"]
            ));
        }
        $json = json_encode($data);
        mysql_close($this->conexion);
        echo '({"total":"' . $total . '", "datos": ' . $json . '})';
    }
    function _UpdateAlineamiento() {
        $this->ejecutarConsultaNonSelectAlineamiento('actualizarAlineamiento');
    }
    function _AddAlineamiento(){
        $this->ejecutarConsultaNonSelectAlineamiento('agregarAlineamiento');
    }
    function _DropAlineamiento() {
        $this->ejecutarConsultaNonSelectAlineamiento('eliminarAlineamiento');
    }
    
    function _PrepararConsultaDescripcionRol($opcion='') {
        $consultaSql = "call sp_descripcionRol(";
        $consultaSql.="'".$opcion. "',";
        $consultaSql.=$this->param['param_inicio']. ",";
        $consultaSql.=$this->param['param_final']. ",";
        $consultaSql.="'" .$this->param['param_consulta'] . "',";
        $consultaSql.=$this->param['param_iddescripcion_rol']. ",";
        $consultaSql.="'".$this->param['param_descripcion'] . "',";
        $consultaSql.=$this->param['param_rolId'].")";
        //echo 'respuesta: '.$consultaSql;
        $this->result = mysql_query($consultaSql);
        //$this->prueba=$consultaSql;
    }
    function ejecutarConsultaNonSelectDescripcionRol($opcion = '') {
        $this->_PrepararConsultaDescripcionRol($opcion);
        mysql_close($this->conexion);
        //echo $this->prueba;
        if ($this->result) {
            echo '1';
        } else {
            echo '0';
        }
    }
    function _listarDescripcionRol() {
        $this->_PrepararConsultaDescripcionRol('listarDescripcionrol');
        //echo $this->prueba;
        $total = mysql_num_rows($this->result);
        $data = array();
        while ($row = mysql_fetch_array($this->result)) {
            array_push($data, array(
                "param_cabecerarol"=>$row["descripcion"],
                "param_descripcion" => $row["caracteristicas"],
                "param_iddescripcion_rol" => $row["iddescripcion_rol"],
                "param_rolId" => $row["rolId"]
            ));
        }
        $json = json_encode($data);
        mysql_close($this->conexion);
        echo '({"total":"' . $total . '", "datos": ' . $json . '})';
    }
    function _UpdateDescripcionRol() {
        $this->ejecutarConsultaNonSelectDescripcionRol('actualizarDescripcionrol');
    }
    function _AddDescripcionRol(){
        $this->ejecutarConsultaNonSelectDescripcionRol('agregarDescripcionrol');
    }
    function comboRol(){
        $this->_PrepararConsultaDescripcionRol('comboRol');
        //echo $this->prueba;
        $total = mysql_num_rows($this->result);
        $data = array();
        while ($row = mysql_fetch_array($this->result)) {
            array_push($data, array(
                "valor" => $row["valor"],
                "descripcion" => $row["descripcion"]
            ));
        }
        $json = json_encode($data);
        mysql_close($this->conexion);
        echo '({"total":"' . $total . '", "datos": ' . $json . '})';
    }
}



