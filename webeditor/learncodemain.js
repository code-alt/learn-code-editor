var val = 1;
var con = $("editor");

function $(id) {
  return document.getElementById(id);
}

var IDE = {
  addEdit: function(elem, mode, val) {
    return monaco.editor.create(document.getElementById(elem), {
      value: val || "",
      language: mode || "javascript",
      automaticLayout: true
    });
  },
  addedFiles: "",
  index: "<p>\n  Welcome to Learn Code\n</p>",
  script: "",
  css: "",
  currentEdit: "index"
};

var editor = IDE.addEdit("editor", "html", IDE.index.toString());

var yy = 1;
function darkMode() {
  if (yy == 1) {
    yy++;
    monaco.editor.setTheme("vs-dark");
    DarkMode();
  } else if (yy == 2) {
    yy++;
    monaco.editor.setTheme("hc-black");
    HCMode();
  } else {
    monaco.editor.setTheme("vs");
    LightMode();
    yy = 1;
  }
}
function DarkMode() {
  document.body.style.background = "#1E1E1E";
  $("style").innerText =
    ".buttons button, .button {color:#FFF} summary::after {filter: invert(100%);}";
}
function HCMode() {
  document.body.style.background = "#000";
  $("style").innerText =
    ".buttons button, .button {color:#FFF} summary::after {filter: invert(100%);}";
}
function LightMode() {
  document.body.style.background = "#FFFFFE";
  $("style").innerText = ".buttons button {color:#000}";
}
function activateEdit(id) {
  eval("IDE." + IDE.currentEdit + "=" + editor.getValue());
  editor.setValue();
  IDE.currentEdit = id.toString();
}
