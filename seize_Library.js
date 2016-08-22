/**
 * @author seizePE(moona0915@naver.com)
 * @since 2016 - 5 - 15
 */
const pe = {

    CONTEXT: com.mojang.minecraftpe.MainActivity.currentMainActivity.get(),

    ModPE: {},

    android: {},

    seize: {
        widget: {},
        graphics: {},
        io: {}
    }
};


var Button = android.widget.Button;
var TextView = android.widget.TextView;
var ToggleButton = android.widget.ToggleButton;
var ProgressBar = android.widget.ProgressBar;
var PopupWindow = android.widget.PopupWindow;
var Toast = android.widget.Toast;
var OnCheckedChangeListener = android.widget.CompoundButton.OnCheckedChangeListener;
var OnTouchListener = android.view.View.OnTouchListener;
var MotionEvent = android.view.MotionEvent;
var Gravity = android.view.Gravity;
var LinearLayout = android.widget.LinearLayout;
var R = android.R;
var WIDTH = pe.CONTEXT.getScreenWidth();
var HEIGHT = pe.CONTEXT.getScreenHeight();
var Bitmap = android.graphics.Bitmap;
var BitmapFactory = android.graphics.BitmapFactory;
var BitmapDrawable = android.graphics.drawable.BitmapDrawable;
var drawable = android.graphics.drawable;
var ColorDrawable = android.graphics.drawable.ColorDrawable;
var Color = android.graphics.Color;
var Canvas = android.graphics.Canvas;
var Paint = android.graphics.Paint;
var Typeface = android.graphics.Typeface;
var LayerDrawable = android.graphics.drawable.LayerDrawable;
var PorterDuff = android.graphics.PorterDuff;
var PorterDuffColorFilter = android.graphics.PorterDuffColorFilter;
var File = java.io.File;
var FileOutputStream = java.io.FileOutputStream;
var FileInputStream = java.io.FileInputStream;
var FileReader = java.io.FileReader;
var BufferedReader = java.io.BufferedReader;
var BufferedInputStream = java.io.BufferedInputStream;
var InputStreamReader = java.io.InputStreamReader;
var SDCARD = android.os.Environment.getExternalStorageDirectory().getAbsolutePath();
var DB_PATH = SDCARD + "/Android/data/pe.seize.library/";
var Params = android.widget.LinearLayout.LayoutParams;
var Thread = java.lang.Thread;
var Runnable = java.lang.Runnable;
var DP = android.util.TypedValue.applyDimension(android.util.TypedValue.COMPLEX_UNIT_DIP, 1, pe.CONTEXT.getResources().getDisplayMetrics());
var ValueAnimator = android.animation.ValueAnimator;


