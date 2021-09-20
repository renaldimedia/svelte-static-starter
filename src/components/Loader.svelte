<script>
    import Spinner from "svelte-spinner";
  
    export let classes = "w-full h-full border rounded-lg bg-gray-400";
    export let style = "";
    export let msg = "Memuat halaman";
  </script>
  
  <div
    class="{classes} flex flex-col items-center justify-center"
    {style}
  >
    <Spinner size="50" speed="750" color="#A82124" thickness="2" gap="40" />
    <p>{msg}</p>
  </div>
  