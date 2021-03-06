.pragma library

var dimension = 8;
var mines = (function() { return initMinesweeper(); })();

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function initMinesweeper() {        
    var mines = [];
    var count = randomInt(1, dimension * dimension / 2);
    for (var i = 0; i < count; i++) {
        mines.push(randomInt(1, dimension * dimension));
    }

    return mines;
}

function isExplosivePosition(position) {
    return mines.indexOf(position) >= 0;
}

function explosiveSiblingCount(position) {
    var count = 0;

    // check the previous cell if this cell is not the first cell in this row
    function leftNeighborhood(position) {
        if(position % dimension != 0) {
            return isExplosivePosition(position - 1) ? 1 : 0;
        }

        return 0;
    }

    // check the next cell if this cell is not the last cell in this row
    function rightNeighborhood(position) {
        if((position + 1) % dimension != 0) {
            return isExplosivePosition(position + 1) ? 1 : 0;
        }

        return 0;
    }

    count += leftNeighborhood(position);
    count += rightNeighborhood(position);

    // check cells above this one
    if(position > dimension) {
        count += isExplosivePosition(position - dimension) ? 1 : 0;
        count += leftNeighborhood(position - dimension);
        count += rightNeighborhood(position - dimension);
    }

    // check cells below this one
    if(position + dimension < dimension * dimension) {
        count += isExplosivePosition(position + dimension) ? 1 : 0;
        count += leftNeighborhood(position + dimension);
        count += rightNeighborhood(position + dimension);
    }

    return count;
}

