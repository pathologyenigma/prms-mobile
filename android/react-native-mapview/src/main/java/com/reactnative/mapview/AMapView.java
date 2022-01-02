package com.reactnative.mapview;

import android.content.Context;
import android.util.Log;

import com.amap.api.maps.AMap;
import com.amap.api.maps.CameraUpdateFactory;
import com.amap.api.maps.TextureMapView;
import com.amap.api.maps.UiSettings;
import com.amap.api.maps.model.LatLng;

public class AMapView extends TextureMapView implements AMap.OnMapLoadedListener {

    public static final String TAG = "AMapView";

    private boolean mMapLoaded;
    private float mZoomLevel = 16.0f;
    private LatLng mCenterLatLng;

    public AMapView(Context context) {
        super(context);
        onCreate(null);
        init();
    }

    void init() {
        AMap map = getMap();
        UiSettings uiSettings = map.getUiSettings();
        uiSettings.setCompassEnabled(false);
        uiSettings.setZoomControlsEnabled(false);
        uiSettings.setRotateGesturesEnabled(false);
        uiSettings.setTiltGesturesEnabled(false);
        uiSettings.setIndoorSwitchEnabled(false);
        uiSettings.setScaleControlsEnabled(true); // 比例尺
        uiSettings.setGestureScaleByMapCenter(true);
        uiSettings.setZoomGesturesEnabled(true);
        uiSettings.setZoomInByScreenCenter(true); // 双击时以屏幕中心放大
        uiSettings.setScrollGesturesEnabled(true);

        map.setTrafficEnabled(false);
        map.showIndoorMap(false);
        map.showBuildings(false);
        map.setMaxZoomLevel(20);

        map.setOnMapLoadedListener(this);
        //map.setAMapGestureListener(this);
        //map.setOnCameraChangeListener(this);
        map.setOnMarkerClickListener(marker -> {
            Log.d("AMapView", "onMarkerClick==>" + marker.getId());
            return true;
        });
    }

    @Override
    protected void onDetachedFromWindow() {
        super.onDetachedFromWindow();
        onDestroy();
    }

    @Override
    public void onMapLoaded() {
        mMapLoaded = true;
        moveCamera();
    }

    public void setZoomLevel(float zoomLevel) {
        mZoomLevel = zoomLevel;
    }

    public void setCenterLatLng(LatLng latLng) {
        mCenterLatLng = latLng;
    }

    public void setScrollEnabled(boolean enabled) {
        AMap map = getMap();
        UiSettings uiSettings = map.getUiSettings();
        uiSettings.setScrollGesturesEnabled(enabled);
    }

    void moveCamera() {
        AMap map = getMap();
        if (mCenterLatLng != null) {
            map.moveCamera(CameraUpdateFactory.newLatLngZoom(mCenterLatLng, mZoomLevel));
        }
    }

    boolean isMapLoaded () {
        return mMapLoaded;
    }
}
