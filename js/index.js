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


let link_class
let title_content
let href

try {
  const salt = 'BiDFGfr5x0AibPpyButqwHN9KUOs2RLvZthndVWSmJVDmiuXEcUbnfVNSq73gt994kTOxJY'

  const vars = getQueryStringArray()

  const encoded = vars?.encoded

  if(encoded === undefined || encoded === '')
    throw new Error('Encoded doesn\'t exist')

  const decrypted = JSON.parse(decrypt(salt, encoded))

  link_class = 'shortener-redirect';
  title_content = 'Ir a ' + decrypted.title
  href = decrypted.link
} catch (e) {
  if(e.message.includes('JSON')) {
    console.log('Invalid encoded string')
  } else {
    console.log('Encoded doesn\'t exist')
  }

  link_class = 'blogger-redirect'
  title_content = 'Ir de regreso a NoobStraducciones'
  href = 'https://noobstraducciones.blogspot.com/'
}

const title = document.getElementById('title')
const link = document.getElementById('link')

link.classList.add(link_class)
link.setAttribute('href', href)
title.innerHTML = '<strong>' + title_content + '</strong>'