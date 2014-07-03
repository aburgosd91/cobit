function getGeneralidades(){
    var url="organigrama";
    var tabs = new Ext.TabPanel({
        //renderTo: Ext.getBody(),
        region: 'south',
        margins:'3 3 3 3', 
        activeTab: 0,
        defaults:{autoScroll:true},
        items: [{
            title: 'Giro de Negocio',
            items:getgironegocio()
        },{
            title: 'Direccionamiento Estratégico',
            //html: 'Another one'
            items:getdireccionamientoEstrategico()
        },{
            title: 'Organigrama',
            html: '<embed src="http://localhost:50/web/Cobit/archivos/'+url+'.pdf" width="100%" height="96%"></embed>'
            //items:getorganigrama()
        },{
            title: 'Lugar Geográfico',
            //html: 'Another one'
            items:getgeografico()
        },{
            title: 'Realidad Problemática',
            //html: 'Another one'
            items:getrealidadProblematica()
        },{
            title: 'Motivos de Auditoria',
            //html: 'Another one'
            items:getmotivoAuditoria()
        },{
            title: 'Marco Normativo',
            //html: 'Another one'
            items:getPrueba()
        },{
            title: 'Lab Tais',
            html: '<iframe src="http://localhost/ReportServer/Pages/ReportViewer.aspx?%2freporte1%2fReport2&rs:Command=Render" width="100%" height="96%"></iframe>'
            //items:getPrueba()
        }]
    });
    return tabs;
}


