var renamer = require("renamer"),
    Files = require("./assets/js/view/Files"),
    ResultsView = require("./assets/js/view/Results"),
    Options = require("./assets/js/view/Options"),
    $ = document.querySelector.bind(document);

/* share access to the DOM with the required-in modules */
global.document = window.document;
global.window = window;

var view = {
    files: new Files({ node: $("[data-view=Files]") }),
    options: new Options({
        node: $("form"),
        find: $("#find"),
        replace: $("#replace"),
        regex: $("#regex"),
        insensitive: $("#insensitive"),
        dryRun: $("#dryRun")
    }),
    results: new ResultsView({ node: $("[data-view=Results]") })
};

var app = {
    _state: "initial",
    get state() { return this._state; },
    set state(newState) {
        if (this._state === "initial" && newState === "before" ){
            view.files.show(true);
            view.options.node.style.flexBasis = "11em";
        } else if (this._state === "before" && newState === "after"){
            view.results.show(true);
            view.files.show(false);

        } else {
            throw new Error("invalid state transition");
        }

        this._state = newState;
    }
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
    app.state = "before";
};

/* RENAME */
view.options.on("submit", function(e){
    e.preventDefault();

    /* TODO: nature option to ignore undefined properties, like ".node" */
    var results = renamer.replace({
        files: view.files.files,
        find: view.options.find,
        replace: view.options.replace,
        insensitive: view.options.insensitive,
        "dry-run": view.options["dry-run"],
        regex: view.options.regex
    });

    results = renamer.replaceIndexToken(results);
    if (view.options["dry-run"]){
        results = renamer.dryRun(results);
    } else {
        results = renamer.rename(results);
        view.files.clear();
        view.files.add(results.afterList());
    }
    view.results.display(results);

    app.state = "after";
});

view.results.show(false);
view.files.show(false);
