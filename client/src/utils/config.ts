export const TREE_MAX_BRANCH_DISTANCE = 10; // the max length of the branch span width
export const TREE_MAX_SPREAD_DEPTH = 10; // the max depth for branch spread
export const TREE_BRANCH_SPAN_DISTANCE = 20; // the length of the branch span height
export const TREE_SPREAD_PROBABILITY = 0.6; // the probability of spread

// TODO refactor
export const TRIANGLE_SIZE = 20;
export const SQUARE_SIZE = 20;

export const PLAYER_SPEED = 2;
export const PLAYER_MOVE_INIT_SPEED = 70; // (1/s)
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
