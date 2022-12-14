
Pod::Spec.new do |s|
  s.name         = "RNBugly"
  s.version      = "1.0.0"
  s.summary      = "RNBugly"
  s.description  = <<-DESC
                  RNBugly
                   DESC
  s.homepage     = "https://github.com/hellohublot"
  s.license      = "MIT"
  # s.license      = { :type => "MIT", :file => "FILE_LICENSE" }
  s.author             = { "hellohublot" => "hublot@aliyun.com" }
  s.platform     = :ios, "7.0"
  s.source       = { :git => "oneMore", :tag => "master" }
  s.source_files  = "*"
  s.requires_arc = true


  s.dependency "React"
  s.dependency "Bugly"

end

  