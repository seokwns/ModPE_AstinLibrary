/**
* @author seizePE(moona0915@naver.com)
* @since 2016 - 5 - 15
*/


const pe = {
	getContext : function() {
		com.mojang.minecraftpe.MainActivity.currentMainActivity.get();
	},
	
	ModPE : {},
	
	seize : {},
	
	android : {},
	
	info : {
		VERSION : 1,
		ChangeLog : [],
		Maker : "seizePE(moona0915)"
		E_Mail : "moona0915@naver.com"
	}
};


var Button = android.widget.Button,
	TextView = android.widget.TextView,
	ToggleButton = android.widget.ToggleButton,
	CheckBox = android.widget.CheckBox,
	Switch = android.widget.Switch,
	SeekBar = android.widget.SeekBar,
	ProgressBar = android.widget.ProgressBar,
	PopupWindow = android.widget.PopupWindow,
	Toast = android.widget.Toast,
	EditText = android.widget.EditText,
	OnCheckedChangeListener = android.widget.CompoundButton.OnCheckedChangeListener,
	OnTouchListener = android.view.View.OnTouchListener,
	OnClickListener = android.view.View.OnClickListener,
	MotionEvent = android.view.MotionEvent,
	Gravity = android.view.Gravity,
	ScrollView = android.widget.ScrollView,
	LinearLayout = android.widget.LinearLayout,
	horizontalScrollView = android.widget.HorizontalScrollView,
	FrameLayout = android.widget.FrameLayout,
	WIDTH = pe.getContext().getScreenWidth(),
	HEIGHT = pe.getContext().getScreenHeight(),
	Bitmap = android.graphics.Bitmap,
	BitmapFactory = android.graphics.BitmapFactory,
	BitmapDrawable = android.graphics.drawable.BitmapDrawable,
	Drawable = android.graphics.drawable.Drawable,
	drawable = android.graphics.drawable,
	ColorDrawable = android.graphics.drawable.ColorDrawable,
	Color = android.graphics.Color,
	Canvas = android.graphics.Canvas,
	Paint = android.graphics.Paint,
	Typeface = android.graphics.Typeface,
	GradientDrawable = android.graphics.drawable.GradientDrawable,
	ClipDrawable = android.graphics.drawable.ClipDrawable,
	LayerDrawable = android.graphics.drawable.LayerDrawable,
	PorterDuff = android.graphics.PorterDuff,
	PorterDuffColorFilter = android.graphics.PorterDuffColorFilter,
	File = java.io.File,
	OutputStreamWriter = java.io.OutputStreamWriter,
	FileOutputStream = java.io.FileOutputStream,
	FileInputStream = java.io.FileInputStream,
	BufferedReader = java.io.BufferedReader,
	BufferedInputStream = java.io.BufferedInputStream,
	BufferedOutputStream = java.io.BufferedOutputStream,
	InputStreamReader = java.io.InputStreamReader,
	sheet = BitmapFactory.decodeStream(ModPE.openInputStreamFromTexturePack("images/gui/spritesheet.png")),
	touchGUI = BitmapFactory.decodeStream(ModPE.openInputStreamFromTexturePack("images/gui/touchgui.png")),
	touchGUI2 = BitmapFactory.decodeStream(ModPE.openInputStreamFromTexturePack("images/gui/touchgui2.png")),
	GUI = BitmapFactory.decodeStream(ModPE.openInputStreamFromTexturePack("images/gui/gui.png")),
	Params = android.widget.LinearLayout.LayoutParams,
	SpeechRecognizer = android.speech.SpeechRecognizer,
	Intent = android.content.Intent,
	RecognizerIntent = android.speech.RecognizerIntent,
	Thread = java.lang.Thread,
	Runnable = java.lang.Runnable,
	DP = android.util.TypedValue.applyDimension(android.util.TypedValue.COMPLEX_UNIT_DIP, 1, ctx.getResources().getDisplayMetrics());




const toast = function(text, duration) {
	pe.getContext().runOnUiThread(new Runnable({
		run : function(){
			Toast.makeText(pe.getContext(), text, duration).show();
		}
	}));
};


const getAbsolutePath = function() {
	return android.os.Environment.getExternalStorageDirectory().getAbsolutePath();
};


const uiThread = function(func) {
	pe.getContext().runOnUiThread(new Runnable({
		run : function() {
			try {
				func();
			} catch(err) {
				debug(err);
			}
		}
	}));
};


const thread = function(func) {
	new Thread(new Runnable({
		run : function() {
			try {
				func();
			} catch(err) {
				debug(err);
			}
		}
	})).start();
};


const debug = function(err) {
	pe.getContext().runOnUiThread(new Runnable({
		run : function() {
			try {
				var dialog = new android.app.AlertDialog.Builder(pe.getContext());
				dialog.setTitle("Error");
				dialog.setMessage("Error\n\n - " + err.name + "\n - " + (err.lineNumber + 1) + "\n\n" + err.message);
				dialog.show();
			} catch(err) {
				print((err.lineNumber + 1) + " # " + err.message);
			}
		}
	}));
};


pe.seize.widget = {};


pe.seize.widget.DragMode = {
	ALWAYS_DRAG : 0, NO_DRAG : -1, HORIZONTAL_DRAG : 2, VERTICAL_DRAG : 3
};


pe.seize.widget.Button = function(context) {
	this.tag = "[ (Object) pe.seize.widget, Button ]";
	this.context = context;
	this.btn = new Button(context);
	
	this.text = "";
	this.params = {
		WIDTH : 35,
		HEIGHT : 35
	};
	this.fonts = {
		PRESSED : null,
		UNPRESSED : null
	};
	this.gravity = Gravity.CENTER;
	this.listener = function() {};
	this.showing = false;
	this.dragMode = false;
	this.window = null;
	
	this.textSize = 14;
	this.textColor = [pe.seize.graphics.Color.PLAIN, pe.seize.graphics.Color.IMPORTANT];
	this.drawable = null;
	
	this.position = {
		x : null,
		y : null,
		gravity : null
	};
};


