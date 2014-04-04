var View = require("./View"),
    util = require("util");

module.exports = Options;

function Options(elements){
    var el = elements,
        self = this;
    this.node = elements.node;
    this.node.onsubmit = function(e){
        self.emit("submit", e);
    };
    
    Object.defineProperty(this, "find", {
        enumerable: true,
        set: function setFind(val){
            el.find.value = val;
        },
        get: function getFind(){
            return el.find.value;
        }
    });
    Object.defineProperty(this, "replace", {
        enumerable: true,
        set: function setReplace(val){
            el.replace.value = val;
        },
        get: function getReplace(){
            return el.replace.value;
        }
    });
    Object.defineProperty(this, "regex", {
        enumerable: true,
        set: function setRegex(val){
            el.regex.checked = val;
        },
        get: function getRegex(){
            return el.regex.checked;
        }
    });
    Object.defineProperty(this, "insensitive", {
        enumerable: true,
        set: function setInsensitive(val){
            el.insensitive.checked = val;
        },
        get: function getInsensitive(){
            return el.insensitive.checked;
        }
    });
    Object.defineProperty(this, "dry-run", {
        enumerable: true,
        set: function setDryRun(val){
            el.dryRun.checked = val;
        },
        get: function getDryRun(){
            return el.dryRun.checked;
        }
    });
}
util.inherits(Options, View);
