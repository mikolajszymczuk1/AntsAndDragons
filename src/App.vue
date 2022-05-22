<template>
    <NavigationBar />

    <main>
        <GameView />
    </main>
</template>

<script>
import NavigationBar from "@/components/NavigationBar.vue";
import GameView from "@/views/GameView.vue";

export default {
    name: "App",
    components: {
        NavigationBar,
        GameView
    }
}
</script>