pe.seize.widget.Button.prototype = {
	
	toString : function() {
		return this.tag;
	},
	
	setText : function(text) {
		this.text = text;
		if(this.showing) {
			
		} else {
			
		}
		
		return this;
	},
	
	getText : function() {
		return this.text;
	},
	
	setGravity : function(gravity) {
		this.gravity = gravity;
		
		return this;
	},
	
	setLayoutParams : function(width, height) {
		this.params.WIDTH = width;
		this.params.HEIGHT = height;
		this.btn.setLayoutParams(new Params(width, height));
		
		return this;
	},
	
	setOnClickListener : function(listener) {
		this.listener = listener;
		
		return this;
	},
	
	setBackgroundDrawable : function(drawable) {
		this.drawable = drawable;
		
		return this;
	},
	
	setTextColor : function(color, color2) {
		this.color = [color, color2];
		
		return this;
	},
	
	setTextSize : function(size) {
		this.textSize = size;
		
		return this;
	},
	
	setDragMode : function(type) {
		this.dragMode = type;
		
		return this;
	},
	
	update : function(x, y, width, height) {
		if(this.window != null) {
			this.window.update(x, y, (width == null? this.params.WIDTH : width), (height == null? this.params.HEIGHT : height), true);
			this.position.x = x;
			this.position.y = y;
			this.params.WIDTH = width;
			this.params.HEIGHT = height;
		}
		
		return this;
	},
	
	getWidth : function() {
		return this.params.WIDTH;
	},
	
	getHeight : function() {
		return this.params.HEIGHT;
	},
	
	getPosition : function() {
		return this.position;
	},
	
	getTextSize : function() {
		return this.textSize;
	},
	
	getTextColor : function() {
		return this.textColor;
	},
	
	getDragMode : function() {
		return this.dragMode;
	},
	
	isShowing : function() {
		return this.showing;
	},
	
	get : function() {
		this.showing = true;
	},
	
	show : function(gravity, x, y) {
		var that = this;
		
		uiThread(function() {
			that.window = new PopupWindow();
			that.window.setContentView(that.get());
			that.window.setWidth(that.params.WIDTH);
			that.window.setHeight(that.params.HEIGHT);
			that.window.showAtLocation(pe.getContext().getWindow().getDecorView(), gravity, x, y);
			
			that.showing = true;
			that.position.x = x;
			that.position.y = y;
			that.position.gravity = gravity;
		});
	},
	
	dismiss : function() {
		var that = this;
		
		uiThread(function() {
			if(that.window != null) {
				that.window.dismiss();
				that.window = null;
				that.showing = false;
			}
		});
	}
};


pe.seize.widget.ToggleButton = function(context) {
	this.tag = "[ (Object) pe.seize.widget, ToggleButton ]";
	this.context = context;
	this.btn = new ToggleButton(context);
	
	this.text = "";
	this.params = {
		WIDTH : 35,
		HEIGHT : 35
	};
	this.fonts = {
		PRESSED : null,
		UNPRESSED : null
	};
	this.gravity = Gravity.CENTER;
	this.listener = function() {};
	this.showing = false;
	this.dragMode = false;
	this.window = null;
	
	this.textSize = 14;
	this.textColor = [pe.seize.graphics.Color.PLAIN, pe.seize.graphics.Color.IMPORTANT];
	this.drawable = null;
	this.checked = false;
	
	this.position = {
		x : null,
		y : null,
		gravity : null
	};
};


pe.seize.widget.ToggleButton.prototype = {
	
	toString : function() {
		return this.tag;
	},
	
	setText : function(text) {
		this.text = text;
		if(this.showing) {
			
		} else {
			
		}
		
		return this;
	},
	
	getText : function() {
		return this.text;
	},
	
	setGravity : function(gravity) {
		this.gravity = gravity;
		
		return this;
	},
	
	setLayoutParams : function(width, height) {
		this.params.WIDTH = width;
		this.params.HEIGHT = height;
		this.btn.setLayoutParams(new Params(width, height));
		
		return this;
	},
	
	setCheckedChangeListener : function(listener) {
		this.listener = listener;
		
		return this;
	},
	
	setBackgroundDrawable : function(drawable) {
		this.drawable = drawable;
		
		return this;
	},
	
	setChecked : function(checked) {
		this.checked = checked;
		
		return this;
	},
	
	setTextColor : function(color, color2) {
		this.color = [color, color2];
		
		return this;
	},
	
	setTextSize : function(size) {
		this.textSize = size;
		
		return this;
	},
	
	setDragMode : function(type) {
		this.dragMode = type;
		
		return this;
	},
	
	update : function(x, y, width, height) {
		if(this.window != null) {
			this.window.update(x, y, (width == null? this.params.WIDTH : width), (height == null? this.params.HEIGHT : height), true);
		}
		
		return this;
	},
	
	getWidth : function() {
		return this.params.WIDTH;
	},
	
	getHeight : function() {
		return this.params.HEIGHT;
	},
	
	getPosition : function() {
		return this.position;
	},
	
	getTextSize : function() {
		return this.textSize;
	},
	
	getTextColor : function() {
		return this.textColor;
	},
	
	getDragMode : function() {
		return this.dragMode;
	},
	
	isShowing : function() {
		return this.showing;
	},
	
	isChecked : function() {
		return this.checked;
	},
	
	get : function() {
		this.showing = true;
	},
	
	show : function(gravity, x, y) {
		var that = this;
		
		uiThread(function() {
			that.window = new PopupWindow();
			that.window.setContentView(that.get());
			that.window.setWidth(that.params.WIDTH);
			that.window.setHeight(that.params.HEIGHT);
			that.window.showAtLocation(pe.getContext().getWindow().getDecorView(), gravity, x, y);
			
			that.showing = true;
			that.position.x = x;
			that.position.y = y;
			that.position.gravity = gravity;
		});
	},
	
	dismiss : function() {
		var that = this;
		
		uiThread(function() {
			if(that.window != null) {
				that.window.dismiss();
				that.window = null;
				that.showing = false;
			}
		});
	}
};


pe.android.widget = {

	Button : function(context, text, textColor, textSize, width, height, drawable) {
		var btn = new Button(context);
		btn.setText(text);
		if(textColor != null) btn.setTextColor(textColor);
		if(textSize != null) btn.setTextSize(textSize);
		if(drawable != null) btn.setBackgroundDrawable(drawable);
		btn.setLayoutParams(new Params(width, height));
		
		return btn;
	},
	
	TextView : function(context, text, textColor, textSize, width, height, drawable) {
		var tv = new TextView(context);
		tv.setText(text);
		if(textColor != null) tv.setTextColor(textColor);
		if(textSize != null) tv.setTextSize(textSize);
		if(drawable != null) tv.setBackgroundDrawable(drawable);
		tv.setLayoutParams(new Params(width, height));
		
		return tv;
	},
	
	ProgressBar : function(context, type, progress, max) {
		
	},
	
	LinearLayout : function(context, orientation, gravity) {
		var layout = new LinearLayout(context);
		layout.setOrientation(orientation);
		layout.setGravity(gravity);
		
		return layout;
	}
};


