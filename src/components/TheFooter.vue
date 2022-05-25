<template>
    <footer class="mt-[38px] md:mt-[39px]">
        <!-- Footer wave decoration -->
        <img class="w-[100%] h-auto md:hidden"
            src="@/assets/svg/FooterWave-mobile.svg"
            alt=""
            title=""
        >

        <img class="w-[100%] h-auto hidden md:block"
            src="@/assets/svg/FooterWave-desktop.svg"
            alt=""
            title=""
        >
        <!-- ---------------------- -->

        <div class="bg-y-in-mn-blue text-[white] text-center font-noto text-[1.3em] font-bold py-[78px] sm:py-[100px] sm:text-[1.5em] md:py-[129px] md:text-[2.2em]">
            Project created by <br>
            <span class=" text-tumbleweed">Mikołaj Szymczuk</span>
        </div>
    </footer>
</template>

<script>
    export default {
        name: "TheFooter"
    }
</script>
