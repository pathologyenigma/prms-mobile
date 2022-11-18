import uiautomator2
import time
import random

d = uiautomator2.connect_adb_wifi('192.168.3.68:5555')
d.settings['operation_delay'] = (0.5, 0.5)
# d.app_stop("com.chenzaozhao.app")
d.app_start("com.chenzaozhao.app")
# print(d.dump_hierarchy())

(WIDTH, HEIGHT) = d.window_size()

def clickNavigationItem(isLeft = True):
	x = 50
	y = 120
	d.click(x if isLeft else WIDTH - x, y)

def clickTabbarItem(index, count = 5):
	clickNavigationItem()
	clickNavigationItem()
	d.click(WIDTH / count * index, HEIGHT - 100)

def inputEditText(text, index = 0, click = True):
	def findEdit():
		return d(className='android.widget.EditText', instance=index)
	if click:
		findEdit().click()
	findEdit().clear_text()
	findEdit().set_text(text)


def testMine():
	clickTabbarItem(4)
	def testEditUser():
		
		d.click(100, d(text='在线简历').bounds()[1])

		d.click(WIDTH - 100, d(text='头像').bounds()[1])
		time.sleep(4)
		d(text='更换头像').click()
		d(text='从相册上传').click()
		d(text='允许').click_exists()
		d(text='相册').click()
		time.sleep(2)
		d.click(0, 1300)
		time.sleep(1)
		d.drag(0, HEIGHT / 2, 0, HEIGHT / 2 - 160)
		d(text='保存').click()
		
		d.click(100, d(text='姓名').bounds()[1] + 100)
		inputEditText('你好世界啊🥰')
		d(text='保存').click()

		d.click(100, d(text='出生日期').bounds()[1] + 100)
		d(text='确定').click()

		d(text='男').click()
		d(text='女').click()

		d.click(100, d(text='所在城市').bounds()[1] + 100)
		time.sleep(1)
		d(text='市辖区').click()
		d(text='确定').click()

		d.click(100, d(text='手机号码').bounds()[1] + 100)
		inputEditText('tested', 1)
		d(text='确认').click()

		d.sleep(1)
		d.click(100, d(text='您的学历').bounds()[1] + 100)
		d(text='研究生').click()

		d.click(100, d(text='首次参加工作时间').bounds()[1] + 100)
		d(text='确定').click()

		d(text='保存').click()

		clickNavigationItem()

	def testEditResume():
		d(text='在线简历').click()
		time.sleep(2)

		d(text='预览').click()
		time.sleep(1)
		d.swipe(0, HEIGHT / 2, 0, 0)
		clickNavigationItem()

		d(className='android.widget.ImageView', instance=1).click()
		clickNavigationItem()


		d.click(WIDTH - 50, d(text='求职意向').bounds()[1])
		clickNavigationItem()


		d.click(100, d(text='求职意向').bounds()[1] + 200)
		clickNavigationItem()

		d.click(WIDTH - 50, d(text='个人优势').bounds()[1])
		inputEditText('哈哈哈哈哈哈哈')
		d(text='确定').click()

		time.sleep(2)
		d.click(WIDTH - 50, d(text='技能标签').bounds()[1])
		d(textContains='自定义').click()
		inputEditText('MySQL')
		d(text='确认').click()
		d(text='保存').click()


		time.sleep(2)
		d.click(WIDTH - 50, d(text='工作经验').bounds()[1])
		inputEditText('test公司名称')
		inputEditText('test职位名称', 1)
		inputEditText('test所属部门', 2)
		d.click(50, d(text='在职时间').bounds()[1] + 100)
		d(text='确定').click()
		d.click(WIDTH - 50, d(text='在职时间').bounds()[1] + 100)
		d(text='确定').click()
		inputEditText('test工作内容', 3, False)
		clickNavigationItem(False)

		time.sleep(2)
		d.click(100, d(text='工作经验').bounds()[1] + 150)
		time.sleep(1)
		d(text='完成').click()
		
		time.sleep(2)
		d.click(100, d(text='工作经验').bounds()[1] + 150)
		d(text='删除').click()
		d(text='删除').click()

		time.sleep(2)
		d.swipe(0, HEIGHT / 2, 0, 0)

		d.click(WIDTH - 50, d(text='项目经历').bounds()[1])
		inputEditText('test项目名称')
		inputEditText('test担任角色', 1)
		d.click(50, d(text='项目时间').bounds()[1] + 100)
		d(text='确定').click()
		d.click(WIDTH - 50, d(text='项目时间').bounds()[1] + 100)
		d(text='确定').click()
		inputEditText('test项目描述', 2, False)
		inputEditText('test项目业绩', 3, False)
		clickNavigationItem(False)

		time.sleep(2)
		d.click(100, d(text='项目经历').bounds()[1] + 150)
		d(text='完成').click()
		
		time.sleep(2)
		d.click(100, d(text='项目经历').bounds()[1] + 150)
		d(text='删除').click()
		d(text='删除').click()



		time.sleep(2)
		d.swipe(0, HEIGHT - 100, 0, 0)

		d.click(WIDTH - 50, d(text='教育经历').bounds()[1])
		inputEditText('test学校')
		d.click(WIDTH - 50, d(text='学历').bounds()[1] + 100)
		time.sleep(1)
		d.click(WIDTH / 3,  HEIGHT - 150)
		time.sleep(1)
		d(text='确定').click()
		inputEditText('test专业', 1)
		d.click(50, d(text='时间段').bounds()[1] + 100)
		d(text='确定').click()
		d.click(WIDTH - 50, d(text='时间段').bounds()[1] + 100)
		d(text='确定').click()
		inputEditText('test在校经历', 2, False)
		clickNavigationItem(False)

		time.sleep(2)
		d.click(100, d(text='教育经历').bounds()[1] + 150)
		d(text='完成').click()
		
		time.sleep(2)
		d.click(100, d(text='教育经历').bounds()[1] + 150)
		d(text='删除').click()
		d(text='删除').click()

		time.sleep(2)
		clickNavigationItem()


	def testUserSetup():
		d.swipe(0, HEIGHT - 200, 0, 0)
		d(text='设置').click()
		d(text='账号与安全').click()
		d(text='更换手机号').click()
		inputEditText('tested', 1)
		d(text='确认').click()
		d(text='邮箱绑定').click()
		inputEditText('tested', 1)
		d(text='确认').click()
		clickNavigationItem()
		clickNavigationItem()
		clickNavigationItem()
		



	
	testEditUser()
	testEditResume()
	testUserSetup()


