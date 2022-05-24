<template>
    <!-- Main game component -->
    <div>
        <GameBoard :board-data="board.getBoard()" />
    </div>
</template>

<script>
    import GameBoard from "@/components/game/GameBoard.vue";
    import Board from "@/gameElements/Board.js";

    export default {
        name: "GameMain",
        components: {
            GameBoard
        },
        data() {
            return {
                board: null
            }
        },
        created() {
            this.board = new Board(8);
            this.board.createBoard();
            console.log(this.board.getBoard());
        }
    }
</script>
