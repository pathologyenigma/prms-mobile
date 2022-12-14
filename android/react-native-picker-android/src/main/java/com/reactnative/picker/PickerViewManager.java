package com.reactnative.picker;

import android.graphics.Color;
import android.os.Handler;
import android.text.TextUtils;

import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.common.MapBuilder;
import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.annotations.ReactProp;
import com.reactnative.picker.wheel.WheelView;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Map;

import javax.annotation.Nonnull;
import javax.annotation.Nullable;


public class PickerViewManager extends SimpleViewManager<PickerView> {

    public static final String REACT_CLASS = "HBDPickerView";

    @Nonnull
    @Override
    public String getName() {
        return REACT_CLASS;
    }

    @Nonnull
    @Override
    protected PickerView createViewInstance(@Nonnull ThemedReactContext reactContext) {
        return new PickerView(reactContext);
    }

    @Override
    public void onDropViewInstance(@Nonnull PickerView view) {
        super.onDropViewInstance(view);
        Handler handler = view.wheelView.getHandler();
        if (handler != null) {
            handler.removeCallbacksAndMessages(null);
        }
    }

    @Nullable
    @Override
    public Map<String, Object> getExportedCustomBubblingEventTypeConstants() {
        return MapBuilder.<String, Object>builder()
                .put("onItemSelected", MapBuilder.of("phasedRegistrationNames", MapBuilder.of("bubbled", "onItemSelected")))
                .build();
    }

    @ReactProp(name = "selectedIndex")
    public void selectedIndex(PickerView pickerView, int index) {
        pickerView.setSelectedItem(index);
    }

    @ReactProp(name = "lineSpacingMultiplier")
    public void setLineSpacingMultiplier(PickerView pickerView, float multiplier) {
        pickerView.setLineSpacingMultiplier(multiplier);
    }

    @ReactProp(name = "fontSize")
    public void setTextSize(PickerView pickerView, int size) {
        pickerView.setTextSize(size);
    }

    @ReactProp(name = "textColorCenter")
    public void setTextColorCenter(PickerView pickerView, String color) {
        if (!TextUtils.isEmpty(color)) {
            pickerView.setTextColorCenter(Color.parseColor(color));
        }
    }

    @ReactProp(name = "textColorOut")
    public void setTextColorOut(PickerView pickerView, String color) {
        if (!TextUtils.isEmpty(color)) {
            pickerView.setTextColorOut(Color.parseColor(color));
        }
    }

    @ReactProp(name = "roundRectType")
    public void setRoundReactType(PickerView pickerView, String roundReactType) {
        if ("left".equals(roundReactType)) {
            pickerView.setRoundReactType(WheelView.RoundRectType.LEFT);
        } else if ("right".equals(roundReactType)) {
            pickerView.setRoundReactType(WheelView.RoundRectType.RIGHT);
        } else if ("all".equals(roundReactType)) {
            pickerView.setRoundReactType(WheelView.RoundRectType.ALL);
        } else {
            pickerView.setRoundReactType(WheelView.RoundRectType.NONE);
        }
    }

    @ReactProp(name = "cyclic")
    public void cyclic(PickerView pickerView, boolean cyclic) {
        pickerView.setCyclic(cyclic);
    }

    @ReactProp(name = "items")
    public void items(PickerView pickerView, ReadableArray items) {
        if (items == null) {
            pickerView.setItems(Collections.<String>emptyList());
        } else {
            List<String> list = new ArrayList<>();
            for (int i = 0; i < items.size(); i++) {
                list.add(items.getString(i));
            }
            pickerView.setItems(list);
        }
    }

}
