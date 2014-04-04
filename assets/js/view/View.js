var EventEmitter = require("events").EventEmitter,
    util = require("util");

module.exports = View;

function View(options){
}
util.inherits(View, EventEmitter);

View.prototype.show = function(show){
    if (show){
        this.node.classList.remove("hide");
    } else {
        this.node.classList.add("hide");
    }
};
