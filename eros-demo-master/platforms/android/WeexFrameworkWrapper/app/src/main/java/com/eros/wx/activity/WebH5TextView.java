package com.eros.wx.activity;

import android.content.Context;
import android.support.annotation.NonNull;
import android.text.Html;
import android.text.Spanned;
import android.text.method.ScrollingMovementMethod;
import android.view.ViewGroup;
import android.widget.TextView;

import com.taobao.weex.WXSDKInstance;
import com.taobao.weex.dom.WXDomObject;
import com.taobao.weex.ui.component.WXComponent;
import com.taobao.weex.ui.component.WXComponentProp;
import com.taobao.weex.ui.component.WXVContainer;

public class WebH5TextView extends WXComponent<TextView> {
    private TextView tv;

    public WebH5TextView(WXSDKInstance instance, WXDomObject dom, WXVContainer parent) {
        super(instance, dom, parent);
    }

    public WebH5TextView(WXSDKInstance instance, WXDomObject dom, WXVContainer parent, int type) {

        super(instance, dom, parent, type);
    }

    @Override
    protected TextView initComponentHostView(@NonNull Context context) {
        tv = new TextView(context);
//        tv.setMovementMethod(ScrollingMovementMethod.getInstance());
        return tv;
    }

    @WXComponentProp(name = "data")
    public void setData(String data) {
        Spanned result;

        if (android.os.Build.VERSION.SDK_INT >= android.os.Build.VERSION_CODES.N) {
            result = Html.fromHtml(data, Html.FROM_HTML_MODE_LEGACY);
        } else {
            result = Html.fromHtml(data);
        }
        tv.setText(result);
        // or do some things
    }


}
