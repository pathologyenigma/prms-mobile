package com.reactnative.geolocation;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;

public class GeoLocationModule extends ReactContextBaseJavaModule {

    public static final String NAME = "GeoLocationModule";

    public GeoLocationModule(@NonNull ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @NonNull
    @Override
    public String getName() {
        return NAME;
    }

    @ReactMethod
    public void getLocation(ReadableMap map, Promise promise) {
        Config config = Config.fromMap(map);
        OnceLocationManager locationManager = new OnceLocationManager(getReactApplicationContext(), config);
        locationManager.startLocationUpdate(promise);
    }
}
