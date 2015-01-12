function initApp(){
    admobAd.initBanner("ca-app-pub-2380789489624536/7113796609", window.innerWidth, admobAd.AD_SIZE.BANNER.height);
    admobAd.showBanner(admobAd.AD_POSITION.BOTTOM_CENTER);           
}

document.addEventListener('deviceready', initApp, false);