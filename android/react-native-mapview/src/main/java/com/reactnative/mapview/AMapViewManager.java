package com.reactnative.mapview;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

import com.amap.api.maps.model.LatLng;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.common.MapBuilder;
import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.annotations.ReactProp;

import java.util.Map;

public class AMapViewManager extends SimpleViewManager<AMapView>  {
    private static final String NAME = "AMapView";

    @NonNull
    @Override
    public String getName() {
        return NAME;
    }

    @NonNull
    @Override
    protected AMapView createViewInstance(@NonNull ThemedReactContext reactContext) {
        return new AMapView(reactContext);
    }

    @Override
    public void onDropViewInstance(@NonNull AMapView view) {
        super.onDropViewInstance(view);
        view.onDestroy();
    }

    @Override
    protected void onAfterUpdateTransaction(@NonNull AMapView view) {
        super.onAfterUpdateTransaction(view);
        if (view.isMapLoaded()) {
            view.moveCamera();
        }
    }

    @ReactProp(name = "zoomLevel", defaultFloat = 16.0f)
    public void setZoomLevel(AMapView mapView, float zoomLevel) {
        mapView.setZoomLevel(zoomLevel);
    }

    @ReactProp(name = "scrollEnabled", defaultBoolean = true)
    public void setScrollEnabled(AMapView mapView, boolean enabled) {
        mapView.setScrollEnabled(enabled);
    }

    @ReactProp(name = "centerLatLng")
    public void setCenterLatLng(AMapView mapView, ReadableMap map) {
        if (map != null) {
            LatLng latLng = new LatLng(map.getDouble("latitude"), map.getDouble("longitude"));
            mapView.setCenterLatLng(latLng);
        } else {
            mapView.setCenterLatLng(null);
        }
    }

    @Nullable
    @Override
    public Map<String, Object> getExportedCustomBubblingEventTypeConstants() {
        return MapBuilder.<String, Object>builder()
                .put("onMoveEnd", MapBuilder.of("phasedRegistrationNames", MapBuilder.of("bubbled", "onMoveEnd")))
                .put("onMoveStart", MapBuilder.of("phasedRegistrationNames", MapBuilder.of("bubbled", "onMoveStart")))
                .build();
    }
}
