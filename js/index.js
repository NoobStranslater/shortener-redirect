const decrypt = (salt, encoded) => {
  const textToChars = (text) => text.split("").map((c) => c.charCodeAt(0));
  const applySaltToChar = (code) => textToChars(salt).reduce((a, b) => a ^ b, code);
  return encoded
    .match(/.{1,2}/g)
    .map((hex) => parseInt(hex, 16))
    .map(applySaltToChar)
    .map((charCode) => String.fromCharCode(charCode))
    .join("");
};

const getQueryStringArray = function () {
  let assoc = [];
  let items = window.location.search.substring(1).split('&');
  for (let j = 0; j < items.length; j++) {
    let a = items[j].split('='); assoc[a[0]] = a[1];
  }
  return assoc;
};


let linkClass
let titleContent
let href
let mainTitleContent

try {
  const salt = 'BiDFGfr5x0AibPpyButqwHN9KUOs2RLvZthndVWSmJVDmiuXEcUbnfVNSq73gt994kTOxJY'

  const vars = getQueryStringArray()

  const encoded = vars?.encoded

  if(encoded === undefined || encoded === '')
    throw new Error('Encoded doesn\'t exist')

  const decrypted = JSON.parse(decrypt(salt, encoded))

  linkClass = 'shortener-redirect';
  titleContent = 'Ir a ' + decrypted.title
  mainTitleContent = decrypted.title
  href = decrypted.link
} catch (e) {
  if(e.message.includes('JSON')) {
    console.log('Invalid encoded string')
  } else {
    console.log('Encoded doesn\'t exist')
  }

  linkClass = 'blogger-redirect'
  titleContent = 'Ir de regreso a NoobStraducciones'
  href = 'https://noobstraducciones.blogspot.com/'
  mainTitleContent = 'Shortener Redirect'
}

const title = document.getElementById('title')
const link = document.getElementById('link')
const mainTitle = document.getElementById('main-title')

mainTitle.appendChild(document.createTextNode(mainTitleContent))
link.classList.add(linkClass)
link.setAttribute('href', href)
title.innerHTML = '<strong>' + titleContent + '</strong>'