const Utils = {

    DP: android.util.TypedValue.applyDimension(android.util.TypedValue.COMPLEX_UNIT_DIP, 1, pe.CONTEXT.getResources().getDisplayMetrics()),

    Toast: (text, duration) => {
        pe.CONTEXT.runOnUiThread(new Runnable({
            run: () => {
                Toast.makeText(pe.CONTEXT, text, (duration === null ? Toast.LENGTH_SHORT : duration)).show();
            }
        }));
    },

    uiThread: function (func) {
        pe.CONTEXT.runOnUiThread(new Runnable({
            run: function () {
                try {
                    func();
                } catch (err) {
                    Utils.Debug(err);
                }
            }
        }));
    },

    Thread: func => {
        new Thread(new Runnable({
            run: () => {
                try {
                    func();
                } catch (err) {
                    Utils.Debug(err);
                }
            }
        })).start();
    },

    Debug: err => {
        pe.CONTEXT.runOnUiThread(new Runnable({
            run: () => {
                try {
                    var dialog = new android.app.AlertDialog.Builder(pe.CONTEXT);
                    dialog.setTitle("Error");
                    dialog.setMessage("Error\n\n - " + err.name + "\n - " + (err.lineNumber + 1) + "\n\n" + err.message);
                    dialog.show();
                } catch (err) {
                    print((err.lineNumber + 1) + " # " + err.message);
                }
            }
        }));
    },

    render: (view, gravity, x, y) => {
        Utils.uiThread(() => {
            var window = new PopupWindow(),
                layout = new LinearLayout(pe.CONTEXT);
            layout.addView(view);
            window.setContentView(layout);
            window.setWidth(-2);
            window.setHeight(-2);
            window.showAtLocation(pe.CONTEXT.getWindow().getDecorView(), gravity, x, y);
        });
    },

    getCurrentTime: () => {
        var date = new Date(),
            year = date.getFullYear(),
            month = date.getMonth() + 1,
            day = date.getDate(),
            hours = date.getHours(),
            minutes = date.getMinutes(),
            m, now;

        if (hours > 12) {
            m = "오후 " + (hours - 12);
        } else {
            m = "오전 " + hours;
        }

        if (minutes >= 10) {
            now = minutes;
        } else {
            now = "0" + minutes;
        }
        return year + "년 " + month + "월 " + day + "일 " + m + ":" + now;
    },

    getNetworkInfo: () => {
        var manager = pe.CONTEXT.getSystemService(pe.CONTEXT.CONNECTIVITY_SERVICE),
            mobile = manager.getNetworkInfo(android.net.ConnectivityManager.TYPE_MOBILE).isConnectedOrConnecting(),
            wifi = manager.getNetworkInfo(android.net.ConnectivityManager.TYPE_WIFI).isConnectedOrConnecting();


        if (mobile)
            return {
                STATE: "online",
                TYPE: "mobile"
            };

        else if (wifi)
            return {
                STATE: "online",
                TYPE: "wifi"
            };

        else
            return {
                STATE: "offline",
                TYPE: "offline"
            };
    },

    Download: (url, path, name) => {
        Utils.Thread(() => {
            var file = new File(path, name);

            if (!file.getParentFile().exists()) {
                file.getParentFile().mkdirs();
            }

            if (!file.exists()) {
                file.createNewFile();
            }

            var _url = new java.net.URL(url),
                urlConnect = _url.openConnection();
            urlConnect.connect();

            var BIS = new BufferedInputStream(_url.openStream()),
                FOS = new FileOutputStream(path + name),
                buffer = java.lang.reflect.Array.newInstance(java.lang.Byte.TYPE, 1024),
                Count;

            while ((Count = BIS.read(buffer)) !== -1) {
                FOS.write(buffer, 0, Count);
            }

            FOS.flush();
            FOS.close();
            BIS.close();
        });
    },

    UpdateCenter: {

        checkUpdate: () => {
            var that = this;

            Utils.Thread(() => {
                var url = new java.net.URL("https://raw.githubusercontent.com/RetroPE/seize_ModPE_Library/master/Version").openStream(),
                    BR = new BufferedReader(new InputStreamReader(url)),
                    vers = parseInt(BR.readLine());

                if (vers > pe.info.VERSION)
                    that.UpdateWindow();
            });
        },

        getChangeLog: () => {

        },

        UpdateWindow: () => {

        }
    },

    init: () => {
        var images = ["ic_add_box_white_48dp.png", "ic_add_white_48dp.png", "ic_apps_white_48dp.png", "ic_arrow_back_white_48dp.png", "ic_arrow_downward_white_48dp.png", "ic_arrow_drop_down_white_48dp.png", "ic_arrow_drop_up_white_36dp.png", "ic_arrow_forward_white_48dp.png", "ic_arrow_upward_white_48dp.png", "ic_border_color_white_48dp.png", "ic_check_box_outline_blank_white_24dp.png", "ic_check_box_white_24dp.png", "ic_check_white_48dp.png", "ic_chevron_left_white_48dp.png", "ic_chevron_right_white_48dp.png", "ic_clear_white_48dp.png", "ic_close_white_48dp.png", "ic_content_copy_white_48dp.png", "ic_error_outline_white_48dp.png", "ic_error_white_48dp.png", "ic_expand_less_white_48dp.png", "ic_expand_more_white_48dp.png", "ic_menu_white_48dp.png", "ic_mode_edit_white_48dp.png", "ic_more_horiz_white_48dp.png", "ic_more_vert_white_48dp.png", "ic_radio_button_checked_white_24dp.png", "ic_radio_button_unchecked_white_24dp.png", "ic_refresh_white_48dp.png", "ic_subdirectory_arrow_left_white_48dp.png", "ic_warning_white_96dp.png"],
            image_length = [];

        var pw = new pe.seize.widget.PopupWindow();
        pw.setTitle("Downloading resources");

        var l = new LinearLayout(pe.CONTEXT);
        l.setOrientation(1);

        l.addView(pe.android.widget.TextView("라이브러리 리소스 파일이 존재하지 않습니다.\n정상적인 작동을 위해 리소스 파일(177KB)을 다운해야 합니다. 다운하시겠습니까?\n\n", Color.BLACK, 15, -1, -2, null));
        l.addView(pe.android.widget.TextView("** 이 리소스 파일은 라이브러리 최초 실행시 한번만 다운됩니다. **\n** 저장 위치 : " + DB_PATH + " **", Color.RED, 15, -1, -2, null));
        l.addView(pe.android.widget.space(1, 20 * Utils.DP));
        l.addView(pe.android.widget.Divider(WIDTH - 20 * Utils.DP, 2 * Utils.DP, Color.GRAY));
        l.addView(pe.android.widget.space(1, 3 * Utils.DP));

        var down = pe.android.widget.TextView("\nDownloading....", Color.BLACK, 15, -1, 40 * Utils.DP);

        var bl = new LinearLayout(pe.CONTEXT);
        var download = new pe.seize.widget.Button()
            .setText("Download")
            .setTextColor(Color.BLACK)
            .setParams(150 * Utils.DP, 40 * Utils.DP)
            .setOnClickListener(function (view) {
                l.removeAllViews();

                l.addView(down);
                l.addView(new pe.seize.widget.ProgressBar(0, 200 * Utils.DP, 7 * Utils.DP)
                    .setMax(100)
                    .setProgress(50)
                    .get());
            });
        bl.addView(download.get());
        bl.addView(pe.android.widget.space(10 * Utils.DP, 1));

        var later = new pe.seize.widget.Button()
            .setText("Later")
            .setTextColor(Color.BLACK)
            .setParams(150 * Utils.DP, 40 * Utils.DP);
        bl.addView(later.get());
        bl.setGravity(Gravity.CENTER);
        l.addView(bl);

        l.setPadding(15 * Utils.DP, 15 * Utils.DP, 15 * Utils.DP, 10 * Utils.DP);
        pw.setContentView(l);
        pw.show();
        /*
        for (var i = 0, len = images.length; i < len; i++) {
            var file = new File(DB_PATH + images[i]);
            if (!file.exists()) {
                Utils.Download("https://raw.githubusercontent.com/Team-Meta/seize_Library/master/res/" + images[i], DB_PATH, images[i]);
            }
        }
        */
    },

    applyFont: function (view) {
        if (new File(DB_PATH + "Roboto-Regular.ttf").exists()) {
            view.setTypeface(Typeface.createFromFile(DB_PATH + "Roboto-Regular.ttf"));
        }
    },

    getOptions: function () {
        var bundle;
        try {
            var file = new File(DB_PATH + "options.txt"),
                br = new BufferedReader(new FileReader(file)),
                str, split;

            bundle = new android.os.Bundle();

            while (true) {
                str = br.readLine();
                if (str !== null) {
                    split = str.split(" : ");
                    bundle.putString(split[0], split[1]);
                }
            }
        } catch (err) {
            Utils.Debug(err);
        }

        return bundle;
    }
};



