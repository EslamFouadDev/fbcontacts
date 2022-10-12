let namex;
let numberContainer;
let hidden = document.querySelector(".hidden");
let btnConvert = document.querySelector(".btn_convert");
let myText = document.querySelector(".myText");
let save_btn = document.querySelector(".save_btn");
let reset_btn = document.querySelector(".reset_btn");


function printAddress() {
    myText.value = "";
    for (let i = 0, j = 0; i < numberContainer.length ; i++) {
        if (namex[i].nextElementSibling.children[0].textContent.startsWith("+")) {
            if (numberContainer[j].childElementCount === 1) {
                myText.value += `
BEGIN:VCARD
VERSION:3.0
FN:${namex[i].innerHTML}
N:;${namex[i].innerHTML};;;
TEL;TYPE=CELL:${numberContainer[j].children[0].innerHTML}
CATEGORIES:myContacts
END:VCARD`;
j++;
        }
        else if (numberContainer[j].childElementCount === 2) {
                myText.value += `
BEGIN:VCARD
VERSION:3.0
FN:${namex[i].innerHTML}
N:;${namex[i].innerHTML};;;
TEL;TYPE=CELL:${numberContainer[j].children[0].innerHTML}
TEL;TYPE=CELL:${numberContainer[j].children[1].innerHTML}
CATEGORIES:myContacts
END:VCARD`;
j++;
        }
        else if (numberContainer[j].childElementCount === 3) {
            myText.value += `
BEGIN:VCARD
VERSION:3.0
FN:${namex[i].innerHTML}
N:;${namex[i].innerHTML};;;
TEL;TYPE=CELL:${numberContainer[j].children[0].innerHTML}
TEL;TYPE=CELL:${numberContainer[j].children[1].innerHTML}
TEL;TYPE=CELL:${numberContainer[j].children[2].innerHTML}
CATEGORIES:myContacts
END:VCARD`;
j++
    }
    else if (numberContainer[j].childElementCount === 4) {
        myText.value += `
BEGIN:VCARD
VERSION:3.0
FN:${namex[i].innerHTML}
N:;${namex[i].innerHTML};;;
TEL;TYPE=CELL:${numberContainer[j].children[0].innerHTML}
TEL;TYPE=CELL:${numberContainer[j].children[1].innerHTML}
TEL;TYPE=CELL:${numberContainer[j].children[2].innerHTML}
TEL;TYPE=CELL:${numberContainer[j].children[3].innerHTML}
CATEGORIES:myContacts
END:VCARD`;
j++
}
else if (numberContainer[j].childElementCount === 5) {
    myText.value += `
BEGIN:VCARD
VERSION:3.0
FN:${namex[i].innerHTML}
N:;${namex[i].innerHTML};;;
TEL;TYPE=CELL:${numberContainer[j].children[0].innerHTML}
TEL;TYPE=CELL:${numberContainer[j].children[1].innerHTML}
TEL;TYPE=CELL:${numberContainer[j].children[2].innerHTML}
TEL;TYPE=CELL:${numberContainer[j].children[3].innerHTML}
TEL;TYPE=CELL:${numberContainer[j].children[4].innerHTML}
CATEGORIES:myContacts
END:VCARD`;
j++
} else {
    myText.value += "";
}
        }
        else {
            continue;
        }
    }
    btnConvert.disabled = true;
}

function insert() {
    hidden.innerHTML = `${myText.value}`;
    /*._3-96._2pio._2lek._2lel => old class*/
    
    namex = document.querySelectorAll(".hidden ._2ph_._a6-h._a6-i");
    /*._3-96._2let => old class*/
    numberContainer = document.querySelectorAll("._2ph_._a6-p");
}

btnConvert.onclick = function() {
    // if (numberContainer === undefined) {
    // }
    insert();
    printAddress();
    save_btn.style.display = "inline-block";
    myText.disabled = true;
}

reset_btn.onclick = function() {
    myText.value = "";
    // num_of_contacts.innerHTML = 0;
    save_btn.style.display = "none";
    myText.disabled = false;
    btnConvert.disabled = false;
  }
  
  function saveTextAsFile() {
    //cridits to engincancan from stackoverflow https://stackoverflow.com/questions/21479107/saving-html5-textarea-contents-to-file
    let textToWrite = myText.value;
    let textFileAsBlob = new Blob([ textToWrite ], { type: 'text/plain' });
    let fileNameToSaveAs = "contacts.vcf"; //filename.extension
  
    let downloadLink = document.createElement("a");
    downloadLink.download = fileNameToSaveAs;
    downloadLink.innerHTML = "Download File";
    if (window.webkitURL != null) {
      // Chrome allows the link to be clicked without actually adding it to the DOM.
      downloadLink.href = window.webkitURL.createObjectURL(textFileAsBlob);
    } else {
      // Firefox requires the link to be added to the DOM before it can be clicked.
      downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
      downloadLink.onclick = destroyClickedElement;
      downloadLink.style.display = "none";
      document.body.appendChild(downloadLink);
    }
  
    downloadLink.click();
  }
  
  save_btn.addEventListener('click', saveTextAsFile);
  
  function destroyClickedElement(event) {
    // remove the link from the DOM
    document.body.removeChild(event.target);
  }