package com.example.kayakfieldtesting;

import java.io.Serializable;
import java.util.Date;

public class AccelerometerSensor implements Serializable {
    public float getRotationX() {
        return RotationX;
    }

    public void setRotationX(float rotationX) {
        RotationX = rotationX;
    }

    public float getRotationY() {
        return RotationY;
    }

    public void setRotationY(float rotationY) {
        RotationY = rotationY;
    }

    public float getRotationZ() {
        return RotationZ;
    }

    public void setRotationZ(float rotationZ) {
        RotationZ = rotationZ;
    }
    private Date TimeStamp;

    public Date getTimeStamp() {
        return TimeStamp;
    }

    public void setTimeStamp(Date timeStamp) {
        TimeStamp = timeStamp;
    }

    private float RotationX;
    private float RotationY;
    private float RotationZ;
}
