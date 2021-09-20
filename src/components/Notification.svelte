<script>
  export let notification = {};
  // `onRemove` function will be passed into your component.
  export let onRemove = null;

  const tipe = {
      'error': 'bg-red-500 text-white',
      'success': 'bg-green-500',
      'warning': 'bg-red-300 text-gray-600',
        'info': 'bg-blue-500 text-gray-600'
  }

  const handleButtonClick = () => {
    onRemove();
  }
</script>

<div class="{notification.type === '' ? 'bg-white' : tipe[notification.type]} px-4 py-2 rounded-lg border flex items-center justify-between mb-2" style="z-index:99999;">
  <!-- <h4>{notification.heading}</h4> -->
  <p>{notification.text}</p>
  <button on:click={handleButtonClick}>
    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
</button>
</div>
