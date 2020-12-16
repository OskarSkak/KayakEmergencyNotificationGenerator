package com.example.kayakfieldtesting;

import androidx.appcompat.app.AppCompatActivity;
import androidx.core.app.ActivityCompat;
import androidx.core.content.ContextCompat;
import androidx.localbroadcastmanager.content.LocalBroadcastManager;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.content.pm.PackageManager;
import android.os.Build;
import android.os.Bundle;
import android.os.Environment;
import android.util.Log;
import android.view.View;
import android.widget.Toast;

import com.google.gson.Gson;

import org.json.JSONException;
import org.json.JSONObject;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.util.ArrayList;
import java.util.Date;

public class MainActivity extends AppCompatActivity {

    private static final int PERMISSION_REQUEST_CODE = 1;
    private TaskRunner taskRunner;
    private Data data = new Data();

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        if (Build.VERSION.SDK_INT >= 23)
        {
            if (checkPermission())
            {
                // Code for above or equal 23 API Oriented Device
                // Your Permission granted already .Do next code
            } else {
                requestPermission(); // Code for permission
            }
        }
        else
        {

            // Code for Below 23 API Oriented Device
            // Do next code
        }
        WriteStart();

        LocalBroadcastManager.getInstance(this).registerReceiver(mMessageReceiver,
                new IntentFilter("acceleration"));
        LocalBroadcastManager.getInstance(this).registerReceiver(mMessageReceiver,
                new IntentFilter("gyroscope"));

    }
    private BroadcastReceiver mMessageReceiver = new BroadcastReceiver() {
        private static final String TAG = "dfrf" ;

        @Override
        public void onReceive(Context context, Intent intent) {
            if(data.gyroScopeSensors.size() > 100) {
                Log.i(TAG, "SIZE 100 writing..... ");
                Gson gson = new Gson();
                String result = gson.toJson(data);
                WriteFile(result);
                data.gyroScopeSensors.clear();
                data.accelerometerSensors.clear();
            }
            if (intent.getAction() == "gyroscope") {
                Bundle bundle = intent.getExtras();
                if (bundle != null) {
                    try {
                        GyroScopeSensor gyroScopeSensor = new GyroScopeSensor();
                        JSONObject json = new JSONObject(bundle.getString("gy"));
                        gyroScopeSensor.setAccelerationX(Float.parseFloat(json.getString("gyX")));
                        gyroScopeSensor.setAccelerationY(Float.parseFloat(json.getString("gyY")));
                        gyroScopeSensor.setAccelerationZ(Float.parseFloat(json.getString("gyZ")));
                        gyroScopeSensor.setTimeStamp(new Date());
                        data.gyroScopeSensors.add(gyroScopeSensor);
                    } catch (JSONException e) {
                        e.printStackTrace();
                    }

                }

            }else if (intent.getAction() == "acceleration") {
                Bundle bundle = intent.getExtras();
                if (bundle != null) {
                    try {
                        AccelerometerSensor accelerometerSensor = new AccelerometerSensor();
                        JSONObject json = new JSONObject(bundle.getString("ac"));
                        accelerometerSensor.setRotationX(Float.parseFloat(json.getString("acX")));
                        accelerometerSensor.setRotationY(Float.parseFloat(json.getString("acY")));
                        accelerometerSensor.setRotationZ(Float.parseFloat(json.getString("acZ")));
                        accelerometerSensor.setTimeStamp(new Date());
                        data.accelerometerSensors.add(accelerometerSensor);
                    } catch (JSONException e) {
                        e.printStackTrace();
                    }

                }

            }
        }
    };

    protected void onResume() {
        super.onResume();
    }
    protected void onPause() {
        super.onPause();
    }
    protected void onDestroy() {
        LocalBroadcastManager.getInstance(this).unregisterReceiver(mMessageReceiver);
        super.onDestroy();

    }


    public void onPressStartService(View v){
        Intent intent = new Intent(this, BackgroundAccelerometerService.class);
       this.startForegroundService(intent);
    }

    public void onPressStopService(View v) throws IOException {
        stopService(new Intent(getApplicationContext(), BackgroundAccelerometerService.class));
        Gson gson = new Gson();
        String result = gson.toJson(data);
        WriteFile(result);
    }

    private boolean checkPermission() {
        int result = ContextCompat.checkSelfPermission(this, android.Manifest.permission.WRITE_EXTERNAL_STORAGE);
        if (result == PackageManager.PERMISSION_GRANTED) {
            return true;
        } else {
            return false;
        }
    }

    private void requestPermission() {

        if (ActivityCompat.shouldShowRequestPermissionRationale(this, android.Manifest.permission.WRITE_EXTERNAL_STORAGE)) {
            Toast.makeText(this, "Write External Storage permission allows us to do store images. Please allow this permission in App Settings.", Toast.LENGTH_LONG).show();
        } else {
            ActivityCompat.requestPermissions(this, new String[]{android.Manifest.permission.WRITE_EXTERNAL_STORAGE}, PERMISSION_REQUEST_CODE);
        }
    }

    @Override
    public void onRequestPermissionsResult(int requestCode, String permissions[], int[] grantResults) {
        switch (requestCode) {
            case PERMISSION_REQUEST_CODE:
                if (grantResults.length > 0 && grantResults[0] == PackageManager.PERMISSION_GRANTED) {
                    Log.e("value", "Permission Granted, Now you can use local drive .");
                } else {
                    Log.e("value", "Permission Denied, You cannot use local drive .");
                }
                break;
        }
    }

    public void WriteFile(String message) {

        try {
            File path = Environment.getExternalStoragePublicDirectory(Environment.DIRECTORY_DOWNLOADS);
            File myFile = new File(path , "sa.txt");
            FileOutputStream fOut = new FileOutputStream(myFile , true);
            OutputStreamWriter myOutWriter = new OutputStreamWriter(fOut);
            myOutWriter.append(message + ",");
            myOutWriter.close();
            fOut.close();

        } catch (java.io.IOException e) {
            Log.e("Error", "onReceive: " + e );
        }

    }
    public void WriteStart() {

        try {
            File path = Environment.getExternalStoragePublicDirectory(Environment.DIRECTORY_DOWNLOADS);
            File myFile = new File(path , "sa.txt");
            FileOutputStream fOut = new FileOutputStream(myFile , true);
            OutputStreamWriter myOutWriter = new OutputStreamWriter(fOut);
            myOutWriter.append("[");
            myOutWriter.close();
            fOut.close();

        } catch (java.io.IOException e) {
            Log.e("Error", "onReceive: " + e );
        }

    }
}