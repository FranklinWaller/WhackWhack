function initAd(){

       var ad_units = {
        android : {
           banner: 'ca-app-pub-2380789489624536/7113796609'
       }
   };
   var admobid = "";
   if( /(android)/i.test(navigator.userAgent) ) {
        admobid = ad_units.android;
      }

      window.plugins.AdMob.setOptions( {
        publisherId: admobid.banner,
        interstitialAdId: admobid.interstitial,
                    bannerAtTop: false, // set to true, to put banner at top
                    overlap: false, // set to true, to allow banner overlap webview
                    offsetTopBar: false, // set to true to avoid ios7 status bar overlap
                    isTesting: true, // receiving test ad
                    autoShow: true // auto show interstitial ad when loaded
                });
      registerAdEvents();

    }
}

function registerAdEvents() {
    document.addEventListener('onReceiveAd', function(){});
    document.addEventListener('onFailedToReceiveAd', function(data){});
    document.addEventListener('onPresentAd', function(){});
    document.addEventListener('onDismissAd', function(){ });
    document.addEventListener('onLeaveToAd', function(){ });
    document.addEventListener('onReceiveInterstitialAd', function(){ });
    document.addEventListener('onPresentInterstitialAd', function(){ });
    document.addEventListener('onDismissInterstitialAd', function(){ });
}

initAd();