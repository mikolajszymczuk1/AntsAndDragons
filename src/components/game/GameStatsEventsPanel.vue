<template>
    <!-- Game stats / events panel component -->
    <div class="bg-[white] lg:bg-[transparent] w-[90%] rounded-[15px] absolute top-[13px] left-[50%] translate-x-[-50%] xsm:w-[348px] xsm:translate-x-0 xsm:left-auto xsm:right-[13px] md:top-[100px] lg:top-[150px] lg:right-[3.5%] xlg:right-[10%] lg:block py-[18px] px-[20px] shadow-[0_6px_25px_rgba(53,80,112,0.25)] lg:shadow-none lg:rounded-none"
        :class="isActive ? 'block' : 'hidden'"
    >
        <!-- Panel views container -->
        <div class="flex mb-[11px]">
            <GameControlButton class="w-[101px] h-[37px] text-[0.9em] mr-[11px]"
                bg-color="#e56b6f"
                @clicked="setCurrentPanel('stats')"
            >
                Stats
            </GameControlButton>

            <GameControlButton class="w-[101px] h-[37px] text-[0.9em]"
                bg-color="#6d597a"
                text-color="#eaac8b"
                @clicked="setCurrentPanel('events')"
            >
                Events
            </GameControlButton>
        </div>

        <!-- Panels -->
        <div class="relative overflow-hidden h-[415px] bg-y-in-mn-blue rounded-[12px] mb-[20px]">
            <button class="absolute top-[20px] bg-candy-pink right-[20px] w-[35px] h-[35px] lg:hidden rounded-[5px]"
                name="Exit button"
                aria-label="Exit from stats-events panel"
                @click="exitMenu()"
                data-test="exit-button"
            >
                <CrossIcon class="w-[100%] h-[100%] fill-[white]" />
            </button>

            <Transition mode="out-in"
                enter-active-class="animate__animated animate__fadeInRight animate__faster"
                leave-active-class="animate__animated animate__fadeOutLeft animate__faster"
            >
                <!-- Stats -->
                <div class="py-[33px] px-[48px] h-[100%]"
                    v-if="activePanel === 'stats'"
                >
                    <h3 class="text-center text-[white] font-open font-bold text-[1.6em]"
                        data-test="stats"
                    >
                        Stats
                    </h3>
    
                    <!-- List of basic stats -->
                    <p class="mt-[46px] mb-[30px] pb-[5px] font-open font-bold text-[white] text-[0.9em] border-b-[2px] border-solid border-b-[white]"
                        data-test="ants-count"
                    >
                        Ants: {{ statsData.antsCount }}
                    </p>
                    
                    <p class="pb-[5px] mb-[30px] font-open font-bold text-[white] text-[0.9em] border-b-[2px] border-solid border-b-[white]"
                        data-test="dragons-count"
                    >
                        Dragons: {{ statsData.dragonsCount }}
                    </p>
                    
                    <p class="pb-[5px] mb-[30px] font-open font-bold text-[white] text-[0.9em] border-b-[2px] border-solid border-b-[white]"
                        data-test="food-count"
                    >
                        Food: {{ statsData.foodCount }}
                    </p>
    
                    <div class="flex justify-between border-b-[2px] border-solid border-b-[white]">
                        <p class="pb-[5px] font-open font-bold text-[white] text-[0.9em]" data-test="health">Health: {{ elementStatsData.health }}</p>
                        <p class="pb-[5px] font-open font-bold text-[white] text-[0.9em]" data-test="element-stats">X : {{ elementStatsData.positionX }} | Y : {{ elementStatsData.positionY }}</p>
                    </div>
                </div>
        
                <!-- Events -->
                <div class="overflow-auto h-[100%] py-[33px] px-[25px]"
                    v-else
                >
                    <h3 class="mb-[26px] text-center text-[white] font-open font-bold text-[1.6em]"
                        data-test="events"
                    >
                        Events
                    </h3>

                    <TransitionGroup tag="div"
                        enter-active-class="animate__animated animate__bounceIn"
                        leave-active-class="animate__animated animate__bounceOut"
                    >
                        <div class="bg-[white] text-y-in-mn-blue py-[15px] mb-[13px] last:mb-0 font-open font-bold text-[0.9em] text-center rounded-[12px]"
                            v-for="e in eventsList"
                            :key="e.id"
                            data-test="event"
                        >
                            <span>{{ e.event.title }}</span>
                        </div>
                    </TransitionGroup>
                </div>
            </Transition>
        </div>

        <!-- Under panels -->
        <div class="p-[25px] bg-cinnamon-satin rounded-[12px]">
            <GameControlButton class="w-[100%] h-[50px] mb-[15px]"
                bg-color="#e56b6f"
                @clicked="clearBoard()"
            >
                Clear Board
            </GameControlButton>

            <GameControlButton class="w-[100%] h-[50px]"
                bg-color="white"
                text-color="#355070"
                @clicked="changeBoardSize()"
            >
                Change Board Size
            </GameControlButton>
        </div>
    </div>
</template>

<script>
    import GameControlButton from "@/components/game/GameControlButton.vue";
    import CrossIcon from "@/components/icons/CrossIcon.vue";

    export default {
        name: "GameStatsEventsPanel",
        components: {
            GameControlButton,
            CrossIcon
        },
        props: {
            isActive: {
                type: Boolean
            },
            statsData: {
                type: Object,
                required: true
            },
            elementStatsData: {
                type: Object,
                required: true
            },
            eventsList: {
                type: Array,
                required: true
            }
        },
        data() {
            return {
                activePanel: "stats"
            }
        },
        methods: {
            // Set which panel is now active
            setCurrentPanel(panelName) {
                this.activePanel = (panelName === "stats") ? "stats" : "events";
            },

            // Send exit emit
            exitMenu() {
                this.$emit("exit-menu");
            },

            // Emit clear board event
            clearBoard() {
                this.$emit("clear-board");
            },

            // Emit change board size event
            changeBoardSize() {
                this.$emit("change-board-size");
            }
        }
    }
</script>
