var Reflux = require('reflux');
var Actions = require('./actions');

var Store = Reflux.createStore({
    listenables: [Actions],

    onSetHide: function () {
        this.trigger({show:false});
    },
    onSetShow: function () {
        this.trigger({show:true});
    }
});

module.exports = Store;
