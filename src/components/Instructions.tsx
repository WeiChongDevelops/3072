
export default function Instructions() {
    return (<p>
        Use your arrow keys to move the blocks. When two blocks with the same number touch, they merge into one with their sum!
        With every move, another small block appears on an empty spot in the grid.
        The goal is to combine blocks to create a block with the number '3072'.
        The game is over when the grid is filled and you cannot make a move to merge blocks.
    </p>);
}