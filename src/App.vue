<template>
    <NavigationBar />

    <div>
        <HomeView />
    </div>
</template>

<script>
import NavigationBar from "@/components/NavigationBar.vue";
import HomeView from "@/views/HomeView.vue";

export default {
    name: "App",
    components: {
        NavigationBar,
        HomeView
    }
}
</script>
