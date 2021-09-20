<script>
    import {onMount} from "svelte";
    import Navbar from "./Navbar.svelte";
    import ripplet from 'ripplet.js';
    

    export let navType = 1;
    export let footerType = 1;
    let h = 0;

    onMount(function(){
        const rippleTarget = document.querySelectorAll('.clickable');
        if(rippleTarget.length > 0){
            for(let i = 0 ; i < rippleTarget.length ; i++){
                rippleTarget[i].addEventListener('click', ripplet);
            }
        }
    });

</script>

<div class="flex flex-col min-h-screen">
    <section id="headers" class="flex-shrink top-0 left-0 z-20 sticky">
        <Navbar/>
    </section>
    <section id="header2" class="w-screen left-0 z-20 hidden px-4">
        <p>text</p>
    </section>
    <div id="content" class="flex-grow md:mt-24 md:pt-8">
        <slot></slot>
    </div>
</div>