def testAuth():

	def testExitLogin():
		clickTabbarItem(4)
		d.swipe(0, HEIGHT - 200, 0, 0)
		d(text='设置').click()
		d(text='退出登录').click()
		d(text='确定').click()

	testExitLogin()

	d(textContains='用户协议').click()
	clickNavigationItem()
	d(textContains='隐私政策').click()
	clickNavigationItem()

	d(text='验证码登录/注册').click()
	inputEditText(str(int(random.random() * 9999999999 + 10000000000)))
	d(text='下一步').click()
	d(text='同意并继续').click()
	d(text='注册').click()
	inputEditText('t')
	inputEditText('e', 1)
	inputEditText('s', 2)
	inputEditText('t', 3)
	inputEditText('e', 4)
	inputEditText('d', 5)
	d(text='确定').click()
	inputEditText('word_12')
	inputEditText('word_12', 1)
	d(text='提交确认').click()
	d(text='个人').click()

	testExitLogin()
	d(text='忘记密码').click()
	inputEditText('t')
	inputEditText('e', 1)
	inputEditText('s', 2)
	inputEditText('t', 3)
	inputEditText('e', 4)
	inputEditText('d', 5)
	d(text='确定').click()
	inputEditText('word_12')
	inputEditText('word_12', 1)
	d(text='提交确认').click()

	d(text='登录').click()
	d(text='个人').click()
	testExitLogin()

	d(text='验证码登录/注册').click()
	d(text='下一步').click()
	d(text='同意并继续').click()
	inputEditText('t')
	inputEditText('e', 1)
	inputEditText('s', 2)
	inputEditText('t', 3)
	inputEditText('e', 4)
	inputEditText('d', 5)
	d(text='确定').click()
	d(text='个人').click()


def testHome():
	clickTabbarItem(0)


	d.click(WIDTH - 200, 150)
	time.sleep(2)
	if d(textContains='3/3').exists() == False:
		d(text='添加求职意向').click()
		d(text='求职期望').click()
		d(text='互联网/通信及硬件').click()
		d(text='C++').click()
		d(text='保存').click()
		d(text='期望行业').click()
		d(text='人工智能').click()
		d(text='保存').click()
		d(text='期望城市').click()
		d(text='市辖区').click()
		d(text='确定').click()
		d(text='期望薪资').click()
		d.click(WIDTH / 3, HEIGHT - 100)
		d.click(WIDTH / 3, HEIGHT - 100)
		d.click(WIDTH / 3 * 2, HEIGHT - 100)
		d.click(WIDTH / 3 * 2, HEIGHT - 100)
		d.click(WIDTH / 3 * 2, HEIGHT - 100)
		d(text='确定').click()
		d(text='工作性质').click()
		d(text='全职').click()
		d(text='确定').click()
		d(text='保存').click()

	d.click(WIDTH - 100, d(textContains='依据求职期望').bounds()[1] + 200)
	d(text='保存').click()
	clickNavigationItem()


	d.click(WIDTH - 100, 150)
	time.sleep(1)
	clickNavigationItem()
	d(text='市辖区').click()
	d(text='确定').click()
	d(text='搜索职位/公司/商区').click()
	inputEditText('Python')
	d.press('enter')
	d(text='公司').click()
	inputEditText('1')
	d.press('enter')
	time.sleep(2)
	clickNavigationItem()

	d.click(100, d(text='搜索历史').bounds()[1] + 100)
	clickNavigationItem()
	d.click(WIDTH - 100, d(text='搜索历史').bounds()[1])
	d(text='取消').click()
	d.click(WIDTH - 100, 150)
	d(text='取消').click()


	d(textContains='K-').click()
	d(className='android.widget.ImageView', instance=4).click()
	d(text='详情').click()
	clickNavigationItem()
	clickNavigationItem()
	d(className='android.widget.ImageView', instance=6).click()
	d(text='公司地址').click()
	clickNavigationItem()
	clickNavigationItem()
	d(text='聊一聊').click()
	clickNavigationItem()
	clickNavigationItem()

