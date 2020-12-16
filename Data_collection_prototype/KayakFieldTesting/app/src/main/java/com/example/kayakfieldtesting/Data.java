package com.example.kayakfieldtesting;

import java.io.Serializable;
import java.util.ArrayList;

public class Data implements Serializable {
    public ArrayList<GyroScopeSensor> gyroScopeSensors = new ArrayList<>();
    public ArrayList<AccelerometerSensor> accelerometerSensors = new ArrayList<>();

}
