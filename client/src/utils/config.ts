export const TREE_MAX_BRANCH_DISTANCE = 10; // the max length of the branch span width
export const TREE_MAX_SPREAD_DEPTH = 10; // the max depth for branch spread
export const TREE_BRANCH_SPAN_DISTANCE = 20; // the length of the branch span height
export const TREE_SPREAD_PROBABILITY = 0.6; // the probability of spread

// TODO refactor
export const TRIANGLE_SIZE = 20;
export const SQUARE_SIZE = 20;

export const PLAYER_SPEED = 2;
// export const PLAYER_MOVE_INIT_SPEED = 70; // (1/s)
export const PLAYER_MOVE_INIT_SPEED = 370; // (1/s)
export const PLAYER_JUMP_INIT_SPEED = 300; // (1/s)


export const GRAVITATIONAL_ACCELERATION = 350;
/**********************
 * TODO use differential equation
 * comment for my GF Li
 * f=-kv=ma
 **********************/
export const PLAYER_A_QUALITY = 12;
export const RATIO_SPEED_FORCE = 1;
export const RESISTANCE_ACCELERATION = 50; // FIXME remove

export enum EVENT_TIMEOUT {
    shoot = 200,
    jump = 200,
    skill = 200,
    ult = 200,
    left = 100,
    right = 100,
}

export const SNOW_MAX_SPEED = 50;
export const SNOW_MIN_SPEED = 20;
export const SNOW_DENSITY = 15; // the snow create in a unity time(1s)
export const SNOW_MAX_SIZE = 3;
export const SNOW_MIX_SIZE = 1;
export const SNOW_MAX_OPACITY = 0.9;
export const SNOW_MIN_OPACITY = 0;
export const WIND_INTENSITY = 0;

export const FIR_TREE_DENSITY = 4; // the fir tree create in FIR_TREE_DENSITY_UNIT(1/m)
export const FIR_TREE_DENSITY_UNIT = 1200; // will divide with a random number between 300 and 1
export const FIR_TREE_MAX_DEPTH = 5;
export const FIR_TREE_MIN_DEPTH = 3;
export const FIR_TREE_BRANCH_MAX_HEIGHT = 30;
export const FIR_TREE_BRANCH_MIN_HEIGHT = 15;
export const FIR_TREE_LEAF_MAX_WIDTH = 200;
export const FIR_TREE_LEAF_MIN_WIDTH = 100;
export const FIR_TREE_LEAF_MAX_HEIGHT = 200;
export const FIR_TREE_LEAF_MIN_HEIGHT = 100;
export const FIR_TREE_LEAF_DECREMENT_MAX_RATE = 0.8;
export const FIR_TREE_LEAF_DECREMENT_MIN_RATE = 0.65;
export const FIR_TREE_GROW_UP_SPEED = 50; // (1/s)
