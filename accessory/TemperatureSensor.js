'use strict';

const {NumericSensorAccessory} = require('./NumericSensor');
const {addBatteryWarningCharacteristic} = require('./characteristic/Battery');

class TemperatureSensorAccessory extends NumericSensorAccessory {
    constructor(platform, config) {
        super(platform, config);

        this._services = [
            this._getAccessoryInformationService('Temperature Sensor'),
            this._getPrimaryService()
        ]
    }

    _getPrimaryService() {
        let primaryService = this._configureNumericService(
            new this.Service.TemperatureSensor(this.name),
            this.Characteristic.CurrentTemperature
        );

        addBatteryWarningCharacteristic.bind(this)(primaryService);

        return primaryService;
    }
}

module.exports = {TemperatureSensorAccessory};
