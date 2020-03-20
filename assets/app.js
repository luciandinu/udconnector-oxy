/*
Oxygen frontend functionality
-----------------------------
*/

var oxy_scope;

function pasteElement(ev) {
  var txtClipboard = "";
  if (iCanPaste()) {
    navigator.clipboard
      .readText()
      .then(function(clipText) {
        if (JSON.parse(atob(clipText).trim(" "))) {
          var clipObj = JSON.parse(atob(clipText).trim(" "));
          if (clipObj.oxygen) {
            insertElement(clipObj);
          }
        }
      })
      .catch(err => {
        console.log("Something went wrong", err);
      });
  }
}

document.addEventListener("DOMContentLoaded", event => {
  const div = document.createElement("div");
  div.id = "ud-insert-paste";
  div.addEventListener("click", pasteElement);
  div.className = "oxygen-editor-ud-paste";
  div.setAttribute("title", "Paste/Insert from UD");
  div.innerHTML = "<span></span>";
  document
    .querySelector("#oxygen-topbar")
    .insertBefore(div, document.querySelector(".oxygen-dom-tree-button"));

  var oxy_view = document.querySelector("#ct-artificial-viewport");
  oxy_view.addEventListener("load", function() {
    oxy_scope = angular.element("#ct-artificial-viewport").scope().iframeScope;
  });
});

/*
Helper functions 
----------------
*/

//B64 Encoding function - helper
function base64EncodeUnicode(str) {
  // First we escape the string using encodeURIComponent to get the UTF-8 encoding of the characters,
  // then we convert the percent encodings into raw bytes, and finally feed it to btoa() function.
  utf8Bytes = encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function(
    match,
    p1
  ) {
    return String.fromCharCode("0x" + p1);
  });

  return btoa(utf8Bytes).substring(0, btoa(utf8Bytes).length - 2);
}

//Insert the element - we need to pass the oxy_element (JSON object)

/*
// JSON Object Example
{"oxygen":true,
  "element": {
      "design_set_slug":"edd-demo",
      "category_name":"Content",
      "element_name":"Awesome section",
      "element_code": "code"
    }
}
*/

function insertElement(oxy_element) {
  if (oxy_element.oxygen) {
    oxy_scope.addComponentFromSource(
      JSON.stringify(oxy_element.element.element_code),
      false,
      "",
      ""
    );
  }
}

function iCanPaste() {
  return (
    navigator.clipboard &&
    typeof navigator.clipboard.readText === "function" &&
    (location.protocol == "https:" ||
      location.hostname == "localhost" ||
      location.hostname == "127.0.0.1")
  );
}
