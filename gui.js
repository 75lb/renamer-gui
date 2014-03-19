var renamer = require("renamer"),
    $ = document.querySelector.bind(document);

function log(msg){
    var li = document.createElement("li");
    li.textContent = msg;
    $("#log").appendChild(li);
}

renamer.process({
    files: "test/fixture/*",
    find: "file",
    replace: "clive"
});
