package com.reactnative.geolocation;

import com.facebook.react.bridge.ReadableMap;

public class Config {
    String apiKey;

    public static Config fromMap(ReadableMap map) {
        Config config = new Config();
        if (map.hasKey("apiKey")) {
            config.apiKey = map.getString("apiKey");
        }
        return config;
    }
}