pe.seize.graphics = {
	
	drawable : {
		
		BUTTON_UNPRESSED : function() {
			var bitmap = Bitmap.createBitmap(sheet, 8, 32, 8, 8),
				bit = Bitmap.createScaledBitmap(bitmap, 16  *  DP, 16  *  DP, false);
					
			return this.createNinePatch(bit, 4  *  DP, 4  *  DP, 12  *  DP, 14  *  DP);
		},
		
		BUTTON_PRESSED : function() {
			var bitmap = Bitmap.createBitmap(sheet, 0, 32, 8, 8),
				bit = Bitmap.createScaledBitmap(bitmap, 16  *  DP, 16  *  DP, false);
					
			return this.createNinePatch(bit, 4  *  DP, 4  *  DP, 12  *  DP, 14  *  DP);
		},
		
		TopBarDrawable : function() {
			var bitmap = Bitmap.createBitmap(touchGUI, 150, 26, 14, 30);
			for(var i = 0; i < 26; i++) {
				bitmap.setPixel(2, i, bitmap.getPixel(3, i));
				bitmap.setPixel(11, i, bitmap.getPixel(10, i));
			}
			for(var i = 3; i < 11; i++) {
				bitmap.setPixel(i, 25, bitmap.getPixel(i, 26));
				bitmap.setPixel(i, 26, bitmap.getPixel(i, 27));
				bitmap.setPixel(i, 27, bitmap.getPixel(i, 28));
				bitmap.setPixel(i, 28, 0x00000000);
			}
			for(var i = 0; i < 14; i++) {
				bitmap.setPixel(i, 25, bitmap.getPixel(4, 25));
				bitmap.setPixel(i, 26, bitmap.getPixel(4, 26));
				bitmap.setPixel(i, 27, bitmap.getPixel(4, 27));
			}
			var bit = Bitmap.createScaledBitmap(bitmap, 28  *  DP, 60  *  DP, false);
			
			return this.createNinePatch(bit, 5  *  DP, 7  *  DP, 46  *  DP, 22  *  DP);
		},
		
		SWITCH_OFF : function() {
			var bitmap = Bitmap.createBitmap(touchGUI, 160, 206, 38, 19),
				bit = Bitmap.createScaledBitmap(bitmap, 76 * DP, 38 * DP, false);
					
			return new BitmapDrawable(bit);
		},
		
		SWITCH_ON : function() {
			var bitmap = Bitmap.createBitmap(touchGUI, 198, 206, 38, 19),
				bit = Bitmap.createScaledBitmap(bitmap, 76 * DP, 37 * DP, false);
					
			return new BitmapDrawable(bit);
		},
		
		UTIL_TOOL : function() {
			var bitmap = Bitmap.createBitmap(touchGUI2, 134, 0, 28, 28),
				bit = Bitmap.createScaledBitmap(bitmap,  56 * DP, 56 * DP, false);
					
			return new BitmapDrawable(bit);
		},
		
		UTIL_SKIN : function() {
			var bitmap = Bitmap.createBitmap(touchGUI2, 106, 56, 26, 26),
				bit = Bitmap.createScaledBitmap(bitmap, 54 * DP, 54 * DP, false);
					
			return new BitmapDrawable(bit);
		},
		
		UTIL_STICK : function() {
			var bitmap = Bitmap.createBitmap(touchGUI2, 106, 0, 28, 28),
				bit = Bitmap.createScaledBitmap(bitmap, 56 * DP, 56 * DP, false);
					
			return new BitmapDrawable(bit);
		},
		
		UTIL_GRAPHIC : function() {
			var bitmap = Bitmap.createBitmap(touchGUI2, 134, 27, 28, 28),
				bit = Bitmap.createScaledBitmap(bitmap, 56 * DP, 56 * DP, false);
					
			return new BitmapDrawable(bit);
		},
		
		BACK_UNPRESSED : function() {
			var bitmap = Bitmap.createBitmap(sheet, 60, 0, 18, 18),
				bit = Bitmap.createScaledBitmap(bitmap, 100 * DP, 100 * DP, false);
					
			return new BitmapDrawable(bit);
		},
		
		BACK_PRESSED : function() {
			var bitmap = Bitmap.createBitmap(sheet, 78, 0, 18, 18),
				bit = Bitmap.createScaledBitmap(bitmap, 100 * DP, 100 * DP,false);
					
			return new BitmapDrawable(bit);
		},
		
		PANEL : function() {
			var bitmap = Bitmap.createBitmap(sheet, 34, 43, 14, 14),
				bit = Bitmap.createScaledBitmap(bitmap, 56  *  DP, 56  *  DP, false);
					
			return this.createNinePatch(bit, 12  *  DP, 12  *  DP, 44  *  DP, 44  *  DP);
		},
		
		EditTextDrawable : function() { //PlanP님의 MC - Class 소스
			var O = Color.parseColor("#6B6163"),
				I = Color.parseColor("#393939"),
				color = [O, O, O, O, O, O, O, O, O, O, O, O,
						 O, I, I, I, I, I, I, I, I, I, I, O,
						 O, I, I, I, I, I, I, I, I, I, I, O,
						 O, I, I, I, I, I, I, I, I, I, I, O,
						 O, I, I, I, I, I, I, I, I, I, I, O,
						 O, I, I, I, I, I, I, I, I, I, I, O,
						 O, I, I, I, I, I, I, I, I, I, I, O,
						 O, I, I, I, I, I, I, I, I, I, I, O,
						 O, I, I, I, I, I, I, I, I, I, I, O,
						 O, I, I, I, I, I, I, I, I, I, I, O,
						 O, I, I, I, I, I, I, I, I, I, I, O,
						 O, O, O, O, O, O, O, O, O, O, O, O];
					 
			var bit = Bitmap.createBitmap(12, 12, Bitmap.Config.ARGB_8888);
			bit.setPixels(color, 0, 12, 0, 0, 12, 12);
			var bitmap = Bitmap.createScaledBitmap(bit, 24 * DP, 24 * DP, false);
			
			return this.createNinePatch(bitmap, 6 * DP, 6 * DP, 18 * DP, 18 * DP);
		},
		
		createNinePatch : function(bitmap, x, y, xx, yy) {
			var NO_COLOR = 0x00000001,
				buffer = java.nio.ByteBuffer.allocate(84).order(java.nio.ByteOrder.nativeOrder());
					
			buffer.put(0x01);
			buffer.put(0x02);
			buffer.put(0x02);
			buffer.put(0x09);
			buffer.putInt(0);
			buffer.putInt(0);
			buffer.putInt(0);
			buffer.putInt(0);
			buffer.putInt(0);
			buffer.putInt(0);
			buffer.putInt(0);
			buffer.putInt(y);
			buffer.putInt(yy);
			buffer.putInt(x);
			buffer.putInt(xx);
			buffer.putInt(NO_COLOR);
			buffer.putInt(NO_COLOR);
			buffer.putInt(NO_COLOR);
			buffer.putInt(NO_COLOR);
			buffer.putInt(NO_COLOR);
			buffer.putInt(NO_COLOR);
			buffer.putInt(NO_COLOR);
			buffer.putInt(NO_COLOR);
			buffer.putInt(NO_COLOR);
			
			var npd = new drawable.NinePatchDrawable(pe.getContext().getResources(), bitmap, buffer.array(), new android.graphics.Rect(), null);
			
			return npd;
		},
		
		cutImage : function(bm, x, y, width, height) {
			return android.graphics.Bitmap.createScaledBitmap(android.graphics.Bitmap.createBitmap(bm, x, y, width, height), width * DP, height * DP, false);
		},
		
		scalePatch : function(bm, x, y, stretchWidth, stretchHeight, width, height) {
			var blank = Bitmap.createBitmap(width, height, Bitmap.Config.ARGB_8888),
				part1 = Bitmap.createBitmap(bm, 0, 0, x, y),
				part2 = Bitmap.createBitmap(bm, x, 0, stretchWidth, y),
				part3 = Bitmap.createBitmap(bm, x + stretchWidth, 0, bm.getWidth() - x - stretchWidth, y),
				part4 = Bitmap.createBitmap(bm, 0, y, x, stretchHeight),
				part5 = Bitmap.createBitmap(bm, x, y, stretchWidth, stretchHeight),
				part6 = Bitmap.createBitmap(bm, x + stretchWidth, y, bm.getWidth() - x - stretchWidth, stretchHeight),
				part7 = Bitmap.createBitmap(bm, 0, y + stretchHeight, x, bm.getHeight() - y - stretchHeight),
				part8 = Bitmap.createBitmap(bm, x, y + stretchHeight, stretchWidth, bm.getHeight() - y - stretchHeight),
				part9 = Bitmap.createBitmap(bm, x + stretchWidth, y + stretchHeight, bm.getWidth() - x - stretchWidth, bm.getHeight() - y - stretchHeight),
				canvas = new Canvas(blank);
			
			canvas.drawBitmap(part1, 0, 0, null);
			canvas.drawBitmap(Bitmap.createScaledBitmap(part2, width - bm.getWidth() + stretchWidth, y, false), x, 0, null);
			canvas.drawBitmap(part3, width - bm.getWidth() + stretchWidth + x, 0, null);
			canvas.drawBitmap(Bitmap.createScaledBitmap(part4, x, height - bm.getHeight() + stretchHeight, false), 0, y, null);
			canvas.drawBitmap(Bitmap.createScaledBitmap(part5, width-bm.getWidth() + stretchWidth, height - bm.getHeight() + stretchHeight, false), x, y, null);
			canvas.drawBitmap(Bitmap.createScaledBitmap(part6, part3.getWidth(), height-bm.getHeight() + stretchHeight, false), width - bm.getWidth() + stretchWidth + x, y, null);
			canvas.drawBitmap(part7, 0, height - bm.getHeight() + stretchHeight + y, null);
			canvas.drawBitmap(Bitmap.createScaledBitmap(part8, width-bm.getWidth() + stretchWidth, part7.getHeight(), false), x, height - bm.getHeight() + stretchHeight + y, null);
			canvas.drawBitmap(part9, width - bm.getWidth() + stretchWidth + x, height-bm.getHeight() + stretchHeight + y, null);
			
			return new BitmapDrawable(blank);
		}
	},
	
	Color : {
		PLAIN : Color.parseColor("#e1e1e1"),
		IMPORTANT : Color.parseColor("#ffffa1"),
		WARNING : Color.parseColor("#FF0000"),
		PROGRESS : Color.parseColor("#ff84ff84"),
		PROGRSSS_BACKGROUND : Color.parseColor("#ff848184")
	},
	
	getTexture : function(path) {
		var texture = ModPE.openInputStreamFromTexturePack("images/" + path), type = path.split(".");
		
		if(type[type.length] === "tga") 
			return net.zhuoweizhang.mcpelauncher.texture.tga.TGALoader.load(texture, false);
			
		else return BitmapFactory.decodeStream(texture);
	},
	
	ItemImageLoader : function(name, data) {
		var meta = eval("" + new java.lang.String(ModPE.getBytesFromTexturePack("images/items.meta"))+""),
		meta_map = meta.map(function(i) {
			return i.name;
		});
		
		if(texture.indexOf(name) < 0) 
			return Bitmap.createBitmap(1, 1, Bitmap.Config.RGB_8888);
		
		var uvs = meta[meta_map.indexOf(name)].uvs[data],
			img = this.getTexture("items-opaque.png"),
			x = uvs[0] * img.getWidth(),
			y = uvs[1] * img.getHeight(),
			width = Math.ceil(uvs[2] * img.getWidth() - x),
			height = Math.ceil(uvs[3] * img.getHeight() - y);
		
		return BitmapDrawable(Bitmap.createScaledBitmap(Bitmap.createBitmap(img, x, y, width, height), 32, 32, false));
	},
	
	Palette : function(colors) {
		this.colors = colors;
		this._colors = {};
	}
};


