var file_to_store

function getReadFile(reader, i) {
    return function () {
        var li = document.querySelector('[data-idx="' + i + '"]');

        li.innerHTML += 'File starts with "' + reader.result.substr(0, 25) + '"';
    }
}

function readFiles(files) {
    document.getElementById('count').innerHTML = files.length;

    var target = document.getElementById('target');
    target.innerHTML = '';

    for (var i = 0; i < files.length; ++i) {
        var item = document.createElement('li');
        item.setAttribute('data-idx', i);
        var file = files[i];
        //----
        file_to_store=file;

        var reader = new FileReader();
        reader.addEventListener('load', getReadFile(reader, i));
        reader.readAsText(file);

        item.innerHTML = '' + file.name + ', ' + file.type + ', ' + file.size + ' bytes, last modified ' + file.lastModifiedDate + '';
        target.appendChild(item);
    };
}

async function writeFile() {
    if (!window.chooseFileSystemEntries) {
        alert('Native File System API not supported');
        return;
    }

    const target = document.getElementById('target');
    target.innerHTML = 'Opening file handle...';

    const handle = await window.chooseFileSystemEntries({
        type: 'save-file',
    });

    const file = await handle.getFile()
    const writer = await handle.createWriter();
    await writer.write(0, 'Hello world from What Web Can Do!');
    await writer.close()

    target.innerHTML = 'Test content written to ' + file.name + '.';}




////



if ('localStorage' in window || 'sessionStorage' in window) {
    var selectedEngine;

    var logTarget = document.getElementById('target');
    var valueInput = document.getElementById('value');

    var reloadInputValue = function () {
        console.log(selectedEngine, window[selectedEngine].getItem('myKey'))
        valueInput.value = window[selectedEngine].getItem('myKey') || '';
    }

    var selectEngine = function (engine) {
        selectedEngine = engine;
        reloadInputValue();
    };

    function handleChange(change) {
        var timeBadge = new Date().toTimeString().split(' ')[0];
        var newState = document.createElement('p');
        newState.innerHTML = '' + timeBadge + ' ' + change + '.';
        logTarget.appendChild(newState);
    }

    var radios = document.querySelectorAll('#selectEngine input');
    for (var i = 0; i < radios.length; ++i) {
        radios[i].addEventListener('change', function () {
            selectEngine(this.value)
        });
    }

    selectEngine('localStorage');

    valueInput.addEventListener('keyup', function () {
        //window[selectedEngine].setItem('myKey', this.value);
        window[selectedEngine].setItem('myKey', file_to_store);
    });

    var onStorageChanged = function (change) {
        var engine = change.storageArea === window.localStorage ? 'localStorage' : 'sessionStorage';
        handleChange('External change in ' + engine + ': key ' + change.key + ' changed from ' + change.oldValue + ' to ' + change.newValue + '');
        if (engine === selectedEngine) {
            reloadInputValue();
        }
    }

    window.addEventListener('storage', onStorageChanged);}