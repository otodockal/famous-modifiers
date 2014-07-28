define(function(require, exports, module) {

  var Engine = require('famous/core/Engine');
  var Surface = require('famous/core/Surface');
  var Modifier = require('famous/core/Modifier');
  var Easing = require('famous/transitions/Easing');
  var StateModifier = require('famous/modifiers/StateModifier');

  var mainContext = Engine.createContext();

  var surfaceWidth = 1;

  // Row
  var rowSurface = new Surface({
    size: [undefined, surfaceWidth],
    properties: {
      backgroundColor: '#FA5C4F'
    }
  });
  var modifierRowSurface = new StateModifier({
    origin: [0.5, 0.5],
    align: [0.5, 0.5]
  });

  // Column
  var colSurface = new Surface({
    size: [surfaceWidth, undefined],
    properties: {
      backgroundColor: '#FA5C4F'
    }
  });
  var modifierColSurface = new StateModifier({
    origin: [0.5, 0.5],
    align: [0.5, 0.5]
  });

  // Add Row
  mainContext.add(modifierRowSurface).add(rowSurface);
  // Add Column
  mainContext.add(modifierColSurface).add(colSurface);


  /**
   * Animate surface on X and Y axis.
   */
  function _animateSurface (surf, axis, direction, duration, firstAnim, lastAnim) {

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

    surf.setOrigin(d[0], {duration: duration, curve: firstAnim});
    surf.setAlign(d[1], {duration: duration, curve: firstAnim}, function () {

      surf.setOrigin(d[2], {duration: 0});
      surf.setAlign(d[3], {duration: 0}, function () {

        surf.setOrigin(d[4], {duration: 0});
        surf.setAlign(d[5], {duration: duration, curve: lastAnim});
      });
    });
  }


  // x
  _animateSurface(modifierRowSurface, 'x', 'top', 2000, Easing.outElastic, Easing.outElastic);
  // y
  _animateSurface(modifierColSurface, 'y', 'left', 2000, Easing.outElastic, Easing.outElastic);


});
