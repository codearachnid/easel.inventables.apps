
    var properties = [
      {id: "Machine Size", type: "list", value: "500", options: [["300", "500mm"], ["800", "1000mm"]]}
    ];

    var cutDepth = "rgb(100,100,100)";
    var markerLength = 5;

    var executor = function(args, success, failure) {
      var params = args[0];
      var dimension = "mm";
      var height = params["Machine Size"];
      var width = params["Machine Size"];
      var left = 0;
      var bottom = 0;
      var depth = "rgb(215,215,215)";
      cutDepth = depth;
      
      var svg = ['<?xml version="1.0" standalone="no"?>',
        '<svg xmlns="http://www.w3.org/2000/svg" version="1.0" width="' + width + dimension + '" height="' + height + dimension + '" viewBox="' + left + ' ' + bottom + ' ' + width + ' ' + height + '">',
        '<path d="' + paths() + '" style="stroke:' + cutDepth + '; fill:none;" />',
        '</svg>'
        ].join("");

      success(svg);
    };


function paths(){
  return markingBlock(0,0,50);
  // return 'M0,0, L100,100';
}

function markingBlock(x,y,size){
  
  var block = [
    'M' + [x,y].join(','),
    // rect( x, y, size, size ),
    // edgelines
    // edgeLine( 'left', x, y+size, markerLength ),
    // edgeLine( 'right', x+size, y+size, markerLength ),
    // edgeLine( 'top', y, x+size, markerLength ),
    // edgeLine( 'bottom', y+size, x+size, markerLength ),
    // crosshair
    line( x+(size/2), x+(size/2), y+(size/2)-markerLength, y+(size/2)+markerLength ),
    line( x+(size/2)-markerLength, x+(size/2)+markerLength, y+(size/2), y+(size/2) ),
    ];
  return block.join(' '); 
}

function edgeLine( side, start, distance, increment ){
  var markers = [];
  for(var i=0;i<(distance/increment);i++){
    if( side == 'top' ){
      markers.push( line( i*increment, i*increment, start, start + markerLength ) );
    } else if ( side == 'bottom' ){
      markers.push( line( i*increment, i*increment, start, start - markerLength ) );
    } else if ( side == 'left' ){
      markers.push( line( start, start + markerLength, i*increment, i*increment ) );
    } else if ( side == 'right' ){
      markers.push( line( start, start - markerLength, i*increment, i*increment ) );
    }
  }
  return 'L' + markers.join("") + ' ';
}

function line( x1, x2, y1, y2 ){
  f = f || 'transparent';
  s = s || cutDepth;
  sw = sw || 1;
  // return '<line x1="' + x1 + '" x2="' + x2 + '" y1="' + y1 + '" y2="' + y2 + '" stroke="' + s + '" fill="' + f + '" stroke-width="' + sw + '" />';
  return "M" + [x1,y1].join(',') + " L" + [x2,y2].join(',') + ' ';
}

function rect( x, y, w, h, s, f, sw, rx, ry ){
  f = f || 'transparent';
  s = s || cutDepth;
  sw = sw || 1;
  rx = rx || 0;
  ry = ry || 0;
  return '<rect x="' + x + '" y="' + y + '" rx="' + rx + '" ry="' + ry + '" width="' + w + '" height="' + h + '" stroke="' + s + '" fill="' + f + '" stroke-width="' + sw + '" />';
}


