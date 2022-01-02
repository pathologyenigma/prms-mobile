package com.reactnative.geolocation;

import android.content.Context;

import com.amap.api.services.core.LatLonPoint;
import com.amap.api.services.core.PoiItem;
import com.amap.api.services.poisearch.PoiResult;
import com.amap.api.services.poisearch.PoiSearch;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.WritableArray;
import com.facebook.react.bridge.WritableMap;

import java.util.ArrayList;
import java.util.List;

import javax.annotation.Nonnull;

public class PoiSearchQuery {

    private static final String ErrorCode = "GeoLocationModulePoiSearchQuery";
    private static final String TAG = "GeoLocationModule";

    private final Context mContext;

    public PoiSearchQuery(Context context) {
        mContext = context;
    }

    public void poiItems(double latitude, double longitude, String poiTypeList, @Nonnull Promise promise) {
        PoiSearch.Query query = new PoiSearch.Query("", poiTypeList, "");
        query.setDistanceSort(true);
        query.setPageSize(10);
        query.setExtensions("all");
        PoiSearch poiSearch = new PoiSearch(mContext, query);
        poiSearch.setBound(new PoiSearch.SearchBound(new LatLonPoint(latitude, longitude), 1000));
        poiSearch.setOnPoiSearchListener(new PoiSearch.OnPoiSearchListener() {
            @Override
            public void onPoiSearched(PoiResult poiResult, int code) {
                if (code == 1000) {
                    ArrayList<PoiItem> poiItems = poiResult.getPois();
                    promise.resolve(convertPoiItemsToArray(poiItems));
                } else {
                    promise.reject(ErrorCode, "周边检索POI失败：" + code);
                }
            }

            @Override
            public void onPoiItemSearched(PoiItem poiItem, int code) {

            }
        });
        poiSearch.searchPOIAsyn();
    }

    public void inputTips(String keyword, String city, Promise promise) {
        PoiSearch.Query query = new PoiSearch.Query(keyword, "", city);
        query.setPageSize(10);
        query.setExtensions("all");
        PoiSearch poiSearch = new PoiSearch(mContext, query);
        poiSearch.setOnPoiSearchListener(new PoiSearch.OnPoiSearchListener() {
            @Override
            public void onPoiSearched(PoiResult poiResult, int code) {
                if (code == 1000) {
                    ArrayList<PoiItem> poiItems = poiResult.getPois();
                    promise.resolve(convertPoiItemsToArray(poiItems));
                } else {
                    promise.reject(ErrorCode, "关键字检索POI失败：" + code);
                }
            }

            @Override
            public void onPoiItemSearched(PoiItem poiItem, int code) {

            }
        });
        poiSearch.searchPOIAsyn();
    }

    static WritableArray convertPoiItemsToArray(List<PoiItem> poiItems) {
        int size = poiItems.size();
        WritableArray array = Arguments.createArray();
        for (int i = 0; i < size; i++) {
            PoiItem poiItem = poiItems.get(i);
            WritableMap map = Arguments.createMap();
            map.putString("adcode", poiItem.getAdCode());
            map.putString("name", poiItem.getTitle());
            map.putString("address", poiItem.getSnippet());
            map.putString("city", poiItem.getCityName());
            map.putString("province", poiItem.getProvinceName());
            map.putString("district", poiItem.getAdName());
            map.putDouble("latitude", poiItem.getLatLonPoint().getLatitude());
            map.putDouble("longitude", poiItem.getLatLonPoint().getLongitude());
            map.putString("poiID", poiItem.getPoiId());
            // 以下信息仅供调试
            map.putString("typeCode", poiItem.getTypeCode());
            map.putString("typeDes", poiItem.getTypeDes());
            array.pushMap(map);
        }
        return array;
    }

}
