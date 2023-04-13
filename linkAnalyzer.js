console.clear();
console.log('-------------------------------');
console.log('%cLinks on page%c: ' + $$('a').length, 'color:green', 'color:black');
console.log('');
console.log('You want more Chrome Snippets?');
console.log('bit.ly/chrome-snippets');
console.log('-------------------------------');
console.log('');


var rep = /.*\?.*/,
    links = document.getElementsByTagName('a');

function LinkInfo(name, image) {
    this.name = name;
    this.image = image;
}

function Link(href) {
    this.href = href;
    this.linkInfo = [];
}

function findImageInfo(aTag) {
    var imgTag = aTag.querySelector('img');
    if (imgTag) {
        var imgUrl = imgTag.src;
        var altText = imgTag.alt || '';
        return `[image]: ${imgUrl}; [alt text]: ${altText}`;
    } else {
        return false;
    }
}

var lop = {};

for (var i = 0; i < links.length; i++) {
    var href = links[i].href;
    var name = links[i].innerHTML;
    var imageInfo = findImageInfo(links[i]);

    if (lop[href]) {
        lop[href].linkInfo.push(new LinkInfo(name, imageInfo));
    } else {
        var newLink = new Link(href);
        newLink.linkInfo.push(new LinkInfo(name, imageInfo));
        lop[href] = newLink;
    }
}

function hasImageLink(linkInfoArray) {
    return linkInfoArray.some(function (linkInfo) {
        return linkInfo.image !== false;
    });
}

for (var key in lop) {
    var linkCount = lop[key].linkInfo.length;
    var imageLinkUsed = hasImageLink(lop[key].linkInfo);
    var imageLinkUsedText = imageLinkUsed ? 'Image link used' : 'No image link';
    var textColor = imageLinkUsed ? 'color: green;' : 'color: black;';
    var countColor = linkCount > 1 ? 'color: red;' : 'color: black;';
    console.groupCollapsed("%cURL: " + lop[key].href + " | %cCount: " + linkCount + " | %c" + imageLinkUsedText, 'color: black;', countColor, textColor);
    console.table(lop[key].linkInfo);
    console.groupEnd();
}
