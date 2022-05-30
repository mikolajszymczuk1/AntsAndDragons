<template>
    <!-- Game board component -->
    <div>
        <!-- Generate column numbers -->
        <div class="flex justify-center mb-[10px] font-noto font-semibold text-y-in-mn-blue text-[0.8em] sm:text-[0.9em] md:text-[1.2em]">
            <div class="flex justify-center w-[34px] mr-[5px] last:mr-0 first:opacity-0 first:w-auto sm:w-[44px] sm:mr-[8px] md:w-[54px]"
                v-for="num in (getNumberOfColumns + 1)"
                :key="num"
            >
                {{ num - 1 }}
            </div>
        </div>

        <!-- Generate rows -->
        <div class="flex justify-center items-center mb-[5px] last:mb-0 sm:mb-[8px]"
            v-for="row, rowIndex in boardData"
            :key="rowIndex"
        >
            <!-- Row number -->
            <div class="flex items-center mr-[10px] font-noto font-semibold text-y-in-mn-blue text-[0.8em] sm:text-[0.9em] md:text-[1.2em]">
                {{ rowIndex + 1 }}
            </div>

            <!-- Generate columns -->
            <div class="animate__animated animate__bounceIn transition-colors duration-[250ms] hover:bg-cinnamon-satin flex justify-center items-center rounded-[5px] mr-[5px] w-[34px] h-[34px] last:mr-0 sm:w-[44px] sm:h-[44px] sm:mr-[8px] md:w-[54px] md:h-[54px] cursor-pointer"
                v-for="col, colIndex in row"
                :key="colIndex"
                :class="col !== ' ' ? 'bg-chinese-violet' : 'bg-tumbleweed/80'"
                @click="emitCords(colIndex, rowIndex)"
            >
                <Transition enter-active-class="animate__animated animate__fadeIn animate__faster">
                    <AntIcon v-if="col !== ' ' && col.getName() === 'Ant'" />
                    <DragonIcon v-else-if="col !== ' ' && col.getName() === 'Dragon'" />
                    <FoodIcon v-else-if="col !== ' ' && col.getName() === 'Food'" />
                </Transition>
            </div>
        </div>
    </div>
</template>

<script>
    import AntIcon from "@/components/icons/AntIcon.vue";
    import DragonIcon from "@/components/icons/DragonIcon.vue";
    import FoodIcon from "@/components/icons/FoodIcon.vue";

    export default {
        name: "GameBoard",
        components: {
            AntIcon,
            DragonIcon,
            FoodIcon
        },
        props: {
            boardData: {  // 2D Array
                type: Array,
                required: true,
                validator(value) {  // Must be 2D array
                    if (value.length === 0) { return false; }
                    if (value[0].constructor !== Array) { return false; }
                    return true;
                }
            }
        },
        computed: {
            // Return number of columns in board array
            getNumberOfColumns() {
                if (!this.boardData[0]) return 0;
                return this.boardData[0].length;
            }
        },
        methods: {
            // Emit clicked cell cords to parent component
            emitCords(posX, posY) {
                this.$emit("clicked-cell", { x: posX, y: posY });
            }
        }
    }
</script>
