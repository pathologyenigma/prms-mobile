package com.chenzaozhao.app;

import android.content.Intent;
import android.os.Bundle;
import com.facebook.react.ReactActivity;
import com.hublot.route.*;

public class MainActivity extends ReactActivity {

	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		if ((getIntent().getFlags() & Intent.FLAG_ACTIVITY_BROUGHT_TO_FRONT) != 0) {
			finish();
			return;
		}
		HTRouteGlobal.activity = this;
		MainReactModule.setLaunchScreenContentView();
	}

	@Override
	public void invokeDefaultOnBackPressed() {
		if (!MainReactModule.invokeDefaultOnBackPressed()) {
			moveTaskToBack(true);
	//    super.invokeDefaultOnBackPressed();
		}
	}
}
