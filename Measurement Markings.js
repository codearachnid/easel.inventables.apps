/**
 * Name: Measurement Markings
 * Author: Timothy Wood @codearachnid
 * dependencies: none
 */
    var properties = [
      {id: "Machine Size", type: "list", value: "500", options: [["100", "500mm"], ["800", "1000mm"]]}
      // {id: "Depth of Cut", type: "range",value: 100, min: 3, max: 500, step: 1
    ];

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
        '<path d="' + paths(width,height,blockSize) + '" style="stroke:' + cutDepth + '; fill:none;" />',
        '</svg>'
        ].join("");

      success(svg);
    };


function paths(width,height,size){
  var blocks = [];
  for(var i=0;i<(height/size);i++){
    for(var ii=0;ii<(width/size);ii++){
       blocks.push( markingBlock(ii*size,i*size,size) );
    }
  }
  return blocks.join("");
}

function markingBlock(x,y,size){
  
  var block = [
    // moveTO( x, y ),
    // bounding box
    rect( x, y, size, size ),
    // edge lines
    edgeLine( 'top', y, x+size, markerLength ),
    edgeLine( 'left', x, y+size, markerLength ),
    edgeLine( 'right', x+size, y+size, markerLength ),
    edgeLine( 'bottom', y+size, x+size, markerLength ),
    // crosshair
    line( x+(size/2), y+(size/2)-markerLength, x+(size/2), y+(size/2)+markerLength ),
    line( x+(size/2)-markerLength, y+(size/2), x+(size/2)+markerLength, y+(size/2) ),
    ];
  return block.join(' '); 
}

function edgeLine( side, start, distance, increment ){
  var markers = [];
  for(var i=0;i<(distance/increment);i++){
    if( side == 'top' ){
      markers.push( line( i*increment, start, i*increment, start + markerLength ) );
    } else if ( side == 'bottom' ){
      markers.push( line( i*increment, start, i*increment, start - markerLength ) );
    } else if ( side == 'left' ){
      markers.push( line( start, i*increment, start + markerLength, i*increment ) );
    } else if ( side == 'right' ){
      // console.log(start, i*increment, start - markerLength, i*increment);
      markers.push( line( start, i*increment, start - markerLength, i*increment ) );
    }
  }
  return markers.join("");
}

function moveTO(x,y){
  return "M" + [x,y].join(',') + " ";
}

function line( x1, y1, x2, y2 ){
  return moveTO(x1,y1) + "L" + [x2,y2].join(',') + ' ';
}

function rect( x, y, w, h ){
  // top, bottom, left, right
  return [
    line( x, y, x+w, y ),
    line( x, y+h, x+w, y+h ),
    line( x, y, x, y+h ),
    line( x+w, y, x+w, y+h )
  ].join('');
}


