<?php

include_once 'conexion_model.php';

class Rol_Model {

    //put your code here
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

    function gestionar($param) {
        $this->param = $param;
        switch ($this->param['param_opcion']) {
            case "listar":
                if (isset($this->param['param_consulta']))
                    if($this->param['param_consulta']!='')
                        echo $this->filtro();
                    else
                        echo $this->listar();
                else
                    echo $this->listar();
                break;
            case "list":
                echo $this->listarTodos();
                break;
            case "grabar":
                echo $this->grabar();
                break;
            case "actualizar":
                echo $this->update();
                break;
            case "get":break;
        }
    }

    private function preparaProcedimiento($opcion = '') {
        if (!($this->cs = $this->mysqli->prepare("call sp_rol(?,?,?,?,?,?,?)"))) {
            echo "{error:'Falló la preparación (" . $this->mysqli->errno . ") " . $this->mysqli->error . "'}";
        }
        if ($opcion != '') {
            if (!$this->cs->bind_param('siisiss', $opcion, $this->param['param_inicio'], $this->param['param_final'], $this->param['param_consulta'], $this->param['param_rolId'], $this->param['param_rolNombre'], $this->param['param_rolActivo'])) {
                echo "{error:'Falló la vinculación de parámetros: (" . $this->cs->errno . ") " . $this->cs->error . "'}";
                
            }
        } else {
            if (!$this->cs->bind_param('siisiss', $this->param["param_opcion"],$this->param['param_inicio'], $this->param['param_final'], $this->param['param_consulta'], $this->param['param_rolId'], $this->param['param_rolNombre'], $this->param['param_rolActivo'])) {
                echo "{error:'Falló la vinculación de parámetros: (" . $this->cs->errno . ") " . $this->cs->error . "'}";
                
            }
        }
    }

    private function getArray($datos) {
        $array = array();
        for ($i = 0; $i < count($datos); $i++) {
            $array[] = array(
                "rolId" => $datos[$i][0],
                "rolNombre" => $datos[$i][1],
                "rolActivo" => $datos[$i][2]);
        }
        $this->array = $array;
    }

    private function getArrayTotal($datos) {
        $array = array();
        for ($i = 0; $i < count($datos); $i++) {
            $array[] = array(
                "rolContador" => $datos[$i][0]);
        }
        $this->array = $array;
    }

    function listar() {
        $this->preparaProcedimiento('opc_contador');
        if (!$this->cs->execute()) {
            $this->cs->close();
            echo "{error:'Falló la ejecución (" . $this->mysqli->errno . ") " . $this->mysqli->error . "'}";
        }
        $this->result = $this->cs->get_result();
        $this->getArrayTotal($this->result->fetch_all());
        $this->cs->close();
        $this->total = $this->array[0]["rolContador"];
        
        $this->preparaProcedimiento("opc_listar_por_partes");
        if (!$this->cs->execute()) {
            $this->cs->close();
            echo "{error:'Falló la ejecución (" . $this->mysqli->errno . ") " . $this->mysqli->error . "'}";
        }
        $this->result = $this->cs->get_result();
        
        $this->getArray($this->result->fetch_all());
        $this->cs->close();
        echo '{total:' . $this->total . ',datos:' . json_encode($this->array) . '}';
    }

    function filtro() {
        $this->preparaProcedimiento('opc_contador_filtro');
        if (!$this->cs->execute()) {
            $this->cs->close();
            echo "{error:'Falló la ejecución (" . $this->mysqli->errno . ") " . $this->mysqli->error . "'}";
        }
        $this->result = $this->cs->get_result();
        $this->getArrayTotal($this->result->fetch_all());
        $this->cs->close();
        $this->total = $this->array[0]['rolContador'];
        
        $this->preparaProcedimiento('opc_listar_filtro');
        if (!$this->cs->execute()) {
            $this->cs->close();
            echo "{error:'Falló la ejecución (" . $this->mysqli->errno . ") " . $this->mysqli->error . "'}";
        }
        $this->result = $this->cs->get_result();
        $this->getArray($this->result->fetch_all());
        $this->cs->close();
        echo '{total:' . $this->total . ',datos:' . json_encode($this->array) . '}';
    }

    function listarTodos() {
        $this->preparaProcedimiento('opc_listar');
        if (!$this->cs->execute()) {
            $this->cs->close();
            echo "{error:'Falló la ejecución (" . $this->mysqli->errno . ") " . $this->mysqli->error . "'}";
        }
        $this->result = $this->cs->get_result();
        $this->getArray($this->result->fetch_all());
        $this->cs->close();
        $this->total = count($this->array);
        echo '{total:' . $this->total . ',datos:' . json_encode($this->array) . '}';
    }

    function buscar($tipo = '') {
        switch ($tipo) {
            case "editar":
                $this->adampt->setParam('opc_obtener'); //tipo
                $this->adampt->setParam(0); //start
                $this->adampt->setParam(0); //limit
                $this->adampt->setParam(-1); //id
                $this->adampt->setParam($this->param['param_rolNombre']); //rol
                $this->adampt->setParam(''); //activo
                $this->adampt->setParam(''); //query
                $this->array = $this->adampt->consulta('go_rol');
                $this->total = count($this->array);
                if ($this->total > 0) {
                    $id = $this->array[0]['rolId'];
                    if ($id == $this->param['rolId'])
                        return true;
                    else
                        return false;
                }
                else
                    return true;
                break;
            default :
                $this->adampt->setParam('obtener'); //tipo
                $this->adampt->setParam(0); //start
                $this->adampt->setParam(0); //limit
                $this->adampt->setParam(-1); //id
                $this->adampt->setParam($this->param['rolNombre']); //rol
                $this->adampt->setParam(''); //activo
                $this->adampt->setParam(''); //query
                $this->array = $this->adampt->consulta('go_rol');
                $this->total = count($this->array);
                if ($this->total > 0)
                    return false;
                else
                    return true;
                break;
        }
    }

    function grabar() {
//        if ($this->buscar()) {
            $this->preparaProcedimiento('opc_insertar');
             if (!$this->cs->execute()) {
                $this->cs->close();
                echo '{"failure":false,"errors":{"reason": "Error de Grabado de Datos"}}';
            } else {
                $this->cs->close();
                echo '{"success":true,"message":{"reason": "Grabado Correctamente"}}';
            }
//        } else {
//            echo '{"failure":false,"errors":{"reason": "Rol: ' . $this->param['rol_rol'] . ' ya existe ¡¡"}}';
//        }
    }

    function get() {
        
    }

    function update() {
//        if ($this->buscar('editar')) {
            $this->preparaProcedimiento('opc_actualizar');
             if (!$this->cs->execute()) {
                $this->cs->close();
                echo '{"failure":false,"errors":{"reason": "Error de Grabado de Datos"}}';
            } else {
                $this->cs->close();
                echo '{"success":true,"message":{"reason": "Actualizado Correctamente"}}';
            }
            
//        }else
//            echo '{"failure":false,"errors":{"reason": "Rol: ' . $this->param['rol_rol'] . ' ya existe ¡¡"}}';
    }

}

?>
