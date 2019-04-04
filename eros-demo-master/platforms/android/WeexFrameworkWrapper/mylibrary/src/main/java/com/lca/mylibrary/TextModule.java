package com.lca.mylibrary;

import android.widget.Toast;

import com.alibaba.weex.plugin.annotation.WeexModule;
import com.taobao.weex.annotation.JSMethod;
import com.taobao.weex.common.WXModule;
import com.taobao.weex.ui.component.WXComponent;

/**
 * Created by liuyuanxiao on 2018/5/4.
 */
@WeexModule(name = "webtext", lazyLoad = true)
public class TextModule extends WXModule {
    @JSMethod(uiThread = true)
    public void hello() {
        Toast.makeText(mWXSDKInstance.getContext(), "Hello Eros test Plugin", Toast.LENGTH_LONG).show();
    }
    @JSMethod(uiThread = true)
    public void showByTextView(String text,String ref){
        WXComponent component=findComponent(ref);
    }
}
