
function getmotivoAuditoria(){
    var storeMotivo = new Ext.data.Store({
        proxy: new Ext.data.HttpProxy({
            url: 'Controlador/motivosAuditoria.php',
            method: 'POST'//por defecto
        }), baseParams: {
            param_opcion: 'listarMotivo',
            start: 0,
            limit: 10
        },
        reader: new Ext.data.JsonReader({
            root: 'datos',
            totalProperty: 'total',
            id: 'CodMotivo',
            fields:[{
                    name: 'param_motivoAud',
                    type: 'string'
                    //mapping: 'idModelo'
                }]
        })
    });
    storeMotivo.load({
        scope: this,
        callback: function(records, operation, success) {
            var rec = storeMotivo.getAt(0);
            Ext.getCmp('param_motivoAud').setValue(rec.get('param_motivoAud'));
        }
    });
    function updateMotivo(){
            Ext.Ajax.request({
                url: 'Controlador/motivosAuditoria.php',
                params: {
                    param_opcion:'actualizarMotivo',
                    param_motivoAud: Ext.getCmp('param_motivoAud').getValue(),
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
                                storeMotivo.reload();
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
    var direc = new Ext.Panel({
        labelAlign: 'top',
        frame:true,
        layout:'form',
        id:'PanelMotivoAuditoria',
        //title: 'GIRO DE NEGOCIO',
        bodyStyle:'padding:5px 5px 5px 5px',
        items: [{
            xtype:'htmleditor',
            id:'param_motivoAud',
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
                    updateMotivo();
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
    return direc;
}
    
    