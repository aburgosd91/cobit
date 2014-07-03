    
function getObjetivosGenerales(){
   var windowPopupEditObjGeneral;
   var formEditarObjGeneral;
   var windowPopupEditObjEspecifico;
   var formEditarObjEspecifico;
   var windowPopupObjEspecifico;
   var formRegistrarObjEspecifico;
   var idObj; 
   var form = new Ext.form.FormPanel({
    title: 'AGREGAR OBJETIVOS GENERALES',
    bodyStyle: 'padding:15px',
    layout:'form',
    id:'obgeneral',
    //defaultType: 'textfield',
    autoScroll:true,
    width:'98%',
    frame:true,
    items:[
        new Ext.Panel({
                //bodyStyle: 'padding:15px',
                layout:'form',
                id:'panelObjetivoGeneral',
                //defaultType: 'textfield',
                autoScroll:true,
                width:'98%',
                frame:true,
                items:[
                    new Ext.form.TextArea({
                    autoHeight:true,
                    fieldLabel:'Objetivo General',
                    //name: 'Item',
                    allowBlank:true,
                    id: 'obg',
                    width:'98%',
                    //layout:'fit',
                    defaultType: 'textfield'})
                    ]
            })],
    buttons: [
        {text: 'Agregar',
            iconCls: 'add',
            handler: function (){
                AddObjetivoGeneral();
                Ext.getCmp('obg').setValue('');
                Ext.getCmp('btnEspecificoAgregar').enable();
                Ext.getCmp('btnEspecificoCancel').enable();
            }
        },
        {text: 'Eliminar',
            iconCls:'delete',
            handler: function(){
                Ext.getCmp('btnEspecificoAgregar').disable();
                Ext.getCmp('btnEspecificoCancel').disable();
            }
        }
    ]});
    function AddObjetivoGeneral(){
            Ext.Ajax.request({
                url: 'Controlador/objetivoPrincipal.php',
                params: {
                    param_opcion:'agregarObjgeneral',
                    //param_idplan_auditoria: Ext.getCmp('param_idplan_auditoria').getValue(),
                    param_descripcion: Ext.getCmp('obg').getValue(),
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
                                storeObjPrincipal.reload();
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
    /*++++++++++++++++++++++++++++++++++++++++++GRID OBJETIVOS GENERALES+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
    
    var storeObjPrincipal = new Ext.data.Store({
        proxy: new Ext.data.HttpProxy({
            url: 'Controlador/objetivoPrincipal.php',
            method: 'POST'//por defecto
        }), baseParams: {
            param_opcion: 'listarObjgeneral',
            start: 0,
            limit: 10
        },
        reader: new Ext.data.JsonReader({
            root: 'datos',
            totalProperty: 'total',
            id: 'CodObjGeneral',
            fields:[{
                    name: 'param_idobgeneral',
                    type: 'number'
                    //mapping: 'CodCalzado'
                }, {
                    name: 'param_idplan_auditoria',
                    type: 'number'
                    //mapping: 'idModelo'
                }, {
                    name: 'param_descripcion',
                    type: 'string'
                    //mapping: 'idcolor'
                }]
        })
    });
    storeObjPrincipal.load();
    var gridObjPrincipal = new Ext.grid.GridPanel({
        store: storeObjPrincipal,
        border: true,
        stripeRows: true,
        itemSelector: true,
        height:300,
        tbar: new Ext.Toolbar({
            border: true,
            buttons: [{
                text:'Eliminar',
                tooltip:'Eliminar General',
                iconCls:'delete',
                id:'btneliminarGeneral',
                handler:function() {
                    //alert('Eliminar');
                    var rec=gridObjPrincipal.getSelectionModel().getSelected();
                    if(rec!=null){
                         eliminarObjGeneral(rec);
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
            store: storeObjPrincipal,
            displayInfo: true,
            autoWidth: true,
            beforePageText: 'Página',
            afterPageText: 'de {0}',
            displayMsg: '{0} - {1} de {2} Objetivos Generales',
            emptyMsg: 'No hay Objetivos Generales para mostrar',
            pageSize: 10
        }),
        columns:
                [new Ext.grid.RowNumberer(), 
                    {
                        header: 'Objetivo General',
                        dataIndex: 'param_descripcion',
                        sortable: true,
                        width:900
                    },{
                        xtype: 'actioncolumn',
                        header: '<span style="color:red;font-weight:bold">Editar</span>',
                        width: 50,
                        tooltip: 'Editar',
                        icon: 'img/edit.png',
                        handler: function(gridObjPrincipal, rowIndex, colIndex) {
                            var rec = storeObjPrincipal.getAt(rowIndex);
                            //var rec=gridCalzado.getSelectionModel().getSelected();
                            editFormObjGeneral();
                            Ext.getCmp('paramed_idobgeneral').setValue(rec.get('param_idobgeneral'));
//                            Ext.getCmp('paramed_idplan_auditoria').setValue(rec.get('param_idplan_auditoria'));
                            Ext.getCmp('paramed_descripcion').setValue(rec.get('param_descripcion'));
                            windowPopupEditObjGeneral.show();
                        }
                    },{
                        xtype: 'actioncolumn',
                        header: '<span style="color:Black;font-weight:bold">ObjEsp</span>',
                        width: 50,
                        tooltip: 'Objetivos Especificos',
                        icon: 'img/application_form_magnify.png',
                        handler: function(gridObjPrincipal, rowIndex, colIndex) {
                            var rec = storeObjPrincipal.getAt(rowIndex);
                            idObj=rec.get('param_idobgeneral');
                            storeObjEspecifico.load({
                                params: {
                                    param_idobgeneral:idObj
                                }
                            });
                            winEspecifico.show();
                        }
                    }],
        plugins: [
            new Ext.ux.grid.Search({
                position: 'top',
                store: storeObjPrincipal,
                params: {param_opcion: 'listarObjgeneral', start: 0, limit: 10},
                width: 200,
                handler:function(){storeObjPrincipal.load()}
            })]
    });

    function updateObjGeneral(){
        if (formEditarObjGeneral.getForm().isValid()){
            Ext.Ajax.request({
                url: 'Controlador/objetivoPrincipal.php',
                params: {
                    param_opcion:'actualizarObjgeneral',
                    param_idobgeneral: Ext.getCmp('paramed_idobgeneral').getValue(),
//                    param_idplan_auditoria: Ext.getCmp('paramed_idplan_auditoria').getValue() ,
                    param_descripcion: Ext.getCmp('paramed_descripcion').getValue(),
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
                                storeObjPrincipal.reload();
                                windowPopupEditObjGeneral.close();
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
    function editFormObjGeneral(){
        //formulario Editar
          formEditarObjGeneral = new Ext.form.FormPanel({
            border: false,
            padding: '10px 10px 10px 10px',
            labelAlign: 'top',
            items: [{
                    xtype: 'hidden',
                    fieldLabel: 'Codigo <span style="color:red;font-weight:bold">*</span>',
                    id: 'paramed_idobgeneral',
                    allowBlank: false,
                    width: 300
                },{
                    xtype: 'textarea',
                    fieldLabel: 'Descripción <span style="color:red;font-weight:bold">*</span>',
                    id: 'paramed_descripcion',
                    allowBlank: false,
                    width: 300
                }],
                buttons:[{
                    text: 'Grabar',
                    iconCls: 'aceptar',
                    handler: function (){
                            //alert("msj1");
                            updateObjGeneral();
                        }
                    }, {
                    text: 'Cancelar',
                    iconCls: 'close',
                    handler: function(){
                        windowPopupEditObjGeneral.close();
                    }
                }]
        });
        //Panel para el formulario
        var panelEditarObjGeneral = new Ext.Panel({
            labelAlign: 'top',
            border: false,
            items:formEditarObjGeneral
        });
        windowPopupEditObjGeneral = new Ext.Window({
            title: 'Editar Objetivo General',
            closeAction: 'hide',
            closable: false,
            modal: true,
            width: 350,
            items:panelEditarObjGeneral
        });

   }
   function eliminarObjGeneral(rec){
            Ext.Ajax.request({   
            url: 'Controlador/objetivoPrincipal.php',
            params: {
                param_opcion: "eliminarObjgeneral",
                param_idobgeneral:rec.get("param_idobgeneral")
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
                            storeObjPrincipal.reload();
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
    /*++++++++++++++++++++++++++++++++++++++++++++++++Objetivo Especifico++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
    var storeObjEspecifico = new Ext.data.Store({
        proxy: new Ext.data.HttpProxy({
            url: 'Controlador/objetivoSecundario.php',
            method: 'POST'//por defecto
        }), baseParams: {
            param_opcion: 'listarObjespecifico',
            start: 0,
            limit: 10
        },
        reader: new Ext.data.JsonReader({
            root: 'datos',
            totalProperty: 'total',
            id: 'CodObjEspecifico',
            fields:[{
                    name: 'param_idobespecifico',
                    type: 'number'
                    
                    //mapping: 'CodCalzado'
                }, {
                    name: 'param_idobgeneral',
                    type: 'number'
                    //mapping: 'idModelo'
                }, {
                    name: 'param_descripcionE',
                    type: 'string'
                    //mapping: 'idcolor'
                }]
        })
    });
    storeObjEspecifico.load();
    var dstoreObjGeneral = new Ext.data.Store({
        proxy: new Ext.data.HttpProxy({
            url: 'Controlador/ObjetivoPrincipal.php',
            method: 'POST'//por defecto
        }),
        baseParams:{
            param_opcion: 'objetivogeneral'
        },
        reader: new Ext.data.JsonReader({
            root: 'datos',
            totalProperty: 'total',
            id:'ComboObjGeneral',
            fields:['valor','descripcion']
        })
    });
    dstoreObjGeneral.load();
    var gridObjSecundario = new Ext.grid.GridPanel({
        store: storeObjEspecifico,
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
                        createFormObjEspecifico();                
                        windowPopupObjEspecifico.show();
                    }
                },'-',{
                text:'Eliminar',
                tooltip:'Eliminar Objetivo Especifico',
                iconCls:'delete',
                id:'btneliminarEspecifico',
                handler:function() {
                    var rec=gridObjSecundario.getSelectionModel().getSelected();
                    if(rec!=null){
                        eliminarObjEspecifico(rec);
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
            store: storeObjEspecifico,
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
                        header: 'Objetivo Especifico',
                        dataIndex: 'param_descripcionE',
                        sortable: true,
                        width:900
                    },{
                        xtype: 'actioncolumn',
                        header: '<span style="color:red;font-weight:bold">Editar</span>',
                        width: 50,
                        tooltip: 'Editar',
                        icon: 'img/edit.png',
                        handler: function(gridObjSecundario, rowIndex, colIndex) {
                            var rec = storeObjEspecifico.getAt(rowIndex);
                            //var rec=gridCalzado.getSelectionModel().getSelected();
                            editFormObjEspecifico();
                            Ext.getCmp('paramed_idobespecifico').setValue(rec.get('param_idobespecifico'));
//                            Ext.getCmp('paramed_idplan_auditoria').setValue(rec.get('param_idplan_auditoria'));
                            Ext.getCmp('paramed_descripcionE').setValue(rec.get('param_descripcionE'));
                            windowPopupEditObjEspecifico.show();
                        }
                    }],
        plugins: [
            new Ext.ux.grid.Search({
                position: 'top',
                store: storeObjEspecifico,
                params: {param_opcion: 'listarObjespecifico', start: 0, limit: 10},
                width: 200,
                handler:function(){storeObjEspecifico.load()}
            })]
    });
    function createObjEspecifico(){

        if (formRegistrarObjEspecifico.getForm().isValid())
        {
            Ext.Ajax.request({
                url: 'controlador/ObjetivoSecundario.php',
                params: {
                    param_opcion:'agregarObjespecifico',
                    param_idobgeneral: Ext.getCmp('paramcr_idobgeneral').getValue(),
                    param_descripcionE: Ext.getCmp('paramcr_descripcionE').getValue()
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
                                storeObjEspecifico.reload();
                                windowPopupObjEspecifico.close();
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
                                storeObjEspecifico.reload();
                                windowPopupEditObjEspecifico.close();
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
    function createFormObjEspecifico(){ 
        formRegistrarObjEspecifico=new Ext.form.FormPanel({
            border: false,
            padding: '10px 10px 10px 10px',
            labelAlign: 'top',
            items: [{
                    xtype: 'combo',
                    fieldLabel: 'Codigo Obj General<span style="color:red;font-weight:bold">*</span>',
                    id: 'paramcr_idobgeneral',
                    allowBlank: false,
                    width: 300,
                    store:dstoreObjGeneral,
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
                    fieldLabel: 'Descripción <span style="color:red;font-weight:bold">*</span>',
                    id: 'paramcr_descripcionE',
                    allowBlank: false,
                    width: 300
                }],
                buttons:[{
                    text: 'Grabar',
                    iconCls: 'aceptar',
                    handler: function (){
                            //alert(Ext.getCmp('paramed_genero').getValue());
                            createObjEspecifico();
                        }
                    }, {
                    text: 'Cancelar',
                    iconCls: 'close',
                    handler: function(){
                        windowPopupObjEspecifico.close();
                    }
                }]
        });
        //Panel para el formulario
        var panelRegistrarObjEspecifico = new Ext.Panel({
            labelAlign: 'top',
            border: false,
            items: formRegistrarObjEspecifico
        });
        windowPopupObjEspecifico = new Ext.Window({
            title: 'Registrar Objetivo Especifico',
            closable: false,
            modal: true,
            width: 350,
            items: panelRegistrarObjEspecifico
        });
    }
    function updateObjEspecifico(){
        if (formEditarObjEspecifico.getForm().isValid()){
            Ext.Ajax.request({
                url: 'Controlador/objetivoSecundario.php',
                params: {
                    param_opcion:'actualizarObjespecifico',
                    param_idobespecifico: Ext.getCmp('paramed_idobespecifico').getValue(),
//                    param_idplan_auditoria: Ext.getCmp('paramed_idplan_auditoria').getValue() ,
                    param_descripcionE: Ext.getCmp('paramed_descripcionE').getValue(),
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
                                storeObjEspecifico.reload();
                                windowPopupEditObjEspecifico.close();
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
    function editFormObjEspecifico(){
        //formulario Editar
          formEditarObjEspecifico = new Ext.form.FormPanel({
            border: false,
            padding: '10px 10px 10px 10px',
            labelAlign: 'top',
            items: [{
                    xtype: 'hidden',
                    fieldLabel: 'Codigo <span style="color:red;font-weight:bold">*</span>',
                    id: 'paramed_idobespecifico',
                    allowBlank: false,
                    width: 300
                },{
                    xtype: 'textarea',
                    fieldLabel: 'Descripción <span style="color:red;font-weight:bold">*</span>',
                    id: 'paramed_descripcionE',
                    allowBlank: false,
                    width: 300
                }],
                buttons:[{
                    text: 'Grabar',
                    iconCls: 'aceptar',
                    handler: function (){
                            //alert("msj1");
                            updateObjEspecifico();
                        }
                    }, {
                    text: 'Cancelar',
                    iconCls: 'close',
                    handler: function(){
                        windowPopupEditObjEspecifico.close();
                    }
                }]
        });
        //Panel para el formulario
        var panelEditarObjEspecifico = new Ext.Panel({
            labelAlign: 'top',
            border: false,
            items:formEditarObjEspecifico
        });
        windowPopupEditObjEspecifico = new Ext.Window({
            title: 'Editar Objetivo General',
            closeAction: 'hide',
            closable: false,
            modal: true,
            width: 350,
            items:panelEditarObjEspecifico
        });

   }
   function eliminarObjEspecifico(rec){
            Ext.Ajax.request({   
            url: 'controlador/ObjetivoSecundario.php',
            params: {
                param_opcion: "eliminarObjespecifico",
                param_idobespecifico:rec.get("param_idobespecifico")
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
                            storeObjEspecifico.reload();
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
   var winEspecifico = new Ext.Window({
        layout:'fit',
        //id:'winObjEsp',
        border:true,
        bodyStyle:'padding:10px 10px 0',
        labelAlign:'top',
        msgTarget: 'side',
        closeAction:'hide',
        modal:true,
        autoScroll:true,
        items:[gridObjSecundario]
    });
    /*++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
    var formGrid = new Ext.form.FormPanel({
    title: 'PANEL OBJETIVO PRINCIPAL',
    bodyStyle: 'padding:15px',
    layout:'form',
    id:'formGrid',
    //defaultType: 'textfield',
    autoScroll:true,
    width:'98%',
    frame:true,
    items:[gridObjPrincipal]
    });
    var objGeneral = new Ext.Panel({
        labelAlign: 'top',
        //frame:true,
        layaout:'form',
        //title: 'GIRO DE NEGOCIO',
        bodyStyle:'padding:5px 5px 5px 5px',
        autoWidth: true,
        height:600,
        autoScroll:true, 
        items: [form,formGrid]
    });
    return objGeneral;
}
    
    