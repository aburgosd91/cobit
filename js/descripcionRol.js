function getDescripcionRol(){
    var windowPopupEditDescripcionRol;
    var formEditarDescripcionRol;
    var windowPopupDescripcionRol;
    var formRegistrarDescripcionRol;
    var storeDescripcionRol = new Ext.data.Store({
        proxy: new Ext.data.HttpProxy({
            url: 'Controlador/descripcionRol.php',
            method: 'POST'//por defecto
        }), baseParams: {
            param_opcion: 'listarDescripcionrol',
            start: 0,
            limit: 10
        },
        reader: new Ext.data.JsonReader({
            root: 'datos',
            totalProperty: 'total',
            id: 'CodDescripcionRol',
            fields:[{
                    name: 'param_cabecerarol',
                    type: 'string'
                    //mapping: 'idcolor'
                }, {
                    name: 'param_descripcion',
                    type: 'string'
                    //mapping: 'idcolor'
                },{
                    name: 'param_iddescripcion_rol',
                    type: 'number'
                    //mapping: 'idModelo'
                }, {
                    name: 'param_rolId',
                    type: 'number'
                    //mapping: 'idcolor'
                }]
        })
    });
    storeDescripcionRol.load();
    var dstoreRol = new Ext.data.Store({
        proxy: new Ext.data.HttpProxy({
            url: 'Controlador/descripcionRol.php',
            method: 'POST'//por defecto
        }),
        baseParams:{
            param_opcion: 'comboRol'
        },
        reader: new Ext.data.JsonReader({
            root: 'datos',
            totalProperty: 'total',
            id:'comboRol',
            fields:['valor','descripcion']
        })
    });
    dstoreRol.load();
    var gridDescripcionRol = new Ext.grid.GridPanel({
        store: storeDescripcionRol,
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
                        createFormDescripcionRol();                
                        windowPopupDescripcionRol.show();
                    }
                }]
        }),
        bbar: new Ext.PagingToolbar({
            store: storeDescripcionRol,
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
                        header: 'Rol',
                        dataIndex: 'param_cabecerarol',
                        sortable: true,
                        width: 500,
                        editor: new Ext.form.TextArea({
                        allowBlank:true,
                        id: 'nombreRol',
                        //width:'98%',
                        height:300,
                        //layout:'fit',
                        defaultType: 'textfield'})
                    },{
                        header: 'Perfil',
                        dataIndex: 'param_descripcion',
                        sortable: true,
                        width: 500,
                        editor: new Ext.form.TextArea({
                        allowBlank:true,
                        id: 'caracteristicasRol',
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
                        handler: function(gridDescripcionRol, rowIndex, colIndex) {
                            var rec = storeDescripcionRol.getAt(rowIndex);
                            editFormDescripcionRol();
                            Ext.getCmp('paramed_iddescripcion_rol').setValue(rec.get('param_iddescripcion_rol'));
                            Ext.getCmp('paramed_descripcion').setValue(rec.get('param_descripcion'));
                            windowPopupEditDescripcionRol.show();
                        }
                    }],
        plugins: [
            new Ext.ux.grid.Search({
                position: 'top',
                store: storeDescripcionRol,
                params: {param_opcion: 'listarDescripcionrol', start: 0, limit: 10},
                width: 200,
                handler:function(){storeDescripcionRol.load()}
            })]
    });
    function createDescripcionRol(){

        if (formRegistrarDescripcionRol.getForm().isValid())
        {
            Ext.Ajax.request({
                url: 'controlador/descripcionRol.php',
                params: {
                    param_opcion:'agregarDescripcionrol',
                    param_descripcion:Ext.getCmp('paramcr_descripcion').getValue(),
                    param_rolId: Ext.getCmp('paramcr_rolId').getValue(),
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
                                storeDescripcionRol.reload();
                                windowPopupDescripcionRol.close();
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
                                storeDescripcionRol.reload();
                                windowPopupEditDescripcionRol.close();
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
    function createFormDescripcionRol(){ 
        formRegistrarDescripcionRol=new Ext.form.FormPanel({
            border: false,
            padding: '10px 10px 10px 10px',
            labelAlign: 'top',
            items: [{
                    xtype: 'combo',
                    fieldLabel: 'Rol:<span style="color:red;font-weight:bold">*</span>',
                    id: 'paramcr_rolId',
                    allowBlank: false,
                    width: 300,
                    store:dstoreRol,
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
                    fieldLabel: 'Perfil <span style="color:red;font-weight:bold">*</span>',
                    id: 'paramcr_descripcion',
                    allowBlank: false,
                    width: 300
                }],
                buttons:[{
                    text: 'Grabar',
                    iconCls: 'aceptar',
                    handler: function (){
                            //alert(Ext.getCmp('paramed_genero').getValue());
                            createDescripcionRol();
                        }
                    }, {
                    text: 'Cancelar',
                    iconCls: 'close',
                    handler: function(){
                        windowPopupDescripcionRol.close();
                    }
                }]
        });
        //Panel para el formulario
        var panelRegistrarDescripcionRol = new Ext.Panel({
            labelAlign: 'top',
            border: false,
            items: formRegistrarDescripcionRol
        });
        windowPopupDescripcionRol = new Ext.Window({
            title: 'Registrar Descripcion - Rol',
            closable: false,
            modal: true,
            width: 350,
            items: panelRegistrarDescripcionRol
        });
    }
    function updateDescripcionRol(){
        if (formEditarDescripcionRol.getForm().isValid()){
            Ext.Ajax.request({
                url: 'Controlador/descripcionRol.php',
                params: {
                    param_opcion:'actualizarDescripcionrol',
                    param_iddescripcion_rol: Ext.getCmp('paramed_iddescripcion_rol').getValue(),
                    param_descripcion: Ext.getCmp('paramed_descripcion').getValue()
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
                                storeDescripcionRol.reload();
                                windowPopupEditDescripcionRol.close();
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
    function editFormDescripcionRol(){
        //formulario Editar
          formEditarDescripcionRol = new Ext.form.FormPanel({
            border: false,
            padding: '10px 10px 10px 10px',
            labelAlign: 'top',
            items: [{
                    xtype: 'hidden',
                    fieldLabel: 'Codigo <span style="color:red;font-weight:bold">*</span>',
                    id: 'paramed_iddescripcion_rol',
                    allowBlank: false,
                    width: 300
                },{
                    xtype: 'textarea',
                    fieldLabel: 'Perfil <span style="color:red;font-weight:bold">*</span>',
                    id: 'paramed_descripcion',
                    allowBlank: false,
                    width: 300
                }],
                buttons:[{
                    text: 'Grabar',
                    iconCls: 'aceptar',
                    handler: function (){
                            //alert("msj1");
                            updateDescripcionRol();
                        }
                    }, {
                    text: 'Cancelar',
                    iconCls: 'close',
                    handler: function(){
                        windowPopupEditDescripcionRol.close();
                    }
                }]
        });
        //Panel para el formulario
        var panelEditarDescripcion = new Ext.Panel({
            labelAlign: 'top',
            border: false,
            items:formEditarDescripcionRol
        });
        windowPopupEditDescripcionRol = new Ext.Window({
            title: 'Editar Alineamiento',
            closeAction: 'hide',
            closable: false,
            modal: true,
            width: 350,
            items:panelEditarDescripcion
        });

    }

    /*++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
    var panelDescripcionRol = new Ext.Panel({
        labelAlign: 'top',
        //frame:true,
        layaout:'form',
        //title: 'GIRO DE NEGOCIO',
        bodyStyle:'padding:5px 5px 5px 5px',
        autoWidth: true,
        height:600,
        autoScroll:true, 
        items: [gridDescripcionRol]
    });
    return panelDescripcionRol;
}

