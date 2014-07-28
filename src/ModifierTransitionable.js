define(function(require, exports, module) {

  var Engine = require('famous/core/Engine');
  var Surface = require('famous/core/Surface');
  var Modifier = require('famous/core/Modifier');
  var Transitionable = require('famous/transitions/Transitionable');
  var Easing = require('famous/transitions/Easing');

  var mainContext = Engine.createContext();

  var surfaceWidth = 1;

  // Row
  var rowSurface = new Surface({
    size: [undefined, surfaceWidth],
    properties: {
      backgroundColor: '#FA5C4F'
    }
  });
  var alignRow = new Transitionable([0.5, 0.5]);
  var originRow = new Transitionable([0.5, 0.5]);
  var modifierRowSurface = new Modifier({
    align: function () {
      return alignRow.get();
    },
    origin: function () {
      return originRow.get();
    }
  });

  // Column
  var colSurface = new Surface({
    size: [surfaceWidth, undefined],
    properties: {
      backgroundColor: '#FA5C4F'
    }
  });
  var alignCol = new Transitionable([0.5, 0.5]);
  var originCol = new Transitionable([0.5, 0.5]);
  var modifierColSurface = new Modifier({
    align: function () {
      return alignCol.get();
    },
    origin: function () {
      return originCol.get();
    }
  });


// Extra Background surface
  var pinkBackground = new Surface({
    size: [window.innerWidth, window.innerHeight],
    properties: {
      backgroundColor: 'pink'
    }
  });
  var redBackground = new Surface({
    size: [window.innerWidth, window.innerHeight],
    properties: {
      backgroundColor: '#7f110e'
    }
  });
  var pinkModifier = new Modifier({
    opacity: function() {

      var op = alignCol.get()[0] > 0 ? alignCol.get()[0] : 0;

      return 0.5 - op;
    }
  });
  var redModifier = new Modifier({
    opacity: function() {

      var op = alignCol.get()[0] > 0 ? alignCol.get()[0] : 0;

      return op;
    }
  });
  // Add Background
  mainContext.add(pinkModifier).add(pinkBackground);
  mainContext.add(redModifier).add(redBackground);


  // Add Row
  mainContext.add(modifierRowSurface).add(rowSurface);
  // Add Column
  mainContext.add(modifierColSurface).add(colSurface);


  /**
   * Animate surface on X and Y axis.
   */
  function _animateSurface (origin, align, axis, direction, duration, firstAnim, lastAnim) {

    var con = 0.5;

    var d = {
      x: {
        top: [
          [con, 1],
          [con, 0],
          [con, 0],
          [con, 1],
          [con, 0.5],
          [con, 0.5],
        ],
        bottom: [
          [con, 0],
          [con, 1],
          [con, 1],
          [con, 0],
          [con, 0.5],
          [con, 0.5],
        ]
      },
      y: {
        left: [
          [1, con],
          [0, con],
          [0, con],
          [1, con],
          [0.5, con],
          [0.5, con],
        ],
        right: [
          [0, con],
          [1, con],
          [1, con],
          [0, con],
          [0.5, con],
          [0.5, con],
        ]
      }
    };


    d = d[axis][direction];

    origin.set(d[0], {duration: duration, curve: firstAnim});
    align.set(d[1], {duration: duration, curve: firstAnim}, function () {

      origin.set(d[2], {duration: 0});
      align.set(d[3], {duration: 0}, function () {

        origin.set(d[4], {duration: 0});
        align.set(d[5], {duration: duration, curve: lastAnim});
      });
    });
  }


  // x
  _animateSurface(originRow, alignRow, 'x', 'top', 2000, Easing.outElastic, Easing.outElastic);
  // y
  _animateSurface(originCol, alignCol, 'y', 'left', 2000, Easing.outElastic, Easing.outElastic);

});
