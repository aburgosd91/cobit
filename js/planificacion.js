function getPlanificacion(){
    var tabsPlanificacion = new Ext.TabPanel({
        //renderTo: Ext.getBody(),
        region: 'south',
        margins:'3 3 3 3', 
        activeTab: 0,
        defaults:{autoScroll:true},
        items: [{
            title: 'Objetivo General',
            items:getObjetivosGenerales()
        },{
            title: 'Plan Auditoria',
            items:getplanAuditoria()
        },{
            title: 'Alineamiento',
            items:getAlineamiento()
        },{
            title: 'Descripción-Perfil',
            items:getDescripcionRol()
        }
    ]
    });
    return tabsPlanificacion;
}




