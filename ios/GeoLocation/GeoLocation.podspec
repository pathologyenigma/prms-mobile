

Pod::Spec.new do |s|
    s.name             = 'GeoLocation'
    s.version          = '1.0.0'
    s.summary          = '高德地图定位'

    s.homepage         = 'https://github.com/github-account/react-native-location'
    s.license          = "MIT"
    s.authors          = { "author-name" => "author-email@gmail.com" }
    s.source           = { :git => 'https://github.com/github-account/react-native-location.git', :tag => s.version.to_s }

    s.platforms    = { :ios => "10.0", :tvos => "10.0" }
    s.source_files = "Classes/**/*.{h,m}"
    s.dependency "React"
    s.dependency "AMapFoundation", "~> 1.6.7"
    s.dependency 'AMapLocation', '~> 2.6.8'
    s.dependency 'AMapSearch', '~> 7.9.0'
  end
  
