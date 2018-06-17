package com.tracking;

import android.app.Application;

import com.facebook.react.ReactApplication;
import io.invertase.firebase.RNFirebasePackage;
import com.pilloxa.backgroundjob.BackgroundJobPackage;
import com.imagepicker.ImagePickerPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import com.airbnb.android.react.maps.MapsPackage;
import io.invertase.firebase.storage.RNFirebaseStoragePackage;
import io.invertase.firebase.database.RNFirebaseDatabasePackage; 
import io.invertase.firebase.auth.RNFirebaseAuthPackage;
<<<<<<< HEAD
import com.devfd.RNGeocoder.RNGeocoderPackage; 
=======
import com.devfd.RNGeocoder.RNGeocoderPackage;
>>>>>>> c82ba3700b9dd968d8ee905c53b1bfc895d641e7
import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new RNFirebasePackage(),
            new BackgroundJobPackage(),
            new ImagePickerPackage(),
           new RNFirebaseStoragePackage(),
            new MapsPackage(),
            new RNFirebaseDatabasePackage(),
            new RNFirebaseAuthPackage(),
<<<<<<< HEAD
            new RNGeocoderPackage()
=======
            new RNGeocoderPackage()  
>>>>>>> c82ba3700b9dd968d8ee905c53b1bfc895d641e7
      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }
}