pe.seize.Utils = {
	
	render : function(view, gravity, x, y) {
		uiThread(function() {
			var window = new PopupWindow();
			window.setContentView(view);
			window.setWidth(-2);
			window.setHeight(-2);
			window.showAtLocation(pe.getContext().getWindow().getDecorView(), gravity, x, y);
		});
	},
	
	getTime : function() {
		var date = new Date(),
			year = date.getFullYear(),
			month = date.getMonth() + 1,
			day = date.getDate(),
			hours = date.getHours(),
			minutes = date.getMinutes(),
			m, now;
		
		if(hours > 12) m = "오후 " + (hours - 12);
		else m = "오전 " + hours;
		
		if(minutes >= 10) now = minutes;
		else now = "0" + minutes;
		
		return year + "년 " + month + "월 " + day + "일 "  + m + ":" + now;
	},
	
	getNetworkInfo : function() {
		var manager = pe.getContext().getSystemService(pe.getContext().CONNECTIVITY_SERVICE),
			mobile = manager.getNetworkInfo(android.net.ConnectivityManager.TYPE_MOBILE).isConnectedOrConnecting(),
			wifi = manager.getNetworkInfo(android.net.ConnectivityManager.TYPE_WIFI).isConnectedOrConnecting();
	
		if(mobile) 
			return { STATE : "online", TYPE : "mobile" };
		else if(wifi) 
			return { STATE : "online", TYPE : "wifi" };
		else 
			return { STATE : "offline", TYPE : "offline" };
	},
	
	download : function(url, path, name) {
		thread(function() {
			var file = new File(path, name);
			if(!file.getParentFile().exists()) file.getParentFile().mkdirs();
			if(!file.exists()) file.createNewFile();
			
			var url = new java.net.URL(url);
			var urlConnect = url.openConnection();
			urlConnect.connect();
			var BIS = new BufferedInputStream(url.openStream());
			var FOS = new FileOutputStream(path + name);
			var buffer = java.lang.reflect.Array.newInstance(java.lang.Byte.TYPE, 1024);
			var Total = 1, Count;
			
			while ((Count = BIS.read(buffer)) != -1) {
				Total += Count;
				FOS.write(buffer, 0, Count);
			}
			FOS.flush();
			FOS.close();
			BIS.close();
			return true;
		});
	},
	
	UpdateCenter : {
		
		CheckUpdate : function() {
			var that = this;
			
			thread(function() {
				var url = new java.net.URL("https://raw.githubusercontent.com/RetroPE/seize_ModPE_Library/master/Version").openStream(),
					BR = new BufferedReader(new InputStreamReader(url)),
					vers = BR.readLine();
				
				pe.info.VERSION = parseInt(vers);
				
				if(!vers.equals(new java.lang.String(MC.info.VERSION))) {
					that.UpdateWindow();
                }
			});
		},
		
		getLastVersion : function() {
			
		},
		
		getChangeLog : function() {
			
		},
		
		UpdateWindow : function() {
			
		}
	}
};


