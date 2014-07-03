/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
//Ext.chart.Chart.CHART_URL = '../ext/resources/charts.swf';
Ext.onReady(function() {
    Ext.QuickTips.init();
    var windowP = new Ext.Window({
        title: 'Mantenedor Principal',
        layout:'fit',
        maximizable:true,
        minimizable:true, 
        items:getProducto()
    });
    windowP.show();
    //Probando Algo Nuevo
});
