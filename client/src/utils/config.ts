export const TREE_MAX_BRANCH_DISTANCE = 10; // the max length of the branch span width
export const TREE_MAX_SPREAD_DEPTH = 10; // the max depth for branch spread
export const TREE_BRANCH_SPAN_DISTANCE = 20; // the length of the branch span height
export const TREE_SPREAD_PROBABILITY = 0.6; // the probability of spread

// TODO refactor
export const TRIANGLE_SIZE = 50;
export const SQUARE_SIZE = 50;

export const PLAYER_SPEED = 2;
export const PLAYER_JUMP_INIT_SPEED = 100; // (1/s)

export enum EVENT_TIMEOUT {
    shoot = 200,
    jump = 200,
    skill = 200,
    ult = 200,
    left = 200,
    right = 200,
}
