/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
function getRol()
{
    var windowPopupRol;
    var windowPopupEditRol;
    var formRegistrarRol;
    var formEditarRol;
    var win;

    var storeRol = new Ext.data.Store({
        proxy: new Ext.data.HttpProxy({
            url: 'controlador/rol.php',
            method: 'POST'//por defecto
        }), baseParams: {
            param_opcion: 'listar',
            start: 0,
            limit: 10
        },
        reader: new Ext.data.JsonReader({
            root: 'datos',
            totalProperty: 'total',
            id: 'rolId',
            fields: [{
                    name: 'param_rolId',
                    type: 'number',
                    mapping: 'rolId'
                }, {
                    name: 'param_rolNombre',
                    type: 'string',
                    mapping: 'rolNombre'
                }, {
                    name: 'param_rolActivo',
                    type: 'string',
                    mapping: 'rolActivo'
                }]
        })
    });
    storeRol.load();
    var gridRol = new Ext.grid.GridPanel({
        store: storeRol,
        border: false,
        stripeRows: true,
        itemSelector: true,
        tbar: new Ext.Toolbar({
            border: true,
            buttons: [{
                    text: 'Rol',
                    tooltip: 'Crear Rol',
                    iconCls: 'add',
                    handler: function() {
                        createFormRol();
                        windowPopupRol.show();
                    }
                }]
        }),
        bbar: new Ext.PagingToolbar({
            store: storeRol,
            displayInfo: true,
            autoWidth: true,
            beforePageText: 'Página',
            afterPageText: 'de {0}',
            displayMsg: '{0} - {1} de {2} Roles',
            emptyMsg: 'No hay Roles para mostrar',
            pageSize: 10
        }),
        columns:
                [new Ext.grid.RowNumberer(), {
                        header: 'Rol',
                        dataIndex: 'param_rolNombre',
                        sortable: true,
                        width: 200
                    }, {
                        header: 'Activo',
                        dataIndex: 'param_rolActivo',
                        renderer: estadoRenderer,
                        width: 80,
                        sortable: true
                    }, {
                        xtype: 'actioncolumn',
                        header: '#',
                        width: 30,
                        tooltip: 'Editar',
                        icon: 'img/edit.png',
                        handler: function(gridRol, rowIndex, colIndex) {
                            var rec = storeRol.getAt(rowIndex);
                            editFormRol();
                            Ext.getCmp('paramed_rolId').setValue(rec.get('param_rolId'));
                            Ext.getCmp('paramed_rolNombre').setValue(rec.get('param_rolNombre'));
                            if (rec.get('param_rolActivo') == '1')
                                Ext.getCmp('paramed_rolActivo').setValue(true);
                            if (rec.get('param_rolActivo') == '0')
                                Ext.getCmp('paramed_rolActivo').setValue(false);
                            windowPopupEditRol.show();
                        }
                    }, {
                        xtype: 'actioncolumn',
                        header: '#',
                        width: 30,
                        tooltip: 'Permisos',
                        icon: 'img/licencia.png',
                        handler: function(gridRol, rowIndex, colIndex)
                        {
                            var rec = storeRol.getAt(rowIndex);
                            abrirMenu(rec.get('param_rolId'));
                            win.show();
                        }
                    }],
        plugins: [
            new Ext.ux.grid.Search({
                position: 'top',
                store: storeRol,
                params: {param_opcion: 'listar', start: 0, limit: 10},
                width: 200
            })]
    });

    function abrirMenu(rolId)
    {
        var tree = new Ext.tree.TreePanel({
            border: false,
            autoScroll: true,
            enableDD: true,
            rootVisible: false,
            loader: new Ext.tree.TreeLoader({
                dataUrl: 'controlador/tree.php',
                baseParams: {
                    param_opcion: 'listarCheck',
                    param_rolId: rolId
                }
            }),
            root: new Ext.tree.AsyncTreeNode()
        });

        win = new Ext.Window({
            title: 'Asignar Permisos',
            autoScroll: true,
            modal: true,
            width: 500,
            height: 400,
            items: [new Ext.Toolbar({
                    border: true,
                    buttons: [
                        {
                            text: 'Guardar',
                            tooltip: 'Guarda',
                            iconCls: 'save',
                            handler: function() {
                                var selNodes = tree.getChecked();
                                var cpts = [];
                                Ext.each(selNodes, function(node) {
                                    cpts.push(node.id)
                                });
                                Ext.Ajax.request({
                                    url: 'controlador/permiso.php',
                                    params: {
                                        param_opcion: "grabar",
                                        param_cpts: Ext.encode(cpts),
                                        param_rolId: rolId
                                    },
                                    success: function(response) {
                                        var data = Ext.util.JSON.decode(response.responseText);
                                        if (data.message != null)
                                        {
                                            Ext.Msg.show({
                                                title: 'Éxito',
                                                msg: data.message.reason,
                                                buttons: Ext.Msg.OK,
                                                icon: Ext.MessageBox.INFO,
                                                fn: function(txt) {
                                                    win.hide();
                                                }
                                            });
                                            Ext.getCmp('tree-panel').getRootNode().reload();
                                        }
                                        if (data.errors != null)
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
                        }]
                }), new Ext.Panel({
                    autoScroll: true,
                    border: false,
                    items: tree
                })]

        });

    }
    //cretate tipo de cliente
    function createRol()
    {
        if (formRegistrarRol.getForm().isValid())
        {
            Ext.Ajax.request({
                url: 'controlador/rol.php',
                params: {
                    param_opcion: "grabar",
                    param_rolNombre: Ext.getCmp('paramcr_rolNombre').getValue()
                },
                success: function(response) {
                    var data = Ext.util.JSON.decode(response.responseText);
                    if (data.message != null)
                    {
                        Ext.Msg.show({
                            title: 'Éxito',
                            msg: data.message.reason,
                            buttons: Ext.Msg.OK,
                            icon: Ext.MessageBox.INFO,
                            fn: function(txt) {
                                storeRol.reload();
                                formRegistrarRol.getForm().reset();
                                windowPopupRol.close();
                            }
                        });
                    }
                    if (data.errors != null)
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
    //fomulario Registrar
    function createFormRol()
    {
        formRegistrarRol = new Ext.form.FormPanel({
            border: false,
            padding: '10px 10px 10px 10px',
            labelAlign: 'top',
            items: [{
                    xtype: 'textfield',
                    fieldLabel: 'Rol <span style="color:red;font-weight:bold">*</span>',
                    id: 'paramcr_rolNombre',
                    allowBlank: false,
                    width: 300
                }],
            buttons: [{
                    text: 'Grabar',
                    iconCls: 'aceptar',
                    handler: createRol
                }, {
                    text: 'Cancelar',
                    iconCls: 'close',
                    handler: function() {
                        windowPopupRol.close();
                    }
                }]
        });

        //Panel para el formulario
        var panelRegistrarRol = new Ext.Panel({
            labelAlign: 'top',
            border: false,
            items: formRegistrarRol
        });
        windowPopupRol = new Ext.Window({
            title: 'Registrar Rol',
            closable: false,
            modal: true,
            width: 350,
            items: panelRegistrarRol
        });
    }
    //update tipo de cliente
    function updateRol()
    {
        if (formEditarRol.getForm().isValid())
        {
            Ext.Ajax.request({
                url: 'controlador/rol.php',
                params: {
                    param_opcion: "actualizar",
                    param_rolId: Ext.getCmp('paramed_rolId').getValue(),
                    param_rolNombre: Ext.getCmp('paramed_rolNombre').getValue(),
                    param_rolActivo: Ext.getCmp('paramed_rolActivo').getValue()
                },
                success: function(response) {
                    var data = Ext.util.JSON.decode(response.responseText);
                    if (data.message != null)
                    {
                        Ext.Msg.show({
                            title: 'Éxito',
                            msg: data.message.reason,
                            buttons: Ext.Msg.OK,
                            icon: Ext.MessageBox.INFO,
                            fn: function(txt) {
                                storeRol.reload();
                                windowPopupEditRol.close();
                            }
                        });
                    }
                    if (data.errors != null)
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
    function editFormRol()
    {
        //formulario Editar
        formEditarRol = new Ext.form.FormPanel({
            border: false,
            padding: '10px 10px 10px 10px',
            labelAlign: 'top',
            items: [{
                    xtype: 'hidden',
                    fieldLabel: 'ID <span style="color:red;font-weight:bold">*</span>',
                    id: 'paramed_rolId',
                    allowBlank: false,
                    allowNegative: false
                }, {
                    xtype: 'textfield',
                    fieldLabel: 'Rol <span style="color:red;font-weight:bold">*</span>',
                    id: 'paramed_rolNombre',
                    allowBlank: false,
                    width: 300
                }, {
                    xtype: 'checkbox',
                    fieldLabel: 'Activo <span style="color:red;font-weight:bold">*</span>',
                    id: 'paramed_rolActivo'
                }
            ],
            buttons: [{
                    text: 'Grabar',
                    iconCls: 'aceptar',
                    handler: updateRol
                }, {
                    text: 'Cancelar',
                    iconCls: 'close',
                    handler: function() {
                        formEditarRol.getForm().reset();
                        windowPopupEditRol.close();
                    }
                }]
        });

        //Panel para el formulario
        var panelEditarRol = new Ext.Panel({
            labelAlign: 'top',
            border: false,
            items: formEditarRol
        });
        windowPopupEditRol = new Ext.Window({
            title: 'Editar Rol',
            closeAction: 'hide',
            closable: false,
            modal: true,
            width: 350,
            items: panelEditarRol
        });

    }
    var panelMantenedorRol = new Ext.Panel({
        layout: 'fit',
        border: false,
        items: gridRol
    });

    return panelMantenedorRol;
}


