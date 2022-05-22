<template>
    <NavigationBar />

    <div>
        <GameView />
    </div>
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
