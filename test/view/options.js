var test = require("tape"),
    Options = require("../../view/Options");
   
test("options: set and get", function(t){
    var form = document.createElement("input");
    var el = {
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
