package com.como.RNTShadowView;

import android.graphics.Color;
import androidx.annotation.Nullable;

import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.ViewGroupManager;
import com.facebook.react.uimanager.annotations.ReactProp;
import androidx.annotation.NonNull;
import com.facebook.react.uimanager.ReactStylesDiffMap;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class RNTShadowViewManager extends ViewGroupManager<ShadowView> {
    public static final String REACT_CLASS = "RNTShadowView";

    @ReactProp(name = "borderRadius", defaultDouble = 0)
    public void setBorderRadius(final ShadowView shadowView, @Nullable double borderRadius) {
        if (shadowView != null) {
            shadowView.setBorderRadius(borderRadius);
        }
    }

    @ReactProp(name = "borderColor", customType = "Color")
    public void setBorderColor(final ShadowView shadowView, int borderColor) {
        if (shadowView != null) {
            shadowView.setBorderColor(borderColor);
        }
    }

    @ReactProp(name = "borderWidth")
    public void setBorderWidth(final ShadowView shadowView, @Nullable double borderWidth) {
        if (shadowView != null) {
            shadowView.setBorderWidth(borderWidth);
        }
    }

    @ReactProp(name = "backgroundColor", customType = "Color")
    public void setBackgroundColor(final ShadowView shadowView, int backgroundColor) {
        if (shadowView != null) {
            shadowView.setBackgroundColor(backgroundColor);
        }
    }

    @ReactProp(name = "shadowColor", customType = "Color")
    public void setShadowColor(final ShadowView shadowView, int shadowColor) {
        if (shadowView != null) {
            shadowView.setShadowColor(shadowColor);
        }
    }

    @ReactProp(name = "shadowOffsetX", defaultDouble = 0)
    public void setShadowOffsetX(final ShadowView shadowView, @Nullable double shadowOffsetX) {
        if (shadowView != null) {
            shadowView.setShadowOffsetX(shadowOffsetX);
        }
    }

    @ReactProp(name = "shadowOffsetY", defaultDouble = 0)
    public void setShadowOffsetY(final ShadowView shadowView, @Nullable double shadowOffsetY) {
        if (shadowView != null) {
            shadowView.setShadowOffsetY(shadowOffsetY);
        }
    }

    @ReactProp(name = "shadowOpacity", defaultDouble = 1)
    public void setShadowOpacity(final ShadowView shadowView, @Nullable double shadowOpacity) {
        if (shadowView != null) {
            shadowView.setShadowOpacity(shadowOpacity);
        }
    }

    @ReactProp(name = "shadowRadius")
    public void setShadowRadius(final ShadowView shadowView, double shadowRadius) {
        if (shadowView != null) {
            shadowView.setShadowRadius(shadowRadius);
        }
    }

    @Override
    public String getName() {
        return REACT_CLASS;
    }

    @Override
    public ShadowView createViewInstance(ThemedReactContext context) {
        return new ShadowView(context);
    }

    @Override
    public void updateProperties(@NonNull ShadowView viewToUpdate, ReactStylesDiffMap props) {
        super.updateProperties(viewToUpdate, props);
        if (viewToUpdate.getParent() != null) {
            viewToUpdate.invalidate();
        }
    }

}
