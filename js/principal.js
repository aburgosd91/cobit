/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.onReady(function() {
    Ext.QuickTips.init();
    var tabs = new Ext.TabPanel({//step 2  
        border: false,
        height: 600,
        activeTab: 0,
        enableTabScroll: true, //hacemos que sean recorridas  
        items: []
    });
    
    var treePanel = new Ext.tree.TreePanel({
        id: 'tree-panel',
        title: 'Menu',
        region: 'center',
        split: true,
        height: 300,
        minSize: 150,
        autoScroll: true,
        border: false,
        rootVisible: false,
        lines: false,
        singleExpand: true,
        useArrows: true,
        loader: new Ext.tree.TreeLoader({
            dataUrl: 'controlador/tree.php',
            baseParams: {
                param_opcion: 'listarMenu'
            }
        }),
        root: new Ext.tree.AsyncTreeNode()
    });
    

    //Aqui se agregan los nodos dependiendo del id del menu
    //en node.id
    treePanel.on('click', function(node) {
        var tab = tabs.findById(node.id); // step 1
        if (!tab) {
            if ((node.id) == '2')
            {
                var panelMenu = getMenu();
                tab = new Ext.Panel({
                    id: 'menu-panel',
                    title: 'Menu',
                    closable: true,
                    layout: 'fit',
                    items: panelMenu
                });
            }
            if ((node.id) == '3')
            {
                var panelRol = getRol();
                tab = new Ext.Panel({
                    id: 'rol-panel',
                    title: 'Roles',
                    closable: true,
                    layout: 'fit',
                    items: panelRol
                });
            }
            if ((node.id) == '4')
            {
                var panelUsuario = getUsuario();
                tab = new Ext.Panel({
                    id: 'usuario-panel',
                    title: 'Usuarios',
                    closable: true,
                    layout: 'fit',
                    items: panelUsuario
                });
            }
            if ((node.id) == '7')
            {
                var panelGeneralidades = getGeneralidades();
                tab = new Ext.Panel({
                    id: 'usuario-panel',
                    title: 'Generalidades',
                    closable: true,
                    layout: 'fit',
                    items: panelGeneralidades 
                });
            }
            if ((node.id) == '8')
            {
                var panelPlanificacion= getPlanificacion();
                tab = new Ext.Panel({
                    id: 'panel-planificacion',
                    title: 'Planificación',
                    closable: true,
                    layout: 'fit',
                    items: panelPlanificacion
                });
            }
            if ((node.id) == '9')
            {
                var panelEjecucion= getPrueba();
                tab = new Ext.Panel({
                    id: 'panel-ejecucion',
                    title: 'Prueba',
                    closable: true,
                    layout: 'fit',
                    items: panelEjecucion
                });
            }
            if (tabs != null) {
                tabs.add(tab); //step 4  
                tabs.doLayout();
            }
        }
        tabs.activate(tab); //step 5 
    }, this);
    //
    Ext.Ajax.request({
        url: 'controlador/sesion_usuario.php',
        success: function(response) {
            var data = response.responseText;
            Ext.getCmp('user').setTitle('ID: ' + data + ' <a href="controlador/sesion_cerrar.php"><span>cerrar</span></a>');
        }
    });

    var contenidoCompleto = new Ext.Viewport({
        layout: 'border',
        collapsible: true,
        items: [{
                region: 'north',
                html: ' <div id="header"><h1>Sistema de Auditoria</h1></div>',
                autoHeight: true,
                border: false,
                margins: '2 0 5 0'
            },
            {
                region: 'south',
                margins: '0 0 0 5',
                title: 'Información',
                collapsible: true,
                split: true,
                height: 0,
                minHeight: 100
            }, {
                region: 'west',
                layout: 'border',
                collapsible: true,
                split: true,
                border: true,
                margins: '0 0 0 5',
                //            bodyStyle:'background-color: #4C6892',
                width: 200,
                items: [{
                        region: 'north',
                        xtype: 'panel',
                        layout: 'fit',
                        margins: '5 5 5 5',
                        height: 25,
                        id: 'user',
                        title: 'Bienvenido'
                    }, treePanel]
            }, {
                xtype: "panel",
                region: "center",
                layout: "fit",
                margins: {
                    bottom: 3,
                    right: 3
                },
                border: false,
                items: [{
                        xtype: "panel",
                        items: [tabs]   //Asignamos el tabpanel a la región central  
                    }]
            }]
                //        renderTo: Ext.getBody()
    });
});


