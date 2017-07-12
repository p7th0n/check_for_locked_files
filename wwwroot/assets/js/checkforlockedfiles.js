// checkforlockedfiles.js

const DATA_JSON = '/assets/data/output.json';
const WATCHED_JSON = '/assets/data/watchlist.json';
const READY = 200;
const ONE = 1;
const ZERO = 0;
const TRUNCATED_LENGTH = 12;
const ONE_SECOND = 1000;
const DELAY = 10000;
const FADE = 500;

/**
 * loads locked file JSON data
 * @param {*} path  - location of JSON file
 * @param {*} success - function on success
 * @param {*} error - function on error
 * @returns {void}
 */
var loadJSON = function (path, success, error) {
    var xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === READY) {
                if (success) {
                    console.log('data xhr', Object.keys(JSON.parse(xhr.response)));
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
 * loads watched JSON data
 * @param {*} path  - location of JSON file
 * @param {*} success - function on success
 * @param {*} error - function on error
 * @returns {void}
 */
var loadWatchedJSON = function (path, success, error) {
    var xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === READY) {
                if (success) {
                    console.log('watched xhr', Object.keys(JSON.parse(xhr.response)));
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
var handleXhrError = function (xhr) {
    // Handle error
    console.log('xhr error: ', xhr);
}

/**
 * updates time stamp on web page
 * @returns {void}
 */
var updateTimeStamp = function () {
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
var updateList = function (data) {
    console.log('updateList data: ', data);
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
                if (element.ShareRelativePath.substring(element.ShareRelativePath.lastIndexOf('\\') + ONE).indexOf('.') > ZERO) {
                    divPath.appendChild(document.createTextNode(element.ShareRelativePath.substring(element.ShareRelativePath.lastIndexOf('\\') + ONE)));
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
 * updates watched list
 * @param {*} data data returned from JSON
 * @returns {void}
 */
var updateWatched = function (data) {
    console.log('updateWatched watched: ', data);
    var index = 0;
    var keys = data.watchList;
    var ul = document.getElementById('watch-list-ul');
    var liHead = document.createElement('li');
    var divHead = document.createElement('div');

    // console.log('watched list keys: ', keys, keys.length > ZERO);

    ul.innerHTML = '';
    divHead.appendChild(document.createTextNode('Watched Items'));
    divHead.setAttribute('class', 'head-row');
    liHead.appendChild(divHead);
    ul.appendChild(liHead);

    keys.forEach(function (element) {
        // console.log('watchedItem: ', element);
        var li = document.createElement('li');
        var divWatchedItem = document.createElement('div');

        divWatchedItem.appendChild(document.createTextNode(element));
        divWatchedItem.setAttribute('class', 'div-path');
        li.appendChild(divWatchedItem);
        ul.appendChild(li);
    })
}


/**
 * loadJSON
 * @returns {void}
 */
function fetchData() {
    loadJSON(DATA_JSON,
        updateList,
        handleXhrError);

    loadWatchedJSON(WATCHED_JSON,
        updateWatched,
        handleXhrError);
}

/**
 * main function on document ready
 * @returns {void}
 */
(function () {
    console.log('Ready');

    fetchData();

    setInterval(fetchData, DELAY);
})()

window.onload = function () {
    //
    var ul = document.getElementById('watch-list-ul');
    var watchedHead = document.getElementsByClassName('watch-list-head')[ZERO];

    watchedHead.addEventListener('mouseover', function () {
        // ul.style.visibility = 'visible';
        ul.className = '';
        ul.classList.add('add');
        setTimeout(function () {
            ul.classList.add('show');

            console.log('fade', ul.classList);
        }, FADE);
    });
    watchedHead.addEventListener('mouseout', function () {
        // ul.style.visibility = 'hidden';
        ul.className = '';
        ul.classList.add('hide');
        setTimeout(function () {
            ul.classList.add('remove');
            console.log('fade', ul.classList);
        }, FADE);
    });
}
