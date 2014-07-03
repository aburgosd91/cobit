function getmostrar(cadena){
    var toolbar = new Ext.Toolbar({
                    defaults:{
                        iconAlign: 'top' 
                    },
                    items: [
                        {text:'Atraz',iconCls:'atraz',
                            handler: function() {
                                //alert('atraz');
                                panelOr.autoLoad = {
                                    url : 'http://localhost:50/web/Cobit/Vistas/pdf.php?cadena='
                                };
                                panelOr.doAutoLoad();
                            }
                        },
                        {text:'Forward',iconCls:'print'},
                        {text:'Reload',iconCls:'search'},
                        {text:'Stop',iconCls:'calendar',iconAlign:'right'},
                        '-',
                        {xtype:'textfield',id:'url',width:250,enableKeyEvents:true},
                        {iconCls:'search'},
//                        new Ext.Toolbar.Fill(),//igual a '->'
                        {text:'Home',iconCls:'save'}
                    ]
                });
    var panelOr=new Ext.Panel({
        tbar:toolbar,
        labelAlign: 'top',
        frame:true,
        layout:'form',
        autoWidth: true,
        height:600,
        autoScroll:true,
        html: '<embed src="http://localhost:50/web/Cobit/Vistas/pdf.php?cadena='+cadena+'" width="100%" height="96%"></embed>',
    });
    return panelOr;
}


//http://localhost:50/web/Cobit/Vistas/pdf.php?cadena=Grupo4.pdf