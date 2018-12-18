declare module "*.json" {
    const value: any;
    export default value;
}

interface NavigatorCordova extends Navigator {
    app: {
        exitApp: () => any; // Or whatever is the type of the exitApp function
    }
}

interface ListenerObject {
    [key: string]: Array<{ (data: any): void }>
}
