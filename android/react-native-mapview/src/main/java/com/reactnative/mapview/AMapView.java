package com.reactnative.mapview;

import android.content.Context;
import android.graphics.Point;

import com.amap.api.maps.AMap;
import com.amap.api.maps.CameraUpdateFactory;
import com.amap.api.maps.TextureMapView;
import com.amap.api.maps.UiSettings;
import com.amap.api.maps.model.AMapGestureListener;
import com.amap.api.maps.model.CameraPosition;
import com.amap.api.maps.model.LatLng;
import com.facebook.common.logging.FLog;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.uimanager.events.RCTEventEmitter;

public class AMapView extends TextureMapView implements AMap.OnMapLoadedListener, AMapGestureListener, AMap.OnCameraChangeListener {

    public static final String TAG = "AMapView";

    private boolean mMapLoaded;
    private float mZoomLevel = 17.0f;
    private LatLng mCenterLatLng;
    private boolean mMoveByUser;
    private boolean mCameraOnMove;

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
        map.setAMapGestureListener(this);
        map.setOnCameraChangeListener(this);
        map.setOnMarkerClickListener(marker -> {
            FLog.d("AMapView", "onMarkerClick==>" + marker.getId());
            return true;
        });
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

    boolean isMapLoaded() {
        return mMapLoaded;
    }

    @Override
    public void onDoubleTap(float v, float v1) {

    }

    @Override
    public void onSingleTap(float x, float y) {
        FLog.i(TAG, "onSingleTap");
        AMap map = getMap();
        LatLng latLng = map.getProjection().fromScreenLocation(new Point((int) x, (int) y));
        WritableMap event = Arguments.createMap();
        event.putDouble("latitude", latLng.latitude);
        event.putDouble("longitude", latLng.longitude);
        ReactContext reactContext = (ReactContext) getContext();
        if (reactContext.hasActiveCatalystInstance()) {
            reactContext.getJSModule(RCTEventEmitter.class).receiveEvent(
                    getId(),
                    "onSingleTap",
                    event);
        }
    }

    @Override
    public void onFling(float v, float v1) {

    }

    @Override
    public void onScroll(float v, float v1) {

    }

    @Override
    public void onLongPress(float v, float v1) {

    }

    @Override
    public void onDown(float v, float v1) {
        mMoveByUser = true;
    }

    @Override
    public void onUp(float v, float v1) {
        if (!mCameraOnMove) {
            mMoveByUser = false;
        }
    }

    @Override
    public void onMapStable() {

    }

    @Override
    public void onCameraChange(CameraPosition cameraPosition) {
        if (!mMapLoaded) {
            return;
        }
        if (mCameraOnMove) {
            return;
        }
        mCameraOnMove = true;
        onMoveByUser("onMoveStart");
    }

    @Override
    public void onCameraChangeFinish(CameraPosition cameraPosition) {
        if (!mMapLoaded) {
            return;
        }
        onMoveByUser("onMoveEnd");
        mCameraOnMove = false;
        mMoveByUser = false;
    }

    private void onMoveByUser(String eventName) {
        AMap map = getMap();
        LatLng center = map.getCameraPosition().target;
        WritableMap event = Arguments.createMap();
        event.putDouble("latitude", center.latitude);
        event.putDouble("longitude", center.longitude);
        event.putBoolean("wasUserAction", mMoveByUser);
        ReactContext reactContext = (ReactContext) getContext();
        if (reactContext.hasActiveCatalystInstance()) {
            reactContext.getJSModule(RCTEventEmitter.class).receiveEvent(
                    getId(),
                    eventName,
                    event);
        }
    }
}
