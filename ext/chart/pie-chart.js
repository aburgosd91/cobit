/*!
 * Ext JS Library 3.4.0
 * Copyright(c) 2006-2011 Sencha Inc.
 * licensing@sencha.com
 * http://www.sencha.com/license
 */
Ext.chart.Chart.CHART_URL = '../resources/charts.swf';

Ext.onReady(function(){
    var store = new Ext.data.Store({
        proxy: new Ext.data.HttpProxy({
            url: '../../controlador/reporteVentas.php',
            method: 'POST'//por defecto
        }), 
        baseParams: {
            param_opcion:'graficoFechaR',
            start: 0,
            limit: 10
        },
        reader: new Ext.data.JsonReader({
            root: 'datos',
            totalProperty: 'total',
            fields:['season', 'total'],
        })
    });store.load();
//    var store = new Ext.data.JsonStore({
//        fields: ['season', 'total'],
//        data: [{
//            season: 'Summer',
//            total: 150
//        },{
//            season: 'Fall',
//            total: 245
//        },{
//            season: 'Winter',
//            total: 117
//        },{
//            season: 'Spring',
//            total: 184
//        }]
//    });
    
    new Ext.Panel({
        width: 400,
        height: 400,
        title: 'Grafico de Rendimiendo',
        renderTo: 'container',
        items: {
            store: store,
            xtype: 'piechart',
            dataField: 'total',
            categoryField: 'season',
            //extra styles get applied to the chart defaults
            extraStyle:
            {
                legend:
                {
                    display: 'bottom',
                    padding: 5,
                    font:
                    {
                        family: 'Tahoma',
                        size: 13
                    }
                }
            }
        }
    });
});