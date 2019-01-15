declare module "*.json" {
    const value: any;
    export default value;
}

declare module '*.mp3';

interface NavigatorCordova extends Navigator {
    app: {
        exitApp: () => any; // Or whatever is the type of the exitApp function
    }
}

interface ListenerObject {
    [key: string]: Array<{ (data: any): void }>
}

interface AnyObject {
    [key: string]: any
}
interface NumberObject {
    [key: string]: number
}
interface SocketMsg {
    [index: number]: number;
}
