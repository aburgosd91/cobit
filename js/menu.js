/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

function getMenu()
{
    var win;
    var windowPopupMenu;
    var formRegistrarMenu;
    var tree;
    var storeMenu = new Ext.data.Store({
        proxy: new Ext.data.HttpProxy({
            url: 'Controlador/tree.php',
            method: 'POST'//por defecto
        }),
        baseParams: {
            param_opcion: 'listarTodos'
        },
        //mapping)en reader= recibe la info del modelo : ID
        //name(en reader) es reasignado : codigo
        //dataindex(en columnas) es igual al name para poner un header
        reader: new Ext.data.JsonReader({
            root: 'datos',
            totalProperty: 'total',
            id: 'id',
            fields: [{
                    name: 'param_menId',
                    type: 'number',
                    mapping: 'menId'
                }, {
                    name: 'param_menPadreId',
                    type: 'number',
                    mapping: 'menPadreId'
                }, {
                    name: 'param_menNombre',
                    type: 'string',
                    mapping: 'menNombre'
                }, {
                    name: 'param_menDescripcion',
                    type: 'string',
                    mapping: 'menDescripcion'
                }, {
                    name: 'param_menOrden',
                    type: 'number',
                    mapping: 'menOrden'
                }, {
                    name: 'param_menDraggable',
                    type: 'number',
                    mapping: 'menDraggable'
                }, {
                    name: 'param_menHidden',
                    type: 'number',
                    mapping: 'menHidden'
                }]
        })
    });
    storeMenu.load();
    
    var gridMenu = new Ext.grid.EditorGridPanel({
        store: storeMenu,
        autoScroll: true,
        border: false,
        height: 430,
        stripeRows: true,
        itemSelector: true,
        tbar: new Ext.Toolbar({
            border: true,
            buttons: [{
                    text: 'Menu',
                    tooltip: 'Crear Menu',
                    iconCls: 'add',
                    handler: function() {
                        crearMenu();
                        win.show();
                    }
                }]
        }),
        columns:
                [new Ext.grid.RowNumberer(), {
                        header: 'ID',
                        dataIndex: 'param_menId',
                        sortable: true,
                        width: 100
                    }, {
                        header: 'Padre',
                        dataIndex: 'param_menPadreId',
                        sortable: true,
                        width: 100,
                        editor: new Ext.form.NumberField({
                            allowNegative: false,
                            minValue: 0
                        })
                    }, {
                        header: 'Nombre',
                        dataIndex: 'param_menNombre',
                        sortable: true,
                        width: 200,
                        editor: new Ext.form.TextField({
                            allowBlank: true
                        })
                    }, {
                        header: 'Descripcion',
                        dataIndex: 'param_menDescripcion',
                        sortable: true,
                        width: 200,
                        editor: new Ext.form.TextField({})
                    }, {
                        header: 'Orden',
                        dataIndex: 'param_menOrden',
                        sortable: true,
                        width: 50,
                        editor: new Ext.form.NumberField({
                            allowNegative: false,
                            minValue: 0
                        })
                    }, {
                        header: 'Mover',
                        dataIndex: 'param_menDraggable',
                        sortable: true,
                        renderer: function(val)
                        {
                            if (val == '1')
                                return 'Si';
                            if (val == '0')
                                return 'No';
                        },
                        width: 50,
                        editor: new Ext.form.ComboBox({
                            id: 'menu_mover',
                            store: new Ext.data.SimpleStore({
                                fields: ['id', 'mover'],
                                data: [[1, 'Si'], [0, 'No']]
                            }),
                            mode: 'local',
                            displayField: 'mover',
                            valueField: 'id',
                            width: 100,
                            allowBlank: false,
                            triggerAction: 'all',
                            listeners: {
                                select: function(combo, record, index) {
                                    Ext.getCmp('menu_mover').setValue(combo.getValue());
                                }
                            }
                        })
                    }, {
                        header: 'Ocultar',
                        dataIndex: 'param_menHidden',
                        sortable: true,
                        renderer: function(val)
                        {
                            if (val == '1')
                                return 'Si';
                            if (val == '0')
                                return 'No';
                        },
                        width: 50,
                        editor: new Ext.form.ComboBox({
                            id: 'menu_ocultar',
                            store: new Ext.data.SimpleStore({
                                fields: ['id', 'ocultar'],
                                data: [[1, 'Si'], [0, 'No']]
                            }),
                            mode: 'local',
                            displayField: 'ocultar',
                            valueField: 'id',
                            width: 100,
                            allowBlank: false,
                            triggerAction: 'all',
                            listeners: {
                                select: function(combo, record, index) {
                                    Ext.getCmp('menu_ocultar').setValue(combo.getValue());
                                }
                            }
                        })
                    }]
    });
    gridMenu.on('afteredit', function(e) {
        var modified = gridMenu.getStore().getModifiedRecords();//step 1  
        if (!Ext.isEmpty(modified)) {
            var cpts = [];
            Ext.each(modified, function(record) { //step 2  
                cpts.push(record.data);
            });

            gridMenu.el.mask('Guardando…', 'x-mask-loading'); //step 3  
            gridMenu.stopEditing();

            cpts = Ext.encode(cpts); //step 4  

            Ext.Ajax.request({// step 5  
                url: 'controlador/tree.php',
                params: {
                    param_records: cpts,
                    param_opcion: 'actualizar1'
                },
                scope: this,
                success: function(response) { //step 6  
                    gridMenu.el.unmask();
                    gridMenu.getStore().commitChanges();
                }
            });
        }
    });
    function createMenu()
    {
        if (formRegistrarMenu.getForm().isValid())
        {
            Ext.Ajax.request({
                url: 'controlador/tree.php',
                params: {
                    param_opcion: "grabar",
                    param_menNombre: Ext.getCmp('param_menNombre').getValue(),
                    param_menPadreId: Ext.getCmp('param_menPadreId').getValue(),
                    param_menDescripcion: Ext.getCmp('param_menDescripcion').getValue(),
                    param_menDraggable: Ext.getCmp('param_menDraggable').getValue()
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
                                storeMenu.reload();
                                windowPopupMenu.close();
                                tree.root.reload();
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
    function createFormMenu()
    {
        var storeMenu2 = new Ext.data.Store({
        proxy: new Ext.data.HttpProxy({
            url: 'controlador/tree.php',
            method: 'POST'//por defecto
        }),
        baseParams: {
            param_opcion: 'listarTodos'
        },
        //mapping)en reader= recibe la info del modelo : ID
        //name(en reader) es reasignado : codigo
        //dataindex(en columnas) es igual al name para poner un header
        reader: new Ext.data.JsonReader({
            root: 'datos',
            totalProperty: 'total',
            id: 'id',
            fields: [{
                    name: 'param_menId2',
                    type: 'number',
                    mapping: 'menId'
                }, {
                    name: 'param_menPadreId2',
                    type: 'number',
                    mapping: 'menPadreId'
                }, {
                    name: 'param_menNombre2',
                    type: 'string',
                    mapping: 'menNombre'
                }, {
                    name: 'param_menDescripcion2',
                    type: 'string',
                    mapping: 'menDescripcion'
                }, {
                    name: 'param_menOrden2',
                    type: 'number',
                    mapping: 'menOrden'
                }, {
                    name: 'param_menDraggable2',
                    type: 'number',
                    mapping: 'menDraggable'
                }, {
                    name: 'param_menHidden2',
                    type: 'number',
                    mapping: 'menHidden'
                }]
        })
    });
    storeMenu2.load();
        
        formRegistrarMenu = new Ext.form.FormPanel({
            border: false,
            padding: '10px 10px 10px 10px',
            labelAlign: 'top',
            items: [new Ext.form.ComboBox({
                    id: 'param_menPadreId',
                    fieldLabel: 'Padre',
                    store: storeMenu2,
                    mode: 'local',
                    displayField: 'param_menNombre2',
                    valueField: 'param_menId2',
                    width: 300,
                    emptyText: 'Seleccionar..',
                    triggerAction: 'all',
                    listeners: {
                        select: function(combo, record, index) {
                            Ext.getCmp('param_menPadreId').setValue(combo.getValue());
                        }
                    }
                }), {
                    xtype: 'textfield',
                    fieldLabel: 'Menú <span style="color:red;font-weight:bold">*</span>',
                    id: 'param_menNombre',
                    allowBlank: false,
                    width: 300

                }, {
                    xtype: 'textarea',
                    fieldLabel: 'Descripción',
                    id: 'param_menDescripcion',
                    width: 300

                }, new Ext.form.ComboBox({
                    id: 'param_menDraggable',
                    fieldLabel: 'Mover',
                    store: new Ext.data.SimpleStore({
                        fields: ['id', 'mover'],
                        data: [['1', 'Si'], ['0', 'No']]
                    }),
                    mode: 'local',
                    displayField: 'mover',
                    valueField: 'id',
                    value: 0,
                    width: 100,
                    allowBlank: false,
                    triggerAction: 'all',
                    listeners: {
                        select: function(combo, record, index) {
                            Ext.getCmp('param_menDraggable').setValue(combo.getValue());
                        }
                    }
                })],
            buttons: [{
                    text: 'Grabar',
                    iconCls: 'aceptar',
                    handler: createMenu
                }, {
                    text: 'Cancelar',
                    iconCls: 'close',
                    handler: function() {
                        windowPopupMenu.close();
                    }
                }]
        });

        //Panel para el formulario
        var panelRegistrarMenu = new Ext.Panel({
            labelAlign: 'top',
            border: false,
            items: formRegistrarMenu
        });
        windowPopupMenu = new Ext.Window({
            title: 'Crear Menu',
            closable: false,
            modal: true,
            width: 350,
            items: panelRegistrarMenu
        });
    }

    function crearMenu()
    {
        tree = new Ext.tree.TreePanel({
            border: false,
            autoScroll: true,
            enableDD: true,
            rootVisible: false,
            loader: new Ext.tree.TreeLoader({
                dataUrl: 'controlador/tree.php',
                baseParams: {
                    param_opcion: 'listar'
                }
            }),
            root: new Ext.tree.AsyncTreeNode()
        });

        tree.on('movenode', function(tree, node, oldParent, newParent, index) {
            //save the new order 
            var nodes = [];
            newParent.eachChild(function(n) {
                nodes.push(n.attributes.id);        //Step 1  
            });
            tree.el.mask('Guardando…', 'x-mask-loading');  //Step 2  
            Ext.Ajax.request({
                url: 'controlador/tree.php', //Step 3  
                params: {//Step 4  
                    updateOrder: true,
                    parent: newParent.attributes.id,
                    nodes: nodes.join(','),
                    tipo: 'actualizar'
                },
                success: function() {
                    tree.el.unmask();       //Step 5  
                },
                failure: function() {
                    tree.el.unmask();       //Step 6  
                    Ext.Msg.alert('Error', 'Error saving the changes');
                }
            });
        });
        win = new Ext.Window({
            title: 'Menus',
            //            closable:false,
            autoScroll: true,
            modal: true,
            width: 500,
            height: 400,
            items: [new Ext.Toolbar({
                    border: true,
                    buttons: [
                        {
                            text: 'Menu',
                            tooltip: 'Crear Menu',
                            iconCls: 'add',
                            handler: function() {
                                createFormMenu();
                                windowPopupMenu.show();
                            }
                        }]
                }), new Ext.Panel({
                    layout: 'fit',
                    autoScroll: true,
                    border: false,
                    items: tree
                })]

        });

    }
    var panelMenu = new Ext.Panel({
//        layout:'fit',
        border: false,
        items: gridMenu
    });

    return panelMenu;
}
