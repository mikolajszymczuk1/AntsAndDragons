<template>
    <!-- Game control button component -->
    <button class="rounded-[10px] font-open font-semibold flex justify-center items-center"
        :style="`background-color: ${ bgColor }; color: ${ textColor };`"
        @click="handleClick()"
        data-test="control-button"
    >
        <slot></slot>
    </button>
</template>

<script>
    export default {
        name: "GameControlButton",
        props: {
            bgColor: {
                type: String,
                default: "#355070"
            },
            textColor: {
                type: String,
                default: "white"
            }
        },
        methods: {
            handleClick() {
                this.$emit("clicked");
            }
        }
    }
</script>
