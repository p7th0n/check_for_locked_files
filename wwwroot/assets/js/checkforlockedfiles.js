// checkforlockedfiles.js

const DATA_JSON = '/assets/data/output.json';
const READY = 200;
const ONE = 1;
const ZERO = 0;
const TRUNCATED_LENGTH = 12;
const ONE_SECOND = 1000;
const DELAY = 10000;

/**
 * loads locked file JSON data
 * @param {*} path  - location of JSON file
 * @param {*} success - function on success
 * @param {*} error - function on error
 * @returns {void}
 */
function loadJSON(path, success, error) {
    var xhr = new XMLHttpRequest();


    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === READY) {
                if (success) {
                    // console.log('xhr', Object.keys(JSON.parse(xhr.response)));
                    success(JSON.parse(xhr.responseText));
                    if (xhr.getResponseHeader('Last-Modified')) {
                        var lastChanged = document.getElementById('last-changed');

                        lastChanged.innerHTML = 'Last changed: ' + new Date(xhr.getResponseHeader('Last-Modified')).toLocaleString();
                    }
                }
            } else if (error) {
                handleXhrError(xhr);
            }
        }
    };
    xhr.open('GET', path, true);
    xhr.send();
}

/**
 * handle error
 * @param {*} xhr request object
 * @returns {void}
 */
function handleXhrError(xhr) {
}

/**
 * updates time stamp on web page
 * @returns {void}
 */
function updateTimeStamp() {
    var lastScanned = document.getElementById('last-scanned');
    var now = new Date().toLocaleString();

    if (lastScanned) {
        lastScanned.innerHTML = 'Last scanned: ' + now;
    }
}

/**
 * updates locked files list
 * @param {*} data data returned from JSON
 * @returns {void}
 */
function updateList(data) {
    // console.log('updateList: ', data);
    var index = 0;
    var keys = Object.keys(data);
    var ul = document.getElementById('locked-list');
    var liHead = document.createElement('li');

    // console.log('keys: ', keys);

    var divPathHead = document.createElement('div');
    var divUserHead = document.createElement('div');
    var divComputerHead = document.createElement('div');

    ul.innerHTML = '';

    divPathHead.appendChild(document.createTextNode('Locked File'));
    divPathHead.setAttribute('class', 'div-path head-row');

    divUserHead.appendChild(document.createTextNode('User'));
    divUserHead.setAttribute('class', 'div-user head-row');

    divComputerHead.appendChild(document.createTextNode('Computer Name'));
    divComputerHead.setAttribute('class', 'div-computer head-row');

    liHead.appendChild(divPathHead);
    liHead.appendChild(divUserHead);
    liHead.appendChild(divComputerHead);
    ul.appendChild(liHead);

    while (keys.length > index) {
        if (data[keys[index]]) {
            data[keys[index]].forEach(function (element) {
                var li = document.createElement('li');
                var divPath = document.createElement('div');
                var divUser = document.createElement('div');
                var divComputer = document.createElement('div');

                // Hide directories -- paths without '.' extensions
                if (element.Path.substring(element.Path.lastIndexOf('\\') + ONE).indexOf('.') > ZERO) {
                    divPath.appendChild(document.createTextNode(element.Path.substring(element.Path.lastIndexOf('\\') + ONE)));
                    divPath.setAttribute('class', 'div-path');

                    divUser.appendChild(document.createTextNode(element.ClientUserName.substring(element.ClientUserName.lastIndexOf('\\') + ONE).substring(ZERO, TRUNCATED_LENGTH) + '...'));
                    divUser.setAttribute('class', 'div-user');

                    divComputer.appendChild(document.createTextNode(element.ClientComputerName.substring(ZERO, TRUNCATED_LENGTH) + '...'));
                    divComputer.setAttribute('class', 'div-computer');

                    li.appendChild(divPath);
                    li.appendChild(divUser);
                    li.appendChild(divComputer);
                    ul.appendChild(li);
                }
            });
        };
        index += ONE;
    }
    updateTimeStamp();
}


/**
 * loadJSON
 * @returns {void}
 */
function fetchData() {
    loadJSON(DATA_JSON,
        updateList,
        handleXhrError);
    // updateTimeStamp();
}

/**
 * main function on document ready
 * @returns {void}
 */
(function () {
    // console.log('Ready');

    // updateTimeStamp();
    fetchData();

    setInterval(fetchData, DELAY);
})()

