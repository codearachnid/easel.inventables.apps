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
},{
  id: "Box Size",
  type: "list",
  value: "50",
  options: [
    ["50", "50mm"],
    ["100", "100mm"],
    ["150", "150mm"],
    ["200", "200mm"],
    ["300", "300mm"],
    ["400", "400mm"]
  ]
}];

var executor = function(args, success, failure) {
    var params = args[0];
    var dimension = "mm";
    var height = params["Machine Size"];
    var width = params["Machine Size"];
    var left = 0;
    var bottom = 0;
    var cutDepth = "rgb(215,215,215)";
    var boxSize = params["Box Size"];
    var markerLength = 5;
    var markerSpacing = {
      "50": 5,
      "100": 10,
      "150": 20,
      "200": 20,
      "300": 20,
      "400": 20,
    };

    var svg = ['<?xml version="1.0" standalone="no"?>',
        '<svg xmlns="http://www.w3.org/2000/svg" version="1.0" width="' + width + dimension + '" height="' + height + dimension + '" viewBox="' + left + ' ' + bottom + ' ' + width + ' ' + height + '">',
        '<path d="' + paths(width, height, boxSize, markerLength, markerSpacing[boxSize]) + '" style="stroke:' + cutDepth + '; fill:none;" />',
        '</svg>'
    ].join("");
    success(svg);
};


function paths(width, height, size, markerLength, markerSpacing) {
    var blocks = [];
    for (var i = 0; i <= (height / markerSpacing); i++) {
        // horizontal dividers
        if ((i * markerSpacing) % size === 0) {
            blocks.push(line(0, i * markerSpacing, 'H', width));
        }
        for (var ii = 0; ii <= (width / markerSpacing); ii++) {
            if ((ii * markerSpacing) % size === 0) {
                // vertical dividers
                blocks.push(line(ii * markerSpacing, 0, 'V', height));
                // vertical edgelines
                if (i <= (height / markerSpacing) && (i === 0 || ii === 0) && (ii * markerSpacing) + (markerSpacing / 2) <= width) {
                    blocks.push(line((ii * markerSpacing), i * markerSpacing, 'H', (ii * markerSpacing) + (markerSpacing / 2)));
                } else if (ii == (width / markerSpacing) && ii > 0) {
                    blocks.push(line((ii * markerSpacing), i * markerSpacing, 'H', (ii * markerSpacing) - (markerSpacing / 2)));
                } else {
                    blocks.push(line((ii * markerSpacing) - (markerSpacing / 2), i * markerSpacing, 'H', (ii * markerSpacing) + (markerSpacing / 2)));
                }
            }
            // horizontal edgelines
            if ((i * markerSpacing) % size === 0) {
                if (ii <= (width / markerSpacing) && (i === 0 || ii === 0) && (i * markerSpacing) + (markerSpacing / 2) <= height) {
                    blocks.push(line((ii * markerSpacing), i * markerSpacing, 'V', (i * markerSpacing) + (markerSpacing / 2)));
                } else if (i == (height / markerSpacing)) {
                    blocks.push(line((ii * markerSpacing), i * markerSpacing, 'V', (i * markerSpacing) - (markerSpacing / 2)));
                } else {
                    blocks.push(line((ii * markerSpacing), (i * markerSpacing) - (markerSpacing / 2), 'V', (i * markerSpacing) + (markerSpacing / 2)));
                }
            }

            if (i < (height / size) && ii < (width / size)) {
                // crosshairs
                blocks.push(crosshair((i * size) + (size / 2), (ii * size) + (size / 2), markerLength));
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

function crosshair(x, y, l) {
    return [
        line(x, y + (l / 2), 'V', y - (l / 2)),
        line(x + (l / 2), y, 'H', x - (l / 2))
    ].join(' ');
}