pe.seize.widget.Button = function () {
    this.btn = new Button(pe.CONTEXT);
    this.text = "";
    this.WIDTH = 0;
    this.HEIGHT = 0;
    this.color = Color.argb(0, 0, 0, 0);
    this.effectColor = Color.rgb(0, 150, 255);
    this.textSize = 14;
    this.textColor = Color.BLACK;
    this.drawable = null;
    this.listener = function () {};

    this.btn.setTextSize(14);
    this.btn.setAllCaps(false);
    this.btn.setTextColor(Color.BLACK);
};

pe.seize.widget.Button.prototype = {

    setText: function (str) {
        this.text = str;
        this.btn.setText(str);
        return this;
    },

    setTextSize: function (size) {
        this.textSize = size;
        this.btn.setTextSize(size);
        return this;
    },

    setTextColor: function (color) {
        this.textColor = color;
        this.btn.setTextColor(color);
        return this;
    },

    setParams: function (width, height) {
        this.WIDTH = width;
        this.HEIGHT = height;
        this.btn.setLayoutParams(new Params(this.WIDTH, this.HEIGHT));
        return this;
    },

    setEffectColor: function (color) {
        this.effectColor = color;
        return this;
    },

    setBackgroundDrawable: function (drawable) {
        this.drawable = drawable;
        this.btn.setBackgroundDrawable(drawable);
        return this;
    },

    setOnClickListener: function (_listener) {
        this.listener = _listener;
        return this;
    },

    getWidth: function () {
        return this.WIDTH;
    },

    getHeight: function () {
        return this.HEIGHT;
    },

    get: function () {
        var that = this;
        this.btn.setBackgroundDrawable(this.drawable);
        Utils.applyFont(this.btn);

        this.btn.setOnTouchListener(new OnTouchListener({
            onTouch: (view, event) => {
                switch (event.getAction()) {
                case MotionEvent.ACTION_DOWN:
                    pe.seize.graphics.drawable.drawCircle(view, that.WIDTH, that.HEIGHT, event.getX(), event.getY(), that.effectColor, that.drawable);
                    return true;

                case MotionEvent.ACTION_MOVE:
                    pe.seize.graphics.drawable.drawCircle(view, that.WIDTH, that.HEIGHT, event.getX(), event.getY(), that.effectColor, that.drawable);
                    return true;

                case MotionEvent.ACTION_UP:
                    pe.seize.graphics.drawable.RippleDrawable(view, that.WIDTH, that.HEIGHT, event.getX(), event.getY(), that.effectColor, that.drawable, that.listener);
                    return true;

                case MotionEvent.ACTION_CANCEL:
                    pe.seize.graphics.drawable.RippleDrawable(view, that.WIDTH, that.HEIGHT, event.getX(), event.getY(), that.effectColor, that.drawable, that.listener);
                    return true;
                }
            }
        }));

        return this.btn;
    },

    show: function (gravity, x, y) {
        Utils.render(this.get(), gravity, x, y);
    }
};


