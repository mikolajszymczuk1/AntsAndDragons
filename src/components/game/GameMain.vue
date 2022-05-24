<template>
    <!-- Main game component -->
    <div>
        <GameBoard
            :board-data="board.getBoard()"
            @clicked-cell="placeGameElementOnBoard"
        />
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
        },
        methods: {
            // Place game element (Ant, Dragon, Food) on board
            placeGameElementOnBoard(boardPosition) {
                this.board.placeGameElement(boardPosition.x, boardPosition.y);
            }
        }
    }
</script>
