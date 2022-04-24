require "json"

package = JSON.parse(File.read(File.join(__dir__, "package.json")))

Pod::Spec.new do |s|
  s.name         = "RCTHttpCache"
  s.version      = package["version"]
  s.summary      = package["description"]
 
  s.homepage     = "https://github.com/reactnativecn/react-native-http-cache"
  s.license      = "MIT"
  s.authors      = { "author-name" => "author-email@gmail.com" }
  s.platforms    = { :ios => "10.0", :tvos => "10.0" }
  s.source       = { :git => "https://github.com/reactnativecn/react-native-http-cache.git", :tag => "#{s.version}" }

  s.source_files = "ios/RCTHttpCache/**/*.{h,m,swift}"
  s.dependency "React"
end