pe.seize.widget.CircleButton = function () {
    this.btn = new Button(pe.CONTEXT);
    this.text = "";
    this.radius = 50 * Utils.DP;
    this.color = Color.BLACK;
    this.effectColor = Color.rgb(0, 150, 255);
    this.textSize = 14;
    this.textColor = Color.BLACK;
    this.drawable = null;
    this._drawable = null;
    this.shapeDrawable = null;
    this.listener = () => {};

    this.btn.setTextSize(14);
    this.btn.setAllCaps(false);
    this.btn.setTextColor(Color.BLACK);
};

pe.seize.widget.CircleButton.prototype = {

    setText: function (str) {
        this.text = str;
        this.btn.setText(str);
        return this;
    },

    setTextSize: function (size) {
        this.textSize = size;
        this.btn.setTextSize(size);
        return this;
    },

    setTextColor: function (color) {
        this.textColor = color;
        this.btn.setTextColor(color);
        return this;
    },

    setRadius: function (radius) {
        this.radius = radius;
        this.btn.setLayoutParams(new Params(this.radius * 2, this.radius * 2));
        return this;
    },

    setColor: function (color) {
        this.color = color;
        return this;
    },

    setBackgroundDrawable: function (drawable) {
        this.drawable = drawable;
        if (this.shapeDrawable !== null) {
            this._drawable = new LayerDrawable([this.shapeDrawable, this.drawable]);
            this.btn.setBackgroundDrawable(this._drawable);
        }
        return this;
    },

    setEffectColor: function (color) {
        this.effectColor = color;
        return this;
    },

    setOnClickListener: function (_listener) {
        this.listener = _listener;
        return this;
    },

    get: function () {
        var that = this;

        this.shapeDrawable = drawable.ShapeDrawable(new drawable.shapes.OvalShape());
        this.shapeDrawable.getPaint().setColor(this.color);

        if (this.drawable === null) {
            this._drawable = this.shapeDrawable;
        } else {
            this._drawable = new LayerDrawable([this.shapeDrawable, this.drawable]);
        }

        Utils.applyFont(this.btn);
        this.btn.setBackgroundDrawable(this._drawable);

        this.btn.setOnTouchListener(new OnTouchListener({
            onTouch: (view, event) => {
                switch (event.getAction()) {
                case MotionEvent.ACTION_DOWN:
                    return true;

                case MotionEvent.ACTION_MOVE:
                    return true;

                case MotionEvent.ACTION_UP:
                    that.listener(view, event);
                    return true;

                case MotionEvent.ACTION_CANCEL:
                    return true;
                }
            }
        }));

        return this.btn;
    },

    show: function (gravity, x, y) {
        Utils.render(this.get(), gravity, x, y);
    }
};


pe.seize.widget.CheckBox = function () {
    this.btn = new ToggleButton(pe.CONTEXT);
    this.textView = new TextView(pe.CONTEXT);
    this.btnLayout = new LinearLayout(pe.CONTEXT);
    this.text = "";
    this.WIDTH = 0;
    this.HEIGHT = 0;
    this.checked = false;
    this.textSize = 14;
    this.textColor = Color.BLACK;
    this.color = Color.rgb(54, 69, 154);
    this.listener = () => {};

    this.textView.setTextSize(14);
    this.textView.setTextColor(Color.BLACK);
    this.textView.setGravity(Gravity.CENTER);
    Utils.applyFont(this.textView);
    this.btn.setTextOn("");
    this.btn.setTextOff("");

    this.btnLayout.setOrientation(0);
    this.btnLayout.setGravity(Gravity.CENTER);
};

pe.seize.widget.CheckBox.prototype = {

    setText: function (str) {
        this.text = str;
        this.textView.setText(str);
        return this;
    },

    setTextSize: function (size) {
        this.textSize = size;
        this.textView.setTextSize(size);
        return this;
    },

    setTextColor: function (color) {
        this.textColor = color;
        this.textView.setTextColor(color);
        return this;
    },

    setChecked: function (checked) {
        var that = this;
        Utils.uiThread(() => {
            that.checked = checked;
            that.btn.setChecked(that.checked);
        });
        return this;
    },

    setColor: function (color) {
        this.color = color;
        return this;
    },

    setParams: function (width, height) {
        this.WIDTH = width;
        this.HEIGHT = height;
        this.btnLayout.setLayoutParams(new Params(this.WIDTH, this.HEIGHT));
        return this;
    },

    setOnCheckedChangeListener: function (_listener) {
        this.listener = _listener;
        return this;
    },

    getWidth: function () {
        return this.WIDTH;
    },

    getHeight: function () {
        return this.HEIGHT;
    },

    get: function () {
        var that = this;
        this.btn.setBackgroundDrawable(pe.seize.graphics.drawable.CHECKBOX_OFF(this.color));
        this.btn.setLayoutParams(new Params(30 * DP, 30 * DP));
        this.btn.setOnCheckedChangeListener(new OnCheckedChangeListener({
            onCheckedChanged: (toggle, isChecked) => {
                if (isChecked) {
                    toggle.setBackgroundDrawable(pe.seize.graphics.drawable.CHECKBOX_ON(that.color));
                    that.listener(toggle, isChecked);
                }

                if (!isChecked) {
                    toggle.setBackgroundDrawable(pe.seize.graphics.drawable.CHECKBOX_OFF(that.color));
                    that.listener(toggle, isChecked);
                }
            }
        }));
        this.btnLayout.addView(this.btn);

        this.textView.setLayoutParams(new Params(this.WIDTH - 35 * DP, this.HEIGHT));
        this.btnLayout.addView(this.textView);

        return this.btnLayout;
    },

    show: function (gravity, x, y) {
        Utils.render(this.get(), gravity, x, y);
    }
};


