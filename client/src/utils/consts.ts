export enum DATA_TYPE {
    HEART_BEAT = 0,
    CHECK_USERNAME = 1,
    OVERLOAD = 2,
    CLOSE = 3,
    FIND_PARTNER = 4,
    EVENT = 5,
    BACKGROUND = 122,
    CHARACTER = 222,
}

export enum BG_TYPE {
    TREE = 0,
    OBSTACLE = 1,
}

export enum CANVAS_TYPE {
    TYPE_STAGE = 'stage', // like character, bullet, barrier
    TYPE_BG = 'bg', // the background does not affect to user
}

export enum GAME_STATUS {
    INIT = 0,
    WAIT = 1,
    GAME = 2,
}


export const SOCKET_HEART_BEAT_TIMEOUT = 10000;
export const SOCKET_RECONNECT_TIMEOUT = 5000;
export const SOCKET_FETCH_TIMEOUT = 3000;

export const NOTIFY_SHOW_TIMEOUT = 300;
export const NOTIFY_FADEOUT_TIMEOUT = 3000;
export enum NOTIFY_TYPE {
    INFO = 'info',
    ERROR = 'error',
    SUCCESS = 'success',
}

export const VALID_USERNAME_LIST = process.env.username.split('|') as string[];

export enum EVENT_TYPE {
    shoot,
    jump,
    skill,
    ult,
    left,
    right,
}

const lyric = '[00:00.28]在停止的时间之中\n[00:02.36]寻找着沉睡的你\n[00:05.17]无论有谁阻挡\n[00:06.93]最终 我来到你的身边\n[00:09.60]结束这漫长的旅途\n[00:12.34]现在 回到你身边\n[00:14.80]向着名为你的家\n[00:16.50]现在 再次\n[00:17.97]\n[00:39.33]就像无论再怎么用力关上\n[00:41.75]也会再次打开的抽屉一般\n[00:44.36]飞向天空高处的你\n[00:46.12]总是会回到我的身边\n[00:49.02]就算强忍住这离别之痛\n[00:51.40]一切依旧如故\n[00:53.48]\n[00:57.46]在走过的数不清的路上\n[00:59.94]我发现了你\n[01:02.39]我曾空荡的心\n[01:04.62]就这样再次被你填满\n[01:07.06]在脚步的尽头之处\n[01:09.14]总是与你相邂逅\n[01:11.58]就那样\n[01:14.16]到此为止吧\n[01:17.05]在停止的时间之中\n[01:18.82]寻找着沉睡的你\n[01:21.24]无论有谁阻挡\n[01:23.64]最终 我来到你的身边\n[01:25.70]结束这漫长的旅途\n[01:29.15]现在 回到你身边\n[01:31.09]向着名为你的家\n[01:33.29]现在 再次\n[01:34.86]\n[01:55.40]打开安静沉睡着的房间\n[01:57.73]取出记忆\n[02:00.07]在那破碎的时间上\n[02:02.18]清晰地浮想起你\n[02:04.33]在我迷失路途的心中\n[02:07.20]一直活着被禁锢住的你\n[02:09.24]就那样\n[02:11.67]到此为止吧\n[02:14.72]在停止的时间之中\n[02:16.41]寻找着沉睡的你\n[02:19.08]无论有谁阻挡\n[02:21.12]最终 我来到你的身边\n[02:23.67]结束这漫长的旅途\n[02:26.44]现在 回到你身边\n[02:28.37]向着名为你的家\n[02:31.16]现在 再次\n[02:32.36]\n[02:34.72]翻转世界\n[02:36.86]只为寻你\n[02:39.05]唯有由你\n[02:41.19]能写下终章\n[02:44.09]就算失去一切\n[02:49.04]我有你一个便足矣\n[03:03.58]此处 光芒熄灭\n[03:05.26]将我拥入怀中吧\n[03:12.14]闭上眼睛\n[03:14.27]无声无息地涌上来\n[03:16.50]在我的心上\n[03:18.99]由你层层叠起\n[03:21.51]对于我而言\n[03:24.49]谁都无法取代的你 是如此重要\n[03:26.61]回来我身边吧\n[03:28.74]直到那一天\n[03:30.15]\n[03:31.57]'
export const LYRICS = lyric.split('\n').map(str => {
    const strs = str.split(/[\]\[]/);
    const times : string[] = strs[1].split(/[:.]/);
    const second = Number(times[0]) * 60 + Number(times[1]) + Number(times[2]) / 100;
    return {
        ts: second * 1000,
        lyc: strs[2],
    }
});

export const LETTER = process.env.letter;

export const END_CHAT = process.env.endChat;
