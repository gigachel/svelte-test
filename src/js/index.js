import mountToPage from './utils/mountToPage.js';
import App from './App.svelte';
import Comp from './Comp.svelte';

console.time(1);
mountToPage('my-app', App);
mountToPage('my-component', Comp);
console.timeEnd(1);