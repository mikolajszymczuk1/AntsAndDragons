<template>
    <!-- Main game component -->
    <div>
        <div class="mt-[31px] sm:mt-[40px] w-[340px] mx-auto sm:w-[440px] md:w-[530px]">
            <GameBoard
                :board-data="board.getBoard()"
                @clicked-cell="placeGameElementOnBoard"
            />

            <!-- Under board panel -->
            <div class="flex justify-between items-center pl-[25px] pr-[7px] md:mt-[10px] md:pl-[30px]"
                :class="this.board.getSize() === 4 ? 'mt-[60px] md:mt-[100px]' : ''"
            >
                <p class="font-noto text-chinese-violet font-bold text-[0.9em] sm:text-[1.1em] md:text-[1.3em]">
                    Round: {{ round }}
                </p>
                
                <button class="lg:hidden" name="stats menu" aria-label="stats menu button"
                    @click="isStatsEventPanelActive = true"
                >
                    <DotsMenuIcon class="fill-chinese-violet w-[35px] h-auto sm:w-[45px]" />
                </button>
            </div>
        </div>

        <!-- Group of control buttons -->
        <div class="flex justify-center items-center mt-[35px] sm:mt-[30px]">
            <!-- Clear board button -->
            <GameControlButton class="w-[50px] h-[50px] sm:w-auto sm:h-auto sm:py-[14px] sm:px-[26px]"
                bg-color="#6d597a"
                @clicked="clearGameBoard()"
            >
                <ReplayIcon class="fill-[white] w-[19px] h-[19px] sm:mr-[10px]" />
                <span class="hidden sm:block">Restart</span>
            </GameControlButton>

            <!-- Next move button -->
            <GameControlButton class="w-[63px] h-[63px] sm:w-auto sm:h-auto mx-[20px] sm:py-[14px] sm:px-[26px]"
                bg-color="#e56b6f"
                @clicked="doNextMoveOnBoard()"
            >
                <PlayIcon class="fill-[white] w-[28px] h-[28px] sm:w-[19px] sm:h-[19px] sm:mr-[10px]" />
                <span class="hidden sm:block">Next Move</span>
            </GameControlButton>

            <!-- Edit mode button -->
            <GameControlButton class="w-[50px] h-[50px] sm:w-auto sm:h-auto sm:py-[14px] sm:px-[26px]"
                bg-color="#355070"
                @clicked="toggleEditMode()"
            >
                <ToolsIcon class="fill-[white] w-[19px] h-[19px] sm:mr-[10px]" />
                <span class="hidden sm:block">Edit Mode</span>
            </GameControlButton>
        </div>

        <GameStatsEventsPanel
            :stats-data="statsData"
            :element-stats-data="elementStatsData"
            :is-active="isStatsEventPanelActive"
            @exit-menu="isStatsEventPanelActive = false"
            @clear-board="clearGameBoard()"
            @change-board-size="changeGameBoardSize()"
        />
    </div>
</template>

<script>
    import Board from "@/gameElements/Board.js";
    import GameBoard from "@/components/game/GameBoard.vue";
    import GameControlButton from "@/components/game/GameControlButton.vue";
    import GameStatsEventsPanel from "@/components/game/GameStatsEventsPanel.vue";
    import DotsMenuIcon from "@/components/icons/DotsMenuIcon.vue";
    import ReplayIcon from "@/components/icons/ReplayIcon.vue";
    import PlayIcon from "@/components/icons/PlayIcon.vue";
    import ToolsIcon from "@/components/icons/ToolsIcon.vue";

    export default {
        name: "GameMain",
        components: {
            GameBoard,
            GameControlButton,
            GameStatsEventsPanel,
            DotsMenuIcon,
            ReplayIcon,
            PlayIcon,
            ToolsIcon
        },
        data() {
            return {
                board: null,
                round: 0,
                isEditMode: false,
                isStatsEventPanelActive: false,
                statsData: {
                    antsCount: 0,
                    dragonsCount: 0,
                    foodCount: 0
                },
                elementStatsData: {
                    health: 0,
                    positionX: 0,
                    positionY: 0
                }
            }
        },
        created() {
            this.board = new Board(8);
            this.board.createBoard();
        },
        methods: {
            // Place game element (Ant, Dragon, Food) on board
            // User can place game elements only when edit mode is active
            placeGameElementOnBoard(boardPosition) {
                if (!this.isEditMode) {
                    let { health, x, y } = this.board.getElementStats(boardPosition);
                    this.elementStatsData.health = health;
                    this.elementStatsData.positionX = x;
                    this.elementStatsData.positionY = y;
                    this.isStatsEventPanelActive = true;
                } else {
                    this.board.placeGameElement(boardPosition.x, boardPosition.y);
                    this.updateStatsData();
                }
            },
            
            // Clear game board
            clearGameBoard() {
                this.round = 0;
                this.board.clearBoard();
                this.updateStatsData();
            },

            // Turn on or turn off edit mode (When edit mode is true, user can place elements on board)
            toggleEditMode() {
                this.isEditMode = !this.isEditMode;
            },

            // Do next move on game board
            doNextMoveOnBoard() {
                this.round++;
                this.board.nextMove();
                this.updateStatsData();
            },

            // Update stats data
            updateStatsData() {
                let { ants, dragons, food } = this.board.countElements();
                this.statsData.antsCount = ants;
                this.statsData.dragonsCount = dragons;
                this.statsData.foodCount = food;
            },

            // Change game board size to 4x4 or 6x6 or 8x8
            changeGameBoardSize() {
                switch(this.board.getSize()) {
                    case 8:
                        this.board = new Board(4);
                        break;
                    case 6:
                        this.board = new Board(8);
                        break;
                    case 4:
                        this.board = new Board(6);
                        break;
                }

                this.board.createBoard();
                this.updateStatsData();
            }
        }
    }
</script>
