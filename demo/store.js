const Actions = require('./actions');
const DB = require('./db');
const Reflux = require('reflux');

module.exports = Reflux.createStore({
    listenables: [Actions],
    data: {
        loaded: false,
        content: {},
        error: false
    },

    onFetch: function(params, cb) {
        var t = this;
        DB.SomeModuleAPI.getSomeInfo(params)
            .then(function(content) {
                t.data.loaded = true;
                t.data.content = content;
                console.log(content,t.data.content.list,"newtest");
                t.updateComponent();
                cb && cb(t.data);
            })
            .catch(function(error) {
                t.data.error = error;
                t.updateComponent();
                cb && cb(t.data);
            });
    },

    updateComponent: function() {
        this.trigger(this.data);
        console.log(this.data,55555);
    },

    getInitialState: function() {
        return this.data;

    }
});
