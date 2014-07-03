/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
function getUsuario()
{
    var windowPopupUsuario;
    var windowPopupEditUsuario;
    var formEditarUsuario;
    var formRegistrarUsuario;
    var storeUsuario = new Ext.data.Store({
        proxy: new Ext.data.HttpProxy({
            url: 'controlador/usuario.php',
            method: 'POST'//por defecto,
        }),
        baseParams: {
            param_opcion: 'listar',
            start: 0,
            limit: 10
        },
        reader: new Ext.data.JsonReader({
            root: 'datos',
            totalProperty: 'total',
            id: 'idPersonal',
            fields: [{
                    name: 'param_usuId',
                    type: 'number',
                    mapping: 'usuId'
                }, {
                    name: 'param_usuUsuario',
                    type: 'string',
                    mapping: 'usuUsuario'
                }, {
                    name: 'param_usuClave',
                    type: 'string',
                    mapping: 'usuClave'
                }, {
                    name: 'param_usuNombre',
                    type: 'string',
                    mapping: 'usuNombre'
                }, {
                    name: 'param_usuApePaterno',
                    type: 'string',
                    mapping: 'usuApePaterno'
                }, {
                    name: 'param_usuApeMaterno',
                    type: 'string',
                    mapping: 'usuApeMaterno'
                }]
        })
    });


    var gridUsuario = new Ext.grid.GridPanel({
        store: storeUsuario,
        border: false,
        stripeRows: true,
        itemSelector: true,
        //    autoHeight:true,
        tbar: new Ext.Toolbar({
            buttons: [{
                    text: 'Usuario',
                    tooltip: 'Crear Usuario',
                    iconCls: 'add',
                    handler: function() {
                        createFormUsuario();
                        windowPopupUsuario.show();
                    }
                }]
        }),
        bbar: new Ext.PagingToolbar({
            store: storeUsuario,
            displayInfo: true,
            autoWidth: true,
            beforePageText: 'Página',
            afterPageText: 'de {0}',
            displayMsg: '{0} - {1} de {2} usuarios',
            emptyMsg: 'No hay usuarios para mostrar',
            pageSize: 10
        }),
        columns:
                [new Ext.grid.RowNumberer(), {
                        header: 'Usuario',
                        dataIndex: 'param_usuUsuario',
                        sortable: true,
                        width: 100
                    }, {
                        header: 'Clave',
                        dataIndex: 'param_usuClave',
                        sortable: true,
                        width: 100
                    }, {
                        header: 'Nombres',
                        dataIndex: 'param_usuNombre',
                        sortable: true,
                        width: 100
                    }, {
                        header: 'Apellido Paterno',
                        dataIndex: 'param_usuApePaterno',
                        sortable: true,
                        width: 100
                    }, {
                        header: 'Apellido Materno',
                        dataIndex: 'param_usuApeMaterno',
                        sortable: true,
                        width: 100
                    }, {
                        xtype: 'actioncolumn',
                        header: '#',
                        width: 30,
                        tooltip: 'Editar',
                        icon: 'img/edit.png',
                        handler: function(gridUsuario, rowIndex, colIndex) {
                            var rec = storeUsuario.getAt(rowIndex);
                            editFormUsuario();
                            Ext.getCmp('paramed_usuId').setValue(rec.get('param_usuId'));
                            Ext.getCmp('paramed_usuUsuario').setValue(rec.get('param_usuUsuario'));
                            Ext.getCmp('paramed_usuClave').setValue(rec.get('param_usuClave'));
                            Ext.getCmp('paramed_usuClave2').setValue(rec.get('param_usuClave'));
                            Ext.getCmp('paramed_usuNombre').setValue(rec.get('param_usuNombre'));
                            Ext.getCmp('paramed_usuApePaterno').setValue(rec.get('param_usuApePaterno'));
                            Ext.getCmp('paramed_usuApeMaterno').setValue(rec.get('param_usuApeMaterno'));
                            windowPopupEditUsuario.show();
                        }
                    }, {
                        xtype: 'actioncolumn',
                        header: '#',
                        width: 30,
                        tooltip: 'Roles',
                        icon: 'img/licencia.png',
                        handler: function(gridUsuario, rowIndex, colIndex) {
                            var rec = storeUsuario.getAt(rowIndex);
                            mostrarRoles(rec.get('param_usuId'));
                        }
                    }],
        plugins: [
            new Ext.ux.grid.Search({
                position: 'top',
                store: storeUsuario,
                params: {param_opcion: 'listar', start: 0, limit: 10},
                width: 200
            })]
    });
    storeUsuario.load();
    function createUsuario()
    {
        if (formRegistrarUsuario.getForm().isValid())
        {
            Ext.Ajax.request({
                url: 'controlador/usuario.php',
                params: {
                    param_opcion: "grabar",
                    param_usuUsuario: Ext.getCmp('paramcr_usuUsuario').getValue(),
                    param_usuClave: Ext.getCmp('paramcr_usuClave').getValue(),
                    param_usuNombre: Ext.getCmp('paramcr_usuNombre').getValue(),
                    param_usuApePaterno: Ext.getCmp('paramcr_usuApePaterno').getValue(),
                    param_usuApeMaterno: Ext.getCmp('paramcr_usuApeMaterno').getValue()
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
                                storeUsuario.reload();
                                windowPopupUsuario.close();
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
    function createFormUsuario()
    {
        Ext.apply(Ext.form.VTypes, {
            daterange: function(val, field) {
                var date = field.parseDate(val);

                if (!date) {
                    return false;
                }
                if (field.startDateField) {
                    var start = Ext.getCmp(field.startDateField);
                    if (!start.maxValue || (date.getTime() != start.maxValue.getTime())) {
                        start.setMaxValue(date);
                        start.validate();
                    }
                }
                else if (field.endDateField) {
                    var end = Ext.getCmp(field.endDateField);
                    if (!end.minValue || (date.getTime() != end.minValue.getTime())) {
                        end.setMinValue(date);
                        end.validate();
                    }
                }
                /*
                 * Always return true since we're only using this vtype to set the
                 * min/max allowed values (these are tested for after the vtype test)
                 */
                return true;
            },
            password: function(val, field) {
                if (field.initialPassField) {
                    var pwd = Ext.getCmp(field.initialPassField);
                    return (val == pwd.getValue());
                }
                return true;
            },
            passwordText: 'Las contraseñas no coinciden'
        });

        formRegistrarUsuario = new Ext.form.FormPanel({
            border: false,
            padding: '10px 10px 10px 10px',
            labelAlign: 'top',
            items: [{
                    xtype: 'textfield',
                    fieldLabel: 'Usuario <span style="color:red;font-weight:bold">*</span>',
                    id: 'paramcr_usuUsuario',
                    allowBlank: false,
                    width: 300
                }, {
                    xtype: 'textfield',
                    fieldLabel: 'Clave <span style="color:red;font-weight:bold">*</span>',
                    id: 'paramcr_usuClave',
                    inputType: 'password',
                    allowBlank: false,
                    width: 300
                }, {
                    xtype: 'textfield',
                    fieldLabel: 'Confirmar Clave <span style="color:red;font-weight:bold">*</span>',
                    id: 'paramcr_usuClave2',
                    inputType: 'password',
                    vtype: 'password',
                    initialPassField: 'paramcr_usuClave',
                    allowBlank: false,
                    width: 300
                }, {
                    xtype: 'textfield',
                    fieldLabel: 'Nombres <span style="color:red;font-weight:bold">*</span>',
                    id: 'paramcr_usuNombre',
                    allowBlank: false,
                    width: 300
                }, {
                    xtype: 'textfield',
                    fieldLabel: 'Apellido Paterno <span style="color:red;font-weight:bold">*</span>',
                    id: 'paramcr_usuApePaterno',
                    allowBlank: false,
                    width: 300
                }, {
                    xtype: 'textfield',
                    fieldLabel: 'Apellido Materno <span style="color:red;font-weight:bold">*</span>',
                    id: 'paramcr_usuApeMaterno',
                    allowBlank: false,
                    width: 300
                }],
            buttons: [{
                    text: 'Grabar',
                    iconCls: 'aceptar',
                    handler: createUsuario
                }, {
                    text: 'Cancelar',
                    iconCls: 'close',
                    handler: function() {
                        windowPopupUsuario.close();
                    }
                }]
        });

        //Panel para el formulario
        var panelRegistrarUsuario = new Ext.Panel({
            labelAlign: 'top',
            border: false,
            items: formRegistrarUsuario
        });
        windowPopupUsuario = new Ext.Window({
            title: 'Registrar Usuario',
            closable: false,
            modal: true,
            width: 350,
            items: panelRegistrarUsuario
        });
    }
    //fomulario Registrar


    function updateUsuario() {
        if (formEditarUsuario.getForm().isValid())
        {
            Ext.Ajax.request({
                url: 'controlador/usuario.php',
                params: {
                    param_opcion: "actualizar",
                    param_usuId: Ext.getCmp('paramed_usuId').getValue(),
                    param_usuUsuario: Ext.getCmp('paramed_usuUsuario').getValue(),
                    param_usuClave: Ext.getCmp('paramed_usuClave').getValue(),
                    param_usuNombre: Ext.getCmp('paramed_usuNombre').getValue(),
                    param_usuApePaterno: Ext.getCmp('paramed_usuApePaterno').getValue(),
                    param_usuApeMaterno: Ext.getCmp('paramed_usuApeMaterno').getValue()
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
                                storeUsuario.reload();
                                windowPopupEditUsuario.close();
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

    function editFormUsuario() {
        Ext.apply(Ext.form.VTypes, {
            daterange: function(val, field) {
                var date = field.parseDate(val);

                if (!date) {
                    return false;
                }
                if (field.startDateField) {
                    var start = Ext.getCmp(field.startDateField);
                    if (!start.maxValue || (date.getTime() != start.maxValue.getTime())) {
                        start.setMaxValue(date);
                        start.validate();
                    }
                }
                else if (field.endDateField) {
                    var end = Ext.getCmp(field.endDateField);
                    if (!end.minValue || (date.getTime() != end.minValue.getTime())) {
                        end.setMinValue(date);
                        end.validate();
                    }
                }
                /*
                 * Always return true since we're only using this vtype to set the
                 * min/max allowed values (these are tested for after the vtype test)
                 */
                return true;
            },
            password: function(val, field) {
                if (field.initialPassField) {
                    var pwd = Ext.getCmp(field.initialPassField);
                    return (val == pwd.getValue());
                }
                return true;
            },
            passwordText: 'Las claves no coinciden'
        });

        formEditarUsuario = new Ext.form.FormPanel({
            border: false,
            padding: '10px 10px 10px 10px',
            labelAlign: 'top',
            items: [{
                    xtype: 'hidden',
                    fieldLabel: 'Id <span style="color:red;font-weight:bold">*</span>',
                    id: 'paramed_usuId',
                    allowBlank: false,
                    allowNegative: false
                }, {
                    xtype: 'textfield',
                    fieldLabel: 'Usuario <span style="color:red;font-weight:bold">*</span>',
                    id: 'paramed_usuUsuario',
                    allowBlank: false,
                    width: 300
                }, {
                    xtype: 'textfield',
                    fieldLabel: 'Clave <span style="color:red;font-weight:bold">*</span>',
                    id: 'paramed_usuClave',
                    inputType: 'password',
                    allowBlank: false,
                    width: 300
                }, {
                    xtype: 'textfield',
                    fieldLabel: 'Confirmar Clave <span style="color:red;font-weight:bold">*</span>',
                    id: 'paramed_usuClave2',
                    inputType: 'password',
                    vtype: 'password',
                    initialPassField: 'paramed_usuClave',
                    allowBlank: false,
                    width: 300
                }, {
                    xtype: 'textfield',
                    fieldLabel: 'Nombres <span style="color:red;font-weight:bold">*</span>',
                    id: 'paramed_usuNombre',
                    allowBlank: false,
                    width: 300
                }, {
                    xtype: 'textfield',
                    fieldLabel: 'Apellido Paterno <span style="color:red;font-weight:bold">*</span>',
                    id: 'paramed_usuApePaterno',
                    allowBlank: false,
                    width: 300
                }, {
                    xtype: 'textfield',
                    fieldLabel: 'Apellido Materno <span style="color:red;font-weight:bold">*</span>',
                    id: 'paramed_usuApeMaterno',
                    allowBlank: false,
                    width: 300
                }],
            buttons: [{
                    text: 'Grabar',
                    iconCls: 'aceptar',
                    handler: updateUsuario
                }, {
                    text: 'Cancelar',
                    iconCls: 'close',
                    handler: function() {
                        windowPopupEditUsuario.close();
                    }
                }]
        });

        //Panel para el formulario
        var panelEditarUsuario = new Ext.Panel({
            labelAlign: 'top',
            border: false,
            items: formEditarUsuario
        });
        windowPopupEditUsuario = new Ext.Window({
            title: 'Editar Usuario',
            closeAction: 'hide',
            closable: false,
            modal: true,
            width: 350,
            items: panelEditarUsuario
        });
    }

    function mostrarRoles(usuId)
    {
        var storeRol = new Ext.data.Store({
            proxy: new Ext.data.HttpProxy({
                url: 'controlador/rol.php',
                method: 'POST'//por defecto
            }),
            baseParams: {
                param_opcion: 'list'
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
        var windrol;
        var sm = new Ext.grid.CheckboxSelectionModel();

        var gridRol = new Ext.grid.GridPanel({
            store: storeRol,
            border: false,
            stripeRows: true,
            itemSelector: true,
            tbar: new Ext.Toolbar({
                border: true,
                buttons: [{
                        text: 'Guardar',
                        tooltip: 'Guardar Cambios',
                        iconCls: 'save',
                        handler: function() {
                            var rows = gridRol.getSelectionModel().getSelections(); //step 2  
                            var cpts = [];
                            Ext.each(rows, function(record) {
                                cpts.push(record.get('param_rolId'));
                            });
                            Ext.Ajax.request({
                                url: 'controlador/perfil.php',
                                params: {
                                    param_opcion: "grabar",
                                    param_cpts: Ext.encode(cpts),
                                    param_usuId: usuId
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
                                                windrol.hide();
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
            }),
            //            bbar:new Ext.PagingToolbar({  
            //                store: storeRol,  
            //                displayInfo: true,  
            //                autoWidth:true,
            //                beforePageText :'Página',
            //                afterPageText:'de {0}',
            //                displayMsg: '{0} - {1} de {2} Roles',  
            //                emptyMsg: 'No hay Roles para mostrar',  
            //                pageSize: 10
            //            }),
            columns:
                    [new Ext.grid.RowNumberer(), sm, {
                            header: 'Nombre',
                            dataIndex: 'param_rolNombre',
                            sortable: true,
                            width: 200
                        }, {
                            header: 'Activo',
                            dataIndex: 'param_rolActivo',
                            renderer: estadoRenderer,
                            width: 80,
                            sortable: true
                        }],
            sm: sm
        });

        Ext.Ajax.request({
            url: 'controlador/perfil.php',
            params: {
                param_opcion: "listxpersonal",
                param_usuId: usuId
            },
            success: function(response) {
                var data = Ext.util.JSON.decode(response.responseText);
                
                var cpts = [];
                gridRol.getStore().each(function(rec) {
                    cpts.push(rec.data);
                });

                var i = 0;
                var rows = [];
                for (i = 0; i < cpts.length; i++) {
                    if (buscarRR(data, cpts[i]['param_rolId'])) {
                        //                        gridRol.getSelectionModel().selectRow(i);//seleccionar una fila
                        rows.push(i);
                    }
                }
                gridRol.getSelectionModel().selectRows(rows, true);//seleccionar varias filas
                function buscarRR(data, idrol)
                {
                    var i = 0;
                    for (i = 0; i < data.length; i++) {
                        //                        alert(data[i]['idRol']+'=='+idrol);
                        if (data[i]['rolId'] == idrol)
                            return true;
                    }
                    return false;
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

        windrol = new Ext.Window({
            layout: 'fit',
            modal: true,
            width: 350,
            height: 350,
            items: gridRol
        });

        windrol.show();
    }

    //formulario Editar

    var panelMantenedorUsuario = new Ext.Panel({
        layout: 'fit',
        autoScroll: true,
        border: false,
        items: gridUsuario
    });
    return panelMantenedorUsuario;
}

