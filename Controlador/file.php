<?php

$nombre=$_FILES['archivo']['name'];
$destino='../archivos/'.$nombre;
copy($_FILES['archivo']['tmp_name'],$destino);
