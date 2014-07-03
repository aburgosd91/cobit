
function getPrueba(){
    var  file='';
    var msg = function(title, msg){
        Ext.Msg.show({
            title: title,
            msg: msg,
            minWidth: 200,
            modal: true,
            icon: Ext.Msg.INFO,
            id:'msj-archivo',
            buttons: Ext.Msg.OK
        });
    };

    var fp = new Ext.FormPanel({
        //renderTo: Ext.getBody(),
        fileUpload: true,
        frame: true,
        title: 'File Upload Form',
        autoHeight: true,
        bodyStyle: 'padding: 10px 10px 0 10px;',
        labelWidth: 50,
        id:'panel-file',
        defaults: {
            anchor: '95%',
            allowBlank: false,
            msgTarget: 'side'
        },
        items: [{
            xtype: 'fileuploadfield',
            emptyText: 'Select Archivo PDF',
            fieldLabel: 'Archivo',
            name: 'archivito',
            buttonText: '',
            buttonCfg: {
                iconCls: 'upload-icon'
            }
        }],
        buttons: [{
            text: 'Save',
            id:'boton-file-save',
            handler: function(){
                if(fp.getForm().isValid()){
	                fp.getForm().submit({
	                    url:'Controlador/file-upload.php',
	                    waitMsg: 'Uploading your photo...',
	                    success: function(fp, o){
	                        msg('Success', 'Processed file "'+o.result.file+'" on the server');
                                file=o.result.file;
                                paneMostrar.autoLoad = {
                                    url : 'http://localhost:50/web/Cobit/Vistas/pdf.php?cadena='+file
                                };
                                paneMostrar.doAutoLoad();
	                    }
	                });
                }
            }
        },{
            text: 'Reset',
            id:'boton-file-reset',
            handler: function(){
                fp.getForm().reset();
            }
        }]
    });
    var paneMostrar=getmostrar(file);
    var panelM = new Ext.Panel({
        //renderTo: 'fi-form',
//        fileUpload: true,
        frame: true,
        title: 'Subir archivos',
        layout:'fit',
        autoScroll:true,
        autoHeight: true,
        id:'panel-prueba',
        bodyStyle: 'padding: 10px 10px 0 10px;',
        labelWidth: 50,
        items:[fp,paneMostrar]
    });
    return panelM;
}
