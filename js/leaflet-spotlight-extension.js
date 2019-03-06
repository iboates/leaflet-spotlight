L.SpotlightHandler = L.Handler.extend({

    addHooks: function() {
        L.DomEvent.on(document, 'mousemove', this._doSomething, this);
    },

    removeHooks: function() {
        L.DomEvent.off(document, 'mousemove', this._doSomething, this);
    },

    _doSomething: function(ev) {

        console.log(this._map)

    }

});

L.Map.addInitHook('addHandler', 'spotlight', L.SpotlightHandler);

L.Map.include({

    _spotlightRegistry: {},

});

//L.Layer.Spotlight = L.Layer.extend({
//
//})