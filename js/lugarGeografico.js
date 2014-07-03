/*!
 * Ext JS Library 3.4.0
 * Copyright(c) 2006-2011 Sencha Inc.
 * licensing@sencha.com
 * http://www.sencha.com/license
 */

    /*
     * ================  Giro de Negocio 3  =======================
     */
    
function getgeografico(){
    var toolbar = new Ext.Toolbar({
            defaults:{
                iconAlign: 'top' 
            },
            items: [
                {
                    text:'Back',
                    iconCls:'save',
                    split: true,
                    menu:{
                        items: [
                            {text:'Yahoo!'},
                            {text:'Editar'},
                            {text:'Paint'}
                        ]
                    }},
                {text:'Forward',iconCls:'print'},
                {text:'Reload',iconCls:'search'},
                {text:'Stop',iconCls:'calendar',iconAlign:'right'},
                '-',
                {
                    xtype: 'buttongroup',
                    items:[
                        {xtype:'textfield', id:'url', width:250, enableKeyEvents:true},
                        {iconCls:'search'}
                    ]
                },
                '->',
                {text:'Home',iconCls:'save'}
            ]
        });

        var status = new Ext.Toolbar.TextItem({id:'status',text:'Sistema de Informacion!'}); 
        var clock = new Ext.Toolbar.TextItem({id:'clock',text: '00:00:00 AM'}); 
        var words = new Ext.Toolbar.TextItem({id:'words',text:'0 trabajos'}); 
        var updateClock = function(){ 
            Ext.getCmp('clock').setText(new Date().format('g:i:s A')); 
        } 
        var task = { 
            run: updateClock,
            interval: 1000 //1 segundo 
        }
        var runner = new Ext.util.TaskRunner(); 
        runner.start(task);
        var statusbar = new Ext.Toolbar({ 
            items:[status,'->',words,'-',clock] 
        });
        var win = new Ext.Panel({
            title: 'Googel Map',
            //collapsible:true,
            iconCls:'calendar',
            //width: "100%",
            layout:"fit",
            //height:"100%",
            html: '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3950.0651675415493!2d-79.04778244472006!3d-8.094825317182622!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x91ad3db8ba3ea94f%3A0xe37266bf8a50e88!2sAv+Metropolitana+II!5e0!3m2!1ses!2spe!4v1402642134608" width="100%" height="500" frameborder="0" style="border:0"></iframe>'
        });

    return win;
}
