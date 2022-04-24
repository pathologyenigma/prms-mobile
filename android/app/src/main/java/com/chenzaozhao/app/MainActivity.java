package com.chenzaozhao.app;

import android.content.Intent;
import android.os.Bundle;

import com.chenzaozhao.app.splash.SplashFragment;
import com.facebook.react.ReactActivity;
import com.facebook.react.bridge.ReactContext;

public class MainActivity extends ReactActivity {

    private SplashFragment splashFragment;

    private final static String SPLASH_TAG = "splash_tag";

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        setTheme(R.style.AppTheme);
        super.onCreate(savedInstanceState);

        // 避免从桌面启动程序后，会重新实例化入口类的activity
        if (!isTaskRoot()) {
            Intent intent = getIntent();
            if (intent != null) {
                String action = intent.getAction();
                if (intent.hasCategory(Intent.CATEGORY_LAUNCHER) && Intent.ACTION_MAIN.equals(action)) {
                    finish();
                    return;
                }
            }
        }

        if (savedInstanceState != null) {
            splashFragment = (SplashFragment) getSupportFragmentManager().findFragmentByTag(SPLASH_TAG);
        }

        ReactContext reactContext = getReactInstanceManager().getCurrentReactContext();

        if (splashFragment == null && reactContext == null) {
            splashFragment = new SplashFragment();
            splashFragment.show(getSupportFragmentManager(), SPLASH_TAG);
        }
    }

    @Override
    public void invokeDefaultOnBackPressed() {
        moveTaskToBack(true);
    }

    public void hideSplash() {
        if (splashFragment != null) {
            splashFragment.dismiss();
            splashFragment = null;
        }
    }

    /**
     * Returns the name of the main component registered from JavaScript. This is used to schedule
     * rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "czzapp";
    }
}
