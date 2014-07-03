/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


Ext.onReady(function(){
    Ext.QuickTips.init();
    var formLogin = new Ext.form.FormPanel({
        method:'POST',
        border:false,
        padding:'4px 4px 4px 4px',
        labelAlign:'top',
        items:[{
            xtype:'fieldset',
            paddings:'10 10 10 10',
            title:'Datos de Usuario',
            layout:'column',
            items:[new Ext.Panel({
                border:false,
                layout:'form',
                items:[{
                    xtype:'textfield',
                    fieldLabel: 'Usuario <span style="color:red;font-weight:bold">*</span>',
                    id: 'cmp_usuUsuario',
                    allowBlank: false,
                    width:200 
                },{
                    xtype:'textfield',
                    inputType:'password',
                    fieldLabel:'Contraseña <span style="color:red;font-weight:bold">*</span>',
                    id:'cmp_usuClave',
                    allowBlank: false,
                    width:200
                }]
            }),new Ext.Panel({
                padding:"0px 0px 0px 20px",
                layout:'fit',
                border:false,
                html : '<img src="img/user1.png">'
            }) ]
        }],
        buttons:[{//marisco tengo 2 instancias de m
            text:'Entrar',
            iconCls:'aceptar',
            handler:function()
            {
                Ext.Ajax.request({
                    waitMsg:'Autentificando..',
                    url: 'controlador/login.php',
                    params: {
                        param_usuUsuario:Ext.getCmp('cmp_usuUsuario').getValue(),
                        param_usuClave:Ext.getCmp('cmp_usuClave').getValue()
                    },
                    success: function(response){
                        var data = Ext.util.JSON.decode(response.responseText);
                        if(data.message!=null)
                        {
                            if(data.success==true){
                                location.href='http://localhost:50/web/Cobit/principal.php';
                            }
                            else
                            {
                                Ext.Msg.show({
                                    title:'Éxito',
                                    msg: data.message.reason,
                                    buttons: Ext.Msg.OK,
                                    icon: Ext.MessageBox.INFO
                                });
                            }
                        }
                        if(data.errors!=null)
                        {
                            Ext.Msg.show({
                                title:'Error',
                                msg: data.errors.reason,
                                buttons: Ext.Msg.OK,
                                icon: Ext.MessageBox.ERROR
                            });  
                        }
                    }
                });
            }
        }]
    });
    
    //Panel para el formulario
    var panelLogin=new Ext.Panel({
        labelAlign: 'top',
        border:false,
        items: formLogin
    });
    
    var windowPopup= new Ext.Window({
        title: 'Iniciar Sesión',
        closeAction:'hide',
        layout:'fit',
        closable:false,
        width:400,
        height:240,
        items:panelLogin
    });
    windowPopup.show();
});