def testHR():
	clickTabbarItem(4)
	d.swipe(0, HEIGHT - 200, 0, 0)
	d(text='设置').click()
	d(text='退出登录').click()
	d(text='确定').click()
	inputEditText('18800001012')
	inputEditText('word_12', 1)
	d(text='登录').click()
	d(text='招聘').click()

	def testHRMine():
		clickTabbarItem(2, 3)
		d.click(300, 250)

		d.click(WIDTH - 100, d(text='头像').bounds()[1])
		time.sleep(4)
		d(text='更换头像').click()
		d(text='从相册上传').click()
		d(text='允许').click_exists()
		d(text='相册').click()
		time.sleep(2)
		d.click(0, 1300)
		time.sleep(1)
		d.drag(0, HEIGHT / 2, 0, HEIGHT / 2 - 160)
		d(text='保存').click()

		d.click(100, d(text='姓名').bounds()[1] + 100)
		inputEditText('你好世界啊🥰')
		d(text='保存').click()

		d(text='男').click()
		d(text='女').click()

		d.click(100, d(text='职位').bounds()[1] + 100)
		inputEditText('人事')
		d(text='保存').click()

		d.click(100, d(text='手机号码').bounds()[1] + 100)
		inputEditText('tested', 1)
		d(text='确认').click()

		d.click(100, d(text='邮箱').bounds()[1] + 100)
		inputEditText('hublot@aliyun.com')
		inputEditText('tested', 1)
		d(text='确认').click()

		d(text='保存').click()

	def testHRHome():
		clickTabbarItem(0, 3)
		
		def testHRPostJob():
			d.click(WIDTH - 150, 150)

			d(text='发布职位').click()

			d.click(100, d(text='职位名称').bounds()[1] + 100)
			inputEditText('test职位名称')
			d(text='保存').click()

			d.click(WIDTH - 100, d(text='职位名称').bounds()[1] + 100)
			d.click(WIDTH / 2, HEIGHT - 50)
			d(text='确定').click()
			time.sleep(1)

			d.click(100, d(text='职位类型').bounds()[1] + 150)
			d(text='互联网/通信及硬件').click()
			d(text='C++').click()
			d(text='保存').click()

			d(text='工作经验').click()
			d.click(WIDTH / 2, HEIGHT - 200)
			time.sleep(1)
			d(text='下一步').click()
			d(text='下一步').click()
			d(text='完成').click()

			d.click(100, d(text='职位描述').bounds()[1] + 100)
			inputEditText('test职位描述')
			d(text='保存').click()

			d.click(100, d(text='工作地址').bounds()[1] + 100)
			d(text='请填写工作地点').click()
			time.sleep(1)
			inputEditText('春熙路')
			d(text='春熙路夜市街').click()
			inputEditText(666)
			d(text='保存').click()

			d.click(100, d(textContains='职位福利').bounds()[1] + 100)
			d(text='五险一金').click()
			d(text='员工旅游').click()
			d(text='保存').click()

			time.sleep(1)
			inputEditText('3', 0, False)
			d.press('enter')
			d(text='立即发布').click()

			time.sleep(1)
			d.click(100, d(text='在线中').bounds()[1] + 200)
			d(text='编辑职位').click()
			d(text='保存').click()
			clickNavigationItem()

			time.sleep(1)
			d.click(100, d(text='在线中').bounds()[1] + 200)
			d(text='停止招聘').click()
			d(text='确定').click()
			clickNavigationItem()

		testHRPostJob()

		d(textContains='期望').click()
		d(text='立即沟通').click()



	
	testHRHome()


	

if __name__ == '__main__':
	testAuth()
	testMine()
	testHome()
	testHR()
	
	

