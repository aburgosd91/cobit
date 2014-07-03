function getplanAuditoria(){
   var storePlanauditoria = new Ext.data.Store({
        proxy: new Ext.data.HttpProxy({
            url: 'Controlador/plan_auditoria.php',
            method: 'POST'//por defecto
        }), baseParams: {
            param_opcion: 'listarPlanauditoria',
            start: 0,
            limit: 10
        },
        reader: new Ext.data.JsonReader({
            root: 'datos',
            totalProperty: 'total',
            id: 'CodplanAuditoria',
            fields:[{
                    name: 'param_idplan_auditoria',
                    type: 'number'
                    //mapping: 'CodCalzado'
                }, {
                    name: 'param_alcances',
                    type: 'string'
                    //mapping: 'idModelo'
                }, {
                    name: 'param_aclaraciones',
                    type: 'string'
                    //mapping: 'idcolor'
                }, {
                    name: 'param_limitaciones',
                    type: 'string'
                    //mapping: 'idcolor'
                }, {
                    name: 'param_idProyecto',
                    type: 'number'
                    //mapping: 'idcolor'
                }]
        })
    });
    storePlanauditoria.load({
        scope: this,
        callback: function(records, operation, success) {
            // the operation object
            // contains all of the details of the load operation
            var rec = storePlanauditoria.getAt(0);
            Ext.getCmp('param_alcances').setValue(rec.get('param_alcances'));
            Ext.getCmp('param_aclaraciones').setValue(rec.get('param_aclaraciones'));
            Ext.getCmp('param_limitaciones').setValue(rec.get('param_limitaciones'));
        }
    });
   function updateAuditoria(){
            Ext.Ajax.request({
                url: 'Controlador/plan_auditoria.php',
                params: {
                    param_opcion:'actualizarPlanauditoria',
                    param_alcances: Ext.getCmp('param_alcances').getValue(),
                    param_aclaraciones: Ext.getCmp('param_aclaraciones').getValue() ,
                    param_limitaciones: Ext.getCmp('param_limitaciones').getValue()
                },
                success: function(response) {
                    //alert('Entre update');
                    var data = eval(response.responseText);
                    if (data===1)
                    {
                        Ext.Msg.show({
                            title: 'Mensaje',
                            msg: 'Actualización Correcta...',
                            buttons: Ext.Msg.OK,
                            icon: Ext.MessageBox.INFO,
                            fn: function() {
                                storePlanauditoria.reload();
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
   var planAuditoria = new Ext.FormPanel({
        labelAlign: 'top',
        //frame:true,
        //title: 'GIRO DE NEGOCIO',
        //bodyStyle:'padding:5px 5px 5px 5px',
        autoWidth: true,
        height:500,
        autoScroll:true, 
        items: [{
            xtype:'htmleditor',
            id:'param_alcances',
            title:'ALCANCES',
            fieldLabel:'ALCANCES',
            height:150,
            anchor:'98%',
            enableColors:true,
            enableFont:true,
            enableFontSize:true,
            enableLists:true,
        },{
            xtype:'htmleditor',
            id:'param_aclaraciones',
            fieldLabel:'ACLARACIONES',
            height:200,
            anchor:'98%',
            enableColors:true,
            enableFont:true,
            enableFontSize:true,
            enableLists:true
        },{
            xtype:'htmleditor',
            id:'param_limitaciones',
            fieldLabel:'LIMITACIONES',
            height:200,
            anchor:'98%',
            enableColors:true,
            enableFont:true,
            enableFontSize:true,
            enableLists:true
        }],
        buttons: [{
                text: 'Save',
                iconCls: 'save2',
                id:'direcSave',
                height:50,
                //buttonAlign:'center',
                handler: function (){
                    updateAuditoria();
                }
            },{
                text: 'Cancel',
                iconCls: 'close',
                id:'direcCancel',
                height:50,
                //buttonAlign:'center',
                handler: function (){

                }
            }]
    });
    var panelAuditoria=new Ext.Panel({
        labelAlign: 'top',
        id:'panelplanAuditoria',
        frame:true,
        layout:'form',
        items: [planAuditoria]
        
    });
   return panelAuditoria;
}
    
    

