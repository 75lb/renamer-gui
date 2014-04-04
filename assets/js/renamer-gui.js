var renamer = require("renamer"),
    Files = require("./view/Files"),
    ResultsView = require("./view/Results"),
    Options = require("./view/Options"),
    $ = document.querySelector.bind(document);

/* share access to the DOM with the required-in modules */
global.document = window.document;
global.window = window;

var view = {
    files: new Files({ node: $("#view-files") }),
    options: new Options({
        node: $("form"),
        find: $("#find"),
        replace: $("#replace"),
        regex: $("#regex"),
        insensitive: $("#insensitive"),
        dryRun: $("#dryRun")
    }),
    results: new ResultsView({ node: $("#view-results") })
};

$("#clearButton").addEventListener("click", function(){
    view.files.clear();
    view.results.clear();
});

window.ondragover = function(e){
    e.preventDefault();
    view.files.node.classList.add("dragOver");
};
window.ondragleave = function(e){
    e.preventDefault();
    view.files.node.classList.remove("dragOver");
};
window.ondrop = function(e){
    e.preventDefault();
    view.results.clear();
    view.files.node.classList.remove("dragOver");
    view.files.add(e.dataTransfer.files);

    view.files.show(true);
    // view.options.node.style.flexBasis = "11em";
};

/* RENAME */
$("form").onsubmit = function(e){
    e.preventDefault();
    view.options.files = view.files.files;
    var results = renamer.replace(view.options);
    results = renamer.replaceIndexToken(results);
    if (view.options["dry-run"]){
        results = renamer.dryRun(results);
    } else {
        results = renamer.rename(results);
        view.files.clear();
        view.files.add(results.afterList());
    }
    view.results.display(results);
};

view.results.show(false);
view.files.show(false);
view.options.node.style.flexBasis = "11em";
