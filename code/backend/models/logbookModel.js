import mongoose from 'mongoose';

const logBookSchema = mongoose.Schema(
    {
    driverId: {
        type: mongoose.Schema.Types.ObjectId, 
        required: true,
        ref: 'Driver' 
    },
    startingOdometer: {
        type: Number,
        required: true
    },
    endingOdometer: {
        type: Number,
        required: true
    },
    totalDistanceDrivenToday: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        required: false
    },
    truckNumber: {
        type: String,
        required: true
    },
    trailerNumber: {
        type: String,
        required: false // Set to true if required
    },
    driverFirstName: {
        type: String,
        required: true
    },
    driverLastName: {
        type: String,
        required: true
    },
    coDriverFullName: {
        type: String,
        required: false // Set to true if required
    },
    offDutyHours: {
        type: Number,
        required: true
    },
    sleeperHours: {
        type: Number,
        required: true
    },
    drivingHours: {
        type: Number,
        required: true
    },
    onDutyNotDrivingHours: {
        type: Number,
        required: true
    },
    },
    {
        timestamps: true,
    }
);

const LogBook = mongoose.model('LogBook', logBookSchema);

export default LogBook;