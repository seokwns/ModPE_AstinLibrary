/**
* @author seizePE(moona0915@naver.com)
* @since 2016 - 5 - 15
*/


const pe = {
	
	CONTEXT : com.mojang.minecraftpe.MainActivity.currentMainActivity.get(),
	
	ModPE : {},
	
	android : {},
	
	lib : {
		seize : {},
		Math : {}, String : {}, Array : {}, Vector2 : {}, Vector3 : {}
	}
};


const Utils = {
	
	Toast : (text, duration) => {
		pe.CONTEXT.runOnUiThread(new Runnable({ run : () => {
			Toast.makeText(pe.CONTEXT, text, (duration == null? Toast.LENGTH_SHORT : duration)).show();
		}}));
	},
	
	uiThread : func => {
		pe.CONTEXT.runOnUiThread(new Runnable({ run : () => {
			try { 
				func(); 
			} catch(err) { 
				pe.Debug(err); 
			}
		}}));
	},
	
	Thread : func => {
		new Thread(new Runnable({ run : () => {
			try { 
				func(); 
			} catch(err) { 
				pe.Debug(err); 
			}
		}})).start();
	},
	
	Debug : err => {
		pe.CONTEXT.runOnUiThread(new Runnable({ run : () => {
			try {
				var dialog = new android.app.AlertDialog.Builder(pe.CONTEXT);
				dialog.setTitle("Error");
				dialog.setMessage("Error\n\n - " + err.name + "\n - " + (err.lineNumber + 1) + "\n\n" + err.message);
				dialog.show();
			} catch(err) { 
				print((err.lineNumber + 1) + " # " + err.message); 
			}
		}}));
	},
	
	render : (view, gravity, x, y) => {
		Utils.uiThread(() => {
			var window = new PopupWindow();
			window.setContentView(view);
			window.setWidth(-2);
			window.setHeight(-2);
			window.showAtLocation(pe.CONTEXT.getWindow().getDecorView(), gravity, x, y);
		});
	},
	
	getCurrentTime : () => {
		var date = new Date(),
			year = date.getFullYear(),
			month = date.getMonth() + 1,
			day = date.getDate(),
			hours = date.getHours(),
			minutes = date.getMinutes(),
			m, now;
		
		if(hours > 12) 
			m = "오후 " + (hours - 12);
			
		else 
			m = "오전 " + hours;
		
		if(minutes >= 10) 
			now = minutes;
			
		else 
			now = "0" + minutes;
		
		return year + "년 " + month + "월 " + day + "일 "  + m + ":" + now;
	},
	
	getNetworkInfo : () => {
		var manager = pe.CONTEXT.getSystemService(pe.CONTEXT.CONNECTIVITY_SERVICE),
			mobile = manager.getNetworkInfo(android.net.ConnectivityManager.TYPE_MOBILE).isConnectedOrConnecting(),
			wifi = manager.getNetworkInfo(android.net.ConnectivityManager.TYPE_WIFI).isConnectedOrConnecting();
	
			
		if(mobile) 
			return { STATE : "online", TYPE : "mobile" };
			
		else if(wifi) 
			return { STATE : "online", TYPE : "wifi" };
			
		else 
			return { STATE : "offline", TYPE : "offline" };
	},
	
	Download : (url, path, name) => {
		Utils.Thread(() => {
			var file = new File(path, name);
			
			if(!file.getParentFile().exists()) 
				file.getParentFile().mkdirs();
				
			if(!file.exists()) 
				file.createNewFile();
			
			
			var url = new java.net.URL(url), urlConnect = url.openConnection();
			urlConnect.connect();
			
			var BIS = new BufferedInputStream(url.openStream()),
				FOS = new FileOutputStream(path + name),
				buffer = java.lang.reflect.Array.newInstance(java.lang.Byte.TYPE, 1024),
				Total = 1, Count;
			
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
		
		checkUpdate : () => {
			var that = this;
			
			Utils.Thread(() => {
				var url = new java.net.URL("https://raw.githubusercontent.com/RetroPE/seize_ModPE_Library/master/Version").openStream(),
					BR = new BufferedReader(new InputStreamReader(url)),
					vers = parseInt(BR.readLine());
				
				if(vers > pe.info.VERSION) 
					that.UpdateWindow();
			});
		},
		
		getChangeLog : () => {
			
		},
		
		UpdateWindow : () => {
			
		}
	},
	
	getAbsolutePath : () => {
		return android.os.Environment.getExternalStorageDirectory().getAbsolutePath();
	}
}


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
	WIDTH = pe.CONTEXT.getScreenWidth(),
	HEIGHT = pe.CONTEXT.getScreenHeight(),
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
	BufferedWriter = java.io.BufferedWriter,
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
	DP = android.util.TypedValue.applyDimension(android.util.TypedValue.COMPLEX_UNIT_DIP, 1, ctx.getResources().getDisplayMetrics()),
	ServerSocket = java.net.ServerSocket;
	Socket = java.net.Socket;


var client_socket, client_bw;


pe.lib.seize.widget = {
	
	Button : () => {
		
	},
	
	ToggleButton : () => {
		
	}
}


pe.android.widget = {

	Button : (text, textColor, textSize, width, height, drawable) => {
		var btn = new Button(pe.CONTEXT);
		btn.setText(text);
		if(textColor != null) btn.setTextColor(textColor);
		if(textSize != null) btn.setTextSize(textSize);
		if(drawable != null) btn.setBackgroundDrawable(drawable);
		btn.setLayoutParams(new Params(width, height));
		
		return btn;
	},
	
	TextView : (text, textColor, textSize, width, height, drawable) => {
		var tv = new TextView(pe.CONTEXT);
		tv.setText(text);
		if(textColor != null) tv.setTextColor(textColor);
		if(textSize != null) tv.setTextSize(textSize);
		if(drawable != null) tv.setBackgroundDrawable(drawable);
		tv.setLayoutParams(new Params(width, height));
		
		return tv;
	},
	
	ProgressBar : (type, progress, max) => {
		
	},
	
	LinearLayout : (orientation, gravity) => {
		var layout = new LinearLayout(pe.CONTEXT);
		layout.setOrientation(orientation);
		layout.setGravity(gravity);
		
		return layout;
	}
};


pe.lib.seize.graphics = {
	
	Bitmap : {
		
		cutImage : (bm, x, y, width, height) => {
			return android.graphics.Bitmap.createScaledBitmap(android.graphics.Bitmap.createBitmap(bm, x, y, width, height), width * DP, height * DP, false);
		},
		
		nienPatch : (bm, startX, startY, ninePatchWidth, ninePatchHeight, width, height) => {
			if(bm.getPixel(0,0) === -9739933 && bm.getWidth() === bm.getHeight())
				var blank = android.graphics.Bitmap.createBitmap(width, height, android.graphics.Bitmap.Config.RGB_565);
			else
				var blank = android.graphics.Bitmap.createBitmap(width, height, android.graphics.Bitmap.Config.ARGB_8888);
			
			var part1 = Bitmap.createBitmap(bm, 0, 0, startX, startY),
				part2 = Bitmap.createBitmap(bm, startX, 0, ninePatchWidth, startY),
				part3 = Bitmap.createBitmap(bm, startX + ninePatchWidth, 0, bm.getWidth() - startX - ninePatchWidth, startY),
				part4 = Bitmap.createBitmap(bm, 0, startY, startX, ninePatchHeight),
				part5 = Bitmap.createBitmap(bm, startX, startY, ninePatchWidth, ninePatchHeight),
				part6 = Bitmap.createBitmap(bm, startX + ninePatchWidth, startY, bm.getWidth() - startX - ninePatchWidth, ninePatchHeight),
				part7 = Bitmap.createBitmap(bm, 0, startY + ninePatchHeight, startX, bm.getHeight() - startY - ninePatchHeight),
				part8 = Bitmap.createBitmap(bm, startX, startY + ninePatchHeight, ninePatchWidth, bm.getHeight() - startY - ninePatchHeight),
				part9 = Bitmap.createBitmap(bm, startX + ninePatchWidth, startY + ninePatchHeight, bm.getWidth() - startX - ninePatchWidth, bm.getHeight() - startY - ninePatchHeight),
				canvas = new Canvas(blank);
			
			canvas.drawBitmap(part1, 0, 0, null);
			canvas.drawBitmap(Bitmap.createScaledBitmap(part2, width - bm.getWidth() + ninePatchWidth, startY, false), startX, 0, null);
			canvas.drawBitmap(part3, width - bm.getWidth() + ninePatchWidth + startX, 0, null);
			canvas.drawBitmap(Bitmap.createScaledBitmap(part4, startX, height - bm.getHeight() + ninePatchHeight, false), 0, startY, null);
			canvas.drawBitmap(Bitmap.createScaledBitmap(part5, width - bm.getWidth() + ninePatchWidth, height - bm.getHeight() + ninePatchHeight, false), startX, startY, null);
			canvas.drawBitmap(Bitmap.createScaledBitmap(part6, part3.getWidth(), height - bm.getHeight() + ninePatchHeight, false), width - bm.getWidth() + ninePatchWidth + startX, startY, null);
			canvas.drawBitmap(part7, 0, height - bm.getHeight() + ninePatchHeight + startY, null);
			canvas.drawBitmap(Bitmap.createScaledBitmap(part8, width - bm.getWidth() + ninePatchWidth, part7.getHeight(), false), startX, height - bm.getHeight() + ninePatchHeight + startY, null);
			canvas.drawBitmap(part9, width - bm.getWidth() + ninePatchWidth + startX, height - bm.getHeight() + ninePatchHeight + startY, null);
			
			return new BitmapDrawable(blank);
		}
	},
	
	drawable : {
		
	},
	
	Color : {
		
		Palette : colors => {
			
		}
	},
	
	getTexture : path => {
		var texture = ModPE.openInputStreamFromTexturePack("images/" + path), type = path.split(".");
		
		if(type[type.length] === "tga") 
			return net.zhuoweizhang.mcpelauncher.texture.tga.TGALoader.load(texture, false);
			
		else return BitmapFactory.decodeStream(texture);
	},
	
	ItemImageLoader : (name, data) => {
		var meta = eval("" + new java.lang.String(ModPE.getBytesFromTexturePack("images/items.meta"))+""),
		meta_map = meta.map(i => {
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
	}
};


/**
* @author seizePE(moona0915)
* @since 2016-2-05
*/

/**
* @숫자가 소수인지를 판별합니다.
* @param {Number} number
* @return {Boolean}
*/
pe.lib.seize.Math.isPrime = number => {
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
pe.lib.seize.Math.Factorization = number => {
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
pe.lib.seize.Math.divisor = number => {
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
pe.lib.seize.Math.max = (a, b) => {
	return a === b? a : (a > b? a : b);
};


/**
* @두 숫자중 최소값을 구합니다.
* @param {Number} a
* @param {Number} b
* @return {Number}
*/
pe.lib.seize.Math.min = (a, b) => {
	return a === b? a : (a < b? a : b);
};


/**
* @숫자의 팩토리얼값을 구합니다.
* @param {Number} number
* @return {Number}
*/
pe.lib.seize.Math.factorial = number => {
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
pe.lib.seize.Math.toHexNumber = number => {
	return parseInt(number.toString(16));
};


/**
* @피타고라스의 정리.
* @param {Number} 
* @return {Number} 
*/
pe.lib.seize.Math.hypot = () => {
	for(var i = 0, h = 0; i < arguments.length; i++) h += arguments[i] * arguments[i];
	
	return Math.sqrt(h);
};


/**
* @두 수의 최대공약수를 구합니다.
* @param {Number} num1
* @param {Number} num2
* @return {Number}
*/
pe.lib.seize.Math.getGCD = (num1, num2) => {
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
pe.lib.seize.Math.getLCM = (num1, num2) => {
	return (num1 * num2) / this.getGCD(num1, num2); 
};


/**
* @특정 두 수사이의 값을 무작위로 반환합니다.
* @param {Number} start
* @param {Number} end
* @param {Boolean} is prime
* @return {Number}
*/
pe.lib.seize.Math.random = (start, end, prime) => {
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
pe.lib.seize.Math.log = (number, base) => {
	return Math.log(number) / Math.log((base == null? 10 : base));
};


/**
* @초항이 1인 피보나치 수열의 n번째 항을 구합니다.
* @param {Number} n
* @return {Number}
*/
pe.lib.seize.Math.fibonacci = n => {
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
pe.lib.seize.Math.nativeSum = (arr, start, end) => {
	for(var i = start, temp = 0; end >= i; i += 1) temp += arr[i];
	
	return temp;
};


/**
* @코드를 아스키코드로 변환합니다.
* @param {String} code
* @return {String}
*/
pe.lib.seize.String.str2ascii = code => {
	for(var i = 0, sp = code.split(""), eCode = ""; i < sp.length; i ++) eCode += (i == sp.length - 1? sp[i].charCodeAt(0) : sp[i].charCodeAt(0) + " ");
	
	return eCode;
};


/**
* @아스키코드를 문자열로 변환합니다.
* @param {String} ascii code
* @return {String}
*/
pe.lib.seize.String.ascii2str = code => {
	for(var i = 0, rCode = "", sp = code.split(" "); i < sp.length; i ++) rCode += String.fromCharCode(sp[i]);
	
	return rCode;
};


/**
* @문자열이 영어인지 판별합니다.
* @param {String} str
* @return {Boolean}
*/
pe.lib.seize.String.isEnglish = str => {
	return /^[A-z]+$/.test(str);
};


/**
* @문자를 16진수로 변환합니다.
* @param {String} str
* @return {String}
*/
pe.lib.seize.String.toHexString = str => {
	var string = "";
	
	str.split("").forEach(element => {
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
pe.lib.seize.String.replaceAll = (str, target, _str) => {
	return str.split(target).join(_str);
};


/**
* @문자열을 뒤집습니다.
* @param {String} str
* @return {String}
*/
pe.lib.seize.String.reverse = str => {
	for(var i = str.length - 1, rstr = ""; i >= 0; i--) rstr += str[i];
	return rstr;
};


/**
* @문자열을 섞습니다.
* @param {String} str
* @return {String}
*/
pe.lib.seize.String.shuffle = str => {
	for(var _str = str.split(""), n = _str.length, i = n - 1; i > 0; i--) {
		var index = Math.floor(Math.random() * (i + 1)), tmp = _str[i];
		
		_str[i] = _str[index], _str[index] = tmp;
	}
	return a.join("");
};


/**
* @배열중 최대값을 구합니다.
* @param {Array} arr
* @return {Number}
*/
pe.lib.seize.Array.max = arr => {
	return Math.max.apply(null, arr);
};


/**
* @배열중 최소값을 구합니다.
* @param {Array} arr
* @return {Number}
*/
pe.lib.seize.Array.min = arr => {
	return Math.min.apply(null, arr);
};


/**
* @배열의 평균을 구합니다.
* @param {Array} arr
* @return {Number}
*/
pe.lib.seize.Array.average = arr => {
	return (arr.reduce((a, b) => {
		return a + b;
	}) / arr.length);
};


/**
* @두 배열이 일치하는 판별합니다.
* @param {Array} a
* @param {Array} b
* @return {Boolean}
*/
pe.lib.seize.Array.equals = (a, b) => {
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
pe.lib.seize.Array.sort = arr => {
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
pe.lib.seize.Vector2 = x, y) {
	this.x = Math.floor(x);
	this.y = Math.floor(y);
};


pe.lib.seize.Vector2.prototype = {};


/**
* @두 좌표간 거리를 구합니다.
* @param {Number|pe.lib.seize.Vector2} x
* @param {Number} y
* @return {Number}
*/
pe.lib.seize.Vector2.prototype.getDistance = (x, y) => {
	if(x instanceof pe.lib.seize.Vector2) 
		return Math.sqrt(Math.pow((this.x - x.x), 2) + Math.pow((this.y - x.y), 2));
	
	return Math.sqrt(Math.pow((this.x - x), 2) + Math.pow((this.y - y), 2));
};


/**
* @지정된 좌표에 좌표를 더합니다.
* @param {Number|pe.lib.seize.Vector2} x
* @param {Number} y
* @return {pe.lib.seize.Vector2}
*/
pe.lib.seize.Vector2.prototype.add = (x, y) => {
	if(x instanceof pe.lib.seize.Vector2) 
		return new pe.lib.seize.Vector2(this.x + x.x, this.y + x.y);
	
	return new pe.lib.seize.Vector2(this.x + x, this.y + y);
};


/**
* @지정된 좌표에서 좌표를 뺍니다.
* @param {Number|pe.lib.seize.Vector2} x
* @param {Number} y
* @return {pe.lib.seize.Vector2}
*/
pe.lib.seize.Vector2.prototype.subtract = (x, y) => {
	if(x instanceof pe.lib.seize.Vector2) 
		return new pe.lib.seize.Vector2(this.x - x.x, this.y - x.y);
	
	return new pe.lib.seize.Vector2(this.x - x, this.y - y);
};


/**
* @벡터의 좌표를 재설정합니다.
* @param {Number} x
* @param {Number} y
*/
pe.lib.seize.Vector2.prototype.set = (x, y) => {
	if(x instanceof pe.lib.seize.Vector2) 
		return new pe.lib.seize.Vector2(x.x, x.y);
	
	return new pe.lib.seize.Vector2(Math.floor(x), Math.floor(y), Math.floor(z));
};


/**
* @좌표 혹은 벡터가 같은지 비교합니다.
* @param {Number|pe.lib.seize.Vector2} x
* @param {Number} y
* @return {Boolean}
*/
pe.lib.seize.Vector2.prototype.equals = (x, y) => {
	if(x instanceof pe.lib.seize.Vector2) 
		return this.x === x.x && this.y === x.y;
	
	return this.x === Math.floor(x) && this.y === Math.floor(y);
};


/**
* @좌표를 배열로 변환합니다.
* @return {Array}
*/
pe.lib.seize.Vector2.prototype.toArray = () => {
	return [this.x, this.y];
};


/**
* @좌표를 문자열로 변환합니다.
* @return {String}
*/
pe.lib.seize.Vector2.prototype.toString = () => {
	return "[ " + this.toArray().join(", ") + " ]";
};


/**
* @2차원 벡터의 x값을 구합니다.
* @return {Number}
*/
pe.lib.seize.Vector2.prototype.getX = () => {
	return this.x;
};


/**
* @2차원 벡터의 y값을 구합니다.
* @return {Number}
*/
pe.lib.seize.Vector2.prototype.getY = () => {
	return this.y;
};


/**
* @3차원 벡터함수.
* @param {Number|pe.lib.seize.Entity} x
* @param {Number} y
* @param {Number} z
*/
pe.lib.seize.Vector3 = (x, y, z) => {
	if(x instanceof pe.lib.seize.Entity) {
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


pe.lib.seize.Vector3.prototype = {};


/**
* @지정된 좌표를 변경합니다.
* @param {Number|pe.lib.seize.Vector3} x
* @param {Number} y
* @param {Number} z
*/
pe.lib.seize.Vector3.prototype.set = (x, y, z) => {
	if(x instanceof pe.lib.seize.Vector3) 
		return new pe.lib.seize.Vector3(x.x, x.y, x.z);
	
	return new pe.lib.seize.Vector3(Math.floor(x), Math.floor(y), Math.floor(z));
};


/**
* @지정된 좌표에 더합니다.
* @param {Number|pe.lib.seize.Vector3} x
* @param {Number} y
* @param {Number} z
* @return {pe.lib.seize.Vector3}
*/
pe.lib.seize.Vector3.prototype.add = (x, y, z) => {
	if(x instanceof pe.lib.seize.Vector3) 
		return new pe.lib.seize.Vector3(this.x + x.x, this.y + x.y, this.z + x.z);
	
	return new pe.lib.seize.Vector3(this.x + Math.floor(x), this.y + Math.floor(y), this.z + Math.floor(z));
};


/**
* @지정된 좌표에서 뺍니다.
* @param {Number|pe.lib.seize.Vector3} x
* @param {Number} y
* @param {Number} z
* @return {pe.lib.seize.Vector3}
*/
pe.lib.seize.Vector3.prototype.subtract = (x, y, z) => {
	if(x instanceof pe.lib.seize.Vector3) 
		return new pe.lib.seize.Vector3(this.x - x.x, this.y - x.y, this.z - x.z);
	
	return new pe.lib.seize.Vector3(this.x - Math.floor(x), this.y - Math.floor(y), this.z - Math.floor(z));
};


/**
* @두 좌표 혹은 벡터가 같은지 확인합니다.
* @param {Number|pe.lib.seize.Vector3} x
* @param {Number} y
* @param {Number} z
* @return {Boolean}
*/
pe.lib.seize.Vector3.prototype.equals = (x, y, z) => {
	if(x instanceof pe.lib.seize.Vector3) 
		return this.x === x.x && this.y === x.y && this.z === x.z;
	
	return this.x === Math.floor(x) && this.y === Math.floor(y) && this.z === Math.floor(z);
};


/**
* @좌표를 배열로 변환합니다.
* @return {Array}
*/
pe.lib.seize.Vector3.prototype.toArray = () => {
	return [this.x, this.y, this.z];
};


/**
* @좌표를 문자열로 변환합니다.
* @return {String}
*/
pe.lib.seize.Vector3.prototype.toString = () => {
	return "[ " + this.toArray().join(", ") + " ]";
};


/**
* @두 좌표간 거리를 구합니다.
* @param {Number|pe.lib.seize.Vector3} x
* @param {Number} y
* @param {Number} z
* @return {Number}
*/
pe.lib.seize.Vector3.prototype.getDistance = (x, y, z) => {
	if(x instanceof pe.lib.seize.Vector3) 
		return Math.sqrt(Math.pow(this.x - x.x, 2) + Math.pow(this.y - x.y, 2) + Math.pow(this.z - x.z, 2));
	
	return Math.sqrt(Math.pow(this.x - Math.floor(x), 2) + Math.pow(this.y - Math.floor(y), 2) + Math.low(this.z - Math.floor(z), 2));
};


/**
* @3차원 벡터의 x값을 구합니다.
* @return {Number}
*/
pe.lib.seize.Vector3.prototype.getX = () => {
	return this.x;
};


/**
* @3차원 벡터의 y값을 구합니다.
* @return {Number}
*/
pe.lib.seize.Vector3.prototype.getY = () => {
	return this.y;
};


/**
* @3차원 벡터의 z값을 구합니다.
* @return {Number}
*/
pe.lib.seize.Vector3.prototype.getZ = () => {
	return this.z;
};


/**
* @Entity객체를 생성합니다.
* @namespace
*/
pe.lib.seize.Entity = ent => {
	if(ent instanceof pe.lib.seize.Entity) 
		this.ent = ent.ent;
		
	else if(typeof ent === "number") 
		this.ent = ent;
};


/**
* @엔티티 타입목록 입니다.
*/
pe.lib.seize.Entity.EntityTypes = {
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
pe.lib.seize.Entity.getAll = () => {
	return Entity.getAllMob().filter(ent => {
		return Entity.getEntityTypeId(ent) > 0 && Entity.getEntityTypeId(ent) < 61 && ent != null;
	});
};


pe.lib.seize.Entity.prototype = {};


/**
* @특정 엔티티를 기준으로 특정범위에 있는 엔티티를 구합니다.
* @param {EntityId} e
* @param {Number} range
* @return {Array}
*/
pe.lib.seize.Entity.prototype.getNearEnity = range => {
	var vec;
	
	if(ent instanceof pe.lib.seize.Entity) 
		vec = new pe.lib.seize.Vector3(e);
		
	else if(typeof ent === "number") 
		vec = new pe.lib.seize.Vector3(new pe.lib.seize.Entity(e));
	
	return this.getAll().filter(e => {
		var vec2 = new pe.lib.seize.Vector3(new pe.lib.seize.Entity(e));
		return vec.getDistance(vec2) <= range;
	});
};


/**
* @다른 엔티티와의 거리를 구합니다.
* @param {EntityType|pe.lib.seize.Entity} e
* @return {Number}
*/
pe.lib.seize.Entity.prototype.getDistance = e => {
	if(e instanceof pe.lib.seize.Entity) 
		return new pe.lib.seize.Vector3(new pe.lib.seize.Entity(this.ent)).getDistance(new pe.lib.seize.Vector3(new pe.lib.seize.Entity(e)));
		
	return Math.sqrt(Math.pow(Entity.getX(this.ent) - Entity.getX(e), 2) + Math.pow(Entity.getY(this.ent) - Entity.getY(e), 2) + Math.pow(Entity.getZ(this.ent) - Entity.getZ(e), 2));
};


/**
* @주변에 존재하는 엔티티를 거리순으로 나열한 배열을 구합니다.
* @param {Number} range
* @return {Array}
*/
pe.lib.seize.Entity.prototype.sortByDistance = range => {
	var arr = this.getNearEnity(range), that = this;
	
	arr.sort((a, b) => {
		return that.getDistance(a) - that.getDistance(b);
	});
	
	return arr;
};


/**
* @엔티티에게 대미지를 줍니다
* @param {Number} amount
*/
pe.lib.seize.Entity.prototype.damage = amount => {
	var hp = Entity.getHealth(this.ent);
	Entity.setHealth(this.ent, hp - amount);
};


pe.lib.seize.Entity.prototype.setHealth = value => {
	Entity.setHealth(this.ent, value);
};


/**
* @엔티티를 밉니다.
* @param {Number} x
* @param {Number} y
* @param {Number} z
*/
pe.lib.seize.Entity.prototype.setVel = (x, y, z) => {
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
const createFont = (text, color, size, length, drawable, gravity) => { //이스케이프 시퀀스 인식 업데이트 하기.
	var isDefault = str => { 
		return /^[A-Za-z0-9"'&\+\-!\?<>~%():.]+$/.test(str);
	}
	
	var getAscii = str => { 
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
		
	text.split("").forEach(elements => {
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



var selectLevelHook = () => {
	var scripts = net.zhuoweizhang.mcpelauncher.ScriptManager.scripts;
	for(var i = 0; i<scripts.size(); i++) {
		var script = scripts.get(i),
			scope = script.scope,
			SO = org.mozilla.javascript.ScriptableObject;
			
		if(SO.hasProperty(scope, "pe")) continue;
		if(SO.hasProperty(scope, "Utils")) continue;
		
		SO.putProperty(scope, "pe", pe);
		SO.putProperty(scope, "Utils", Utils);
	}
}

