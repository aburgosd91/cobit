function getMarconormativo(){
    var gridInternacional = new Ext.grid.EditorGridPanel({
        //store: storeMenu,
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
//                        crearMenu();
//                        win.show();
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
                        header: 'Marco',
                        dataIndex: 'param_marco',
                        sortable: true,
                        width: 100,
                        editor: new Ext.form.NumberField({
                            allowNegative: false,
                            minValue: 0
                        })
                    }, {
                        header: 'Marco Nomrativo',
                        dataIndex: 'param_marco',
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
    var gridNacional = new Ext.grid.EditorGridPanel({
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
//                        crearMenu();
//                        win.show();
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
    var gridInstitucional = new Ext.grid.EditorGridPanel({
        //store: storeMenu,
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
//                        crearMenu();
//                        win.show();
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
     var panelMenu = new Ext.Panel({
//        layout:'fit',
        border: false,
        items: gridInternacional
    });
    return panelMenu;
}

