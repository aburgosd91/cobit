<?php
    sleep(1);
    //echo 'hola';
    $nombre=$_FILES['archivito']['name'];
    //$nombre="repositorio.pdf";
    $destino='../archivos/Marco Normativo/'.$nombre;
    copy($_FILES['archivito']['tmp_name'],$destino);
    //move_uploaded_file($nombre_tmp,"subidas/" . $nombre);
    echo '{success:true, file:'.json_encode($nombre).'}';
    
    
