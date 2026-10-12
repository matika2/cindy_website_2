function hide(elementId) {
    // console.log("Hiding: " + elementId);
    const element = document.getElementById(elementId);
    element.style.display="none";
}

function show(elementId) {
    // console.log("Showing: " + elementId);
    const element = document.getElementById(elementId);
    element.style.display="inline";
}

// clear cannot be the name of this method for some reason ...
function clearText(elementId) {
    // console.log("Clear: " + elementId);
    const element = document.getElementById(elementId);
    element.value='';
}

function uncheckAndHide() {

    uncheck("detailedPerfKindPublic");
    uncheck("perfOrganizer");
    uncheck("privatePrivateKind");
    uncheck("detailedPerfKindPrivate");

    hide("otherKind");
    hide("privatePrivatePerf")
}

function uncheck(elementId) {
    const elements = document.getElementsByName(elementId);
    for(let i=0; i < elements.length; i++) {
        // console.log("Unchecking: " + elements[i]);
        elements[i].checked = false;
    }
}

// When admin page loads and perf type is other, then show custom text field of otherKind
if(document.getElementById("publicKindOther").checked || document.getElementById("privateOther").checked) {
    show("otherKind");
} else {
    clearText("otherKindText")
    hide("otherKind");
}
//
// document.getElementById("publicKindOther").addEventListener("change", function (event) {
//     // console.log('Radio button publicKindOther value: ' + event.target.value);
// }, false);
//
// document.getElementById("privateOther").addEventListener("change", function (event) {
//     // console.log('Radio button publicKindOther value: ' + event.target.value);
// }, false);