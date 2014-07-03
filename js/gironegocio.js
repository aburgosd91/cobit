/*!
 * Ext JS Library 3.4.0
 * Copyright(c) 2006-2011 Sencha Inc.
 * licensing@sencha.com
 * http://www.sencha.com/license
 */

    /*
     * ================  Giro de Negocio 3  =======================
     */
    
function getgironegocio(){
    var storeGironegocio = new Ext.data.Store({
        proxy: new Ext.data.HttpProxy({
            url: 'Controlador/gironegocio.php',
            method: 'POST'//por defecto
        }), baseParams: {
            param_opcion: 'listarGironegocio',
            start: 0,
            limit: 10
        },
        reader: new Ext.data.JsonReader({
            root: 'datos',
            totalProperty: 'total',
            id: 'CodGironegocio',
            fields:[{
                    name: 'param_giroNegocio',
                    type: 'string'
                    //mapping: 'CodCalzado'
                }, {
                    name: 'param_resenaHistorica',
                    type: 'string'
                    //mapping: 'idModelo'
                }]
        })
    });
    storeGironegocio.load({
        scope: this,
        callback: function(records, operation, success) {
            // the operation object
            // contains all of the details of the load operation
            var rec = storeGironegocio.getAt(0);
            Ext.getCmp('param_giroNegocio').setValue(rec.get('param_giroNegocio'));
            Ext.getCmp('param_resenaHistorica').setValue(rec.get('param_resenaHistorica'));
        }
    });
    //storeGironegocio.load();
       var toolbar = new Ext.Toolbar({
            id:'toolbarGiroNegocio',
//                    defaults:{
//                        iconAlign: 'top' 
//                    },
            items: [
                { text:'Empresa:',xtype:'label',width:300},
                {  
                    xtype:'combo',
                    id:'cboGiroNegocio',
                    store: new Ext.data.SimpleStore({
                            fields: ['id', 'ocultar'],
                            data: [[1, 'UNT'], [0, 'SOLAGRO']]
                        }),
                    mode: 'local',
                    displayField: 'ocultar',
                    valueField: 'id',
                    width: 300,
                    allowBlank: false,
                    triggerAction: 'all',
                    listeners: {
                        select: function(combo, record, index) {
                            //Ext.getCmp('menu_ocultar').setValue(combo.getValue());
                        }
                    }
                },
                {
                    iconCls:'search',
                    handler: function() {
//                        crearMenu();
//                        win.show();
                    }
                },
//                        new Ext.Toolbar.Fill(),//igual a '->'
                {   

                }
            ]
        });
    var giro = new Ext.FormPanel({
        labelAlign: 'top',
        frame:true,
        store:storeGironegocio,
        title: 'GIRO DE NEGOCIO',
        height:650,
        id:'formGiroNegocio',
        margins:'3 3 3 3',
        items: [{
            xtype:'htmleditor',
            id:'param_giroNegocio',
            fieldLabel:'GIRO DE NEGOCIO',
            height:200,
            anchor:'98%',
            enableColors:true,
            enableFont:true,
            enableFontSize:true,
            enableLists:true
        },{
            xtype:'htmleditor',
            id:'param_resenaHistorica',
            fieldLabel:'RESEÑA HISTÓRICA',
            height:300,
            anchor:'98%',
            enableColors:true,
            enableFont:true,
            enableFontSize:true,
            enableLists:true
        }],
        buttons: [{
            text: 'Save',
            id:"btnGiroNegocioGuardar",
            iconCls: 'aceptar',
            height: 50,
            width:100,
            items: [{
                xtype: 'textfield',
                fieldLabel: 'Name',
                labelStyle: 'font-weight:bold;'
            }],
            handler: function (){
                    updateGiroNegocio();
            }
        },{
            text: 'Cancel',
            height: 50,
            width:100,
            id:"btnGiroNegocioCancelar",
            renderTo: Ext.getBody(),
            items: [{
                xtype: 'textfield',
                fieldLabel: 'Name',
                labelStyle: 'font-weight:bold;'
            }],
            
        }]
    });
    function updateGiroNegocio(){
            Ext.Ajax.request({
                url: 'Controlador/gironegocio.php',
                params: {
                    param_opcion:'actualizarGironegocio',
                    param_giroNegocio: Ext.getCmp('param_giroNegocio').getValue(),
                    param_resenaHistorica: Ext.getCmp('param_resenaHistorica').getValue() ,
                },
                success: function(response) {
                    var data = eval(response.responseText);
                    if (data===1)
                    {
                        Ext.Msg.show({
                            title: 'Mensaje',
                            msg: 'Actualización Correcta...',
                            buttons: Ext.Msg.OK,
                            icon: Ext.MessageBox.INFO,
                            fn: function() {
                                storeGironegocio.reload();
                            }
                        });
                    }
                    if (data===0)
                    {
                        Ext.Msg.show({
                            title: 'Error de Procedimiento',
                            msg: data.errors.reason,
                            buttons: Ext.Msg.OK,
                            icon: Ext.MessageBox.ERROR
                        });
                    }

                },
                failure: function(response) {
                    var result = eval(response.responseText);
                    Ext.Msg.show({
                        title: 'Error',
                        msg: 'Error al conectar a la base de datos. Intente mas tarde',
                        buttons: Ext.Msg.OK,
                        icon: Ext.MessageBox.ERROR
                    });
                }
            });
    }
    var panel=new Ext.Panel({
        labelAlign: 'top',
        frame:true,
        tbar:toolbar,
        id:'panelGiroNegocio',
        layout:'form',
        //title: 'GIRO DE NEGOCIO',
        //bodyStyle:'padding:5px 5px 5px 5px',
        autoWidth: true,
        height:730,
        autoScroll:true, 
        items: [giro]
    });
    return panel;
}
    
    