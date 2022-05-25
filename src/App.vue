<template>
    <NavigationBar />
    
    <!-- Decoration corner -->
    <img class="absolute top-0 left-0 sm:w-[120px] md:w-[200px] lg:w-[289px]"
        src="@/assets/svg/DecorationCorner.svg"
        alt="Decoration wave corner icon"
        title="Decoration corner"
    >

    <main>
        <GameView />
    </main>

    <TheFooter />
</template>

<script>
import NavigationBar from "@/components/NavigationBar.vue";
import GameView from "@/views/GameView.vue";
import TheFooter from "@/components/TheFooter.vue";

export default {
    name: "App",
    components: {
        NavigationBar,
        GameView,
        TheFooter
    }
}
</script>