pe.seize.widget.RadioButton = function () {
    this.btn = new ToggleButton(pe.CONTEXT);
    this.textView = new TextView(pe.CONTEXT);
    this.btnLayout = new LinearLayout(pe.CONTEXT);
    this.text = "";
    this.WIDTH = 0;
    this.HEIGHT = 0;
    this.checked = false;
    this.textSize = 14;
    this.textColor = Color.BLACK;
    this.color = Color.rgb(54, 69, 154);
    this.listener = () => {};

    this.textView.setTextSize(14);
    this.textView.setTextColor(Color.BLACK);
    this.textView.setGravity(Gravity.CENTER);
    Utils.applyFont(this.textView);
    this.btn.setTextOn("");
    this.btn.setTextOff("");

    this.btnLayout.setOrientation(0);
    this.btnLayout.setGravity(Gravity.CENTER);
};

pe.seize.widget.RadioButton.prototype = {

    setText: function (str) {
        this.text = str;
        this.textView.setText(str);
        return this;
    },

    setTextSize: function (size) {
        this.textSize = size;
        this.textView.setTextSize(size);
        return this;
    },

    setTextColor: function (color) {
        this.textColor = color;
        this.textView.setTextColor(color);
        return this;
    },

    setChecked: function (checked) {
        var that = this;
        Utils.uiThread(() => {
            that.checked = checked;
            that.btn.setChecked(that.checked);
        });
        return this;
    },

    setColor: function (color) {
        this.color = color;
        return this;
    },

    setParams: function (width, height) {
        this.WIDTH = width;
        this.HEIGHT = height;
        this.btnLayout.setLayoutParams(new Params(this.WIDTH, this.HEIGHT));
        return this;
    },

    setOnCheckedChangeListener: function (_listener) {
        this.listener = _listener;
        return this;
    },

    getWidth: function () {
        return this.WIDTH;
    },

    getHeight: function () {
        return this.HEIGHT;
    },

    get: function () {
        var that = this;
        this.btn.setLayoutParams(new Params(30 * DP, 30 * DP));
        this.btn.setBackgroundDrawable(pe.seize.graphics.drawable.RADIO_OFF(that.color));
        this.btn.setOnCheckedChangeListener(new OnCheckedChangeListener({
            onCheckedChanged: (toggle, isChecked) => {
                if (isChecked) {
                    toggle.setBackgroundDrawable(pe.seize.graphics.drawable.RADIO_ON(that.color));
                    that.listener(toggle, isChecked);
                }

                if (!isChecked) {
                    toggle.setBackgroundDrawable(pe.seize.graphics.drawable.RADIO_OFF(that.color));
                    that.listener(toggle, isChecked);
                }
            }
        }));
        this.btnLayout.addView(this.btn);

        this.textView.setLayoutParams(new Params(this.WIDTH - 35 * DP, this.HEIGHT));
        this.btnLayout.addView(this.textView);

        return this.btnLayout;
    },

    show: function (gravity, x, y) {
        Utils.render(this.get(), gravity, x, y);
    }
};


