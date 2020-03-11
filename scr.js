async function insertStatus() {

    let table = "<tr>" +
        "<th class='align'>Server</th>" +
        "<th class='align'>Port</th>" +
        "<th class='align'>Status</th>" +
        "</tr>";

    document.getElementById("status_table").innerHTML += table;

    let data = await fetch("http://bilbosjournal.com:11555/serverInfo.json")
        .then(response => response.text())
        .then(data => table = data)
        .catch(error => document.getElementById("status_table").innerText = "Couldn't load current status " + error.stack);
//    let xmlHttp = new XMLHttpRequest();
//    xmlHttp.open("GET", "http://www.bilbosjournal.com:11555/serverInfo.json");
//    xmlHttp.send();
//    console.log(xmlHttp.status + " " + xmlHttp.statusText + " " + xmlHttp.readyState);
//    let data = xmlHttp.responseText;

    console.log(data);

    let servers = data.split(";");

    servers.forEach(returnVals);
}

function returnVals(value, index, array) {
    if(value === "") return;
    let params = array[index].split(":");
    let status = "";
    if(params[2] === "true") {
        status += "<p class=\"online\">online</p>";
    } else if(params[2] === "false") {
        status += "<p class=\"offline\">offline</p>";
    } else {
        status += "unknown";
    }
    document.getElementById("status_table").innerHTML +=
    "<tr>" +
        "<td class='align'>" + params[0] + "</td>" +
        "<td class='align'>" + params[1] + "</td>" +
        "<td class='align'>" + status + "</td>" +
        "</tr>";
}