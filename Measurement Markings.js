/**
 * Name: Measurement Markings
 * Description: Build a measurement pattern for your diy wasteboard project. Blocks are 50mm square with crosshairs.
 * Author: Timothy Wood @codearachnid
 * dependencies: none
 */
var properties = [{
    id: "Machine Size",
    type: "list",
    value: "300",
    options: [
        ["300", "500mm"],
        ["800", "1000mm"]
    ]
}];

var markerLength = 5;

var executor = function(args, success, failure) {
    var params = args[0];
    var dimension = "mm";
    var height = params["Machine Size"];
    var width = params["Machine Size"];
    var left = 0;
    var bottom = 0;
    var cutDepth = "rgb(215,215,215)";
    var blockSize = 50;

    var svg = ['<?xml version="1.0" standalone="no"?>',
        '<svg xmlns="http://www.w3.org/2000/svg" version="1.0" width="' + width + dimension + '" height="' + height + dimension + '" viewBox="' + left + ' ' + bottom + ' ' + width + ' ' + height + '">',
        '<path d="' + paths(width, height, blockSize) + '" style="stroke:' + cutDepth + '; fill:none;" />',
        '</svg>'
    ].join("");
    success(svg);
};


function paths(width, height, size) {
    var blocks = [];
    for (var i = 0; i <= (height / markerLength); i++) {
        // horizontal dividers
        if ((i * markerLength) % size === 0) {
            blocks.push(line(0, i * markerLength, 'H', width));
        }
        for (var ii = 0; ii <= (width / markerLength); ii++) {
            if ((ii * markerLength) % size === 0) {
                // vertical dividers
                blocks.push(line(ii * markerLength, 0, 'V', height));
                // vertical edgelines
                if (i <= (height / markerLength) && (i === 0 || ii === 0) && (ii * markerLength) + (markerLength / 2) <= width) {
                    blocks.push(line((ii * markerLength), i * markerLength, 'H', (ii * markerLength) + (markerLength / 2)));
                } else if (ii == (width / markerLength) && ii > 0) {
                    blocks.push(line((ii * markerLength), i * markerLength, 'H', (ii * markerLength) - (markerLength / 2)));
                } else {
                    blocks.push(line((ii * markerLength) - (markerLength / 2), i * markerLength, 'H', (ii * markerLength) + (markerLength / 2)));
                }
            }
            // horizontal edgelines
            if ((i * markerLength) % size === 0) {
                if (ii <= (width / markerLength) && (i === 0 || ii === 0) && (i * markerLength) + (markerLength / 2) <= height) {
                    blocks.push(line((ii * markerLength), i * markerLength, 'V', (i * markerLength) + (markerLength / 2)));
                } else if (i == (height / markerLength)) {
                    blocks.push(line((ii * markerLength), i * markerLength, 'V', (i * markerLength) - (markerLength / 2)));
                } else {
                    blocks.push(line((ii * markerLength), (i * markerLength) - (markerLength / 2), 'V', (i * markerLength) + (markerLength / 2)));
                }
            }

            if (i < (height / size) && ii < (width / size)) {
                // crosshairs
                blocks.push(crosshair((i * size) + (size / 2), (ii * size) + (size / 2)));
            }
        }
    }
    return blocks.join("");
}


function moveTO(x, y) {
    return "M" + [x, y].join(',') + " ";
}

function line(x, y, direction, distance) {
    return moveTO(x, y) + direction.toUpperCase() + distance + " ";
}

function crosshair(x, y) {
    return [
        line(x, y + (markerLength / 2), 'V', y - (markerLength / 2)),
        line(x + (markerLength / 2), y, 'H', x - (markerLength / 2))
    ].join(' ');
}