pe.seize.widget.PopupWindow = function () {
    this.window = new PopupWindow();
    this.mainLayout = new LinearLayout(pe.CONTEXT);
    this.titleLayout = new LinearLayout(pe.CONTEXT);

    this.dismissListener = function () {};
    this.WIDTH = WIDTH;
    this.HEIGHT = HEIGHT;
    var that = this;

    this.mainLayout.setOrientation(1);
    this.titleLayout.setOrientation(0);

    this.mainLayout.setGravity(Gravity.TOP | Gravity.CENTER);
    this.titleLayout.setGravity(Gravity.LEFT | Gravity.CENTER);
    this.mainLayout.setBackgroundColor(Color.WHITE);
    this.titleLayout.setBackgroundColor(Color.rgb(30, 30, 30));

    this.titleLayout.addView(pe.android.widget.space(10 * Utils.DP, 1));
    this.menuBtn = new pe.seize.widget.Button()
        .setText("")
        .setTextColor(Color.WHITE)
        .setParams(24 * Utils.DP, 24 * Utils.DP)
        .setEffectColor(Color.argb(0, 0, 0, 0))
        .setBackgroundDrawable(pe.seize.graphics.drawable.MENU(Color.WHITE))
        .setOnClickListener(view => {

        });
    this.titleLayout.addView(this.menuBtn.get());

    this.titleLayout.addView(pe.android.widget.space(10 * Utils.DP, 1));
    this.title = new TextView(pe.CONTEXT);
    this.title.setText("Title");
    this.title.setTextColor(Color.WHITE);
    this.title.setTextSize(14);
    this.title.setGravity(Gravity.LEFT | Gravity.CENTER);
    Utils.applyFont(this.title);
    this.titleLayout.addView(this.title, WIDTH - 80 * Utils.DP, 48 * Utils.DP);

    this.close = new pe.seize.widget.Button()
        .setText("")
        .setParams(24 * Utils.DP, 24 * Utils.DP)
        .setEffectColor(Color.argb(0, 0, 0, 0))
        .setBackgroundDrawable(pe.seize.graphics.drawable.CLOSE(Color.WHITE))
        .setOnClickListener(view => {
            Utils.uiThread(function () {
                that.window.dismiss();
                that.dismissListener();
            });
        });
    this.titleLayout.addView(this.close.get());
    this.mainLayout.addView(this.titleLayout, -1, 48 * Utils.DP);
};

pe.seize.widget.PopupWindow.prototype = {

    setTitle: function (str) {
        this.title.setText(str);
        return this;
    },

    setTitleColor: function (color) {
        this.titleLayout.setBackgroundDrawable(new ColorDrawable(color));
        return this;
    },

    setOnDismissListener: function (listener) {
        this.dismissListener = listener;
        return this;
    },

    setIcon: function (icon) {
        this.menuBtn.setBackgroundDrawable(icon);
        return this;
    },

    setWidth: function (value) {
        this.WIDTH = value;
        return this;
    },

    setHeight: function (value) {
        this.HEIGHT = value;
        return this;
    },

    setContentView: function (view) {
        this.mainLayout.addView(view);
        return this;
    },

    show: function () {
        var that = this;
        Utils.uiThread(function () {
            that.window.setWidth(that.WIDTH);
            that.window.setHeight(that.HEIGHT);
            that.window.setContentView(that.mainLayout);
            that.window.showAtLocation(pe.CONTEXT.getWindow().getDecorView(), Gravity.CENTER, 0, 0);
        });
    }
};

pe.seize.widget.PopupWindow.PopupStyle = {
    GRID_LEFT: 0,
    GRID_TOP: 1,
    GRID_RIGHT: 2,
    GRID_BOTTOM: 3,
    OVERLAY: 4
};


pe.seize.widget.ProgressBar = function (style, width, height) {
    this.style = style;
    this.max = 0;
    this.progress = 0;
    this.progressColor = Color.rgb(0, 150, 136);
    this.backgroundColor = Color.WHITE;
    this.width = width;
    this.height = height;
    this.listener = function () {};
    this.showing = false;

    this.bar = new ProgressBar(pe.CONTEXT, null, R.attr.progressBarStyleHorizontal);
    this.bar.getProgressDrawable().setColorFilter(this.progressColor, PorterDuff.Mode.SRC_ATOP);
    this.bar.setLayoutParams(new Params(width, height));
    //아직 Horizontal 스타일만..
};

pe.seize.widget.ProgressBar.prototype = {

    setMax: function (value) {
        var that = this;
        Utils.uiThread(() => {
            that.max = value;
            that.bar.setMax(value);
        });
        return this;
    },

    setProgress: function (value) {
        var that = this;
        Utils.uiThread(() => {
            that.progress = value;
            that.bar.setProgress(value);
        });
        return this;
    },

    getMax: function () {
        return this.max;
    },

    getProgress: function () {
        return this.progress;
    },

    get: function () {
        return this.bar;
    }
};

pe.seize.widget.ProgressBar.ProgressBarStyle = {
    HORIZONTAL: 0,
    VERTICAL: 1,
    CIRCLE: 2
};


pe.seize.widget.SeekBar = function () {

};


pe.seize.widget.TextView = function () {
    this.textView = new TextView(pe.CONTEXT);
};



