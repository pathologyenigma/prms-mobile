package com.chenzaozhao.app;

import android.content.Context;
import android.graphics.*;
import android.graphics.drawable.Drawable;
import android.os.Build;
import android.os.Handler;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.RelativeLayout;
import android.widget.TextView;
import androidx.annotation.NonNull;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.bridge.*;
import com.facebook.react.uimanager.annotations.ReactProp;
import com.facebook.react.views.view.ColorUtil;
import com.hublot.route.*;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class MainReactModule extends ReactContextBaseJavaModule {

    private Paint paint = new Paint();

    private final static String MODULE_NAME = "MainReactModule";

    private HTRouteTabBarController tabBarController;

    private HTRouteNavigationController navigationController;

    public MainReactModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @NonNull
    @Override
    public String getName() {
        return MODULE_NAME;
    }

    public static ViewGroup createLaunchScreenView() {
    	RelativeLayout launchView = new RelativeLayout(HTRouteGlobal.activity);
        ImageView imageView = new ImageView(HTRouteGlobal.activity);
        launchView.setBackgroundColor(Color.WHITE);
        imageView.setImageResource(R.mipmap.launch);
        RelativeLayout.LayoutParams layoutParams = new RelativeLayout.LayoutParams(ViewGroup.LayoutParams.WRAP_CONTENT, ViewGroup.LayoutParams.WRAP_CONTENT);
        layoutParams.setMargins(0, HTRouteGlobal.dp2px(150), 0, 0);
        layoutParams.addRule(RelativeLayout.CENTER_HORIZONTAL);
        launchView.addView(imageView, layoutParams);
        return launchView;
    }

    public static void setLaunchScreenContentView() {
        HTRouteGlobal.activity.setContentView(createLaunchScreenView());
    }

    private void setTabBarContentView(Map tabbarOptionList) {
    	Double tabBarBackgroundColorValue = (Double)tabbarOptionList.get("tabBarBackgroundColor");
    	if (tabBarBackgroundColorValue == null) {
    		tabBarBackgroundColorValue = Double.valueOf(Color.WHITE);
    	}
    	final int tabBarBackgroundColor = tabBarBackgroundColorValue.intValue();
        tabBarController = new HTRouteTabBarController() {
            @Override
            public void initDataSource() {
                modelList.clear();
                List<Map<String, Serializable>> itemList = (List<Map<String, Serializable>>) tabbarOptionList.get("itemList");
                for (Map<String, Serializable> item: itemList) {
                    String title = (String) item.get("title");
                    int image = HTRouteGlobal.activity.getResources().getIdentifier((String) item.get("image"), "mipmap", HTRouteGlobal.activity.getPackageName());
                    int selectedImage = HTRouteGlobal.activity.getResources().getIdentifier((String) item.get("selectedImage"), "mipmap", HTRouteGlobal.activity.getPackageName());
                    String componentName = (String) item.get("componentName");
                    Map<String, Serializable> componentRouteOptionList = (Map<String, Serializable>) item.get("componentRouteOptionList");
                    modelList.add(
                        new HTRouteTabBarModel(title, image, selectedImage,
                            new HTRouteNavigationController(new HTRouteController(componentName, componentRouteOptionList)))
                    );
                }
            }
            @Override
            public void cellForIndex(ViewGroup container, TextView button, ViewGroup imageContainer, ImageView imageView, TextView textView, int index, boolean isSelected) {
                super.cellForIndex(container, button, imageContainer, imageView, textView, index, isSelected);
                List<Map<String, Serializable>> itemList = (List<Map<String, Serializable>>) tabbarOptionList.get("itemList");
                Map<String, Serializable> item = itemList.get(index);
                float fontSize = ((Double)item.get("fontSize")).floatValue();
                int color = ((Double)item.get("color")).intValue();
                int selectedColor = ((Double)item.get("selectedColor")).intValue();
                textView.setTextSize(fontSize);
                textView.setTextColor(isSelected ? selectedColor : color);
            }

            @Override
            protected void initTabBar(ViewGroup viewGroup) {

                tabBar = new HTRouteTabBar(HTRouteGlobal.activity, this) {
                    @Override
                    public void initSeparatorLine(ViewGroup viewGroup) {
                    }

                    @Override
                    protected void onDraw(Canvas canvas) {
                        paint.setColor(tabBarBackgroundColor);
                        paint.setShadowLayer(HTRouteGlobal.dp2px(50), 0, 0, ColorUtil.multiplyColorAlpha(Color.BLACK, Double.valueOf(255 * 0.1).intValue()));
                        Path path = new Path();
                        float radius = HTRouteGlobal.dp2px(0);
                        float[] radiusList = {radius, radius, radius, radius, 0, 0, 0, 0};
                        path.addRoundRect(new RectF(0, 0, getWidth(), getHeight()), radiusList, Path.Direction.CW);
                        canvas.drawPath(path, paint);
                        super.onDraw(canvas);
                    }
                };
                RelativeLayout.LayoutParams layoutParams = new RelativeLayout.LayoutParams(ViewGroup.LayoutParams.MATCH_PARENT, HTRouteGlobal.tabBarHeight());
                layoutParams.addRule(RelativeLayout.ALIGN_PARENT_BOTTOM);
                viewGroup.addView(tabBar, layoutParams);
                tabBar.setWillNotDraw(false);
                tabBar.setBackgroundColor(Color.WHITE);
            }
        };
        tabBarController.getView().setBackgroundColor(Color.WHITE);
        HTRouteGlobal.activity.setContentView(tabBarController.getView());
    }

    private void setNavigationBarContentView(String componentName, Map componentRouteOption) {
        navigationController = new HTRouteNavigationController(new HTRouteController(componentName, componentRouteOption));
        ViewGroup contentView = createLaunchScreenView();
        contentView.addView(navigationController.getView(), HTRouteGlobal.matchParent);
        HTRouteGlobal.activity.setContentView(contentView);
    }

    public static Boolean invokeDefaultOnBackPressed() {
        ReactNativeHost reactContextHost = HTRouteGlobal.application.getReactNativeHost();
        if (reactContextHost.hasInstance() == false) {
            return false;
        }
        MainReactModule mainReactModule = (MainReactModule) reactContextHost.getReactInstanceManager().getCurrentReactContext().getCatalystInstance().getNativeModule(MODULE_NAME);
        if (mainReactModule == null) {
            return false;
        }
        if (mainReactModule.tabBarController != null) {
            HTRouteNavigationController selectedFragment = (HTRouteNavigationController) mainReactModule.tabBarController.findSelectedFragment();
            if (selectedFragment.childControllerList.size() > 1) {
                selectedFragment.popViewController(true);
                return true;
            }
        } else if (mainReactModule.navigationController != null) {
            if (mainReactModule.navigationController.childControllerList.size() > 1) {
                mainReactModule.navigationController.popViewController(true);
                return true;
            }
        }
        return false;
    }





    @ReactMethod()
    private void setOverScrollEdgeEffect(String key, int brandColor) {
//        int glowDrawableId = HTRouteGlobal.activity.getResources().getIdentifier(key, "drawable", "android");
//        Drawable androidGlow = HTRouteGlobal.activity.getResources().getDrawable(glowDrawableId);
//        androidGlow.setColorFilter(brandColor, PorterDuff.Mode.MULTIPLY);
    }

    @ReactMethod()
    private void reloadRootViewController(String componentName, ReadableMap componentRouteOption) {
        UiThreadUtil.runOnUiThread(new Runnable() {
            @Override
            public void run() {
                if (navigationController != null) {
                    navigationController.dealloc();
                    navigationController = null;
                }
                if (tabBarController != null) {
                    tabBarController.dealloc();
                    tabBarController = null;
                }
                if (componentName != null) {
                    setNavigationBarContentView(componentName, componentRouteOption.toHashMap());
                } else if (componentRouteOption != null)  {
                    setTabBarContentView(componentRouteOption.toHashMap());
                }
            }
        });
    }

    @ReactMethod()
    private void restartBundleBridgeManager() {
        UiThreadUtil.runOnUiThread(new Runnable() {
            @Override
            public void run() {
                if (navigationController != null) {
                    navigationController.dealloc();
                    navigationController = null;
                }
                if (tabBarController != null) {
                    tabBarController.dealloc();
                    tabBarController = null;
                }
                setLaunchScreenContentView();
//                HTRouteGlobal.application.getReactNativeHost().getReactInstanceManager().recreateReactContextInBackground();
            }
        });
    }

}
