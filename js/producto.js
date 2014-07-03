function getProducto() {
    var windowPopupProducto;
    var windowPopupEditProducto;
    var formRegistrarProducto;
    var formEditarProducto;
    
    ///Principales    
    var storeProducto = new Ext.data.Store({
        proxy: new Ext.data.HttpProxy({
            url: 'controlador/productos.php',
            method: 'POST'//por defecto
        }), baseParams: {
            param_opcion: '',
            start: 0,
            limit: 10
        },
        reader: new Ext.data.JsonReader({
            root: 'datos',
            totalProperty: 'total',
            id: 'param_proId',
            fields:[{
                    name: 'param_proId',
                    type: 'number'
                    //mapping: 'CodCalzado'
                }, {
                    name: 'param_proNombre',
                    type: 'string'
                    //mapping: 'idModelo'
                }, {
                    name: 'param_proCodigo',
                    type: 'string'
                    //mapping: 'talla'
                }, {
                    name: 'param_tienda',
                    type: 'string'
                    //mapping: 'tipo'
                }, {
                    name: 'param_proPrecio',
                    type: 'number'
                    //mapping: 'genero'
                },{
                    name:'param_proCantidad',
                    type:'number'
                },{
                    name:'idTienda',
                    type:'number'
                },{
                    name:'activo',
                    type:'string'
                }]
        })
    });
        storeProducto.load();
////Color
//    var dstoreColor = new Ext.data.Store({
//        proxy: new Ext.data.HttpProxy({
//            url: 'controlador/calzado.php',
//            method: 'POST'//por defecto
//        }),
//        baseParams:{
//            param_opcion: 'color'
//        },
//        reader: new Ext.data.JsonReader({
//            root: 'datos',
//            totalProperty: 'total',
//            id:'param_idcolor',
//            fields:['valor', 'descripcion']
//        })
//    });
//    dstoreColor.load();
//Modelo
//    var dstoreTienda = new Ext.data.Store({
//        proxy: new Ext.data.HttpProxy({
//            url: 'controlador/producto.php',
//            method: 'POST'//por defecto
//        }),
//        baseParams:{
//            param_opcion: 'tienda'
//        },
//        reader: new Ext.data.JsonReader({
//            root: 'datos',
//            totalProperty: 'total',
//            id:'param_tieId',
//            fields:['valor', 'descripcion']
//        })
//    });
//    dstoreTienda.load();
    ///Grid
    var gridProducto = new Ext.grid.GridPanel({
        store: storeProducto,
        id:'gridProducto',
        border: false,
        stripeRows: true,
        itemSelector: true,
        height:100,
        tbar: new Ext.Toolbar({
            border: true,
            buttons: [{
                    text: 'Producto',
                    tooltip: 'Crear Producto',
                    iconCls: 'add',
                    handler: function() {
                        createFormProducto();                
                        windowPopupProducto.show();
                    }
                },'-',{
                text:'Eliminar',
                tooltip:'Eliminar Producto',
                iconCls:'delete',
//                handler:function() {
//                    var rec=gridProducto.getSelectionModel().getSelected();
//                    if(rec!=null){
////                        eliminarProducto(rec);
//                    }
//                    else{
//                        Ext.Msg.show({
//                            title:'Mensaje',
//                            msg: 'Seleccione una fila',
//                            buttons: Ext.Msg.OK,
//                            icon: Ext.MessageBox.WARNING
//                        });
//                    }
//                }
            }]
        }),
//        bbar: new Ext.PagingToolbar({
//            //store: storeProducto,
//            displayInfo: true,
//            autoWidth: true,
//            beforePageText: 'Página',
//            afterPageText: 'de {0}',
//            displayMsg: '{0} - {1} de {2} Productos',
//            emptyMsg: 'No hay Productos para mostrar',
//            pageSize: 10
//        }),
        columns:

                [new Ext.grid.RowNumberer(), {
                        header: 'Codigo',
                        dataIndex: 'param_proId',
                        sortable: true,
                        width: 500
                    }, {
                        header: 'Descripción',
                        dataIndex: 'param_proNombre',
                        sortable: true,
                        width: 200
                    }, {
                        header: 'Codigo Barra',
                        dataIndex: 'param_proCodigo',
                        sortable: true,
                        width: 200
                    }, {
                        header: 'Tienda',
                        dataIndex: 'param_tienda',
                        sortable: true,
                        width: 80
                    }, {
                        header: 'Precio',
                        dataIndex: 'param_proPrecio',
                        sortable: true,
                        width: 80
                    }, {
                        header: 'Stock',
                        dataIndex: 'param_proCantidad',
                        sortable: true,
                        width: 80
                    },{
                        header: 'Activo',
                        dataIndex: 'activo',
//                        renderer:function(val){
//                            if (val == 1) {
//                                return '<center><img src="img/activo.png"/></center>';
//                            } else if (val ==0) {
//                                return '<center><img src="img/inactivo.png"/></center>';
//                            }
//                            return val;
//                        },
                        width:80,
                        sortable:true
                    },
//                    {
//                        xtype: 'actioncolumn',
//                        header: '<span style="color:red;font-weight:bold">Editar</span>',
//                        width: 50,
//                        tooltip: 'Editar',
//                        icon: 'img/edit.png',
////                        handler: function(gridProducto, rowIndex, colIndex) {
////                            //var rec = storeProducto.getAt(rowIndex);
////                            //var rec=gridCalzado.getSelectionModel().getSelected();
////                            editFormProducto();
////                            Ext.getCmp('paramed_proId').setValue(rec.get('param_proId'));
////                            Ext.getCmp('paramed_proNombre').setValue(rec.get('param_proNombre'));
////                            Ext.getCmp('paramed_proCodigo').setValue(rec.get('param_proCodigo'));
////                            Ext.getCmp('paramed_tienda').setValue(rec.get('param_tienda'));
////                            Ext.getCmp('paramed_proPrecio').setValue(rec.get('param_proPrecio'));
////                            Ext.getCmp('paramed_proCantidad').setValue(rec.get('param_proCantidad'));
////                            windowPopupEditProducto.show();
////                        }
//                    }
                ],
//        plugins: [
//            new Ext.ux.grid.Search({
//                position: 'top',
//                //store: storeProducto,
//                params: {param_opcion: 'opc_listar', start: 0, limit: 10},
//                width: 200,
//                handler:function(){
//                    //storeProducto.load()
//                }
//            })]
    });
//    function createProducto(){
//
//        if (formRegistrarProducto.getForm().isValid())
//        {
//            Ext.Ajax.request({
//                url: 'controlador/producto.php',
//                params: {
//                    param_opcion:'grabar',
//                    param_proId: Ext.getCmp('paramcr_proId').getValue(),
//                    param_proNombre: Ext.getCmp('paramcr_proNombre').getValue(),
//                    param_proCodigo: Ext.getCmp('paramcr_proCodigo').getValue(),
//                    param_tienda: Ext.getCmp('paramcr_tienda').getValue(),
//                    param_proPrecio:Ext.getCmp('paramcr_proPrecio').getValue(),
//                    param_proCantidad:Ext.getCmp('paramcr_proCantidad').getValue()
//                },
//                success: function(response) {
//                    var data = eval(response.responseText);
//                    if (data===1)
//                    {
//                        Ext.Msg.show({
//                            title: 'Mensaje',
//                            msg: 'Guardado Correcto...',
//                            buttons: Ext.Msg.OK,
//                            icon: Ext.MessageBox.INFO,
////                            fn: function() {
////                                storeProducto.reload();
////                                windowPopupProducto.close();
////                            }
//                        });
//                    }
//                    if (data===0)
//                    {
//                        Ext.Msg.show({
//                            title: 'Error',
//                            msg: 'Error en Operación...',
//                            buttons: Ext.Msg.OK,
//                            icon: Ext.MessageBox.ERROR,
////                            fn: function() {
////                                //storeProducto.reload();
////                                windowPopupEditProducto.close();
////                            }
//                        });
//                     }
//                },
//                failure: function(response) {
//                    var result = eval(response.responseText);
//                    Ext.Msg.show({
//                        title: 'Error',
//                        msg: 'Error al conectar a la base de datos. Intente mas tarde',
//                        buttons: Ext.Msg.OK,
//                        icon: Ext.MessageBox.ERROR
//                    });
//                }
//            });
//        }
//        else
//        {
//            Ext.Msg.show({
//                title: 'Advertencia',
//                msg: 'Ingrese Datos',
//                buttons: Ext.Msg.OK,
//                icon: Ext.MessageBox.WARNING
//            });
//        }
//    }
    
    var panelRegistrarProducto = new Ext.Panel({
            labelAlign: 'top',
            border: false,
            items: formRegistrarProducto
        });

//fomulario Registrar
    function createFormProducto(){ 
        formRegistrarProducto=new Ext.form.FormPanel({
            border: false,
            padding: '10px 10px 10px 10px',
            labelAlign: 'top',
            items: [{
                    xtype: 'numberfield',
                    fieldLabel: 'Id. Producto <span style="color:red;font-weight:bold">*</span>',
                    id: 'paramcr_proId',
                    allowBlank: false,
                    width: 300
                },{
                    xtype: 'combo',
                    fieldLabel: 'Tienda <span style="color:red;font-weight:bold">*</span>',
                    id: 'paramcr_tienda',
                    allowBlank: false,
                    width: 300,
                    //store:dstoreTienda,
                    valueField: 'valor',
                    displayField: 'descripcion',
                    typeAhead: true,
                    mode: 'remote',
                    triggerAction: 'all',
                    emptyText: 'Seleccione..',
                    editable: false,
                    selectOnFocus: true
                    
                },{
                    xtype: 'textfield',
                    fieldLabel: 'Descripción <span style="color:red;font-weight:bold">*</span>',
                    id: 'paramcr_proNombre',
                    allowBlank: false,
                    width: 300
                },{
                    xtype: 'textfield',
                    fieldLabel: 'Codigo Barra <span style="color:red;font-weight:bold">*</span>',
                    id: 'paramcr_proCodigo',
                    allowBlank: false,
                    width: 300
                },{
                    xtype: 'numberfield',
                    fieldLabel: 'Precio Unitario(S./) <span style="color:red;font-weight:bold">*</span>',
                    id: 'paramcr_proPrecio',
                    allowBlank: false,
                    width: 300
                },{
                    xtype: 'numberfield',
                    fieldLabel: 'Stock <span style="color:red;font-weight:bold">*</span>',
                    id: 'paramcr_proCantidad',
                    allowBlank: false,
                    width: 300
                }],
                buttons:[{
                    text: 'Grabar',
                    iconCls: 'aceptar',
                    handler: function (){
                            //alert(Ext.getCmp('paramed_genero').getValue());
                            createProducto();
                        }
                    }, {
                    text: 'Cancelar',
                    iconCls: 'close',
                    handler: function(){
                        windowPopupProducto.close();
                    }
                }]
        });
        //Panel para el formulario
        var panelRegistrarProducto = new Ext.Panel({
            labelAlign: 'top',
            border: false,
            items: formRegistrarProducto
        });
        windowPopupProducto = new Ext.Window({
            title: 'Registrar Producto',
            closable: false,
            modal: true,
            width: 350,
            items: panelRegistrarProducto
        });
    }
////    
//    function updateProducto(){
//        if (formEditarProducto.getForm().isValid()){
//            Ext.Ajax.request({
//                url: 'controlador/producto.php',
//                params: {
//                    param_opcion:'actualizar',
//                    param_proId: Ext.getCmp('paramed_proId').getValue(),
//                    param_proNombre: Ext.getCmp('paramed_proNombre').getValue(),
//                    param_proCodigo: Ext.getCmp('paramed_proCodigo').getValue(),
//                    param_tienda: Ext.getCmp('paramed_tienda').getValue(),
//                    param_proPrecio:Ext.getCmp('paramed_proPrecio').getValue(),
//                    param_proCantidad:Ext.getCmp('paramed_proCantidad').getValue()
//
//                },
//                success: function(response) {
//                    var data = eval(response.responseText);
//                    if (data===1)
//                    {
//                        Ext.Msg.show({
//                            title: 'Mensaje',
//                            msg: 'Actualización Correcta...',
//                            buttons: Ext.Msg.OK,
//                            icon: Ext.MessageBox.INFO,
//                            fn: function() {
//                                //storeProducto.reload();
//                                windowPopupEditProducto.close();
//                            }
//                        });
//                    }
//                    if (data===0)
//                    {
//                        Ext.Msg.show({
//                            title: 'Error',
//                            msg: data.errors.reason,
//                            buttons: Ext.Msg.OK,
//                            icon: Ext.MessageBox.ERROR
//                        });
//                    }
//
//                },
//                failure: function(response) {
//                    var result = eval(response.responseText);
//                    Ext.Msg.show({
//                        title: 'Error',
//                        msg: 'Error al conectar a la base de datos. Intente mas tarde',
//                        buttons: Ext.Msg.OK,
//                        icon: Ext.MessageBox.ERROR
//                    });
//                }
//            });
//        }
//        else
//        {
//            Ext.Msg.show({
//                title: 'Advertencia',
//                msg: 'Ingrese Datos',
//                buttons: Ext.Msg.OK,
//                icon: Ext.MessageBox.WARNING
//            });
//        }
//    }
//    
//    function editFormProducto(){
//        //formulario Editar
//          formEditarProducto = new Ext.form.FormPanel({
//            border: false,
//            padding: '10px 10px 10px 10px',
//            labelAlign: 'top',
//            items: [{
//                    xtype: 'textfield',
//                    fieldLabel: 'Id. Producto <span style="color:red;font-weight:bold">*</span>',
//                    id: 'paramed_proId',
//                    allowBlank: false,
//                    width: 300
//                },{
//                    xtype: 'combo',
//                    fieldLabel: 'Descripción <span style="color:red;font-weight:bold">*</span>',
//                    id: 'paramed_tienda',
//                    allowBlank: false,
//                    width: 300,
//                    //store:dstoreTienda,
//                    valueField: 'valor',
//                    displayField: 'descripcion',
//                    typeAhead: true,
//                    mode: 'remote',
//                    triggerAction: 'all',
//                    emptyText: 'Seleccione..',
//                    editable: false,
//                    selectOnFocus: true
//                    
//                },{
//                    xtype: 'textfield',
//                    fieldLabel: 'Descripción <span style="color:red;font-weight:bold">*</span>',
//                    id: 'paramed_proNombre',
//                    allowBlank: false,
//                    width: 300
//                },{
//                    xtype: 'textfield',
//                    fieldLabel: 'Codigo Barra <span style="color:red;font-weight:bold">*</span>',
//                    id: 'paramed_proCodigo',
//                    allowBlank: false,
//                    width: 300
//                },{
//                    xtype: 'textfield',
//                    fieldLabel: 'Precio Unitario(S./) <span style="color:red;font-weight:bold">*</span>',
//                    id: 'paramed_proPrecio',
//                    allowBlank: false,
//                    width: 300
//                },{
//                    xtype: 'textfield',
//                    fieldLabel: 'Stock <span style="color:red;font-weight:bold">*</span>',
//                    id: 'paramed_proCantidad',
//                    allowBlank: false,
//                    width: 300
//                }],
//                buttons:[{
//                    text: 'Grabar',
//                    iconCls: 'aceptar',
//                    handler: function (){
//                            //alert("msj1");
//                            updateProducto();
//                        }
//                    }, {
//                    text: 'Cancelar',
//                    iconCls: 'close',
//                    handler: function(){
//                        windowPopupEditProducto.close();
//                    }
//                }]
//        });
//        //Panel para el formulario
//        var panelEditarProducto = new Ext.Panel({
//            labelAlign: 'top',
//            border: false,
//            items:formEditarProducto
//        });
//        windowPopupEditProducto = new Ext.Window({
//            title: 'Editar Calzado',
//            closeAction: 'hide',
//            closable: false,
//            modal: true,
//            width: 350,
//            items:panelEditarProducto
//        });
//
//   } 
//   function eliminarProducto(rec){
//            Ext.Ajax.request({   
//            url: 'controlador/producto.php',
//            params: {
//                param_opcion: "drop",
//                param_proId:rec.get("param_proId")
//            },
//            success: function(response) {
//                var data = eval(response.responseText);
//                if (data===1)
//                {
//                    Ext.Msg.show({
//                        title: 'Mensaje',
//                        msg: 'Eliminación Exitosa...',
//                        buttons: Ext.Msg.OK,
//                        icon: Ext.MessageBox.INFO,
//                        fn: function() {
//                            //storeProducto.reload();
//                        }
//                    });
//                }
//                if (data===0)
//                {
//                    Ext.Msg.show({
//                        title: 'Error en Eliminación...',
//                        msg: data.errors.reason,
//                        buttons: Ext.Msg.OK,
//                        icon: Ext.MessageBox.ERROR
//                    });
//                }
//
//            },
//            failure: function(response) {
//                Ext.Msg.show({
//                    title: 'Error',
//                    msg: 'Error al conectar a la base de datos. Intente mas tarde',
//                    buttons: Ext.Msg.OK,
//                    icon: Ext.MessageBox.ERROR
//                });
//            }               
//        });
//    }
    var panelMantenedorProducto = new Ext.Panel({
        layout: 'fit',
        height: 600,
        border: false,
        autoSroll: true,
        items: gridProducto
    });
    return panelMantenedorProducto;
}