pe.seize.graphics = {

    Bitmap: {

        cutBitmap: (bm, x, y, width, height) => {
            return Bitmap.createScaledBitmap(Bitmap.createBitmap(bm, x, y, width, height), width * DP, height * DP, false);
        },

        ninePatch: (bm, x, y, nx, ny, width, height) => {
            var _bm = Bitmap.createBitmap(width, height, Bitmap.Config.ARGB_8888),
                left_top = Bitmap.createBitmap(bm, 0, 0, x, y),
                center_top = Bitmap.createBitmap(bm, x, 0, nx, y),
                right_top = Bitmap.createBitmap(bm, x + nx, 0, bm.getWidth() - x - nx, y),
                left_center = Bitmap.createBitmap(bm, 0, y, x, ny),
                center = Bitmap.createBitmap(bm, x, y, nx, ny),
                right_center = Bitmap.createBitmap(bm, x + nx, y, bm.getWidth() - x - nx, ny),
                left_bottom = Bitmap.createBitmap(bm, 0, y + ny, x, bm.getHeight() - y - ny),
                center_bottom = Bitmap.createBitmap(bm, x, y + ny, nx, bm.getHeight() - y - ny),
                right_bottom = Bitmap.createBitmap(bm, x + nx, y + ny, bm.getWidth() - x - nx, bm.getHeight() - y - ny),
                canvas = new Canvas(_bm);

            canvas.drawBitmap(left_top, 0, 0, null);
            canvas.drawBitmap(Bitmap.createScaledBitmap(center_top, width - bm.getWidth() + nx, y, false), x, 0, null);
            canvas.drawBitmap(right_top, width - bm.getWidth() + nx + x, 0, null);
            canvas.drawBitmap(Bitmap.createScaledBitmap(left_center, x, height - bm.getHeight() + ny, false), 0, y, null);
            canvas.drawBitmap(Bitmap.createScaledBitmap(center, width - bm.getWidth() + nx, height - bm.getHeight() + ny, false), x, y, null);
            canvas.drawBitmap(Bitmap.createScaledBitmap(right_center, right_top.getWidth(), height - bm.getHeight() + ny, false), width - bm.getWidth() + nx + x, y, null);
            canvas.drawBitmap(left_bottom, 0, height - bm.getHeight() + ny + y, null);
            canvas.drawBitmap(Bitmap.createScaledBitmap(center_bottom, width - bm.getWidth() + nx, left_bottom.getHeight(), false), x, height - bm.getHeight() + ny + y, null);
            canvas.drawBitmap(right_bottom, width - bm.getWidth() + nx + x, height - bm.getHeight() + ny + y, null);

            return new BitmapDrawable(_bm);
        }
    },

    drawable: {

        setTint: (drawable, color) => { //made by Astro
            drawable.getPaint().setColorFilter(new PorterDuffColorFilter(color, PorterDuff.Mode.SRC_ATOP));
            return drawable;
        },

        drawCircle: (view, width, height, x, y, color, drawable, radius, alpha) => {
            var bm = Bitmap.createBitmap(width, height, Bitmap.Config.ARGB_8888),
                canvas = new Canvas(bm),
                paint = new Paint();

            paint.setColor(color);

            if (alpha !== null) {
                paint.setAlpha(alpha);
            }

            paint.setAntiAlias(true);
            canvas.drawCircle(x, y, (radius === null ? 15 * DP : radius), paint);

            if (drawable === null) {
                view.setBackgroundDrawable(new BitmapDrawable(bm));
            } else {
                view.setBackgroundDrawable(new LayerDrawable([drawable, new BitmapDrawable(bm)]));
            }
        },

        RippleDrawable: (view, width, height, x, y, color, drawable, func, max_r, duration) => {
            var radius = 10 * DP,
                max_radius = (max_r === null ? ((Math.hypot(width, height) / 2) + 100 * DP) : max_r),
                click = false;

            var valueAnimator = ValueAnimator.ofFloat([radius, max_radius]),
                _valueAnimatorX = ValueAnimator.ofFloat([x, width / 2]),
                _valueAnimatorY = ValueAnimator.ofFloat([y, height / 2]);

            duration = (duration === null ? 300 : duration);

            _valueAnimatorX.setDuration(duration);
            _valueAnimatorY.setDuration(duration);

            valueAnimator.addUpdateListener(new ValueAnimator.AnimatorUpdateListener({
                onAnimationUpdate: _valueAnimator => {
                    var current_radius = _valueAnimator.getAnimatedValue(),
                        circle_point_x = _valueAnimatorX.getAnimatedValue(),
                        circle_point_y = _valueAnimatorY.getAnimatedValue();

                    if (current_radius < max_radius) {
                        pe.seize.graphics.drawable.drawCircle(view, width, height, circle_point_x, circle_point_y, color, drawable, current_radius, null);
                    }

                    if (circle_point_x === width / 2) {
                        if (drawable === null) {
                            view.setBackgroundDrawable(null);
                        } else {
                            view.setBackgroundDrawable(drawable);
                        }

                        if (func !== null && !click) {
                            func(view);
                        }
                        click = true;
                    }
                }
            }));

            valueAnimator.setDuration(duration + 50);
            valueAnimator.start();
            _valueAnimatorX.start();
            _valueAnimatorY.start();
        },

        CHECKBOX_OFF: color => {
            var image = new BitmapFactory.decodeFile(DB_PATH + "ic_check_box_outline_blank_white_24dp.png");

            return pe.seize.graphics.drawable.setTint(new BitmapDrawable(image), color);
        },

        CHECKBOX_ON: color => {
            var image = new BitmapFactory.decodeFile(DB_PATH + "ic_check_box_white_24dp.png");

            return pe.seize.graphics.drawable.setTint(new BitmapDrawable(image), color);
        },

        RADIO_OFF: color => {
            var image = new BitmapFactory.decodeFile(DB_PATH + "ic_radio_button_unchecked_white_24dp.png");

            return pe.seize.graphics.drawable.setTint(new BitmapDrawable(image), color);
        },

        RADIO_ON: color => {
            var image = new BitmapFactory.decodeFile(DB_PATH + "ic_radio_button_checked_white_24dp.png");

            return pe.seize.graphics.drawable.setTint(new BitmapDrawable(image), color);
        },

        CLOSE: color => {
            var image = new BitmapFactory.decodeFile(DB_PATH + "ic_close_white_48dp.png");

            return pe.seize.graphics.drawable.setTint(new BitmapDrawable(image), color);
        },

        ADD: color => {
            var image = new BitmapFactory.decodeFile(DB_PATH + "ic_add_white_48dp.png");

            return pe.seize.graphics.drawable.setTint(new BitmapDrawable(image), color);
        },

        COMPLETE: color => {
            var image = new BitmapFactory.decodeFile(DB_PATH + "ic_check_white_48dp.png");

            return pe.seize.graphics.drawable.setTint(new BitmapDrawable(image), color);
        },

        MENU: color => {
            var image = new BitmapFactory.decodeFile(DB_PATH + "ic_menu_white_48dp.png");

            return pe.seize.graphics.drawable.setTint(new BitmapDrawable(image), color);
        }
    },

    Color: {

        Palette: colors => {

        }
    }
};



