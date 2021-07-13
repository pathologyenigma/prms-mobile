package com.aweProject.system;

import android.app.Activity;
import android.content.Context;
import android.content.SharedPreferences;
import android.content.res.Resources;
import android.util.DisplayMetrics;
import android.view.WindowManager;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.WritableMap;

import java.util.HashMap;
import java.util.Locale;
import java.util.Map;

public class SystemModule extends ReactContextBaseJavaModule {
    private ReactApplicationContext ctx;
    private SharedPreferences share;

    SystemModule(ReactApplicationContext reactContext) {
        super(reactContext);
        ctx = reactContext;
        share = reactContext.getSharedPreferences("shareManager", Context.MODE_PRIVATE);
    }

    @NonNull
    @Override
    public String getName() {
        return "SystemModule";
    }

    @Nullable
    @Override
    public Map<String, Object> getConstants() {
        final Map<String, Object> constants = new HashMap<>();
        Activity activity = getCurrentActivity();
        if (activity == null) {
            DisplayMetrics dm = ctx.getResources().getDisplayMetrics();
            float safeHeight = safeHeight(ctx);
            constants.put("safeTop", safeHeight / dm.density);
            constants.put("safeBottom", 0);
            constants.put("height", dm.heightPixels * 1.0f / dm.density);
            constants.put("width", dm.widthPixels * 1.0f / dm.density);
        } else {
            WindowManager wm = (WindowManager) activity.getSystemService(Context.WINDOW_SERVICE);
            DisplayMetrics dm = new DisplayMetrics();
            wm.getDefaultDisplay().getRealMetrics(dm);
            float safeHeight = safeHeight(ctx);
            constants.put("safeTop", safeHeight / dm.density);
            constants.put("safeBottom", 0);
            constants.put("width", dm.widthPixels * 1.0f / dm.density);
            constants.put("height", dm.heightPixels * 1.0f / dm.density);
        }
        String kLanguage = "language";
        String language = share.getString(kLanguage, null);
        if (null == language)
            language = Locale.getDefault().getLanguage();
        constants.put(kLanguage, language);
        constants.put("os", "android");
        return constants;
    }

    private float safeHeight(Context context) {
        float defaultHeight = 56;
        try {
            Resources resources = context.getResources();
            int resourceId = resources.getIdentifier("status_bar_height", "dimen", "android");
            if (resourceId > 0)
                defaultHeight = resources.getDimensionPixelSize(resourceId);
        } catch (Exception ignored) {

        }
        return defaultHeight;
    }

    /**
     * 保存kv
     * @param key key
     * @param value value
     */
    @ReactMethod
    public void setValueWithKey(String key, String value) {
        SharedPreferences.Editor editor = share.edit();
        editor.putString(key, value);
        editor.apply();
    }

    /**
     * 移除指定的key
     * @param keys
     */
    @ReactMethod
    public void removeWithKey(ReadableArray keys) {
        if (keys.size() <= 0)
            return;
        SharedPreferences.Editor editor = share.edit();
        for (int i = 0; i < keys.size(); i++) {
            String key = keys.getString(i);
            editor.remove(key);
        }
        editor.apply();
    }

    /**
     * 根据key获取value
     * @param keys keys
     * @param callback callback
     */
    @ReactMethod
    public void getValueWithKey(ReadableArray keys, Callback callback) {
        WritableMap result = Arguments.createMap();
        if (keys.size() > 0) {
            for (int i = 0; i < keys.size(); i++) {
                String key = keys.getString(i);
                if (null != key) {
                    String value = share.getString(key, "");
                    result.putString(key, value);
                }
            }
        }
        callback.invoke(result);
    }

    /**
     * 清空
     */
    @ReactMethod
    public void clear() {
        share.edit().clear().apply();
    }
}
