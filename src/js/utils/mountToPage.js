export default function (selector, Component) {
  function myEval (str) { return new Function('return ' + str)(); } // https://github.com/rollup/rollup/wiki/Troubleshooting#avoiding-eval (var myEval = eval)

  var searchJsExpression = new RegExp('\{((?:[^}{]+|\{(?:[^}{]+|\{[^}{]*\})*\})*)\}', 'g'); // visual regexp: https://regexper.com/#%2F%5C%7B%28%28%3F%3A%5B%5E%7D%7B%5D%2B%7C%5C%7B%28%3F%3A%5B%5E%7D%7B%5D%2B%7C%5C%7B%5B%5E%7D%7B%5D*%5C%7D%29*%5C%7D%29*%29%5C%7D%2Fg

  for (var target of document.querySelectorAll(selector)) {
    var props = {};
    for (var attribute of target.attributes) {
      var attrValue = target.getAttribute(attribute.name);
      var isWholeExpression;
      attrValue = attrValue.replace(searchJsExpression, function (jsExpressionFull, jsExpressionGroup) { // если атрибут содержит javascript-выражение "{...}" или "object: { JSON.stringify([{a:1}, {b:2}]) }" или "{x} + {y}"       /{(({.*})|[^\{\}])+?}/g
        isWholeExpression = attrValue.length === jsExpressionFull.length;
        if (isWholeExpression) return jsExpressionGroup; // if the entire attribute is a whole javascript expression, then we do not eval it now, we eval it later       
        else return myEval(jsExpressionGroup); // eval javascript expression and return to string (replace returns string)
      });
      if (isWholeExpression) props[attribute.name] = myEval(attrValue); // eval javascript expression and return raw value
      else props[attribute.name] = attrValue; // return string with eval chanks
    }
    new Component({
      target: target,
      props: props
    });
  }
}