pe.seize.io.File = function (path) {
    this._file = new File(path);
    this.path = path;
};

pe.seize.io.File.prototype.create = function () {
    if (!this._file.getParentFile().exists()) {
        this._file.getParentFile().mkdirs();
    }
    this._file.createNewFile();
    return this;
};

pe.seize.io.File.prototype.read = function () {
    if (this._file.exists()) {
        var fis = new FileInputStream(this.path),
            isr = new InputStreamReader(fis),
            br = new BufferedReader(isr),
            str = "",
            read = "";

        while ((read = br.readLine()) !== -1) {
            str += read + "\n";
        }
        br.close();

        return str;
    } else {
        return "";
    }
    return this;
};

pe.seize.io.File.prototype.write = function (str) {
    var fos = new FileOutputStream(this.path);
    fos.write(new java.lang.String(str).getBytes());
    fos.close();
    return this;
};



pe.android.widget = {

    Button: (text, textColor, textSize, width, height, drawable) => {
        var btn = new Button(pe.CONTEXT);
        btn.setText(text);
        Utils.applyFont(btn);
        if (textColor !== null) {
            btn.setTextColor(textColor);
        }
        if (textSize !== null) {
            btn.setTextSize(textSize);
        }
        if (drawable !== null) {
            btn.setBackgroundDrawable(drawable);
        }
        btn.setLayoutParams(new Params(width, height));

        return btn;
    },

    TextView: (text, textColor, textSize, width, height, drawable) => {
        var tv = new TextView(pe.CONTEXT);
        tv.setText(text);
        Utils.applyFont(tv);
        if (textColor !== null) {
            tv.setTextColor(textColor);
        }
        if (textSize !== null) {
            tv.setTextSize(textSize);
        }
        if (drawable !== null) {
            tv.setBackgroundDrawable(drawable);
        }
        tv.setLayoutParams(new Params(width, height));

        return tv;
    },

    ProgressBar: (type, progress, max) => {

    },

    LinearLayout: (orientation, gravity) => {
        var layout = new LinearLayout(pe.CONTEXT);
        layout.setOrientation(orientation);
        layout.setGravity(gravity);

        return layout;
    },

    space: (w, h) => {
        var tv = new TextView(pe.CONTEXT);
        tv.setLayoutParams(new Params(w, h));
        tv.setBackgroundDrawable(null);
        tv.setText("");

        return tv;
    },

    Divider: function (w, h, color) {
        var tv = new TextView(pe.CONTEXT);
        tv.setLayoutParams(new Params(w, h));
        tv.setBackgroundDrawable(null);
        tv.setText("");
        tv.setBackgroundDrawable(new ColorDrawable(color));

        return tv;
    }
};



var selectLevelHook = () => {
    var scripts = net.zhuoweizhang.mcpelauncher.ScriptManager.scripts;
    for (var i = 0; i < scripts.size(); i++) {
        var script = scripts.get(i),
            scope = script.scope,
            SO = org.mozilla.javascript.ScriptableObject;

        if (!SO.hasProperty(scope, "pe")) {
            SO.putProperty(scope, "pe", pe);
        }
        if (!SO.hasProperty(scope, "Utils")) {
            SO.putProperty(scope, "Utils", Utils);
        }
    }
};


var newLevel = () => {

};


Utils.init();