import { NativeModules, Platform } from 'react-native'
import StackTrace from 'stacktrace-js'

const RNBuglyNative = NativeModules.RNBugly

export default class RNBugly {

    static listen = () => {
        if (__DEV__) {
            return
        }
        var originalHandler = global.ErrorUtils.getGlobalHandler()

        let errorHandler = (e, isFatal) => {
            StackTrace.fromError(e, { offline: true }).then((x) => {
                let category = 5
                let errorType = e.message
                let errorMsg = e.message
                let stack = x.map(row => {
                    let node = row.source
                    return node
                }).join('\n')
                this.postException({
                    category,
                    errorType,
                    errorMsg,
                    stack
                })
            }).catch(e => {
            	// And then re-throw the exception with the original handler
	            if (originalHandler) {
	                if (Platform.OS === 'ios') {
	                    originalHandler(e, isFatal);
	                } else {
	                    // On Android, throwing the original exception immediately results in the
	                    // recordCustomExceptionName() not finishing before the app crashes and therefore not logged
	                    // Add a delay to give it time to log the custom JS exception before crashing the app.
	                    // The user facing effect of this delay is that separate JS errors will appear as separate
	                    // issues in the Crashlytics dashboard.
	                    setTimeout(() => {
	                        originalHandler(e, isFatal);
	                    }, 500);
	                }
	            }
            })
        }
        global.ErrorUtils.setGlobalHandler(errorHandler);
    }


    /**
     * 设置当前的用户id
     * 精确定位到某个用户的异常
     * @param userId 
     */
    static setUserId = function(userId) {
        if (Platform.OS === 'android') {
            RNBuglyNative.setUserId(userId);
        } else {
            RNBuglyNative.setUserIdentifier(userId);
        }
    }

    static setAppVersion = function(version) {
        if (Platform.OS === 'android') {
            RNBuglyNative.setAppVersion(version);
        } else {
            RNBuglyNative.updateAppVersion(version);
        }
    }

    static setAppChannel = function(appChannel) {
        if (Platform.OS === 'android') {
            RNBuglyNative.setAppChannel(appChannel);
        } else {

        }
    }

    static setAppPackage = function(appPackage) {
        if (Platform.OS === 'android') {
            RNBuglyNative.setAppPackage(appPackage);
        } else {

        }
    }

    static setTag = function(tagId) {
        if (Platform.OS === 'android') {
            RNBuglyNative.setUserSceneTag(tagId);
        } else {
            RNBuglyNative.setTag(tagId);
        }
    }

    /**
     * 自定义Map参数可以保存发生Crash时的一些自定义的环境信息。在发生Crash时会随着异常信息一起上报并在页面展示。
     * 最多可以有9对自定义的key-value（超过则添加失败）；
     * key限长50字节，value限长200字节，过长截断；
     * key必须匹配正则：[a-zA-Z[0-9]]+。
     * @param {*} userKey 
     * @param {*} userValue 
     */
    static putUserData = function(userKey, userValue) {
        return RNBuglyNative.putUserData(userKey, userValue);
    }

    /**
     * Android Only,获取本地已有升级策略（非实时，可用于界面红点展示）
     */
    static getUpgradeInfo = function() {
        return RNBuglyNative.getUpgradeInfo();
    }

    /**
     * Android Only,检查更新
     * @param isManual  用户手动点击检查，非用户点击操作请传false
     * @param isSilence 是否显示弹窗等交互，[true:没有弹窗和toast] [false:有弹窗或toast]
     */
    static checkUpgrade = function(params) {
        RNBuglyNative.checkUpgrade(params);
    }

    /**
     * Android Only,打印日志
     * 用户传入TAG和日志内容。该日志将在Logcat输出，并在发生异常时上报。
     * @param {*} level 
     * @param {*} tag 
     * @param {*} log 
     */
    static log = function(level, tag, log) {
        RNBuglyNative.log(level, tag, log);
    }

    //Android Only,主动上传日志
    static postException = function(params) {
        RNBuglyNative.postException(params);
    }

}