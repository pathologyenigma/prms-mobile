package com.czzapp.splash;

import androidx.annotation.NonNull;

import com.czzapp.MainActivity;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.UiThreadUtil;

public class SplashModule extends ReactContextBaseJavaModule {

    public static final String NAME = "SplashModule";

    private final ReactApplicationContext reactContext;

    public SplashModule(@NonNull ReactApplicationContext reactContext) {
        super(reactContext);
        this.reactContext = reactContext;
    }

    @NonNull
    @Override
    public String getName() {
        return NAME;
    }

    @ReactMethod
    public void hideSplash() {
        if (reactContext.hasActiveCatalystInstance()) {
            UiThreadUtil.runOnUiThread(() -> {
                if (reactContext.hasActiveCatalystInstance() && reactContext.hasCurrentActivity()) {
                    MainActivity mainActivity = (MainActivity) reactContext.getCurrentActivity();
                    if (mainActivity != null) {
                        mainActivity.hideSplash();
                    }
                }
            }, 100);
        }
    }
}
