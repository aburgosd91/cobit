<?php
include_once 'conexion_model.php';
class Usuario_model {

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
        if (!($this->cs = $this->mysqli->prepare("call sp_usuario(?,?,?,?,?,?,?,?,?,?)"))) {
            echo "{error:'Falló la preparación (" . $this->mysqli->errno . ") " . $this->mysqli->error . "'}";
        }
        if ($opcion != '') {
            
            if (!$this->cs->bind_param('siisisssss', $opcion, $this->param['param_inicio'], $this->param['param_final'], $this->param['param_consulta'], $this->param['param_usuId'], $this->param['param_usuUsuario'], $this->param['param_usuClave'], $this->param['param_usuApePaterno'],$this->param['param_usuApeMaterno'], $this->param['param_usuNombre'])){
                 echo "{error:'Falló la vinculación de parámetros: (" . $this->cs->errno . ") " . $this->cs->error . "'}";
            }
        } else {
            if (!$this->cs->bind_param('siisisssss', $this->param['param_opcion'], $this->param['param_inicio'], $this->param['param_final'], $this->param['param_consulta'], $this->param['param_usuId'], $this->param['param_usuUsuario'], $this->param['param_usuClave'], $this->param['param_usuApePaterno'],$this->param['param_usuApeMaterno'], $this->param['param_usuNombre'])) {
                echo "{error:'Falló la vinculación de parámetros: (" . $this->cs->errno . ") " . $this->cs->error . "'}";
            }
        }
    }

    private function getArray($datos) {
        $array = array();
        for ($i = 0; $i < count($datos); $i++) {
            $fecha='';
            if (isset($datos[$i][10]))
                $fecha=$datos[$i][10];
            $array[] = array(
                "usuId" => $datos[$i][0],
                "usuUsuario" => $datos[$i][1],
                "usuClave" => $datos[$i][2],
                "usuApePaterno" => $datos[$i][3],
                "usuApeMaterno" => $datos[$i][4],
                "usuNombre" => $datos[$i][5],
                "usuNombreCompleto" => $datos[$i][6]
                    );
        }
        $this->array = $array;
    }

    private function getArrayTotal($datos) {
        $array = array();
        for ($i = 0; $i < count($datos); $i++) {
            $array[] = array(
                "usuContador" => $datos[$i][0]);
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
        $this->total = $this->array[0]["usuContador"];
        $this->preparaProcedimiento("opc_listar");
        if (!$this->cs->execute()) {
            $this->cs->close();
            echo "{error:'Falló la ejecución (" . $this->mysqli->errno . ") " . $this->mysqli->error . "'}";
        }
        $this->result = $this->cs->get_result();
        $this->getArray($this->result->fetch_all());
        $this->cs->close();
        echo '{total:' . $this->total . ',datos:' . json_encode($this->array) . '}';
    }

    private function filtro() {
        $this->preparaProcedimiento('opc_contador_filtro');
        if (!$this->cs->execute()) {
            $this->cs->close();
            echo "{error:'Falló la ejecución (" . $this->mysqli->errno . ") " . $this->mysqli->error . "'}";
        }
        $this->result = $this->cs->get_result();
        $this->getArrayTotal($this->result->fetch_all());
        $this->cs->close();
        $this->total = $this->array[0]["usuContador"];
        $this->preparaProcedimiento("opc_listar_filtro");
        if (!$this->cs->execute()) {
            $this->cs->close();
            echo "{error:'Falló la ejecución (" . $this->mysqli->errno . ") " . $this->mysqli->error . "'}";
        }
        $this->result = $this->cs->get_result();
        $this->getArray($this->result->fetch_all());
        $this->cs->close();
        echo '{total:' . $this->total . ',datos:' . json_encode($this->array) . '}';
    }

    function buscar($tipo = '') {
        switch ($tipo) {
            case "editar":
                $this->adampt->setParam('get'); //tipo
                $this->adampt->setParam(0); //start
                $this->adampt->setParam(0); //limit
                $this->adampt->setParam(0); //@idpersonal integer,
                $this->adampt->setParam($this->param['usuario_usuario']); //@usuario varchar(50),
                $this->adampt->setParam(''); //@password varchar(250),
                $this->adampt->setParam(''); //@apellidos varchar(30),
                $this->adampt->setParam(''); //@nombres varchar(20),
                $this->adampt->setParam(0); //@comision decimal(10,2),
                $this->adampt->setParam(0); //@sueldo decimal(10,2),
                $this->adampt->setParam(''); //@fechaentrada date,
                $this->adampt->setParam(''); //@fechasalida date,
                $this->adampt->setParam(''); //query
                $this->array = $this->adampt->consulta('go_personal');
                $this->total = count($this->array);
                if ($this->total > 0) {
                    $id = $this->array[0]['idPersonal'];
                    if ($id == $this->param['usuario_id'])
                        return true;
                    else
                        return false;
                }
                else
                    return true;
                break;
            default :
                $this->adampt->setParam('get'); //tipo
                $this->adampt->setParam(0); //start
                $this->adampt->setParam(0); //limit
                $this->adampt->setParam(0); //@idpersonal integer,
                $this->adampt->setParam($this->param['usuario_usuario']); //@usuario varchar(50),
                $this->adampt->setParam(''); //@password varchar(250),
                $this->adampt->setParam(''); //@apellidos varchar(30),
                $this->adampt->setParam(''); //@nombres varchar(20),
                $this->adampt->setParam(0); //@comision decimal(10,2),
                $this->adampt->setParam(0); //@sueldo decimal(10,2),
                $this->adampt->setParam(''); //@fechaentrada date,
                $this->adampt->setParam(''); //@fechasalida date,
                $this->adampt->setParam(''); //query
                $this->array = $this->adampt->consulta('go_personal');
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
             $this->preparaProcedimiento("opc_grabar");
            if (!$this->cs->execute()) {
                $this->cs->close();
                echo "{error:'Error Grabado de Datos (" . $this->mysqli->errno . ") " . $this->mysqli->error . "'}";
            } else {
                $this->cs->close();
               echo '{"success":true,"message":{"reason": "Grabado Correctamente"}}';
            }
            
    }

    function update() {
        

              $this->preparaProcedimiento("opc_actualizar");
            if (!$this->cs->execute()) {
                $this->cs->close();
                echo "{error:'Error Grabado de Datos (" . $this->mysqli->errno . ") " . $this->mysqli->error . "'}";
            } else {
                $this->cs->close();
                echo '{"success":true,"message":{"reason": "Grabado Correctamente"}}';
            }
            
      
    }

}

?>
