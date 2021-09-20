<script>
    import MainLayout from "./MainLayout.svelte";
    import Header from "./Header.svelte";
    import Footer from "./Footer.svelte";

    import { publicMenu } from "../menus";

    // console.log(publicMenu);
</script>

<MainLayout>
<Header listMenu={publicMenu}/>
<div class="min-h-screen w-screen">
<slot/>
</div>
<Footer/>
</MainLayout>