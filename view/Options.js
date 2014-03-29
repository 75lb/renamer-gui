var w = require("wodge"),
    path = require("path"),
    renamer = require("renamer");

module.exports = Options;

function Options(elements){
    var self = this;
    this._el = elements;
    Object.defineProperty(this, "find", {
        enumerable: true,
        set: function setFind(val){
            self._el.find.value = val;
        },
        get: function getFind(){
            return self._el.find.value;
        }
    });
    Object.defineProperty(this, "replace", {
        enumerable: true,
        set: function setReplace(val){
            self._el.replace.value = val;
        },
        get: function getReplace(){
            return self._el.replace.value;
        }
    });
    Object.defineProperty(this, "regex", {
        enumerable: true,
        set: function setRegex(val){
            self._el.regex.checked = val;
        },
        get: function getRegex(){
            return self._el.regex.checked;
        }
    });
    Object.defineProperty(this, "insensitive", {
        enumerable: true,
        set: function setInsensitive(val){
            self._el.insensitive.checked = val;
        },
        get: function getInsensitive(){
            return self._el.insensitive.checked;
        }
    });
    Object.defineProperty(this, "dryRun", {
        enumerable: true,
        set: function setDryRun(val){
            self._el.dryRun.checked = val;
        },
        get: function getDryRun(){
            return self._el.dryRun.checked;
        }
    });
}