/**
* @author seizePE(moona0915)
* @since 2016-2-05
*/

/**
* @Math객체를 생성합니다.
* @namespace
*/
pe.seize.Math = {};


/**
* @숫자가 소수인지를 판별합니다.
* @param {Number} number
* @return {Boolean}
*/
pe.seize.Math.isPrime = function(number) {
	if(number % 2 === 0 && number !== 2) 
		return false;
	
	if(number === 2) 
		return true;
	
	for(var tmp = 1; tmp * tmp <= number; tmp += 2) {
		if(!(number % tmp)) 
			return true;
	}
	
	return false;
};


/**
* @숫자를 소인수분해 합니다.
* @param {Number} number
* @return {Array}
*/
pe.seize.Math.Factorization = function(number) {
	for(var i = 2, tmp = number, nums = []; i * i <= number; i += 2) {
		while(!(tmp % i)) {
			tmp /= i; 
			nums.push(i);
		}
		
		if(i === 2) 
			i --;
	}
	if(tmp !== 1) 
		nums.push(tmp);
	
	return nums;
};


/**
* @수의 약수를 구합니다.
* @param {Number} number
* @return {Array}
*/
pe.seize.Math.divisor = function(number) {
	var tmp = 1, nums = new Array();
	
	nums.push(1);
	while(tmp < number) {
		tmp++;
		if(number % tmp === 0 && this.isPrime(tmp)) 
			nums.push(tmp);
	}
	nums.push(number);
	
	return nums;
};


/**
* @두 숫자중 최대값을 구합니다.
* @param {Number} a
* @param {Number} b
* @return {Number}
*/
pe.seize.Math.max = function(a, b) {
	return a === b? a : (a > b? a : b);
};


/**
* @두 숫자중 최소값을 구합니다.
* @param {Number} a
* @param {Number} b
* @return {Number}
*/
pe.seize.Math.min = function(a, b) {
	return a === b? a : (a < b? a : b);
};


/**
* @숫자의 팩토리얼값을 구합니다.
* @param {Number} number
* @return {Number}
*/
pe.seize.Math.factorial = function(number) {
	var result = 1;
	while(--number) {
		result *= number + 1;
	}
	
	return result;
};


/**
* @숫자를 16진수로 변환합니다.
* @param {Number} number
* @return {Number}
*/
pe.seize.Math.toHexNumber = function(number) {
	return parseInt(number.toString(16));
};


/**
* @피타고라스의 정리.
* @param {Number} 
* @return {Number} 
*/
pe.seize.Math.hypot = function() {
	for(var i = 0, h = 0; i < arguments.length; i++) h += arguments[i] * arguments[i];
	
	return Math.sqrt(h);
};


/**
* @두 수의 최대공약수를 구합니다.
* @param {Number} num1
* @param {Number} num2
* @return {Number}
*/
pe.seize.Math.getGCD = function(num1, num2) {
	if(num1 < num2) 
		return this.getGCD(num2, num1); 
	
	else if(num1 % num2 === 0) 
		return num2; 
	
	else return this.getGCD(num1, num1 % num2); 
};


/**
* @두 수의 최소공배수를 구합니다.
* @param {Number} num1
* @param {Number} num2
* @return {Number}
*/
pe.seize.Math.getLCM = function(num1, num2) {
	return (num1 * num2) / this.getGCD(num1, num2); 
};


/**
* @특정 두 수사이의 값을 무작위로 반환합니다.
* @param {Number} start
* @param {Number} end
* @param {Boolean} is prime
* @return {Number}
*/
pe.seize.Math.random = function(start, end, prime) {
	var range = end - start, result;
	
	prime = (prime == null? false : prime);
	while(true) {
		result = Math.floor(Math.random() * range + start);
		if(prime) {
			if(this.isPrime(result)) 
				if(result !== 1) 
					return result;
		}
		else return result;
	}
};


/**
* @임의의 밑을 가진 로그를 구합니다. base값이 null이면 상용로그로 취급합니다.
* @param {Number} number
* @param {Number} base
* @return {Number}
*/
pe.seize.Math.log = function(number, base) {
	return Math.log(number) / Math.log((base == null? 10 : base));
};


/**
* @초항이 1인 피보나치 수열의 n번째 항을 구합니다.
* @param {Number} n
* @return {Number}
*/
pe.seize.Math.fibonacci = function(n) {
	if(n <= 2) return 1;
	for(var i = 2, fibo = [1, 1]; i <= n; i++) fibo[i] = fibo[i-1] + fibo[i-2];
	
	return fibo[n]; 
};


/**
* @배열의 특정 구간의 합을 구합니다.
* @param {Array} arr
* @param {Number} start
* @param {Number} end
*/
pe.seize.Math.nativeSum = function(arr, start, end) {
	for(var i = start, temp = 0; end >= i; i += 1) temp += arr[i];
	
	return temp;
};




/**
* @String객체를 생성합니다.
* @namespace
*/
pe.seize.String = {};


/**
* @코드를 아스키코드로 변환합니다.
* @param {String} code
* @return {String}
*/
pe.seize.String.str2ascii = function(code) {
	for(var i = 0, sp = code.split(""), eCode = ""; i < sp.length; i ++) eCode += (i == sp.length - 1? sp[i].charCodeAt(0) : sp[i].charCodeAt(0) + " ");
	
	return eCode;
};


/**
* @아스키코드를 문자열로 변환합니다.
* @param {String} ascii code
* @return {String}
*/
pe.seize.String.ascii2str = function(code) {
	for(var i = 0, rCode = "", sp = code.split(" "); i < sp.length; i ++) rCode += String.fromCharCode(sp[i]);
	
	return rCode;
};


