/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
var base='http://localhost:50/MPC/Fabrica/';
function estadoRenderer(val) {//para activo e inactivo
    if (val == '1') {
        return '<center><img src="img/activo.png"/></center>';
    } else if (val =='0') {
        return '<center><img src="img/inactivo.png"/></center>';
    }
    return val;
}
function porcentajeRenderer(val) {//para porcentajes
    return val+' %';
}

