<h1>Hello {name}!</h1>
<CompApp answer={42}></CompApp>
<CompApp answer={ [{a:1}, {b:2}] }></CompApp>
<CompApp answer="result { JSON.stringify([{a:1}, {b:2}]) }"></CompApp>
<!-- <my-comp name="qwerty"></my-comp> -->

<script>
  import CompApp from './Comp.svelte';

  // export {default as Comp} from './Comp.html';

  export var name = 'world';
</script>