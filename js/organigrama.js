function getorganigrama(){
    var pdf=new Ext.create({ 
        title: 'My PDF', 
        xtype: 'panel', 
        width: 600, 
        height: 400, 
        items: { 
            xtype: 'box', 
            autoEl: { 
                tag: 'iframe', 
                style: 'height: 100%; width: 100%', 
                src: 'http://localhost:50/web/Cobit/archivos/organigrama.pdf'
            } 
        }, 
        renderTo: 'output'
    });
    var panelOr=new Ext.Panel({
        labelAlign: 'top',
        frame:true,
        layout:'form',
        autoWidth: true,
        height:600,
        autoScroll:true, 
        items: [pdf]
    });
    return panelOr;
}


