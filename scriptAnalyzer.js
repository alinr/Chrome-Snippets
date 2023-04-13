console.clear();
let w_scripts = document.querySelectorAll('script');
console.log('-------------------------------');
console.log('%cScripts on page%c: ' + w_scripts.length, 'color:green', 'color:black');
console.log('');
console.log('You want more Chrome Snippets?');
console.log('bit.ly/chrome-snippets');
console.log('-------------------------------');
console.log('');

function fetchScriptInfo(script) {
    return fetch(script.src, { method: 'HEAD' })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch script: ' + script.src);
            }
            let fileSize = parseInt(response.headers.get('content-length')) || 0;
            fileSize = (fileSize / 1024).toFixed(2) + ' KB';
            let encoding = response.headers.get('content-encoding') || 'uncompressed';
            let compressionText = encoding;
            let compressionColor = encoding === 'uncompressed' ? 'color: red;' : 'color: black;';

            return {
                src: script.src,
                async: script.async,
                defer: script.defer,
                fileSize: fileSize,
                compression: compressionText,
                compressionColor: compressionColor,
            };
        })
        .catch(error => {
            console.warn('Error fetching script info:', error.message);
            return {
                src: script.src,
                async: script.async,
                defer: script.defer,
                fileSize: 'N/A',
                compression: 'N/A',
                compressionColor: 'color: black;',
            };
        });
}

let scriptPromises = [...w_scripts].map(fetchScriptInfo);

Promise.all(scriptPromises)
    .then(scriptsInfo => {
        console.clear();
        console.log('-------------------------------');
        console.log('%cScripts on page%c: ' + w_scripts.length, 'color:green', 'color:black');
        console.log('');
        console.log('You want more Chrome Snippets?');
        console.log('bit.ly/chrome-snippets');
        console.log('-------------------------------');

        scriptsInfo.sort((a, b) => {
            const aSize = parseFloat(a.fileSize);
            const bSize = parseFloat(b.fileSize);
            if (isNaN(aSize)) return 1;
            if (isNaN(bSize)) return -1;
            return bSize - aSize;
        });

        console.table(scriptsInfo, ['src', 'async', 'defer', 'fileSize', 'compression']);
    })
    .catch(error => {
        console.error(error);
    });
