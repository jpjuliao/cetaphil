/*
|--------------------------------------------------------------------------
| M3.Pivot.Setup.js                                                    v1.1
|--------------------------------------------------------------------------
|
| This file is responsible for loading and initiating the correct
| styles and scripts for assets to interaction with the pivot app
|
*/
var M3 = M3 || {};
M3.Pivot = M3.Pivot || {};
M3.Pivot.Setup = function(options){
    
    var root = localStorage.getItem("pivot.root");
    var appLocation = localStorage.getItem("pivot.app-location");
    
    if(typeof options.API === 'undefined' || options.API === "" || options.API === null) {
        options.API = "v1";
    }
    
    if(typeof options.AssetId === 'undefined' || options.AssetId === "" || options.AssetId === 0 || options.AssetId === "0" || options.AssetId === null) {
        options.AssetId = "";
        options.ShowBottomNav = true;
        console.log("Pivot Warning: Please define a correct AssetId");
    }
    
    // Add Styling
    var assetStyle = document.createElement('link');
    assetStyle.href = root + "/" + appLocation + "/libs/m3-assets/" + options.API + "/M3.Pivot.Asset.css";
    assetStyle.type = "text/css";
    assetStyle.rel = "stylesheet";
    document.head.appendChild(assetStyle);
    
    // Add Scripts
    var assetScript = document.createElement('script');
    assetScript.src = root + "/" + appLocation + "/libs/m3-assets/" + options.API + "/M3.Pivot.Asset.js?v=1";
    document.head.appendChild(assetScript);
    
    var bottomNavExample = '<ul><li style="list-style-type: none; text-align: center; float: right; width: 100px; height: 44px; border-left-width: 1px; border-left-style: solid; border-left-color: white;"><a onclick="M3.Pivot.Asset.Close(); return false;" rel="external" style="width: 100%; height: 100%;" class="ui-link"><img src="m3-button-idash.png" class="default" style="max-width: 100%; max-height: 80%; position: relative; z-index:10000; top: 50%; transform: translateY(-50%); margin: 0px auto;"></a></li><li class="footerNavs"> <a onclick="alert(\'[placeholder] Navigate to asset\'); return false;"><img src="sign-check-icon.png"> </a></li></ul>';

    assetScript.onload = function () {        
        M3.Pivot.Asset.Init();
        if(options.ShowBottomNav === true) {
            M3.Pivot.Asset.CreateBottomNav(options);
        }
	else if(options.ShowBottomNavExample === true){
            var footerEle = document.createElement('footer');
  	    footerEle.id = "m3-pivot-footer";
  	    footerEle.innerHTML = bottomNavExample;
  	    document.getElementsByTagName('body')[0].appendChild(footerEle);
	}
    };

    assetScript.onerror = function () {        
        console.log("Pivot Warning: Asset not loaded in PIVOT Environment, therefore creating placeholder methods");
	M3CreatePivotMethods();

	if(options.ShowBottomNavExample === true){
            var footerEle = document.createElement('footer');
  	    footerEle.id = "m3-pivot-footer";
  	    footerEle.innerHTML = bottomNavExample;
  	    document.getElementsByTagName('body')[0].appendChild(footerEle);
	}
    };
};

function M3CreatePivotMethods() {
	M3 = M3 || {};
	M3.Pivot = M3.Pivot || {};
	M3.Pivot.Asset = M3.Pivot.Asset || {
		Close: function(){
			alert("[placeholder] Closing the asset");		
		},
		OpenPDF: function(url){
			alert("[placeholder] Opening the pdf: " + url);		
		},
		OpenWebView: function(url){
			alert("[placeholder] Opening webview: " + url);		
		},
		CreateBottomNav: function(){
			alert("[placeholder] Rendering the bottom navigation bar");		
		}
	};
}
