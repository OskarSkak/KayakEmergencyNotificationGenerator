package com.example.kayakfieldtesting;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.util.Log;

public class BootReceiver extends BroadcastReceiver {


    public BootReceiver() {
    }

    @Override
    public void onReceive(Context context, Intent intent) {
        Intent serviceLauncher = new Intent(context, BackgroundAccelerometerService.class);
        context.startService(serviceLauncher);

    }
}