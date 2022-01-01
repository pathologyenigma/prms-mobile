package com.reactnative.geolocation;

import android.content.Context;

import com.amap.api.location.AMapLocation;
import com.amap.api.location.AMapLocationClient;
import com.amap.api.location.AMapLocationClientOption;
import com.amap.api.location.AMapLocationListener;
import com.facebook.common.logging.FLog;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.WritableMap;

public class OnceLocationManager implements AMapLocationListener  {

    private static final String ErrorCode = "GeoLocationModuleOnceLocationManager";
    private static final String TAG = "GeoLocationModule";

    private final AMapLocationClient mLocationClient;
    private Promise promise;

    public OnceLocationManager(Context context, Config config) {
        AMapLocationClient.setApiKey(config.apiKey);

        mLocationClient = new AMapLocationClient(context.getApplicationContext());
        //初始化定位参数
        AMapLocationClientOption option = new AMapLocationClientOption();

        option.setLocationMode(AMapLocationClientOption.AMapLocationMode.Hight_Accuracy);
        option.setOnceLocationLatest(true);
        option.setInterval(1000);
        option.setHttpTimeOut(10 * 1000);

        // 设置要不要返回地址信息，默认为true
        option.setNeedAddress(config.withReGeocode);

        //设置定位参数
        mLocationClient.setLocationOption(option);
        //设置定位监听
        mLocationClient.setLocationListener(this);
    }

    public void startLocationUpdate(Promise promise) {
        FLog.i(TAG, "startLocationUpdate");
        this.promise = promise;
        mLocationClient.startLocation();
    }

    @Override
    public void onLocationChanged(AMapLocation aMapLocation) {
        if (aMapLocation != null) {
            FLog.i(TAG, aMapLocation.toStr());
            if (aMapLocation.getErrorCode() != 0) {
                reject(aMapLocation.getErrorInfo());
                mLocationClient.stopLocation();
                return;
            }
            resolve(aMapLocation);
            mLocationClient.stopLocation();
        } else {
            FLog.i(TAG, "高德定位为 null");
            reject("获取当前位置失败");
        }
    }

    private void resolve(AMapLocation aMapLocation) {
        mLocationClient.stopLocation();
        promise.resolve(convertLocationToMap(aMapLocation));
    }

    private void reject(String errorInfo) {
        mLocationClient.stopLocation();
        promise.reject(ErrorCode, errorInfo);
    }

    static WritableMap convertLocationToMap(AMapLocation location) {
        WritableMap map = Arguments.createMap();
        map.putDouble("latitude", location.getLatitude());
        map.putDouble("longitude", location.getLongitude());
        map.putDouble("altitude", location.getAltitude());
        map.putDouble("accuracy", location.getAccuracy());
        map.putDouble("speed", location.getSpeed());
        map.putDouble("bearing", location.getBearing());
        map.putDouble("timestamp", location.getTime());

        if (!location.getAddress().isEmpty()) {
            map.putString("adcode", location.getAdCode());
            map.putString("province", location.getProvince());
            map.putString("city", location.getCity());
            map.putString("cityCode", location.getCityCode());
            map.putString("address", location.getAddress());
            map.putString("aoi", location.getAoiName());
            map.putString("poi", location.getPoiName());
        }
        return map;
    }
}
