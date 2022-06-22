<template>
    <!-- Navigation bar component -->
    <nav class="relative h-[90px] sm:overflow-hidden md:h-[150px]">
        <!-- Container with all navigation links -->
        <div class="absolute top-[13px] left-[50%] translate-x-[-50%] w-[90%] h-[355px] rounded-[13px] bg-[white] flex-col justify-center items-center shadow-[0_6px_25px_rgba(53,80,112,0.25)] z-[1] sm:static sm:w-[100%] sm:h-auto sm:translate-x-[20px] sm:flex sm:flex-row sm:shadow-none sm:pt-[20px] md:pt-[32px]"
            :class="isMenuActive ? 'flex' : 'hidden'"
        >
            <!-- Close menu button -->
            <button class="w-[25px] h-[25px] absolute top-[20px] right-[20px] sm:hidden"
                name="Close menu"
                aria-label="Close menu icon button"
                @click="toggleMenu()"
                data-test="close-button"
            >
                <CrossIcon class="fill-y-in-mn-blue" />
            </button>
            
            <NavigationLink class="mb-[28px] sm:mb-0 sm:mr-[39px]" link-address="#Game">Play</NavigationLink>
            
            <NavigationLink class="mb-[28px] sm:mb-0 sm:mr-[200px] md:mr-[250px]" link-address="#Source">
                <GithubIcon class="w-[15px] h-[15px] fill-y-in-mn-blue mr-[5px]" />
                Source
            </NavigationLink>
            
            <NavigationLink class="mb-[28px] sm:mb-0 sm:mr-[39px]" link-address="#GameRules">Game Rules</NavigationLink>
            <NavigationLink class="" link-address="#Author">Author</NavigationLink>
        </div>

        <!-- Decoration logo image -->
        <img class="absolute left-[50%] top-[-46px] translate-x-[-50%] md:w-[230px] md:top-[-65px]"
            src="@/assets/svg/NavigationTriangleDecoration.svg"
            alt="Logo with ant icon"
            title ="Ants & Dragons Logo"
        >

        <!-- Menu button -->
        <button class="w-[25px] h-[25px] absolute right-[47px] top-[24px] sm:hidden"
            name="Menu button"
            aria-label="Menu icon button"
            @click="toggleMenu()"
            data-test="menu-button"
        >
            <MenuIcon class="fill-y-in-mn-blue" />
        </button>
    </nav>
</template>

<script>
    import NavigationLink from "@/components/NavigationLink.vue";
    import GithubIcon from "@/components/icons/GithubIcon.vue";
    import MenuIcon from "@/components/icons/MenuIcon.vue";
    import CrossIcon from "@/components/icons/CrossIcon.vue";

    export default {
        name: "NavigationBar",
        components: {
            NavigationLink,
            GithubIcon,
            MenuIcon,
            CrossIcon
        },
        data() {
            return {
                isMenuActive: false
            }
        },
        methods: {
            // Change state of menu
            toggleMenu() {
                this.isMenuActive = !this.isMenuActive;
            }
        }
    }
</script>
