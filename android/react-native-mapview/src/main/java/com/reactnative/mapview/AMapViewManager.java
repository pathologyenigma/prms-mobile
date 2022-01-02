package com.reactnative.mapview;

import androidx.annotation.NonNull;

import com.amap.api.maps.model.LatLng;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.annotations.ReactProp;

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
}
