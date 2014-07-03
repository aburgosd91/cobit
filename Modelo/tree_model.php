<?php

session_start();

include_once 'conexion_model.php';

class Tree_Model {

    private $records = array();
    private $array = array();
    private $total;
    private $param = array();
    private $tree = array();
    private $index = array();
    private $cont = 0;
    private $result = array();
    private $mysqli = null;
    private $cs = null;
    private $usuId;

    //tree
    public function __construct() {
        $this->mysqli = Conexion_Model::getConexion();
        $this->cs = $this->mysqli->prepare("select @id");
        $this->cs->execute();
        $this->cs->close();
        $this->usuId = $_SESSION['usuId'];
    }

    public function addChild($child, $parentKey = null) {
        $key = isset($child["id"]) ? $child["id"] : 'item_' . $this->cont;
        $child["leaf"] = true;
        if ($this->containsKey($parentKey)) {
            //added to the existing node  
            $this->index[$key] = & $child;
            $parent = & $this->index[$parentKey];
            if (isset($parent["children"])) {
                $parent["children"][] = & $child;
            } else {
                $parent["leaf"] = false;
                $parent["children"] = array();
                $parent["children"][] = & $child;
            }
        } else {
            //added to the root  
            $this->index[$key] = & $child;
            $this->tree[] = & $child;
        }
        $this->cont++;
    }
    public function getNode($key) {
        return $this->index[key];
    }
    public function removeNode($key) {
        //unset($this->index[key]);  
    }
    public function containsKey($key) {
        return isset($this->index[$key]);
    }
    public function toJson() {
        return json_encode($this->tree);
    }

