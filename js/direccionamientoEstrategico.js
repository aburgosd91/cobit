
function getdireccionamientoEstrategico(){
   var storeDireccionamiento = new Ext.data.Store({
        proxy: new Ext.data.HttpProxy({
            url: 'Controlador/direccionamientoEstrategico.php',
            method: 'POST'//por defecto
        }), baseParams: {
            param_opcion: 'listarDireccionamiento',
            start: 0,
            limit: 10
        },
        reader: new Ext.data.JsonReader({
            root: 'datos',
            totalProperty: 'total',
            id: 'CodDireccionamiento',
            fields:[{
                    name: 'param_mision',
                    type: 'string'
                    //mapping: 'CodCalzado'
                }, {
                    name: 'param_vision',
                    type: 'string'
                    //mapping: 'idModelo'
                }, {
                    name: 'param_estrategias',
                    type: 'string'
                    //mapping: 'idcolor'
                }]
        })
    });
    storeDireccionamiento.load({
        scope: this,
        callback: function(records, operation, success) {
            // the operation object
            // contains all of the details of the load operation
            var rec = storeDireccionamiento.getAt(0);
            Ext.getCmp('param_mision').setValue(rec.get('param_mision'));
            Ext.getCmp('param_vision').setValue(rec.get('param_vision'));
            Ext.getCmp('param_estrategias').setValue(rec.get('param_estrategias'));
        }
    });
   function updateDireccionamiento(){
            Ext.Ajax.request({
                url: 'Controlador/direccionamientoEstrategico.php',
                params: {
                    param_opcion:'actualizarDireccionamiento',
                    param_mision: Ext.getCmp('param_mision').getValue(),
                    param_vision: Ext.getCmp('param_vision').getValue() ,
                    param_estrategias: Ext.getCmp('param_estrategias').getValue()
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
                                storeDireccionamiento.reload();
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
   var direc = new Ext.FormPanel({
        labelAlign: 'top',
        //frame:true,
        //title: 'GIRO DE NEGOCIO',
        //bodyStyle:'padding:5px 5px 5px 5px',
        autoWidth: true,
        height:500,
        autoScroll:true, 
        items: [{
            xtype:'htmleditor',
            id:'param_mision',
            title:'MISIÓN',
            fieldLabel:'MISIÓN',
            height:150,
            anchor:'98%',
            enableColors:true,
            enableFont:true,
            enableFontSize:true,
            enableLists:true,
        },{
            xtype:'htmleditor',
            id:'param_vision',
            fieldLabel:'VISIÓN',
            height:200,
            anchor:'98%',
            enableColors:true,
            enableFont:true,
            enableFontSize:true,
            enableLists:true
        },{
            xtype:'htmleditor',
            id:'param_estrategias',
            fieldLabel:'ESTRATEGIA',
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
                    updateDireccionamiento();
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
    var panelDire=new Ext.Panel({
        labelAlign: 'top',
        id:'panelDireccionamientoEstrategico',
        frame:true,
        layout:'form',
        items: [direc]
        
    });
   return panelDire;
}
    
    