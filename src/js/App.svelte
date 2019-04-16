<h1>Hello {name}!</h1>
<CompApp answer={42}></CompApp>
<!-- <my-comp name="qwerty"></my-comp> -->

<script>
  import CompApp from './Comp.html';

  // export {default as Comp} from './Comp.html';

  export var name = 'world';
</script>