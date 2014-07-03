<?php
include_once 'conexion_model.php';

class Perfil_Model {

    private $param = array();
    private $total;
    private $array;
    private $mysqli = null;
    private $result = array();
    private $cs = null;

    function __construct() {
        $this->mysqli = Conexion_Model::getConexion();
        $this->cs = $this->mysqli->prepare("select @id");
        $this->cs->execute();
        $this->cs->close();
    }

    private function getArray($datos) {
        $array = array();
        for ($i = 0; $i < count($datos); $i++) {
            $array[] = array(
                "perfId" => $datos[$i][0],
                "rolId" => $datos[$i][1],
                "usuId" => $datos[$i][2]);
        }
        return $array;
    }

    function gestionar($param) {
        $this->param = $param;
        switch ($this->param['param_opcion']) {
            case "grabar":
                echo $this->grabar();
                break;
            case "listxpersonal":
                echo $this->listxpersonal();
                break;
            case "actualizar":
                echo $this->update();
                break;
            case "get":break;
        }
    }

    function grabar() {
        $this->array = $this->param['param_cpts'];

        $q = true;
        
        $this->eliminarACtuales();
        for ($index = 0; $index < count($this->array); $index++) {
                if (!($this->cs = $this->mysqli->prepare("call sp_perfil(?,?,?,?)"))) {
                    echo "{error:'Falló la preparación (" . $this->mysqli->errno . ") " . $this->mysqli->error . "'}";
                }
                $opcion = 'opc_grabar';
                if ($opcion != '') {
                    if (!$this->cs->bind_param('siii', $opcion, $this->param['param_perfId'], $this->array[$index], $this->param['param_usuId'])) {
                        echo "{error:'Falló la vinculación de parámetros: (" . $this->cs->errno . ") " . $this->cs->error . "'}";
                    }
                } else {
                    if (!$this->cs->bind_param('siii', $this->param["param_opcion"], $this->param['param_perfId'], $this->array[$index], $this->param['param_usuId'])) {
                        echo "{error:'Falló la vinculación de parámetros: (" . $this->cs->errno . ") " . $this->cs->error . "'}";
                    }
                }
                if (!$this->cs->execute()) {
                    $this->cs->close();
                    $q = false;
                    echo "{error:'Falló la ejecución (" . $this->mysqli->errno . ") " . $this->mysqli->error . "'}";
                }
        }
        if ($q)
            echo '{"success":true,"message":{"reason": "Perfiles Otorgados"}}';
        else
            echo '{"failure":false,"errors":{"reason": "Error de Grabado de Datos"}}';
    }
    function eliminarActuales(){
        $this->preparaProcedimiento("opc_elimina_actuales");
        if (!$this->cs->execute()) {
            $this->cs->close();
            echo "{error:'Falló la ejecución (" . $this->mysqli->errno . ") " . $this->mysqli->error . "'}";
        }
        $this->cs->close();
    }
    function buscar($rolId) {
        if (!($this->cs = $this->mysqli->prepare("call sp_perfil(?,?,?,?)"))) {
            echo "{error:'Falló la preparación (" . $this->mysqli->errno . ") " . $this->mysqli->error . "'}";
        }
        
        $opcion = 'opc_buscar';
        if ($opcion != '') {
            if (!$this->cs->bind_param('siii', $opcion, $this->param['param_perfId'], $rolId, $this->param['param_usuId'])) {
                echo "{error:'Falló la vinculación de parámetros: (" . $this->cs->errno . ") " . $this->cs->error . "'}";
            }
        } else {
            if (!$this->cs->bind_param('siii', $this->param["param_opcion"], $this->param['param_perfId'], $this->param['param_rolId'], $this->param['param_usuId'])) {
                echo "{error:'Falló la vinculación de parámetros: (" . $this->cs->errno . ") " . $this->cs->error . "'}";
            }
        }
        
        
        if (!$this->cs->execute()) {
            $this->cs->close();
            echo "{error:'Falló la ejecución0 (" . $this->mysqli->errno . ") " . $this->mysqli->error . "'}";
        }
        $this->result = $this->cs->get_result();
        $result = $this->getArray($this->result->fetch_all());
        $this->cs->close();
        $this->total = count($result);

        if ($this->total > 0)
            return false;
        else
            return true;
    }

    private function preparaProcedimiento($opcion = '') {
        if (!($this->cs = $this->mysqli->prepare("call sp_perfil(?,?,?,?)"))) {
            echo "{error:'Falló la preparación (" . $this->mysqli->errno . ") " . $this->mysqli->error . "'}";
        }
        if ($opcion != '') {
            if (!$this->cs->bind_param('siii', $opcion, $this->param['param_perfId'], $this->param['param_rolId'], $this->param['param_usuId'])) {
                echo "{error:'Falló la vinculación de parámetros: (" . $this->cs->errno . ") " . $this->cs->error . "'}";
            }
        } else {
            if (!$this->cs->bind_param('siii', $this->param["param_opcion"], $this->param['param_perfId'], $this->param['param_rolId'], $this->param['param_usuId'])) {
                echo "{error:'Falló la vinculación de parámetros: (" . $this->cs->errno . ") " . $this->cs->error . "'}";
            }
        }
    }

    function eliminar() {
        $this->preparaProcedimiento("opc_listar_por_usuario");
        if (!$this->cs->execute()) {
            $this->cs->close();
            echo "{error:'Falló la ejecución (" . $this->mysqli->errno . ") " . $this->mysqli->error . "'}";
        }
        $this->result = $this->cs->get_result();
        $result = $this->getArray($this->result->fetch_all());
        $this->cs->close();
        for ($index = 0; $index < count($result); $index++) {
            if (!$this->buscarEnResult($result[$index]['rolId'])) {
                if (!($this->cs = $this->mysqli->prepare("CALL sp_perfil(?,?,?,?)"))) {
                    echo "{error:'Falló la preparación (" . $this->mysqli->errno . ") " . $this->mysqli->error . "'}";
                }
                $opcion = "opc_eliminar";
                if ($tipo != '') {
                    if (!$this->cs->bind_param('siii', $opcion, $this->param['param_perfId'],$result[$index]['param_rolId'],$this->param['param_usuId'])) {
                        echo "{error:'Falló la vinculación de parámetros: (" . $this->cs->errno . ") " . $this->cs->error . "'}";
                    }
                } else {
                    if (!$this->cs->bind_param('siii', $this->param["param_opcion"], $this->param['param_perfId'], $this->param['param_rolId'], $this->param['param_usuId'])) {
                        echo "{error:'Falló la vinculación de parámetros: (" . $this->cs->errno . ") " . $this->cs->error . "'}";
                    }
                }
                if (!$this->cs->execute()) {
                    $this->cs->close();
                    echo "{error:'Falló la ejecución (" . $this->mysqli->errno . ") " . $this->mysqli->error . "'}";
                }
            }
        }
    }

    function buscarEnResult($rolId) {

        for ($index = 0; $index < count($this->array); $index++) {
            if ($this->array[$index] == $rolId)
                return true;
        }
        return false;
    }

    function listxpersonal() {
        $this->preparaProcedimiento("opc_listar_por_usuario");
        if (!$this->cs->execute()) {
            $this->cs->close();
            echo "{error:'Falló la ejecución (" . $this->mysqli->errno . ") " . $this->mysqli->error . "'}";
        }
        $this->result = $this->cs->get_result();
        $result = $this->getArray($this->result->fetch_all());
        $total = count($result);
        $this->cs->close();
        
        //echo '{total:' . $total . ',datos:' . json_encode($result) . '}';
        echo json_encode($result);
    }

}
?>