/**
* @문자열이 영어인지 판별합니다.
* @param {String} str
* @return {Boolean}
*/
pe.seize.String.isEnglish = function(str) {
	return /^[A-z]+$/.test(str);
};


/**
* @문자를 16진수로 변환합니다.
* @param {String} str
* @return {String}
*/
pe.seize.String.toHexString = function(str) {
	var string = "";
	
	str.split("").forEach(function(element) {
		string += "\\x" + element.charCodeAt(0).toString(16).toUpperCase();
	});
	
	return string;
};


/**
* @문자열내의 모든 특정 문자열을 바꿉니다.
* @param {String} str
* @param {String} target
* @param {String} _str
* @return {String}
*/
pe.seize.String.replaceAll = function(str, target, _str) {
	return str.split(target).join(_str);
};


/**
* @문자열을 뒤집습니다.
* @param {String} str
* @return {String}
*/
pe.seize.String.reverse = function(str) {
	for(var i = str.length - 1, rstr = ""; i >= 0; i--) rstr += str[i];
	return rstr;
};


/**
* @문자열을 섞습니다.
* @param {String} str
* @return {String}
*/
pe.seize.String.shuffle = function(str) {
	for(var _str = str.split(""), n = _str.length, i = n - 1; i > 0; i--) {
		var index = Math.floor(Math.random() * (i + 1)), tmp = _str[i];
		
		_str[i] = _str[index], _str[index] = tmp;
	}
	return a.join("");
};


/**
* @Array객체를 생성합니다.
* @namespace
*/
pe.seize.Array = {};


/**
* @배열중 최대값을 구합니다.
* @param {Array} arr
* @return {Number}
*/
pe.seize.Array.max = function(arr) {
	return Math.max.apply(null, arr);
};


/**
* @배열중 최소값을 구합니다.
* @param {Array} arr
* @return {Number}
*/
pe.seize.Array.min = function(arr) {
	return Math.min.apply(null, arr);
};


/**
* @배열의 평균을 구합니다.
* @param {Array} arr
* @return {Number}
*/
pe.seize.Array.average = function(arr) {
	return (arr.reduce(function(a, b) {
		return a + b;
	}) / arr.length);
};


/**
* @두 배열이 일치하는 판별합니다.
* @param {Array} a
* @param {Array} b
* @return {Boolean}
*/
pe.seize.Array.equals = function(a, b) {
	var index = -1, equals = true;
	
	if(a.length !== b.length) 
		return false;
	
	while(++index <= a.length) {
		if(a[index] !== b[index]) 
			equals = false;
	}
	
	return equals;
};


/**
* @배열을 오름차순으로 정렬합니다.
* @param {Array} arr
* @return {Array}
*/
pe.seize.Array.sort = function(arr) {
	if(arr.length === 0) 
		return [];
	
	for(var i = 1, left = [], right = [], first = arr[0]; i < arr.length; i++) {
		if(arr[i] < first) 
			left.push(arr[i]);
		
		else right.push(arr[i]);
	}
	
	return this.sort(left).concat(first, this.sort(right));
};


/**
* @2차원 벡터함수.
* @param {Number} x
* @param {Number} y
*/
pe.seize.Vector2 = function(x, y) {
	this.x = Math.floor(x);
	this.y = Math.floor(y);
};


pe.seize.Vector2.prototype = {};


/**
* @두 좌표간 거리를 구합니다.
* @param {Number|pe.seize.Vector2} x
* @param {Number} y
* @return {Number}
*/
pe.seize.Vector2.prototype.getDistance = function(x, y) {
	if(x instanceof pe.seize.Vector2) 
		return Math.sqrt(Math.pow((this.x - x.x), 2) + Math.pow((this.y - x.y), 2));
	
	return Math.sqrt(Math.pow((this.x - x), 2) + Math.pow((this.y - y), 2));
};


/**
* @지정된 좌표에 좌표를 더합니다.
* @param {Number|pe.seize.Vector2} x
* @param {Number} y
* @return {pe.seize.Vector2}
*/
pe.seize.Vector2.prototype.add = function(x, y) {
	if(x instanceof pe.seize.Vector2) 
		return new pe.seize.Vector2(this.x + x.x, this.y + x.y);
	
	return new pe.seize.Vector2(this.x + x, this.y + y);
};


/**
* @지정된 좌표에서 좌표를 뺍니다.
* @param {Number|pe.seize.Vector2} x
* @param {Number} y
* @return {pe.seize.Vector2}
*/
pe.seize.Vector2.prototype.subtract = function(x, y) {
	if(x instanceof pe.seize.Vector2) 
		return new pe.seize.Vector2(this.x - x.x, this.y - x.y);
	
	return new pe.seize.Vector2(this.x - x, this.y - y);
};


/**
* @벡터의 좌표를 재설정합니다.
* @param {Number} x
* @param {Number} y
*/
pe.seize.Vector2.prototype.set = function(x, y) {
	if(x instanceof pe.seize.Vector2) 
		return new pe.seize.Vector2(x.x, x.y);
	
	return new pe.seize.Vector2(Math.floor(x), Math.floor(y), Math.floor(z));
};


/**
* @좌표 혹은 벡터가 같은지 비교합니다.
* @param {Number|pe.seize.Vector2} x
* @param {Number} y
* @return {Boolean}
*/
pe.seize.Vector2.prototype.equals = function(x, y) {
	if(x instanceof pe.seize.Vector2) 
		return this.x === x.x && this.y === x.y;
	
	return this.x === Math.floor(x) && this.y === Math.floor(y);
};


/**
* @좌표를 배열로 변환합니다.
* @return {Array}
*/
pe.seize.Vector2.prototype.toArray = function() {
	return [this.x, this.y];
};


/**
* @좌표를 문자열로 변환합니다.
* @return {String}
*/
pe.seize.Vector2.prototype.toString = function() {
	return "[ " + this.toArray().join(", ") + " ]";
};


/**
* @2차원 벡터의 x값을 구합니다.
* @return {Number}
*/
pe.seize.Vector2.prototype.getX = function() {
	return this.x;
};


/**
* @2차원 벡터의 y값을 구합니다.
* @return {Number}
*/
pe.seize.Vector2.prototype.getY = function() {
	return this.y;
};


/**
* @3차원 벡터함수.
* @param {Number|pe.seize.Entity} x
* @param {Number} y
* @param {Number} z
*/
pe.seize.Vector3 = function(x, y, z) {
	if(x instanceof pe.seize.Entity) {
		this.x = Math.floor(Entity.getX(x.ent));
		this.y = Math.floor(Entity.getY(x.ent));
		this.z = Math.floor(Entity.getZ(x.ent));
	}
	else if(typeof x === "number") {
		this.x = Math.floor(x);
		this.y = Math.floor(y);
		this.z = Math.floor(z);
	}
};


