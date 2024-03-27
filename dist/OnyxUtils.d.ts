export default OnyxUtils;
declare namespace OnyxUtils {
    export { METHOD };
    export { getMergeQueue };
    export { getMergeQueuePromise };
    export { getCallbackToStateMapping };
    export { getDefaultKeyStates };
    export { initStoreValues };
    export { sendActionToDevTools };
    export { maybeFlushBatchUpdates };
    export { batchUpdates };
    export { get };
    export { getAllKeys };
    export { isCollectionKey };
    export { isCollectionMemberKey };
    export { splitCollectionMemberKey };
    export { isKeyMatch };
    export { isSafeEvictionKey };
    export { tryGetCachedValue };
    export { removeLastAccessedKey };
    export { addLastAccessedKey };
    export { removeFromEvictionBlockList };
    export { addToEvictionBlockList };
    export { addAllSafeEvictionKeysToRecentlyAccessedList };
    export { getCachedCollection };
    export { keysChanged };
    export { keyChanged };
    export { sendDataToConnection };
    export { addKeyToRecentlyAccessedIfNeeded };
    export { getCollectionDataAndSendAsObject };
    export { scheduleSubscriberUpdate };
    export { scheduleNotifyCollectionSubscribers };
    export { remove };
    export { reportStorageQuota };
    export { evictStorageAndRetry };
    export { broadcastUpdate };
    export { hasPendingMergeForKey };
    export { removeNullValues };
    export { prepareKeyValuePairsForStorage };
    export { applyMerge };
    export { initializeWithDefaultKeyStates };
}
declare namespace METHOD {
    let SET: string;
    let MERGE: string;
    let MERGE_COLLECTION: string;
    let MULTI_SET: string;
    let CLEAR: string;
}
/**
 * Getter - returns the merge queue.
 *
 * @returns {Object} The callback to state mapping.
 */
declare function getMergeQueue(): Object;
/**
 * Getter - returns the merge queue promise.
 *
 * @returns {Object} The callback to state mapping.
 */
declare function getMergeQueuePromise(): Object;
/**
 * Getter - returns the callback to state mapping.
 *
 * @returns {Object} The callback to state mapping.
 */
declare function getCallbackToStateMapping(): Object;
/**
 * Getter - returns the default key states.
 *
 * @returns {Object} The callback to state mapping.
 */
declare function getDefaultKeyStates(): Object;
/**
 * Sets the initial values for the Onyx store
 *
 * @param {Object} keys - `ONYXKEYS` constants object from Onyx.init()
 * @param {Object} initialKeyStates - initial data to set when `init()` and `clear()` are called
 * @param {Array<String>} safeEvictionKeys - This is an array of keys (individual or collection patterns) that when provided to Onyx are flagged as "safe" for removal.
 */
declare function initStoreValues(keys: Object, initialKeyStates: Object, safeEvictionKeys: Array<string>): void;
/**
 * Sends an action to DevTools extension
 *
 * @param {string} method - Onyx method from METHOD
 * @param {string} key - Onyx key that was changed
 * @param {any} value - contains the change that was made by the method
 * @param {any} mergedValue - (optional) value that was written in the storage after a merge method was executed.
 */
declare function sendActionToDevTools(method: string, key: string, value: any, mergedValue?: any): void;
/**
 * We are batching together onyx updates. This helps with use cases where we schedule onyx updates after each other.
 * This happens for example in the Onyx.update function, where we process API responses that might contain a lot of
 * update operations. Instead of calling the subscribers for each update operation, we batch them together which will
 * cause react to schedule the updates at once instead of after each other. This is mainly a performance optimization.
 * @returns {Promise}
 */
declare function maybeFlushBatchUpdates(): Promise<any>;
declare function batchUpdates(updates: any): Promise<any>;
/**
 * Get some data from the store
 *
 * @private
 * @param {string} key
 * @returns {Promise<*>}
 */
declare function get(key: string): Promise<any>;
/**
 * Returns current key names stored in persisted storage
 * @private
 * @returns {Promise<Set<Key>>}
 */
declare function getAllKeys(): Promise<Set<Key>>;
/**
 * Checks to see if the a subscriber's supplied key
 * is associated with a collection of keys.
 *
 * @param {String} key
 * @returns {Boolean}
 */
declare function isCollectionKey(key: string): boolean;
/**
 * @param {String} collectionKey
 * @param {String} key
 * @returns {Boolean}
 */
