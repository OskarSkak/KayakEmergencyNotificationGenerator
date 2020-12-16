package com.example.kayakfieldtesting;

import android.annotation.SuppressLint;
import android.app.Notification;
import android.app.NotificationChannel;
import android.app.Service;
import android.content.Context;
import android.content.Intent;
import android.hardware.Sensor;
import android.hardware.SensorEvent;
import android.hardware.SensorEventListener;
import android.hardware.SensorManager;
import android.os.AsyncTask;
import android.os.Environment;
import android.os.IBinder;
import android.util.Log;
import android.widget.Toast;

import androidx.annotation.Nullable;
import androidx.localbroadcastmanager.content.LocalBroadcastManager;

import org.json.JSONException;
import org.json.JSONObject;

import java.io.BufferedReader;
import java.io.DataOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.FileWriter;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.SocketTimeoutException;
import java.net.URL;
import java.net.UnknownHostException;
import java.util.ArrayList;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;

public class BackgroundAccelerometerService extends Service  {
    private SensorManager mSensorManager;
    private Sensor mGyroscope;
    private Sensor mAccelerometer;
    private static final String TAG = "Sensor changed" ;
    private SensorEventListener mSensorListener;
    private Context context;
    private boolean isRunnning;
    public BackgroundAccelerometerService() {
    }


   @Override
    public void onCreate() {

    }


    @SuppressLint("WrongConstant")
    @Override
    public int onStartCommand(Intent intent, int flags, int startId) {
        super.onStartCommand(intent , START_STICKY , startId);
        String CHANNEL_ONE_ID = "com.example.KayakFieldTesting";
        String CHANNEL_ONE_NAME = "Channel One";
        NotificationChannel notificationChannel = null;
        startForeground(1, new Notification());
        this.context = this;
        Toast.makeText(this, "Service Started", Toast.LENGTH_LONG).show();
        Log.d("Service Started","Service Started");
        mSensorManager = (SensorManager) getSystemService(Context.SENSOR_SERVICE);
        mGyroscope = mSensorManager.getDefaultSensor(Sensor.TYPE_GYROSCOPE);
        mAccelerometer = mSensorManager.getDefaultSensor(Sensor.TYPE_ACCELEROMETER);
        mSensorListener = new SensorEventListener() {
            @Override
            public void onSensorChanged(SensorEvent event) {
                Sensor sensor = event.sensor;
                GyroScopeSensor gyroScopeSensor = new GyroScopeSensor();
                AccelerometerSensor accelerometerSensor = new AccelerometerSensor();
                JSONObject json = new JSONObject();
                Intent intent = null;
                if(sensor.getType() == Sensor.TYPE_ACCELEROMETER) {
                    accelerometerSensor.setRotationX(event.values[0]);
                    accelerometerSensor.setRotationY(event.values[1]);
                    accelerometerSensor.setRotationZ(event.values[2]);

                    try {
                        json.put("acX", accelerometerSensor.getRotationX());
                        json.put("acY", accelerometerSensor.getRotationY());
                        json.put("acZ", accelerometerSensor.getRotationZ());
                    } catch (JSONException e) {
                        e.printStackTrace();
                    }

                    intent = new Intent("acceleration");
                    intent.putExtra("ac" , json.toString());
                } else if (sensor.getType() == Sensor.TYPE_GYROSCOPE) {
                    gyroScopeSensor.setAccelerationX(event.values[0]);
                    gyroScopeSensor.setAccelerationY(event.values[1]);
                    gyroScopeSensor.setAccelerationZ(event.values[2]);


                    try {

                        json.put("gyX", gyroScopeSensor.getAccelerationX());
                        json.put("gyY", gyroScopeSensor.getAccelerationY());
                        json.put("gyZ", gyroScopeSensor.getAccelerationZ());
                    } catch (JSONException e) {
                        e.printStackTrace();
                    }
                    intent = new Intent("gyroscope");
                    intent.putExtra("gy" , json.toString());
                }

                 LocalBroadcastManager.getInstance(context).sendBroadcast(intent);
            }

            @Override
            public void onAccuracyChanged(Sensor sensor, int accuracy) {

            }
        };


        mSensorManager.registerListener(mSensorListener, mGyroscope, SensorManager.SENSOR_DELAY_NORMAL);
        mSensorManager.registerListener(mSensorListener, mAccelerometer , SensorManager.SENSOR_DELAY_NORMAL);
        return START_STICKY;
    }




    @Override
    public void onDestroy() {
        Toast.makeText(this, "Service Destroyed", Toast.LENGTH_LONG).show();
        Log.d("Service Destroyed", "Service Destroyed");
        mSensorManager.unregisterListener(mSensorListener);
    }


    @Nullable
    @Override
    public IBinder onBind(Intent intent) {
        return null;
    }






    public void formatSensorData(){

    }


}
