package com.reactnative.geolocation;

import android.content.Context;
import android.text.TextUtils;

import com.amap.api.services.help.Inputtips;
import com.amap.api.services.help.InputtipsQuery;
import com.amap.api.services.help.Tip;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.WritableArray;
import com.facebook.react.bridge.WritableMap;

import java.util.List;

import javax.annotation.Nonnull;

public class InputTipsRequest {

    private final Context mContext;

    public InputTipsRequest(Context context) {
        mContext = context;
    }

    public void execute(@Nonnull String key, @Nonnull String city, @Nonnull Promise promise) {

        InputtipsQuery query = new InputtipsQuery(key, city);
        query.setCityLimit(true);
        Inputtips inputtips = new Inputtips(mContext.getApplicationContext(), query);
        inputtips.setInputtipsListener((tips, code) -> {
            if (code == 1000) {
                promise.resolve(convertTipsToArray(tips));
            } else {
                promise.reject("GeoLocationModuleInputTipsRequest", "地址输入提示查询失败：" + code);
            }
        });
        inputtips.requestInputtipsAsyn();
    }

//    a 、由于提示中会出现相同的关键字，但是这些关键字所在区域不同，使用时可以通过 tipList.get(i).getDistrict() 获得区域，
//    也可以在提示时在关键字后加上区域。
//    b、当 Tip 的 getPoiID() 返回空，并且 getPoint() 也返回空时，表示该提示词不是一个真实存在的 POI，
//    这时区域、经纬度参数都是空的，此时可根据该提示词进行POI关键词搜索
//    c、当 Tip 的 getPoiID() 返回不为空，但 getPoint() 返回空时，表示该提示词是一个公交线路名称，
//    此时用这个id进行公交线路查询。
//    d、当 Tip 的 getPoiID() 返回不为空，且 getPoint() 也不为空时，表示该提示词一个真实存在的POI，
//    可直接显示在地图上。
    static WritableArray convertTipsToArray(List<Tip> tips) {
        int size = tips.size();
        WritableArray array = Arguments.createArray();
        for (int i = 0; i < size; i++) {
            Tip tip = tips.get(i);
            WritableMap map = Arguments.createMap();
            if (tip.getPoint() != null && !TextUtils.isEmpty(tip.getPoiID())) {
                map.putString("adcode", tip.getAdcode());
                map.putString("name", tip.getName());
                map.putString("address", tip.getAddress());
                map.putString("district", tip.getDistrict());
                map.putDouble("latitude", tip.getPoint().getLatitude());
                map.putDouble("longitude", tip.getPoint().getLongitude());
                array.pushMap(map);
            }
        }
        return array;
    }

}