declare function isCollectionMemberKey(collectionKey: string, key: string): boolean;
/**
 * Splits a collection member key into the collection key part and the ID part.
 * @param {String} key - The collection member key to split.
 * @returns {Array<String>} A tuple where the first element is the collection part and the second element is the ID part.
 */
declare function splitCollectionMemberKey(key: string): Array<string>;
/**
 * Checks to see if a provided key is the exact configured key of our connected subscriber
 * or if the provided key is a collection member key (in case our configured key is a "collection key")
 *
 * @private
 * @param {String} configKey
 * @param {String} key
 * @return {Boolean}
 */
declare function isKeyMatch(configKey: string, key: string): boolean;
/**
 * Checks to see if this key has been flagged as
 * safe for removal.
 *
 * @private
 * @param {String} testKey
 * @returns {Boolean}
 */
declare function isSafeEvictionKey(testKey: string): boolean;
/**
 * Tries to get a value from the cache. If the value is not present in cache it will return the default value or undefined.
 * If the requested key is a collection, it will return an object with all the collection members.
 *
 * @param {String} key
 * @param {Object} mapping
 * @returns {Mixed}
 */
declare function tryGetCachedValue(key: string, mapping?: Object): Mixed;
/**
 * Remove a key from the recently accessed key list.
 *
 * @private
 * @param {String} key
 */
declare function removeLastAccessedKey(key: string): void;
/**
 * Add a key to the list of recently accessed keys. The least
 * recently accessed key should be at the head and the most
 * recently accessed key at the tail.
 *
 * @private
 * @param {String} key
 */
declare function addLastAccessedKey(key: string): void;
/**
 * Removes a key previously added to this list
 * which will enable it to be deleted again.
 *
 * @private
 * @param {String} key
 * @param {Number} connectionID
 */
declare function removeFromEvictionBlockList(key: string, connectionID: number): void;
/**
 * Keys added to this list can never be deleted.
 *
 * @private
 * @param {String} key
 * @param {Number} connectionID
 */
declare function addToEvictionBlockList(key: string, connectionID: number): void;
/**
 * Take all the keys that are safe to evict and add them to
 * the recently accessed list when initializing the app. This
 * enables keys that have not recently been accessed to be
 * removed.
 *
 * @private
 * @returns {Promise}
 */
declare function addAllSafeEvictionKeysToRecentlyAccessedList(): Promise<any>;
/**
 * @private
 * @param {String} collectionKey
 * @returns {Object}
 */
declare function getCachedCollection(collectionKey: string): Object;
/**
 * When a collection of keys change, search for any callbacks matching the collection key and trigger those callbacks
 *
 * @private
 * @param {String} collectionKey
 * @param {Object} partialCollection - a partial collection of grouped member keys
 * @param {boolean} [notifyRegularSubscibers=true]
 * @param {boolean} [notifyWithOnyxSubscibers=true]
 */
declare function keysChanged(collectionKey: string, partialCollection: Object, notifyRegularSubscibers?: boolean | undefined, notifyWithOnyxSubscibers?: boolean | undefined): void;
/**
 * When a key change happens, search for any callbacks matching the key or collection key and trigger those callbacks
 *
 * @example
 * keyChanged(key, value, subscriber => subscriber.initWithStoredValues === false)
 *
 * @private
 * @param {String} key
 * @param {*} data
 * @param {*} prevData
 * @param {Function} [canUpdateSubscriber] only subscribers that pass this truth test will be updated
 * @param {boolean} [notifyRegularSubscibers=true]
 * @param {boolean} [notifyWithOnyxSubscibers=true]
 */
declare function keyChanged(key: string, data: any, prevData: any, canUpdateSubscriber?: Function | undefined, notifyRegularSubscibers?: boolean | undefined, notifyWithOnyxSubscibers?: boolean | undefined): void;
/**
 * Sends the data obtained from the keys to the connection. It either:
 *     - sets state on the withOnyxInstances
 *     - triggers the callback function
 *
 * @private
 * @param {Object} mapping
 * @param {Object} [mapping.withOnyxInstance]
 * @param {String} [mapping.statePropertyName]
 * @param {Function} [mapping.callback]
 * @param {String} [mapping.selector]
 * @param {*|null} val
 * @param {String|undefined} matchedKey
 * @param {Boolean} isBatched
 */
