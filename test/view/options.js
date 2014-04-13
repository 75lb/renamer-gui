var test = require("tape"),
    Options = require("../../assets/js/view/Options");

if (!Function.prototype.bind) {
    Function.prototype.bind = function(o /*, args */) {
        // Save the this and arguments values into variables so we can // use them in the nested function below.
        var self = this, boundArgs = arguments;
        // The return value of the bind() method is a function 
        return function() {
            // Build up an argument list, starting with any args passed
            // to bind after the first one, and follow those with all args // passed to this function.
            var args = [], i;
            for(i = 1; i < boundArgs.length; i++) args.push(boundArgs[i]); 
            for(i = 0; i < arguments.length; i++) args.push(arguments[i]);
            // Now invoke self as a method of o, with those arguments
            return self.apply(o, args); 
        };
    }; 
}
   
test("options: set and get", function(t){
    var el = {
        node: document.createElement("form"),
        find: document.createElement("input"),
        replace: document.createElement("input"),
        regex: document.createElement("input"),
        insensitive: document.createElement("input"),
        dryRun: document.createElement("input"),
    };
    var options = new Options(el);
    options.find = "find";
    options.replace = "replace";
    options.regex = true;
    options.insensitive = true;
    options["dry-run"] = true;

    t.equal(el.find.value, "find", "set find");
    t.equal(el.replace.value, "replace", "set replace");
    t.equal(el.regex.checked, true, "set regex");
    t.equal(el.insensitive.checked, true, "set insensitive");
    t.equal(el.dryRun.checked, true, "set dryRun");
    
    el.find.value = "find2";
    el.replace.value = "replace2";
    el.regex.checked = false;
    el.insensitive.checked = false;
    el.dryRun.checked = false;

    t.equal(options.find, "find2");
    t.equal(options.replace, "replace2");
    t.equal(options.regex, false);
    t.equal(options.insensitive, false);
    t.equal(options["dry-run"], false);
    
    t.end();
});
