var renamer = require("renamer"),
    w = require("wodge"),
    Files2 = require("./assets/js/view/Files2"),
    ResultsView = require("./assets/js/view/Results"),
    Options = require("./assets/js/view/Options"),
    mfs = require("more-fs"),
    $ = document.querySelector.bind(document),
    progress = $("progress");

/* share access to the DOM with the required-in modules */
global.document = window.document;
global.window = window;

var view = {
    files: new Files2({ node: $("[data-view=Files]") }),
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

/*  State Machine: initial -> before -> working -> after */
var app = {
    _state: null,
    get state() { return this._state; },
    set state(newState) {
        if (newState === "initial"){
            progress.style.display = "none";
            view.results.show(false);
            view.files.show(false);
            view.options.node.style.flexBasis = "0";

        } else if (this._state === "initial" && newState === "before" ){
            view.files.show(true);
            view.options.node.style.flexBasis = "11em";

        } else if (this._state === "before" && newState === "working"){
            progress.style.display = "block";

        } else if (this._state === "working" && newState === "after"){
            progress.style.display = "none";
            view.results.show(true);
            view.files.show(false);
            view.options.once("change", function(){
                app.state = "before";
            });

        } else if (this._state === "after" && newState === "before"){
            view.results.show(false);
            view.files.show(true);

        } else {
            throw new Error("invalid state transition");
        }

        this._state = newState;
        $("header h1").textContent = newState;
    }
};

$("#clearButton").addEventListener("click", function(){
    view.files.clear();
    view.results.clear();
    app.state = "initial";
});

window.ondragover = function(e){
    e.preventDefault();
    view.files.node.classList.add("dragOver");
};
window.ondragleave = function(e){
    e.preventDefault();
    view.files.node.classList.remove("dragOver");
};

window.ondrop = onAddFiles;
view.options.on("submit", onRenameClick);

function onAddFiles(e){
    e.preventDefault();
    view.results.clear();
    view.files.node.classList.remove("dragOver");

    var fileSet = new mfs.FileSet(w.arrayify(e.dataTransfer.files).map(function(file){
        return file.path;
    }));
    view.files.add(fileSet);

    app.state = "before";
};

function onRenameClick(e){
    e.preventDefault();

    app.state = "working";

    /*
    TODO: nature option to ignore undefined properties, like ".node"
    TODO: Custom getters and setting on nature properties:
        model.define({
            name: "files",
            type: FileSet,
            set: function(files){
                this._set(new FileSet(files));
            }
        });
    */
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
}
app.state = "initial";

// view.options.once("change", function(){
//     app.state = "before";
// });

/* 
Options model, bound to DOM elements
Options view, just a DOM tree ->  Renamer
options
    - DOM find -> find
    - DOM replace -> replace

 */