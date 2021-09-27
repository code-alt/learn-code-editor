/*jshint esversion: 8 */

var val = 1;
var con = $("editor");
var data = window.sessionStorage;
var lData = window.localStorage;
data.setItem("index", '<!--- Welcome to the Learn Code Editor!\nYou can write your code (html, css, and js.)\nHowever, (to create realism) Learn Code does not add your scripts or styles in.\nYou must do so yourself with a special tag, like so.\nPut in "/filename.ending/"\n...and it will link! (for some languages it may mark it as an error, but that is okay.) --->\n\n<!-- Like, "<link href="/image.png/"/>" -->');
data.setItem("script", "// This is the script for your app!");
data.setItem("style", "/* Add styling to your app via CSS. */");

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
  previousEdit: "index",
  // currentEdit: "index",
};

function Settings() {
  $("settings").style=undefined;
  $("main").style="display:none";
  $("tools").style="display:none";
}
function Tools() {
  $("settings").style="display:none";
  $("main").style="display:none";
  $("tools").style=undefined;
}
function Main() {
  $("settings").style="display:none";
  $("main").style=undefined;
  $("tools").style="display:none";
}

var editor = IDE.addEdit("editor", "html", data.getItem("index"));

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
  lData.setItem("ThemeData", yy-1);
}

if (lData.getItem("ThemeData")) {yy=lData.getItem("ThemeData");darkMode();}

editor.setModel(monaco.editor.createModel(data.getItem("index"),"html",monaco.Uri.file("html")));
function DarkMode() {
  document.body.style.background = "#1E1E1E";
  $("style").innerText = ".buttons button, .button {color:#FFF} summary::after {filter: invert(100%)";
  $("sty2").innerText = ".button:hover {background:transparent;color:#fff;}";
}
function HCMode() {
  document.body.style.background = "#000";
  $("style").innerText =
    ".buttons button, .button {color:#FFF} summary::after {filter: invert(100%);}";
    $("sty2").innerText = ".button:hover {background:transparent;color:#fff;}";
}
function LightMode() {
  document.body.style.background = "#FFFFFE";
  $("style").innerText = ".buttons button {color:#000}";
  $("sty2").innerText = "";
}

function activateEdit(id, lang) {
  data.setItem(IDE.previousEdit.toString(), editor.getValue().toString());
  IDE.previousEdit=id.toString();
  editor.setValue(data.getItem(id.toString()));
  monaco.editor.setModelLanguage(editor.getModel(), lang);
}

editor.addAction(monaco.editor.IActionDescriptor = {
  id: "Settings",
  label: "Settings",
  contextMenuOrder: 0,
  contextMenuGroupId: "operation",
  keybindings: [
    monaco.KeyMod.CtrlCmd | monaco.KeyCode.US_COMMA,
  ],
  run: Settings,
});

editor.addAction(monaco.editor.IActionDescriptor = {
  id: "Tools",
  label: "Tools",
  contextMenuOrder: 0,
  contextMenuGroupId: "operation",
  keybindings: [
    monaco.KeyMod.CtrlCmd | monaco.KeyMod.Shift | monaco.KeyCode.US_COMMA,
  ],
  run: Tools,
});