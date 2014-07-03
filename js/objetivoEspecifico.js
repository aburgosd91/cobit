
function getObjetivoEspecifico(){
   var contE=1;
   var cad="";
   var formE = new Ext.form.FormPanel({
    title: 'OBJETIVO ESPECÍFICO',
    bodyStyle: 'padding:15px',
    layout:'form',
    id:'fe',
    defaultType: 'textfield',
    autoScroll:true,
    width:'98%',
    frame:true,
    style: {
            background: '#FFFFFF',
            //marginBottom: '10px'
        },
    buttons: [
        {text: 'Agregar',
            iconCls: 'add',
            handler: function (){
                    cad="Objetivo Específico N°"+(contE);
                    contE+=1;
                    Ext.getCmp('fe').add(new Ext.form.TextArea({
                        autoHeight: true,
                        fieldLabel: cad,
                        //name: 'Item',
                        allowBlank:true,
                        id: 'estE'+contE,
                        width:'98%',
                        //layout:'fit',
                        defaultType: 'textfield'}));
                    Ext.getCmp('fe').doLayout();
                    
            }
        },
        {text: 'Eliminar',
            iconCls:'delete',
            handler: function(){
                if(contE>=1){
                    var cmp = Ext.getCmp('estE' + contE);
                    contE-=1;
                    Ext.getCmp('fe').remove(cmp, true); // True is the autoDestroy option.
                    Ext.getCmp('fe').doLayout(); 
                }
                else
                    alert('No se puede eliminar...');
            }
        }
    ]});
    var direc = new Ext.Panel({
        labelAlign: 'top',
        //frame:true,
        layaout:'form',
        //title: 'GIRO DE NEGOCIO',
        bodyStyle:'padding:5px 5px 5px 5px',
        width: 600,
        height:300,
        autoScroll:true, 
        items: [formE],
        buttons: [{
            text: 'Save',
            iconCls: 'aceptar',
            buttonAlign:'center',
            handler: function (){
                
            }
        },{
            text: 'Cancel',
            iconCls: 'close',
            buttonAlign:'center',
            handler: function (){
                    
            }
        }]
    });
    return direc;
}
    
    