pe.seize.Vector3.prototype = {};


/**
* @지정된 좌표를 변경합니다.
* @param {Number|pe.seize.Vector3} x
* @param {Number} y
* @param {Number} z
*/
pe.seize.Vector3.prototype.set = function(x, y, z) {
	if(x instanceof pe.seize.Vector3) 
		return new pe.seize.Vector3(x.x, x.y, x.z);
	
	return new pe.seize.Vector3(Math.floor(x), Math.floor(y), Math.floor(z));
};


/**
* @지정된 좌표에 더합니다.
* @param {Number|pe.seize.Vector3} x
* @param {Number} y
* @param {Number} z
* @return {pe.seize.Vector3}
*/
pe.seize.Vector3.prototype.add = function(x, y, z) {
	if(x instanceof pe.seize.Vector3) 
		return new pe.seize.Vector3(this.x + x.x, this.y + x.y, this.z + x.z);
	
	return new pe.seize.Vector3(this.x + Math.floor(x), this.y + Math.floor(y), this.z + Math.floor(z));
};


/**
* @지정된 좌표에서 뺍니다.
* @param {Number|pe.seize.Vector3} x
* @param {Number} y
* @param {Number} z
* @return {pe.seize.Vector3}
*/
pe.seize.Vector3.prototype.subtract= function(x, y, z) {
	if(x instanceof pe.seize.Vector3) 
		return new pe.seize.Vector3(this.x - x.x, this.y - x.y, this.z - x.z);
	
	return new pe.seize.Vector3(this.x - Math.floor(x), this.y - Math.floor(y), this.z - Math.floor(z));
};


/**
* @두 좌표 혹은 벡터가 같은지 확인합니다.
* @param {Number|pe.seize.Vector3} x
* @param {Number} y
* @param {Number} z
* @return {Boolean}
*/
pe.seize.Vector3.prototype.equals = function(x, y, z) {
	if(x instanceof pe.seize.Vector3) 
		return this.x === x.x && this.y === x.y && this.z === x.z;
	
	return this.x === Math.floor(x) && this.y === Math.floor(y) && this.z === Math.floor(z);
};


/**
* @좌표를 배열로 변환합니다.
* @return {Array}
*/
pe.seize.Vector3.prototype.toArray = function() {
	return [this.x, this.y, this.z];
};


/**
* @좌표를 문자열로 변환합니다.
* @return {String}
*/
pe.seize.Vector3.prototype.toString = function() {
	return "[ " + this.toArray().join(", ") + " ]";
};


/**
* @두 좌표간 거리를 구합니다.
* @param {Number|pe.seize.Vector3} x
* @param {Number} y
* @param {Number} z
* @return {Number}
*/
pe.seize.Vector3.prototype.getDistance = function(x, y, z) {
	if(x instanceof pe.seize.Vector3) 
		return Math.sqrt(Math.pow(this.x - x.x, 2) + Math.pow(this.y - x.y, 2) + Math.pow(this.z - x.z, 2));
	
	return Math.sqrt(Math.pow(this.x - Math.floor(x), 2) + Math.pow(this.y - Math.floor(y), 2) + Math.low(this.z - Math.floor(z), 2));
};


/**
* @3차원 벡터의 x값을 구합니다.
* @return {Number}
*/
pe.seize.Vector3.prototype.getX = function() {
	return this.x;
};


/**
* @3차원 벡터의 y값을 구합니다.
* @return {Number}
*/
pe.seize.Vector3.prototype.getY = function() {
	return this.y;
};


/**
* @3차원 벡터의 z값을 구합니다.
* @return {Number}
*/
pe.seize.Vector3.prototype.getZ = function() {
	return this.z;
};


/**
* @Entity객체를 생성합니다.
* @namespace
*/
pe.seize.Entity = function(ent) {
	if(ent instanceof pe.seize.Entity) 
		this.ent = ent.ent;
		
	else if(typeof ent === "number") 
		this.ent = ent;
};


/**
* @엔티티 타입목록 입니다.
*/
pe.seize.Entity.EntityTypes = {
	HUMAN : 0,
	PLAYER : 0,
	CHICKEN : 10,
	COW : 11,
	PIG : 12,
	SHEEP : 13,
	WOLF : 14,
	VILIAGER : 15,
	MUSHROOM_COW : 16,
	SQUID : 17,
	BAT : 19,
	IRONGOLEM : 20,
	SNOWGOLEM : 21,
	OCELOT : 22,
	ZOMBIE : 32,
	ZOMBIE_PIGMAN : 36,
	CREEPER : 33,
	SKELETON : 34,
	SPIDER : 35,
	SLIME : 37,
	ENDERMAN : 38,
	SILVERFISH : 39,
	CAVESPIDER : 40,
	GHAST : 41,
	MAGMACUBE : 42,
	BLAZE : 43,
	ZOMBIEVILAGER : 44,
	DROPPED_ITEM : 64, 
	PRIMED_TNT : 65, 
	FALLING_SAND : 66,
	FISH_HOOK : 77, 
	ARROW : 80, 
	SNOWBALL : 81,
	EGG : 82, 
	PAINTING : 83, 
	MINECART : 84, 
	FIREBALL : 85, 
	BOAT : 90
};


/**
* @모든 엔티티를 구합니다.
* @return {Array}
*/
pe.seize.Entity.getAll = function() {
	return Entity.getAllMob().filter(function(ent) {
		return Entity.getEntityTypeId(ent) > 0 && Entity.getEntityTypeId(ent) < 61 && ent != null;
	});
};


pe.seize.Entity.prototype = {};


/**
* @특정 엔티티를 기준으로 특정범위에 있는 엔티티를 구합니다.
* @param {EntityId} e
* @param {Number} range
* @return {Array}
*/
pe.seize.Entity.prototype.getNearEnity = function(range) {
	var vec;
	
	if(ent instanceof pe.seize.Entity) 
		vec = new pe.seize.Vector3(e);
		
	else if(typeof ent === "number") 
		vec = new pe.seize.Vector3(new pe.seize.Entity(e));
	
	return this.getAll().filter(function(e) {
		var vec2 = new pe.seize.Vector3(new pe.seize.Entity(e));
		return vec.getDistance(vec2) <= range;
	});
};


/**
* @다른 엔티티와의 거리를 구합니다.
* @param {EntityType|pe.seize.Entity} e
* @return {Number}
*/
pe.seize.Entity.prototype.getDistance = function(e) {
	if(e instanceof pe.seize.Entity) 
		return new pe.seize.Vector3(new pe.seize.Entity(this.ent)).getDistance(new pe.seize.Vector3(new pe.seize.Entity(e)));
		
	return Math.sqrt(Math.pow(Entity.getX(this.ent) - Entity.getX(e), 2) + Math.pow(Entity.getY(this.ent) - Entity.getY(e), 2) + Math.pow(Entity.getZ(this.ent) - Entity.getZ(e), 2));
};