declare function sendDataToConnection(mapping: {
    withOnyxInstance?: Object | undefined;
    statePropertyName?: string | undefined;
    callback?: Function | undefined;
    selector?: string | undefined;
}, val: any | null, matchedKey: string | undefined, isBatched: boolean): void;
/**
 * We check to see if this key is flagged as safe for eviction and add it to the recentlyAccessedKeys list so that when we
 * run out of storage the least recently accessed key can be removed.
 *
 * @private
 * @param {Object} mapping
 */
declare function addKeyToRecentlyAccessedIfNeeded(mapping: Object): void;
/**
 * Gets the data for a given an array of matching keys, combines them into an object, and sends the result back to the subscriber.
 *
 * @private
 * @param {Array} matchingKeys
 * @param {Object} mapping
 */
declare function getCollectionDataAndSendAsObject(matchingKeys: any[], mapping: Object): void;
/**
 * Schedules an update that will be appended to the macro task queue (so it doesn't update the subscribers immediately).
 *
 * @example
 * scheduleSubscriberUpdate(key, value, subscriber => subscriber.initWithStoredValues === false)
 *
 * @param {String} key
 * @param {*} value
 * @param {*} prevValue
 * @param {Function} [canUpdateSubscriber] only subscribers that pass this truth test will be updated
 * @returns {Promise}
 */
declare function scheduleSubscriberUpdate(key: string, value: any, prevValue: any, canUpdateSubscriber?: Function | undefined): Promise<any>;
/**
 * This method is similar to notifySubscribersOnNextTick but it is built for working specifically with collections
 * so that keysChanged() is triggered for the collection and not keyChanged(). If this was not done, then the
 * subscriber callbacks receive the data in a different format than they normally expect and it breaks code.
 *
 * @param {String} key
 * @param {*} value
 * @returns {Promise}
 */
declare function scheduleNotifyCollectionSubscribers(key: string, value: any): Promise<any>;
/**
 * Remove a key from Onyx and update the subscribers
 *
 * @private
 * @param {String} key
 * @return {Promise}
 */
declare function remove(key: string): Promise<any>;
/**
 * @private
 * @returns {Promise<void>}
 */
declare function reportStorageQuota(): Promise<void>;
/**
 * If we fail to set or merge we must handle this by
 * evicting some data from Onyx and then retrying to do
 * whatever it is we attempted to do.
 *
 * @private
 * @param {Error} error
 * @param {Function} onyxMethod
 * @param  {...any} args
 * @return {Promise}
 */
declare function evictStorageAndRetry(error: Error, onyxMethod: Function, ...args: any[]): Promise<any>;
/**
 * Notifys subscribers and writes current value to cache
 *
 * @param {String} key
 * @param {*} value
 * @param {Boolean} hasChanged
 * @param {Boolean} wasRemoved
 * @returns {Promise}
 */
declare function broadcastUpdate(key: string, value: any, hasChanged: boolean, wasRemoved?: boolean): Promise<any>;
/**
 * @param {String} key
 * @returns {Boolean}
 */
declare function hasPendingMergeForKey(key: string): boolean;
/**
 * Removes a key from storage if the value is null.
 * Otherwise removes all nested null values in objects and returns the object
 * @param {String} key
 * @param {Mixed} value
 * @returns {Mixed} The value without null values and a boolean "wasRemoved", which indicates if the key got removed completely
 */
declare function removeNullValues(key: string, value: Mixed): Mixed;
/**
 * Storage expects array like: [["@MyApp_user", value_1], ["@MyApp_key", value_2]]
 * This method transforms an object like {'@MyApp_user': myUserValue, '@MyApp_key': myKeyValue}
 * to an array of key-value pairs in the above format and removes key-value pairs that are being set to null
 * @private
 * @param {Record} data
 * @return {Array} an array of key - value pairs <[key, value]>
 */
declare function prepareKeyValuePairsForStorage(data: any): any[];
/**
 * Merges an array of changes with an existing value
 *
 * @private
 * @param {*} existingValue
 * @param {Array<*>} changes Array of changes that should be applied to the existing value
 * @param {Boolean} shouldRemoveNullObjectValues
 * @returns {*}
 */
declare function applyMerge(existingValue: any, changes: Array<any>, shouldRemoveNullObjectValues: boolean): any;
/**
 * Merge user provided default key value pairs.
 * @private
 * @returns {Promise}
 */
declare function initializeWithDefaultKeyStates(): Promise<any>;
