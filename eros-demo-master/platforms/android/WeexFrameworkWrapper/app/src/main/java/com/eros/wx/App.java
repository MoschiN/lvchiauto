package com.eros.wx;

import android.app.Application;

import com.eros.framework.BMWXApplication;
import com.eros.wx.activity.WebH5TextView;
import com.taobao.weex.WXSDKEngine;
import com.taobao.weex.common.WXException;

/**
 * Created by Carry on 2017/8/23.
 */

public class App extends BMWXApplication {
    public Application mInstance;

    @Override
    public void onCreate() {
        super.onCreate();
        mInstance = this;
        try {
            WXSDKEngine.registerComponent("webh5", WebH5TextView.class);
        } catch (WXException e) {
            e.printStackTrace();
        }


    }

}
