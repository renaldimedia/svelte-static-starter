<script>
    import { school, pageLoader } from "../stores/index";
    import {authToken, loadToken} from "../stores/auth";
    import Notifications from "svelte-notifications";
    import Notification from "./Notification.svelte";
    import Loader from "./Loader.svelte";

    
    let x = loadToken();
    authToken.set(x);
  
    let loading = 0;
    let loaded = false;

    pageLoader.subscribe((val) => {
        if(val){
            loading++;
        }else{
            if(loading > 0){
                loading--;
            }
            
        }
    })
  
    $: {
      if (!loaded && typeof $school.id) {
        loaded = true;
      }
    }
  </script>
  {#if loading > 0}
    <div class="fixed w-screen h-screen bg-white z-50">
        <Loader />
    </div>
  {/if}
  {#if !loaded}
    <div class="w-screen h-screen z-40 flex items-center justify-center">
      <h2>Memuat data, mohon tunggu..</h2>
    </div>
  {/if}
  {#if loaded}
    <Notifications item={Notification}>
      <div class="min-h-screen max-w-screen">
        <slot />
      </div>
    </Notifications>
  {/if}
  