var test = require("tape"),
    renamer = require("renamer"),
    Results = renamer.Results,
    Options = require("../../view/Options");
   
test("options: set and get", function(t){
    var form = document.createElement("input");
    var options = new Options({
        find: document.createElement("input"),
        replace: document.createElement("input"),
        regex: document.createElement("input"),
        insensitive: document.createElement("input"),
        dryRun: document.createElement("input"),
    });
    options.find = "find";
    options.replace = "replace";
    options.regex = true;
    options.insensitive = true;
    options.dryRun = true;

    t.equal(options._el.find.value, "find", "set find");
    t.equal(options._el.replace.value, "replace", "set replace");
    t.equal(options._el.regex.checked, true, "set regex");
    t.equal(options._el.insensitive.checked, true, "set insensitive");
    t.equal(options._el.dryRun.checked, true, "set dryRun");
    
    options._el.find.value = "find2";
    options._el.replace.value = "replace2";
    options._el.regex.checked = false;
    options._el.insensitive.checked = false;
    options._el.dryRun.checked = false;

    t.equal(options.find, "find2");
    t.equal(options.replace, "replace2");
    t.equal(options.regex, false);
    t.equal(options.insensitive, false);
    t.equal(options.dryRun, false);
    
    t.end();
});
