(function() {
    // Funktion zum Starten der Analyse
    function startAnalysis(cssClassName) {
        // Leere den Inhalt der Konsole
        console.clear();

        // Wähle das div-Element mit der angegebenen CSS-Klasse
        var navLinksDiv = document.querySelector('.' + cssClassName);

        // Überprüfe, ob das div-Element existiert
        if (navLinksDiv) {
            // Finde alle <a>-Tags innerhalb des div-Elements
            var linksInNav = navLinksDiv.getElementsByTagName('a');
            
            // Initialisiere ein Array, um die URLs zu speichern
            var urlsInNav = [];
            
            // Iteriere durch alle <a>-Tags und extrahiere die href-Attribute
            for (var i = 0; i < linksInNav.length; i++) {
                var url = linksInNav[i].getAttribute('href');
                if (url) {
                    urlsInNav.push(url);
                }
            }

            // Finde alle <a>-Tags auf der gesamten Seite
            var allLinks = document.getElementsByTagName('a');
            
            // Initialisiere ein Array, um die URLs zu speichern
            var allUrls = [];
            
            // Iteriere durch alle <a>-Tags und extrahiere die href-Attribute
            for (var i = 0; i < allLinks.length; i++) {
                var url = allLinks[i].getAttribute('href');
                if (url) {
                    allUrls.push(url);
                }
            }

            // Finde die gemeinsamen URLs
            var commonUrls = urlsInNav.filter(function(url) {
                return allUrls.includes(url);
            });

            // Logge die Anzahl der gefundenen URLs
            console.log('Anzahl der gefundenen Links im div "' + cssClassName + '":', urlsInNav.length);
            console.log('Anzahl der gefundenen Links auf der gesamten Seite:', allUrls.length);

            // Berechne die Prozentsätze
            var percentInNav = (urlsInNav.length / allUrls.length) * 100;
            
            // Bestimme die Farbe basierend auf dem Prozentsatz
            var color;
            if (percentInNav <= 30) {
                color = '\x1b[42m'; // Grün
            } else if (percentInNav <= 50) {
                color = '\x1b[103m'; // Heller Gelbton
            } else {
                color = '\x1b[41m'; // Rot
            }

            // Erstelle den gefüllten Balken als Text
            var totalLength = 50;  // Gesamtlänge des Balkens in Zeichen
            var filledLength = Math.round((totalLength * percentInNav) / 100);
            var emptyLength = totalLength - filledLength;

            var filledBar = color + ' '.repeat(filledLength) + '\x1b[0m';
            var emptyBar = '\x1b[47m' + ' '.repeat(emptyLength) + '\x1b[0m'; // Hellgrau
            var bar = filledBar + emptyBar;

            console.log(`Prozentuale Darstellung der Links: ${bar} (${percentInNav.toFixed(2)}%)`);

            // Erstelle das aufklappbare Element
            console.groupCollapsed(`Links im div "${cssClassName}" (${urlsInNav.length}):`);

            // Logge die Links im div "nav-links" in Tabellenform
            var urlsInNavTable = urlsInNav.map((url, index) => ({ Index: index + 1, URL: url }));
            console.table(urlsInNavTable);

            // Schließe das aufklappbare Element
            console.groupEnd();
        } else {
            console.log('Kein div-Element mit der Klasse "' + cssClassName + '" gefunden.');
        }
    }

    // Frage nach dem CSS-Klassennamen
    var cssClassName = prompt("Bitte geben Sie den CSS-Klassennamen ein:");
    if (cssClassName) {
        startAnalysis(cssClassName);
    } else {
        console.log("Kein CSS-Klassenname eingegeben. Analyse abgebrochen.");
    }
})();