/**
* @주변에 존재하는 엔티티를 거리순으로 나열한 배열을 구합니다.
* @param {Number} range
* @return {Array}
*/
pe.seize.Entity.prototype.sortByDistance = function(range) {
	var arr = this.getNearEnity(range), that = this;
	
	arr.sort(function(a, b) {
		return that.getDistance(a) - that.getDistance(b);
	});
	
	return arr;
};


/**
* @엔티티에게 대미지를 줍니다
* @param {Number} amount
*/
pe.seize.Entity.prototype.damage = function(amount) {
	var hp = Entity.getHealth(this.ent);
	Entity.setHealth(this.ent, hp - amount);
};


pe.seize.Entity.prototype.setHealth = function(value) {
	Entity.setHealth(this.ent, value);
};


/**
* @엔티티를 밉니다.
* @param {Number} x
* @param {Number} y
* @param {Number} z
*/
pe.seize.Entity.prototype.setVel = function(x, y, z) {
	if(x != null) Entity.setVelX(this.ent, x);
	if(y != null) Entity.setVelY(this.ent, y);
	if(z != null) Entity.setVelZ(this.ent, z);
};


/**
* @마인크래프크 폰트 비트맵을 생성합니다.
* @param {String} text
* @param {Number|android.graphics.Color} color
* @param {Number} size
* @param {Array} length
* @param {android.graphics.drawable.Drawable} drawable
* @param {Number} gravity
* @return {LayerDrawable} font Drawable
*/

/*
* 속도 개선 및 이스케이프 시퀀스 인식 추가하기
*/
const createFont = function(text, color, size, length, drawable, gravity) { //이스케이프 시퀀스 인식 업데이트 하기.
	function isDefault(str) { 
		return /^[A-Za-z0-9"'&\+\-!\?<>~%():.]+$/.test(str);
	}
	
	function getAscii(str) { 
		return str.charCodeAt(0);
	}
	
	var rsize = size,
		dsize = 0,
		shorts = "jklIJT".split(""),
		shorts2 = "!:;".split("");
		
	size = size * DP;
	
	if(text.equals("")) {
		return drawable;
	}
	
	var width = 0,
		length = [text.length * size, size],
		bm = Bitmap.createBitmap(text.length * size, size, Bitmap.Config.ARGB_8888),
		paint = new Paint(),
		_paint = new Paint(),
		canvas = new Canvas(bm);
	
	paint.setColorFilter(new PorterDuffColorFilter(color, PorterDuff.Mode.MULTIPLY));
	_paint.setColorFilter(new PorterDuffColorFilter(Color.rgb(58, 61, 58), PorterDuff.Mode.MULTIPLY));
		
	text.split("").forEach(function(elements) {
		if(elements != " ") {
			var ascii = getAscii(elements),
				def = isDefault(elements),
				char = Math.floor(ascii / 256).toString(16).toUpperCase(),
				glyph = BitmapFactory.decodeStream(ModPE.openInputStreamFromTexturePack("images/font/glyph_" + (char === 1? "0" + char : char) + ".png")),
				default8 = BitmapFactory.decodeStream(ModPE.openInputStreamFromTexturePack("images/font/default8.png")),
				charNum = ascii % 256,
				_glyph = (def? default8 : glyph);
				_bm = (def? Bitmap.createBitmap(_glyph, (ascii % 16) * 8, Math.floor(ascii / 16) * 8, 8, 8) : Bitmap.createBitmap(_glyph, (charNum % 16) * 16, Math.floor(charNum / 16) * 16, 16, 16));
				
			dsize = (def? (rsize - 2) * DP : size);
					
			canvas.drawBitmap(Bitmap.createScaledBitmap(_bm, dsize, dsize, false), width + 1 * DP, 1 * DP, _paint);
			canvas.drawBitmap(Bitmap.createScaledBitmap(_bm, dsize, dsize, false), width, 0, paint);
			width += (def? (rsize - 5) * DP : size);
		}
		else if(elements == " ") {
			width += size / 2;
		}
			
		if(shorts.indexOf(elements) >= 0)
			width -= 2 * DP;
		if(shorts2.indexOf(elements) >= 0)
			width -= 5 * DP;
		if(elements == "f")
			width -= 1 * DP;
		if(elements == "k")
			width += 2 * DP;
		if(elements == "j")
			width += 4 * DP;
		if(elements == "s")
			width -= 1 * DP;
		if(elements == "t")
			width -= 4 * DP;
		if(elements == "l")
			width -= (rsize - 5) * DP / 2;
		if(elements == "i")
			width -= (rsize - 1) * DP / 2;
		if(elements == "r")
			width -= 2 * DP;
	});
	
	var cbm = Bitmap.createBitmap(bm, 0, 0, width, bm.getHeight()),
		bmd = BitmapDrawable(Bitmap.createScaledBitmap(cbm, cbm.getWidth() * DP / 2, cbm.getHeight() * DP / 2, false)),
		layerDrawable = new LayerDrawable((drawable == null? [bmd] : [drawable, bmd]));
	
	switch(gravity) {
		case Gravity.CENTER : 
		case null : 
			layerDrawable.setLayerInset((drawable == null? 0 : 1), (length[0] - width) / 2, (length[1] - size) / 2, (length[0] - width) / 2, (length[1] - size) / 2);
			break;
		case Gravity.TOP :
			layerDrawable.setLayerInset((drawable == null? 0 : 1), (length[0] - width) / 2, 5 * DP, (length[0] - width) / 2, length[1] - size - (5 * DP));
			break;
		case Gravity.RIGHT :
			layerDrawable.setLayerInset((drawable == null? 0 : 1), length[0] - width - (5 * DP), (length[1] - size) / 2, 5 * DP, (length[1] - size) / 2);
			break;
		case Gravity.LEFT :
			layerDrawable.setLayerInset((drawable == null? 0 : 1), 5 * DP, (length[1] - size) / 2, length[0] - width - (5 * DP), (length[1] - size) / 2);
			break;
	}
	
	return layerDrawable;
};


function selectLevelHook() {
	var scripts = net.zhuoweizhang.mcpelauncher.ScriptManager.scripts;
	for(var i = 0; i<scripts.size(); i++) {
		var script = scripts.get(i),
			scope = script.scope,
			SO = org.mozilla.javascript.ScriptableObject;
			
		if(SO.hasProperty(scope, "pe")) continue;
		SO.putProperty(scope, "pe", pe);
	}
}

