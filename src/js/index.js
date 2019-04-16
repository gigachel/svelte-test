import App from './App.svelte';
import Comp from './Comp.html';
// export { default as Comp } from './Comp.html';


function mountToPage(selector, Component) {
  for (var target of document.querySelectorAll(selector)) {
    var props = {};
    // for (var attribute of target.attributes) props[attribute.name] = target.getAttribute(attribute.name);
    for (var attribute of target.attributes) {
      var attrValue = target.getAttribute(attribute.name);
      attrValue = attrValue.replace(/{.+?}/g, function (jsExpression) { // вдруг атрибут содержит javascript-выражение {...}
        if (attrValue.length === jsExpression.length) return jsExpression; // если весь атрибут javascript-выражение, то не вычисляем, вычислим позже        
        else return eval(jsExpression); // вычисляем javascript-выражение и возвращаем в строку (replace возвращает строку)
      });      
      if (isWholeExpression) props[attribute.name] = eval(attrValue);
      else props[attribute.name] = attrValue;
    }
    
    new Component({
      target: target,
      // hydrate: true,
      props: props
    });
  }
}

// console.time("render");
mountToPage('my-app', App);
mountToPage('my-component', Comp);
// mount('my-component', function (resolve) { require(['./Comp.html'], resolve); });
// console.timeEnd("render");



// const comp = new Comp({
//   target: document.querySelector('#comp'), // вместо document.body укажите любой другой html element
//   // например document.getElementById('some-widget');
//   props: {
//     // assuming App.svelte contains something like
//     // `export let answer`:
//     answer: 42
//   }
// });


// // console.log(Comp, "Comp");
// // console.log(new Comp({}), "new Comp({})");
// // console.log(result, "result");

// window.app = app;

// // export default Comp;
// export default app;


