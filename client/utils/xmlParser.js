export function xmlParser(xmlString) {
  console.log(xmlString);
  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(xmlString.trimLeft(), "text/xml");
  const convertedJS = xmlToJson(xmlDoc);
  return convertedJS;
}

function xmlToJson(xmlDoc) {
  // Create the return object
  let obj = {};
  if (xmlDoc.nodeType === 1) {
    // element
    // do attributes
    if (xmlDoc.attributes.length > 0) {
      obj["attributes"] = {};
      for (var j = 0; j < xmlDoc.attributes.length; j++) {
        var attribute = xmlDoc.attributes.item(j);
        obj["attributes"][attribute.nodeName] = attribute.nodeValue;
      }
    }
  } else if (xmlDoc.nodeType === 4) {
    obj = xmlDoc.nodeValue;
  }

  // do children
  // If just one text node inside
  if (
    xmlDoc.hasChildNodes() &&
    xmlDoc.childNodes.length === 1 &&
    xmlDoc.childNodes[0].nodeType === 3
  ) {
    obj = xmlDoc.childNodes[0].nodeValue;
  } else if (xmlDoc.hasChildNodes()) {
    for (var i = 0; i < xmlDoc.childNodes.length; i++) {
      var item = xmlDoc.childNodes.item(i);
      var nodeName = item.nodeName;
      if (typeof obj[nodeName] == "undefined") {
        obj[nodeName] = xmlToJson(item);
      } else {
        if (typeof obj[nodeName].push == "undefined") {
          var old = obj[nodeName];
          obj[nodeName] = [];
          obj[nodeName].push(old);
        }
        obj[nodeName].push(xmlToJson(item));
      }
    }
  }
  // return the converted xml
  return obj;
}
