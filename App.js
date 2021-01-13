Ext.define('CustomApp', {
    extend: 'Rally.app.App',
    componentCls: 'app',

  
    launch: function() {
        var context = this.getContext();
        context.setProject("");
        Ext.create('Rally.data.wsapi.TreeStoreBuilder').build({
            models: ['milestone'],
            autoLoad: false,
            enableHierarchy: false
        }).then({
            success: this._onStoreBuilt,
            scope: this
        });
    },
    
    _onStoreBuilt: function(store) {
        var context = this.getContext();
        this.add({
            xtype: 'rallygridboard',
            context: this.getContext(),
            modelNames: ['milestone'],
            toggleState: 'grid',
    
            plugins: [
                {
                    ptype: 'rallygridboardinlinefiltercontrol',
                    inlineFilterButtonConfig: {
                        stateful: true,
                        stateId: context.getScopedStateId('filters'),
                        modelNames: ['milestone'],
                        inlineFilterPanelConfig: {
                            quickFilterPanelConfig: {
                                defaultFields: [
                                    'FormattedID'
                                ]
                            }
                        }
                    }
                }
            ],
            
            gridConfig: {
                store: store,
                columnCfgs: [
                    'FormattedID',
                    'Name',
                    'TargetDate',
                    'TotalProjectCount'
                ]
            },
            height: this.getHeight()
        });
    }
});
