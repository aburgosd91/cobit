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
            param_opcion:'graficoFecha',
            start: 0,
            limit: 10
        },
        reader: new Ext.data.JsonReader({
            root: 'datos',
            totalProperty: 'total',
            fields:['name', 'visits', 'views'],
        })
    });store.load();
//    var store = new Ext.data.JsonStore({
//        fields:['name', 'visits', 'views'],
//        data: [
//            {name:'Jul 07', visits: 245000, views: 3000000},
//            {name:'Aug 07', visits: 240000, views: 3500000},
//            {name:'Sep 07', visits: 355000, views: 4000000},
//            {name:'Oct 07', visits: 375000, views: 4200000},
//            {name:'Nov 07', visits: 490000, views: 4500000},
//            {name:'Dec 07', visits: 495000, views: 5800000},
//            {name:'Jan 08', visits: 520000, views: 6000000},
//            {name:'Feb 08', visits: 620000, views: 7500000}
//        ]
//    });

    // extra extra simple
    new Ext.Panel({
        title: 'Reporte Extra-Simple',
        renderTo: 'container',
        width:500,
        height:300,
        layout:'fit',

        items: {
            xtype: 'linechart',
            store: store,
            xField: 'name',
            yField: 'visits',
			listeners: {
				itemclick: function(o){
					var rec = store.getAt(o.index);
					Ext.example.msg('Item Selected', 'You chose {0}.', rec.get('name'));
				}
			}
        },
        buttons:
               [{
                    text: 'Cargar',
                    tooltip: 'Cargar Datos',
                    iconCls: '',
                    handler: function() {
                        store.reload();
                    }
                            
                }]
    });

    // extra simple
    new Ext.Panel({
        iconCls:'chart',
        title: 'Reporte Simple',
        frame:true,
        renderTo: 'container',
        width:500,
        height:300,
        layout:'fit',

        items: {
            xtype: 'linechart',
            store: store,
            url: '../resources/charts.swf',
            xField: 'name',
            yField: 'visits',
            yAxis: new Ext.chart.NumericAxis({
                displayName: 'Visits',
                labelRenderer : Ext.util.Format.numberRenderer('0,0')
            }),
            tipRenderer : function(chart, record){
                return Ext.util.Format.number(record.data.visits, '0,0') + ' visits in ' + record.data.name;
            }
        }
    });

    // more complex with a custom look
    new Ext.Panel({
        iconCls:'chart',
        title: 'Reporte Completo',
        frame:true,
        renderTo: 'container',
        width:500,
        height:300,
        layout:'fit',

        items: {
            xtype: 'columnchart',
            store: store,
            url:'../resources/charts.swf',
            xField: 'name',
            yAxis: new Ext.chart.NumericAxis({
                displayName: 'Visits',
                labelRenderer : Ext.util.Format.numberRenderer('0,0')
            }),
            tipRenderer : function(chart, record, index, series){
                if(series.yField == 'visits'){
                    return Ext.util.Format.number(record.data.visits, '0,0') + ' visits in ' + record.data.name;
                }else{
                    return Ext.util.Format.number(record.data.views, '0,0') + ' page views in ' + record.data.name;
                }
            },
            chartStyle: {
                padding: 10,
                animationEnabled: true,
                font: {
                    name: 'Tahoma',
                    color: 0x444444,
                    size: 11
                },
                dataTip: {
                    padding: 5,
                    border: {
                        color: 0x99bbe8,
                        size:1
                    },
                    background: {
                        color: 0xDAE7F6,
                        alpha: .9
                    },
                    font: {
                        name: 'Tahoma',
                        color: 0x15428B,
                        size: 10,
                        bold: true
                    }
                },
                xAxis: {
                    color: 0x69aBc8,
                    majorTicks: {color: 0x69aBc8, length: 4},
                    minorTicks: {color: 0x69aBc8, length: 2},
                    majorGridLines: {size: 1, color: 0xeeeeee}
                },
                yAxis: {
                    color: 0x69aBc8,
                    majorTicks: {color: 0x69aBc8, length: 4},
                    minorTicks: {color: 0x69aBc8, length: 2},
                    majorGridLines: {size: 1, color: 0xdfe8f6}
                }
            },
            series: [{
                type: 'column',
                displayName: 'Page Views',
                yField: 'views',
                style: {
                    image:'bar.gif',
                    mode: 'stretch',
                    color:0x99BBE8
                }
            },{
                type:'line',
                displayName: 'Visits',
                yField: 'visits',
                style: {
                    color: 0x15428B
                }
            }]
        }
    });
});