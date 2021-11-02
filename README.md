# 趁早找 App

1. 项目运行步骤:
    ```javascript
        1. yarn
        2. yarn patch-android-cache-libs
    ```

2. 列表刷新状态:

```javascript
    0、Idle（普通状态）
    1、HeaderRefreshing（头部菊花转圈圈中）
    2、FooterRefreshing（底部菊花转圈圈中）
    3、NoMoreData（已加载全部数据）
    4、Failure（加载失败,点击重新加载）
    5、EmptyData（暂时没有相关数据)
```