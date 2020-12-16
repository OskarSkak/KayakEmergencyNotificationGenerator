package com.example.kayakfieldtesting;

import java.io.Serializable;
import java.util.Date;

public class GyroScopeSensor implements Serializable {
    public float getAccelerationX() {
        return AccelerationX;
    }

    public void setAccelerationX(float accelerationX) {
        AccelerationX = accelerationX;
    }

    public float getAccelerationY() {
        return AccelerationY;
    }

    public void setAccelerationY(float accelerationY) {
        AccelerationY = accelerationY;
    }

    public float getAccelerationZ() {
        return AccelerationZ;
    }

    public void setAccelerationZ(float accelerationZ) {
        AccelerationZ = accelerationZ;
    }

    private float AccelerationX;
    private float AccelerationY;
    private float AccelerationZ;

    public Date getTimeStamp() {
        return TimeStamp;
    }

    public void setTimeStamp(Date timeStamp) {
        TimeStamp = timeStamp;
    }

    private Date TimeStamp;

}
