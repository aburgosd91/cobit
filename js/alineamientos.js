function getAlineamiento(){
    var windowPopupEditAlineamiento;
    var formEditarAlineamiento;
    var windowPopupAlineamiento;
    var formRegistrarAlineamiento;
    var storeAlineamiento = new Ext.data.Store({
        proxy: new Ext.data.HttpProxy({
            url: 'Controlador/alineamiento.php',
            method: 'POST'//por defecto
        }), baseParams: {
            param_opcion: 'listarAlineamiento',
            start: 0,
            limit: 10
        },
        reader: new Ext.data.JsonReader({
            root: 'datos',
            totalProperty: 'total',
            id: 'CodAlieamiento',
            fields:[{
                    name: 'param_idalineamiento',
                    type: 'number'

                    //mapping: 'CodCalzado'
                }, {
                    name: 'param_idplan_auditoriaA',
                    type: 'number'
                    //mapping: 'idModelo'
                }, {
                    name: 'param_alineamiento',
                    type: 'string'
                    //mapping: 'idcolor'
                }, {
                    name: 'param_estrategia',
                    type: 'string'
                    //mapping: 'idcolor'
                }]
        })
    });
    storeAlineamiento.load();
    var dstoreProyecto = new Ext.data.Store({
        proxy: new Ext.data.HttpProxy({
            url: 'Controlador/alineamiento.php',
            method: 'POST'//por defecto
        }),
        baseParams:{
            param_opcion: 'proyecto'
        },
        reader: new Ext.data.JsonReader({
            root: 'datos',
            totalProperty: 'total',
            id:'comboProyectos',
            fields:['valor','descripcion']
        })
    });
    dstoreProyecto.load();
    var gridAlineamiento = new Ext.grid.GridPanel({
        store: storeAlineamiento,
        border: true,
        stripeRows: true,
        itemSelector: true,
        height:300,
        tbar: new Ext.Toolbar({
            border: true,
            buttons: [{
                    text: 'Obj Especifico',
                    tooltip: 'Crear Objetivo Especifico',
                    iconCls: 'add',
                    handler: function() {
                        createFormAlineamiento();                
                        windowPopupAlineamiento.show();
                    }
                },'-',{
                text:'Eliminar',
                tooltip:'Eliminar Objetivo Especifico',
                iconCls:'delete',
                id:'btneliminarAlineamiento',
                handler:function() {
                    var rec=gridAlineamiento.getSelectionModel().getSelected();
                    if(rec!=null){
                        eliminarAlineamiento(rec);
                    }
                    else{
                        Ext.Msg.show({
                            title:'Mensaje',
                            msg: 'Seleccione una fila',
                            buttons: Ext.Msg.OK,
                            icon: Ext.MessageBox.WARNING
                        });
                    }
                }
            }]
        }),
        bbar: new Ext.PagingToolbar({
            store: storeAlineamiento,
            displayInfo: true,
            autoWidth: true,
            beforePageText: 'Página',
            afterPageText: 'de {0}',
            displayMsg: '{0} - {1} de {2} Objetivos Especifico',
            emptyMsg: 'No hay Objetivos Especifico para mostrar',
            pageSize: 10
        }),
        columns:
                [new Ext.grid.RowNumberer(), 
                    {
                        header: 'Alineamiento',
                        dataIndex: 'param_alineamiento',
                        sortable: true,
                        width: 500,
                        editor: new Ext.form.TextArea({
                        allowBlank:true,
                        id: 'alineamiento',
                        //width:'98%',
                        height:300,
                        //layout:'fit',
                        defaultType: 'textfield'})
                    },{
                        header: 'Estrategia',
                        dataIndex: 'param_estrategia',
                        sortable: true,
                        width: 500,
                        editor: new Ext.form.TextArea({
                        allowBlank:true,
                        id: 'estrategia',
                        width:'98%',
                        height:300,
                        //layout:'fit',
                        defaultType: 'textfield'})
                    },{
                        xtype: 'actioncolumn',
                        header: '<span style="color:red;font-weight:bold">Editar</span>',
                        width: 50,
                        tooltip: 'Editar',
                        icon: 'img/edit.png',
                        handler: function(gridAlineamiento, rowIndex, colIndex) {
                            var rec = storeAlineamiento.getAt(rowIndex);
                            //var rec=gridCalzado.getSelectionModel().getSelected();
                            editFormAlineamiento();
                            Ext.getCmp('paramed_idalineamiento').setValue(rec.get('param_idalineamiento'));
                            Ext.getCmp('paramed_alineamiento').setValue(rec.get('param_alineamiento'));
    //                            Ext.getCmp('paramed_idplan_auditoriaA').setValue(rec.get('param_idplan_auditoriaA'));
                            Ext.getCmp('paramed_estrategia').setValue(rec.get('param_estrategia'));
                            windowPopupEditAlineamiento.show();
                        }
                    }],
        plugins: [
            new Ext.ux.grid.Search({
                position: 'top',
                store: storeAlineamiento,
                params: {param_opcion: 'listarAlineamiento', start: 0, limit: 10},
                width: 200,
                handler:function(){storeAlineamiento.load()}
            })]
    });
    function createAlineamiento(){

        if (formRegistrarAlineamiento.getForm().isValid())
        {
            Ext.Ajax.request({
                url: 'controlador/alineamiento.php',
                params: {
                    param_opcion:'agregarAlineamiento',
                    param_idplan_auditoriaA:Ext.getCmp('paramcr_idplan_auditoriaA').getValue(),
                    param_alineamiento: Ext.getCmp('paramcr_alineamiento').getValue(),
                    param_estrategia: Ext.getCmp('paramcr_estrategia').getValue()
                },
                success: function(response) {
                    var data = eval(response.responseText);
                    if (data===1)
                    {
                        Ext.Msg.show({
                            title: 'Mensaje',
                            msg: 'Guardado Correcto...',
                            buttons: Ext.Msg.OK,
                            icon: Ext.MessageBox.INFO,
                            fn: function() {
                                storeAlineamiento.reload();
                                windowPopupAlineamiento.close();
                            }
                        });
                    }
                    if (data===0)
                    {
                        Ext.Msg.show({
                            title: 'Error',
                            msg: 'Error en Operación...',
                            buttons: Ext.Msg.OK,
                            icon: Ext.MessageBox.ERROR,
                            fn: function() {
                                storeAlineamiento.reload();
                                windowPopupEditAlineamiento.close();
                            }
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
        else
        {
            Ext.Msg.show({
                title: 'Advertencia',
                msg: 'Ingrese Datos',
                buttons: Ext.Msg.OK,
                icon: Ext.MessageBox.WARNING
            });
        }
    }
    function createFormAlineamiento(){ 
        formRegistrarAlineamiento=new Ext.form.FormPanel({
            border: false,
            padding: '10px 10px 10px 10px',
            labelAlign: 'top',
            items: [{
                    xtype: 'combo',
                    fieldLabel: 'Proyecto:<span style="color:red;font-weight:bold">*</span>',
                    id: 'paramcr_idplan_auditoriaA',
                    allowBlank: false,
                    width: 300,
                    store:dstoreProyecto,
                    valueField: 'valor',
                    displayField: 'descripcion',
                    typeAhead: true,
                    mode: 'remote',
                    triggerAction: 'all',
                    emptyText: 'Seleccione..',
                    editable: false,
                    selectOnFocus: true

                },{
                    xtype: 'textarea',
                    fieldLabel: 'Alineamiento <span style="color:red;font-weight:bold">*</span>',
                    id: 'paramcr_alineamiento',
                    allowBlank: false,
                    width: 300
                },{
                    xtype: 'textarea',
                    fieldLabel: 'Estrategia <span style="color:red;font-weight:bold">*</span>',
                    id: 'paramcr_estrategia',
                    allowBlank: false,
                    width: 300
                }],
                buttons:[{
                    text: 'Grabar',
                    iconCls: 'aceptar',
                    handler: function (){
                            //alert(Ext.getCmp('paramed_genero').getValue());
                            createAlineamiento();
                        }
                    }, {
                    text: 'Cancelar',
                    iconCls: 'close',
                    handler: function(){
                        windowPopupAlineamiento.close();
                    }
                }]
        });
        //Panel para el formulario
        var panelRegistrarAlineamiento = new Ext.Panel({
            labelAlign: 'top',
            border: false,
            items: formRegistrarAlineamiento
        });
        windowPopupAlineamiento = new Ext.Window({
            title: 'Registrar Alineamiento',
            closable: false,
            modal: true,
            width: 350,
            items: panelRegistrarAlineamiento
        });
    }
    function updateAlineamiento(){
        if (formEditarAlineamiento.getForm().isValid()){
            Ext.Ajax.request({
                url: 'Controlador/alineamiento.php',
                params: {
                    param_opcion:'actualizarAlineamiento',
                    param_idalineamiento: Ext.getCmp('paramed_idalineamiento').getValue(),
    //                    param_idplan_auditoria: Ext.getCmp('paramed_idplan_auditoria').getValue() ,
                    param_alineamiento: Ext.getCmp('paramed_alineamiento').getValue(),
                    param_estrategia: Ext.getCmp('paramed_estrategia').getValue()
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
                                storeAlineamiento.reload();
                                windowPopupEditAlineamiento.close();
                            }
                        });
                    }
                    if (data===0)
                    {
                        Ext.Msg.show({
                            title: 'Error',
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
        else
        {
            Ext.Msg.show({
                title: 'Advertencia',
                msg: 'Ingrese Datos',
                buttons: Ext.Msg.OK,
                icon: Ext.MessageBox.WARNING
            });
        }
    }
    function editFormAlineamiento(){
        //formulario Editar
          formEditarAlineamiento = new Ext.form.FormPanel({
            border: false,
            padding: '10px 10px 10px 10px',
            labelAlign: 'top',
            items: [{
                    xtype: 'hidden',
                    fieldLabel: 'Codigo <span style="color:red;font-weight:bold">*</span>',
                    id: 'paramed_idalineamiento',
                    allowBlank: false,
                    width: 300
                },{
                    xtype: 'textarea',
                    fieldLabel: 'Alineamiento <span style="color:red;font-weight:bold">*</span>',
                    id: 'paramed_alineamiento',
                    allowBlank: false,
                    width: 300
                },{
                    xtype: 'textarea',
                    fieldLabel: 'Estrategia <span style="color:red;font-weight:bold">*</span>',
                    id: 'paramed_estrategia',
                    allowBlank: false,
                    width: 300
                }],
                buttons:[{
                    text: 'Grabar',
                    iconCls: 'aceptar',
                    handler: function (){
                            //alert("msj1");
                            updateAlineamiento();
                        }
                    }, {
                    text: 'Cancelar',
                    iconCls: 'close',
                    handler: function(){
                        windowPopupEditAlineamiento.close();
                    }
                }]
        });
        //Panel para el formulario
        var panelEditarAlineamiento = new Ext.Panel({
            labelAlign: 'top',
            border: false,
            items:formEditarAlineamiento
        });
        windowPopupEditAlineamiento = new Ext.Window({
            title: 'Editar Alineamiento',
            closeAction: 'hide',
            closable: false,
            modal: true,
            width: 350,
            items:panelEditarAlineamiento
        });

    }
    function eliminarAlineamiento(rec){
            Ext.Ajax.request({   
            url: 'controlador/alineamiento.php',
            params: {
                param_opcion: "eliminarAlineamiento",
                param_idalineamiento:rec.get("param_idalineamiento")
            },
            success: function(response) {
                var data = eval(response.responseText);
                if (data===1)
                {
                    Ext.Msg.show({
                        title: 'Mensaje',
                        msg: 'Eliminación Exitosa...',
                        buttons: Ext.Msg.OK,
                        icon: Ext.MessageBox.INFO,
                        fn: function() {
                            storeAlineamiento.reload();
                        }
                    });
                }
                if (data===0)
                {
                    Ext.Msg.show({
                        title: 'Error en Eliminación...',
                        msg: data.errors.reason,
                        buttons: Ext.Msg.OK,
                        icon: Ext.MessageBox.ERROR
                    });
                }

            },
            failure: function(response) {
                Ext.Msg.show({
                    title: 'Error',
                    msg: 'Error al conectar a la base de datos. Intente mas tarde',
                    buttons: Ext.Msg.OK,
                    icon: Ext.MessageBox.ERROR
                });
            }               
        });
    }

    /*++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
    var panelAlineamiento = new Ext.Panel({
        labelAlign: 'top',
        //frame:true,
        layaout:'form',
        //title: 'GIRO DE NEGOCIO',
        bodyStyle:'padding:5px 5px 5px 5px',
        autoWidth: true,
        height:600,
        autoScroll:true, 
        items: [gridAlineamiento]
    });
    return panelAlineamiento;
}