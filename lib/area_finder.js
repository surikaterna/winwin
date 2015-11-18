var AREAS = require('./areas');

function getArea(bounds, posX, posY) {
  var height = bounds.bottom - bounds.top;
  var width = bounds.right - bounds.left;
  var pctY = posY / height;
  var pctX = posX / width;
  // calculate slopes
  var oAD = pctX / pctY > 1;
  var oCB = pctX / (1 - pctY) <= 1;
  var area = null;
  if (oAD) {
    if (oCB) {
      area = AREAS.TOP;
    } else {
      area = AREAS.RIGHT;
    }
  } else {
    if (oCB) {
      area = AREAS.LEFT;
    } else {
      area = AREAS.BOTTOM;
    }
  }
  return area
}

module.exports = function getAreaFromEvent(event) {
  var target = event.currentTarget;
  var bounds = target.getBoundingClientRect();
  var posY = event.clientY - bounds.top;
  var posX = event.clientX - bounds.left;
  return getArea(bounds, posX, posY);
}