    //
    //getArray
    private function getArrayMenu($datos) {
        $array = array();
        for ($i = 0; $i < count($datos); $i++) {
            $array[] = array(
                "menId" => $datos[$i][0],
                "menPadreId" => $datos[$i][1],
                "menNombre" => $datos[$i][2],
                "menOrden" => $datos[$i][3],
                "menDescripcion" => $datos[$i][4],
                "menDraggable" => $datos[$i][5],
                "menHidden" => $datos[$i][6]);
        }
        return $array;
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

    //
    //Prepara Procedimientos
    private function preparaProcedimientoUsuario($opcion = '') {
        if (!($this->cs = $this->mysqli->prepare("call sp_usuario(?,?,?,?,?,?,?,?,?,?)"))) {
            echo "{error:'Falló la preparación (" . $this->mysqli->errno . ") " . $this->mysqli->error . "'}";
        }
        if (!$this->cs->bind_param('siisisssss', $opcion, $this->param['param_inicio'], $this->param['param_final'], $this->param['param_consulta'], $this->usuId, $this->param['param_usuUsuario'], $this->param['param_usuClave'], $this->param['param_usuApePaterno'], $this->param['param_usuApeMaterno'], $this->param['param_usuNombre'])) {
                echo "{error:'Falló la vinculación de parámetros: (" . $this->cs->errno . ") " . $this->cs->error . "'}";
            }
        /*if ($opcion != '') {
            if (!$this->cs->bind_param('siisisssss', $opcion, $this->param['param_inicio'], $this->param['param_final'], $this->param['param_consulta'], $this->usuId, $this->param['param_usuUsuario'], $this->param['param_usuClave'], $this->param['param_usuApePaterno'], $this->param['param_usuApeMaterno'], $this->param['param_usuNombre'])) {
                echo "{error:'Falló la vinculación de parámetros: (" . $this->cs->errno . ") " . $this->cs->error . "'}";
            }
        } else {
            if (!$this->cs->bind_param('siisisssss', $this->param['param_opcion'], $this->param['param_inicio'], $this->param['param_final'], $this->param['param_consulta'], $this->param['param_usuId'], $this->param['param_usuUsuario'], $this->param['param_usuClave'], $this->param['param_usuApePaterno'], $this->param['param_usuApeMaterno'], $this->param['param_usuNombre'])) {
                echo "{error:'Falló la vinculación de parámetros: (" . $this->cs->errno . ") " . $this->cs->error . "'}";
            }
        }*/
    }

    private function preparaProcedimientoMenu($opcion = '') {
        if (!($this->cs = $this->mysqli->prepare("call sp_menu(?,?,?,?,?,?,?,?)"))) {
            echo "{error:'Falló la preparación (" . $this->mysqli->errno . ") " . $this->mysqli->error . "'}";
        }
        if ($opcion != '') {
            if (!$this->cs->bind_param('siisisss', $opcion, $this->param['param_menId'], $this->param['param_menPadreId'], $this->param['param_menNombre'], $this->param['param_menOrden'], $this->param['param_menDescripcion'], $this->param['param_menDraggable'], $this->param['param_menHidden'])) {
                echo "{error:'Falló la vinculación de parámetros: (" . $this->cs->errno . ") " . $this->cs->error . "'}";
            }
        } else {
            if (!$this->cs->bind_param('siisisss', $this->param['param_opcion'], $this->param['param_menId'], $this->param['param_menPadreId'], $this->param['param_menNombre'], $this->param['param_menOrden'], $this->param['param_menDescripcion'], $this->param['param_menDraggable'], $this->param['param_menHidden'])) {
                echo "{error:'Falló la vinculación de parámetros: (" . $this->cs->errno . ") " . $this->cs->error . "'}";
            }
        }
    }

    private function preparaProcedimientoPermiso($opcion = '') {
        if (!($this->cs = $this->mysqli->prepare("call sp_permiso(?,?,?,?)"))) {
            echo "{error:'Falló la preparación (" . $this->mysqli->errno . ") " . $this->mysqli->error . "'}";
        }
        if ($opcion != '') {
            if (!$this->cs->bind_param('siii', $opcion, $this->param['param_permId'], $this->param['param_menId'], $this->param['param_rolId'])) {
                echo "{error:'Falló la vinculación de parámetros: (" . $this->cs->errno . ") " . $this->cs->error . "'}";
            }
        } else {
            if (!$this->cs->bind_param('siii', $this->param['param_opcion'], $this->param['param_permId'], $this->param['param_menId'], $this->param['param_rolId'])) {
                echo "{error:'Falló la vinculación de parámetros: (" . $this->cs->errno . ") " . $this->cs->error . "'}";
            }
        }
    }

    //

    function gestionar($datos, $records) {
        $this->param = $datos;
        $this->records = $records;
        switch ($this->param['param_opcion']) {
            case "grabar":
                echo $this->grabar();
                break;
            case "listarOrder":
                echo $this->listarPorNombre();
                break;
            case "listarTodos":
                echo $this->listarPorOrden0();
                break;
            case "listar":
                echo $this->listarPorOrden();
                break;
            case "listarMenu":
                echo $this->listarMenu();
                break;
            case"listarCheck":
                echo $this->listarPorOrdenCheck();
                break;
            case "actualizar":
                echo $this->actualizarPadreOrden();
                break;
            case "actualizar1":
                echo $this->actualizarTodo();
                break;
            default :
                echo '{"failure":false,"errors":{"reason": "Ninguna Opcion"}}';
                break;
        }
    }

    function getChecked($menId) {
        if (!($this->cs = $this->mysqli->prepare("call sp_permiso(?,?,?,?)"))) {
            echo "{error:'Falló la preparación (" . $this->mysqli->errno . ") " . $this->mysqli->error . "'}";
        }
        $tipo = 'opc_buscar';
        if (!$this->cs->bind_param('siii', $tipo, $this->param['param_permId'], $menId, $this->param['param_rolId'])) {
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
        if ($this->total > 0) {
            return true;
        } else
            return false;
    }

    function grabar() {
        $this->preparaProcedimientoMenu("opc_grabar");
        if (!$this->cs->execute()) {
            $this->cs->close();
            echo '{"failure":false,"errors":{"reason": "Error de Grabado de Datos"}}';
        } else {
            $this->cs->close();
            echo '{"success":true,"message":{"reason": "Grabado Correctamente"}}';
        }
    }
    
    
    function listarMenu() {
        $this->preparaProcedimientoUsuario('opc_listar_menu');
        if (!$this->cs->execute()) {
            $this->cs->close();
            echo "{error:'Falló la ejecución (" . $this->mysqli->errno . ") " . $this->mysqli->error . "'}";
        }
        $this->result = $this->cs->get_result();
        $this->array = $this->getArrayMenu($this->result->fetch_all());
        $this->cs->close();
        $data = array();
        for ($i = 0; $i < count($this->array); $i++) {
            $val = true;
            if ($this->array[$i]["menDraggable"] == 1)
                $val = true;
            if ($this->array[$i]["menDraggable"] == 0)
                $val = false;
            $val2 = true;
            if ($this->array[$i]["menHidden"] == 1)
                $val2 = true;
            if ($this->array[$i]["menHidden"] == 0)
                $val2 = false;
            array_push($data, array(
                "id" => $this->array[$i]["menId"],
                "idParent" => $this->array[$i]["menPadreId"],
                "text" => $this->array[$i]["menNombre"],
                "orderNumber" => $this->array[$i]["menOrden"],
                "description" => $this->array[$i]["menDescripcion"],
                "draggable" => $val,
                "hidden" => $val2,
            ));
        }
        for ($i = 0; $i < count($data); $i++) {
            $category = $data[$i];
            $this->addChild($category, $category["idParent"]);
        }

        echo $this->toJson();
    }
    
    function listarPorOrden0() {
        $this->preparaProcedimientoMenu('opc_listar_por_Id');
        if (!$this->cs->execute()) {
            $this->cs->close();
            echo "{error:'Falló la ejecución (" . $this->mysqli->errno . ") " . $this->mysqli->error . "'}";
        }
        $this->result = $this->cs->get_result();
        $this->array = $this->getArrayMenu($this->result->fetch_all());
        $this->cs->close();
        $this->total = count($this->array);
        echo '{total:' . $this->total . ',datos:' . json_encode($this->array) . '}';
    }

    function listarPorNombre() {
        $this->preparaProcedimientoMenu('opc_listar_por_nombre');
        if (!$this->cs->execute()) {
            $this->cs->close();
            echo "{error:'Falló la ejecución (" . $this->mysqli->errno . ") " . $this->mysqli->error . "'}";
        }
        $this->result = $this->cs->get_result();
        $this->array = $this->getArrayMenu($this->result->fetch_all());
        $this->cs->close();
        $this->total = count($this->array);
        echo '{total:' . $this->total . ',datos:' . json_encode($this->array) . '}';
    }

    function listarPorOrdenCheck() {
        $data = array();
        $this->preparaProcedimientoMenu('opc_listar_por_orden');
        if (!$this->cs->execute()) {
            $this->cs->close();
            echo "{error:'Falló la ejecución (" . $this->mysqli->errno . ") " . $this->mysqli->error . "'}";
        }
        $this->result = $this->cs->get_result();
        $this->array = $this->getArrayMenu($this->result->fetch_all());
        $this->cs->close();
        for ($i = 0; $i < count($this->array); $i++) {
            $val = true;
            if ($this->array[$i]["menDraggable"] == 1)
                $val = true;
            if ($this->array[$i]["menDraggable"] == 0)
                $val = false;
            $val2 = true;
            if ($this->array[$i]["menHidden"] == 1)
                $val2 = true;
            if ($this->array[$i]["menHidden"] == 0)
                $val2 = false;
            array_push($data, array(
                "id" => $this->array[$i]["menId"],
                "idParent" => $this->array[$i]["menPadreId"],
                "text" => $this->array[$i]["menNombre"],
                "orderNumber" => $this->array[$i]["menOrden"],
                "description" => $this->array[$i]["menDescripcion"],
                "draggable" => $val,
                "hidden" => $val2,
                "expanded" => true,
                "checked" => $this->getChecked($this->array[$i]["menId"])
            ));
        }

        for ($i = 0; $i < count($data); $i++) {
            $category = $data[$i];
            $this->addChild($category, $category["idParent"]);
        }

        echo $this->toJson();
    }

    function listarPorOrden() {
        $data = array();
        $this->preparaProcedimientoMenu('opc_listar_por_orden');
        if (!$this->cs->execute()) {
            $this->cs->close();
            echo "{error:'Falló la ejecución (" . $this->mysqli->errno . ") " . $this->mysqli->error . "'}";
        }
        $this->result = $this->cs->get_result();
        $this->array = $this->getArrayMenu($this->result->fetch_all());
        $this->cs->close();
        for ($i = 0; $i < count($this->array); $i++) {
            $val = true;
            if ($this->array[$i]["menDraggable"] == 1)
                $val = true;
            if ($this->array[$i]["menDraggable"] == 0)
                $val = false;
            $val2 = true;
            if ($this->array[$i]["menHidden"] == 1)
                $val2 = true;
            if ($this->array[$i]["menHidden"] == 0)
                $val2 = false;
            array_push($data, array(
                "id" => $this->array[$i]["menId"],
                "idParent" => $this->array[$i]["menPadreId"],
                "text" => $this->array[$i]["menNombre"],
                "orderNumber" => $this->array[$i]["menOrden"],
                "description" => $this->array[$i]["menDescripcion"],
                "draggable" => $val,
                "hidden" => $val2,
            ));
        }

        for ($i = 0; $i < count($data); $i++) {
            $category = $data[$i];
            $this->addChild($category, $category["idParent"]);
        }

        echo $this->toJson();
    }

    function actualizarTodo() {
        //No modificado al 20/02/14
        echo $this->param['param_records'][0]['param_menNombre'];
        for ($index = 0; $index < count($this->param['param_records']); $index++) {
            $menId = $this->param['param_records'][$index]['param_menId'];
            $menPadreId = NULL;
            if ($this->param['param_records'][$index]['param_menPadreId'])
                $menPadreId = $this->param['param_records'][$index]['param_menPadreId'];
            $menNombre = $this->param['param_records'][$index]['param_menNombre'];
            $menOrden = 0;
            if ($this->param['param_records'][$index]['param_menOrden'] != '')
                $menOrden = $this->param['param_records'][$index]['param_menOrden'];
            $menDescripcion = '';
            if ($this->param['param_records'][$index]['param_menDescripcion'] != '')
                $menDescripcion = $this->param['param_records'][$index]['param_menDescripcion'];
            $menDraggable = $this->param['param_records'][$index]['param_menDraggable'];
            $menHidden = $this->param['param_records'][$index]['param_menHidden'];
            //   

            if (!($this->cs = $this->mysqli->prepare("call sp_menu(?,?,?,?,?,?,?,?)"))) {
                echo "{error:'Falló la preparación (" . $this->mysqli->errno . ") " . $this->mysqli->error . "'}";
            }

            $opcion = 'opc_actualizar_todo';
            if ($opcion != '') {
                if (!$this->cs->bind_param('siisisss', $opcion, $menId, $menPadreId, $menNombre, $menOrden, $menDescripcion, $menDraggable, $menHidden)) {
                    echo "{error:'Falló la vinculación de parámetros: (" . $this->cs->errno . ") " . $this->cs->error . "'}";
                }
            }
            if (!$this->cs->execute()) {
                $this->cs->close();
            } else {
                $this->cs->close();
            }
        }
    }

    function actualizarPadreOrden() {
        $items = explode(',', $this->param['param_nodes']);
        for ($index1 = 0; $index1 < count($items); $index1++) {

            if (!($this->cs = $this->mysqli->prepare("call sp_menu(?,?,?,?,?,?,?,?)"))) {
                echo "{error:'Falló la preparación (" . $this->mysqli->errno . ") " . $this->mysqli->error . "'}";
            }
            $opcion = 'opc_actualizar_padre_orden';
            if (!$this->cs->bind_param('siisisss', $opcion, $items[$index1], $this->param['param_menPadreId'], $this->param['param_menNombre'], ($index1 + 1), $this->param['param_menDescripcion'], $this->param['param_menDraggable'], $this->param['param_menHidden'])) {
                echo "{error:'Falló la vinculación de parámetros: (" . $this->cs->errno . ") " . $this->cs->error . "'}";
            }
            if (!$this->cs->execute()) {
                $this->cs->close();
            } else {
                $this->cs->close();
            }
        }
    }

}

?>
