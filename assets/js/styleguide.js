var renamer = require("renamer"),
    Files = require("./view/Files"),
    ResultsView = require("./view/Results"),
    Options = require("./view/Options"),
    $ = document.querySelector.bind(document);
  
var view = {
  files: new Files({ node: $("[data-view=Files]")}),
  results: new ResultsView({ node: $("[data-view=Results]")})
};

view.files.add([ "clive", "hater", "nigeria" ]);
view.results.display(new renamer.Results([
    { before: "clive", after: "CLIVE", renamed: true },
    { before: "hater", after: "HATER", renamed: false }
]));
