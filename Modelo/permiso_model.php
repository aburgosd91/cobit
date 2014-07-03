<?php

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of permiso_model
 *
 * @author JUAN
 */
include_once 'conexion_model.php';

class Permiso_Model {

    private $mysqli = null;
    private $total;
    private $param = array();
    private $array = array();
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
            case "grabar":
                echo $this->grabar();
                break;
            case "actualizar":
                echo $this->update();
                break;
            case "get":break;
        }
    }

    private function getArrayPermiso($datos) {
        $array = array();
        for ($i = 0; $i < count($datos); $i++) {
            $array[] = array(
                "permId" => $datos[$i][0],
                "menId" => $datos[$i][1],
                "rolId" => $datos[$i][2]);
        }
        return $array;
    }

    function grabarx() {
        $this->array = $this->param['param_cpts'];
        $q = true;
        for ($index = 0; $index < count($this->array); $index++) {
            if ($this->buscar($this->array[$index])) {
                if (!($this->cs = $this->mysqli->prepare("call sp_permiso(?,?,?,?)"))) {
                    echo "{error:'Falló la preparación (" . $this->mysqli->errno . ") " . $this->mysqli->error . "'}";
                }
                $opcion = 'opc_grabar';
                if (!$this->cs->bind_param('siii', $opcion, $this->param['param_permId'], $this->array[$index], $this->param['param_rolId'])) {
                    echo "{error:'Falló la vinculación de parámetros: (" . $this->cs->errno . ") " . $this->cs->error . "'}";
                }
                if (!$this->cs->execute()) {
                    $this->cs->close();
                    $q = false;
                    echo "{error:'Falló la ejecución (" . $this->mysqli->errno . ") " . $this->mysqli->error . "'}";
                }
            }
        }
        $this->eliminar();
        if ($q)
            echo '{"success":true,"message":{"reason": "Permisos Otorgados"}}';
        else
            echo '{"failure":false,"errors":{"reason": "Error de Grabado de Datos"}}';
    }

    function grabar() {
        $this->array = $this->param['param_cpts'];
        $q = true;

        $this->eliminarPorRol();
        for ($index = 0; $index < count($this->array); $index++) {
            if (!($this->cs = $this->mysqli->prepare("call sp_permiso(?,?,?,?)"))) {
                echo "{error:'Falló la preparación (" . $this->mysqli->errno . ") " . $this->mysqli->error . "'}";
            }
            $opcion = 'opc_grabar';
            if (!$this->cs->bind_param('siii', $opcion, $this->param['param_permId'], $this->array[$index], $this->param['param_rolId'])) {
                echo "{error:'Falló la vinculación de parámetros: (" . $this->cs->errno . ") " . $this->cs->error . "'}";
            }
            if (!$this->cs->execute()) {
                $this->cs->close();
                $q = false;
                echo "{error:'Falló la ejecución (" . $this->mysqli->errno . ") " . $this->mysqli->error . "'}";
            }
        }
        if ($q)
            echo '{"success":true,"message":{"reason": "Permisos Otorgados"}}';
        else
            echo '{"failure":false,"errors":{"reason": "Error de Grabado de Datos"}}';
    }

    function eliminarPorRol() {
        if (!($this->cs = $this->mysqli->prepare("call sp_permiso(?,?,?,?)"))) {
            echo "{error:'Falló la preparación (" . $this->mysqli->errno . ") " . $this->mysqli->error . "'}";
        }
        $opcion = 'opc_eliminar_por_rol';
        $menId=0;
        if (!$this->cs->bind_param('siii', $opcion, $this->param['param_permId'],$menId , $this->param['param_rolId'])) {
            echo "{error:'Falló la vinculación de parámetros: (" . $this->cs->errno . ") " . $this->cs->error . "'}";
        }
        if (!$this->cs->execute()) {
            $this->cs->close();
            echo "{error:'Falló la ejecución (" . $this->mysqli->errno . ") " . $this->mysqli->error . "'}";
        }
        
        $this->cs->close();
    }

    function actualizar() {
        
    }

    function buscar($men) {
        if (!($this->cs = $this->mysqli->prepare("call sp_permiso(?,?,?,?)"))) {
            echo "{error:'Falló la preparación (" . $this->mysqli->errno . ") " . $this->mysqli->error . "'}";
        }
        $opcion = 'opc_buscar';
        if (!$this->cs->bind_param('siii', $opcion, $this->param['param_permId'], $menId, $this->param['param_rolId'])) {
            echo "{error:'Falló la vinculación de parámetros: (" . $this->cs->errno . ") " . $this->cs->error . "'}";
        }
        if (!$this->cs->execute()) {
            $this->cs->close();
            echo "{error:'Falló la ejecución (" . $this->mysqli->errno . ") " . $this->mysqli->error . "'}";
        }
        $this->result = $this->cs->get_result();
        $result = $this->getArrayPermiso($this->result->fetch_all());
        $this->cs->close();
        $this->total = count($result);
        if ($this->total > 0)
            return false;
        else
            return true;
    }

    function eliminar() {
        if (!($this->cs = $this->mysqli->prepare("call sp_permiso(?,?,?,?)"))) {
            echo "{error:'Falló la preparación (" . $this->mysqli->errno . ") " . $this->mysqli->error . "'}";
        }
        $menId = 0;
        $opcion = 'opc_listar_por_rol';
        if (!$this->cs->bind_param('siii', $opcion, $this->param['param_permId'], $menId, $this->param['param_rolId'])) {
            echo "{error:'Falló la vinculación de parámetros: (" . $this->cs->errno . ") " . $this->cs->error . "'}";
        }
        if (!$this->cs->execute()) {
            $this->cs->close();
            echo "{error:'Falló la ejecución (" . $this->mysqli->errno . ") " . $this->mysqli->error . "'}";
        }
        $this->result = $this->cs->get_result();
        $result = $this->getArrayPermiso($this->result->fetch_all());
        $this->cs->close();
        for ($index = 0; $index < count($result); $index++) {
            if (!$this->buscarEnResult($result[$index]['menId'])) {//
                if (!($this->cs = $this->mysqli->prepare("call sp_permiso(?,?,?,?)"))) {
                    echo "{error:'Falló la preparación (" . $this->mysqli->errno . ") " . $this->mysqli->error . "'}";
                }
                $opcion = 'opc_eliminar';
                if (!$this->cs->bind_param('siii', $opcion, $this->param['param_permId'], $result[$index]['menId'], $this->param['param_rolId'])) {
                    echo "{error:'Falló la vinculación de parámetros: (" . $this->cs->errno . ") " . $this->cs->error . "'}";
                }
                if (!$this->cs->execute()) {
                    $this->cs->close();
                    echo "{error:'Falló la ejecución (" . $this->mysqli->errno . ") " . $this->mysqli->error . "'}";
                }
            }
        }
    }

    function buscarEnResult($menId) {
        for ($index = 0; $index < count($this->array); $index++) {
            if ($this->array[$index] == $menId)
                return true;
        }
        return false;
    }

}

?>
