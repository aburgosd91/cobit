
function getrealidadProblematica(){
    var storeRealidadProblematica = new Ext.data.Store({
        proxy: new Ext.data.HttpProxy({
            url: 'Controlador/realidadProblematica.php',
            method: 'POST'//por defecto
        }), baseParams: {
            param_opcion: 'listarProblematica',
            start: 0,
            limit: 10
        },
        reader: new Ext.data.JsonReader({
            root: 'datos',
            totalProperty: 'total',
            id: 'CodRealidadProblematica',
            fields:[{
                    name: 'param_realidadProblematica',
                    type: 'string'
                    //mapping: 'idModelo'
                }]
        })
    });
    storeRealidadProblematica.load({
        scope: this,
        callback: function(records, operation, success) {
            var rec = storeRealidadProblematica.getAt(0);
            Ext.getCmp('param_realidadProblematica').setValue(rec.get('param_realidadProblematica'));
        }
    });
    var realidad = new Ext.FormPanel({
        labelAlign: 'top',
        frame:true,
        id:'fromRealidad',
        //title: 'GIRO DE NEGOCIO',
        bodyStyle:'padding:5px 5px 0',
//        width: 600,
//        height:600,
        layout:'form',
        items: [{
            xtype:'htmleditor',
            id:'param_realidadProblematica',
            fieldLabel:'REALIDAD PROBLEMÁTICA',
            height:300,
            anchor:'98%',
            enableColors:true,
            enableFont:true,
            enableFontSize:true,
            enableLists:true
        }],
        buttons: [{
                text: 'Save',
                iconCls: 'save2',
                //id:'direcSave',
                height:50,
                //buttonAlign:'center',
                handler: function (){
                    updateRealidadProblematica();
                }
            },{
                text: 'Cancel',
                iconCls: 'close',
                //id:'direcCancel',
                height:50,
                //buttonAlign:'center',
                handler: function (){

                }
        }]
    });
    function updateRealidadProblematica(){
            Ext.Ajax.request({
                url: 'Controlador/realidadProblematica.php',
                params: {
                    param_opcion:'actualizarProblematica',
                    param_realidadProblematica: Ext.getCmp('param_realidadProblematica').getValue(),
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
                                storeRealidadProblematica.reload();
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
    var panelRealidad=new Ext.Panel({
        labelAlign: 'top',
        frame:true,
        layout:'fit',
        //title: 'GIRO DE NEGOCIO',
        //bodyStyle:'padding:5px 5px 5px 5px',
        autoWidth: true,
        height:400,
        autoScroll:true, 
        items: [realidad]
    });
    return panelRealidad;
}
    
    