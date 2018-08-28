var Invalid = -1000;
//Add input fields
function addNewClass() {
    var tbody = document.getElementById("classTbody");
    var newTr = document.createElement("tr");
    
    for (var i = 0; i < 3; ++i) {
        var td = document.createElement("td");
        var input = document.createElement("input");
        input.size = "20";
        if (i != 0) {
            input.setAttribute("onchange", "updateGPA()"); 
        }
        td.appendChild(input);
        newTr.appendChild(td);
    }
    tbody.appendChild(newTr);
}
//Update fields
function updateGPA() {
    if (document.getElementById) {
        var tbody = document.getElementById("classTbody");
        var elements = tbody.getElementsByTagName("input");
        updateCreditsGpaWith(elements);
    }
    else {
        updateCreditsGpaWith(document.classes.elements);
    }
}
//Convert float
function formatDecimal(aFloat) {
    var digits = "" + Math.round(100 * aFloat);
    var length = digits.length;
    if (length < 3) {
        return "0." + digits;
    }
    else {
        var dp = length - 2;
        return digits.substring(0, dp) + "." + digits.substring(dp, length);
    }
}
//check Input
function charAt(aString, index) {
    var length = aString.length;
    return aString.substring(index, index + 1);
}
//String to float
function toFloatOrInvalid(input) {
    var length = input.length;
    if (length == 0) {
        return Invalid;
    }
    var first = charAt(input, 0);
    if (first == "0") {
        if (length == 1) {
            return 0.0;
        }
        else if (charAt(input, 1) != ".") {
            return Invalid;
        }
    }
    else if ("123456789".indexOf(first) == -1) {
        return Invalid;
    }
    var i = 1;
    for (; i < length; ++i) {
        var m = ".0123456789".indexOf(charAt(input, i));
        if (m == -1) {
            return Invalid;
        }
        else if (m == 0) {
            break;
        }
    }
    for (var j = i + 1; j < length; j++) {
        if ("0123456789".indexOf(charAt(input, j)) == -1) {
            return Invalid;
        }
    }
    return parseFloat(input);
}

function updateCreditsGpaWith(elements) {
    var totalGradedCredits = 0;
    var totalUngradedCredits = 0;
    var totalPoints = 0;
    
    var haveAtLeastOneGrade = false;
    
    var length = elements.length;
    for (var i = 0; i < length; i += 3) {
        var letter = elements[i + 2].value.toUpperCase();
        if (letter == "X") {
            continue;
        }
        var creditsString = elements[i + 1].value;
        if (creditsString == "") {
            continue;
        }
        var credits = toFloatOrInvalid(creditsString);
        if (credits == Invalid) {
            alert('Invalid input: "' + creditsString + '"');
            return;
        }
        if (letter == "P" || letter == "T" || letter == "N") {
            totalUngradedCredits += credits;
            continue;
        }
        else {
            totalGradedCredits += credits;
        }        
        if (letter == "") {
            continue;
        }
        var points = letterToPoints(letter);
        if (points == Invalid) {
            alert('Invalid input: "' + letter + '"');
            return;
        }
        haveAtLeastOneGrade = true;
        totalPoints += credits * points;
    }
    document.results.total_credits.value = totalGradedCredits + totalUngradedCredits;
    if (haveAtLeastOneGrade && totalGradedCredits > 0) {
        document.results.gpa.value = formatDecimal(totalPoints / totalGradedCredits);
    }
    else {
        document.results.gpa.value = "";
    }
}
//Return points based on input grade
function letterToPoints(grade) {
    if ("A+" == grade) {
        return 4.33;
    }
    else if ("A" == grade) {
        return 4.0;
    }
    else if ("A-" == grade) {
        return 3.7;
    }
    else if ("B+" == grade) {
        return 3.33;
    }
    else if ("B" == grade) {
        return 3.0;
    }
    else if ("B-" == grade) {
        return 2.7;
    }
    else if ("C+" == grade) {
        return 2.33;
    }
    else if ("C" == grade) {
        return 2.0;
    }
    else if ("C-" == grade) {
        return 1.7;
    }
    else if ("D+" == grade) {
        return 1.33;
    }
    else if ("D" == grade) {
        return 1.0;
    }
    else if ("D-" == grade) {
        return 0.7;
    }
    else if ("F" == grade) {
        return 0.0;
    }
    else {
        //Return invalid on invalid input
        return Invalid;
    }
}
function deleteRow(btn) {
    var row = btn.parentNode.parentNode;
    row.parentNode.removeChild(row);
  }