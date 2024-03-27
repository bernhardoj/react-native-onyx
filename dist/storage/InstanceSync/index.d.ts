/**
 *  This is used to keep multiple browser tabs in sync, therefore only needed on web
 *  On native platforms, we omit this syncing logic by setting this to mock implementation.
 */
declare const InstanceSync: {
    shouldBeUsed: boolean;
    init: any;
    setItem: any;
    removeItem: any;
    removeItems: any;
    multiMerge: any;
    multiSet: any;
    mergeItem: any;
    clear: <T extends () => void>(callback: T) => Promise<void>;
};
export default InstanceSync;
