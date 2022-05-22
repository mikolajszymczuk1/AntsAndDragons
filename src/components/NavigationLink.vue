<template>
    <!-- Navigation link component -->
    <a class="font-noto text-[1.1em] text-y-in-mn-blue inline-flex justify-center items-center"
        :href="linkAddress"
    >
        <slot></slot>
    </a>
</template>

<script>
    export default {
        name: "NavigationLink",
        props: {
            linkAddress: {
                type: String,
                required: true
            }
        }
    }
</script>
