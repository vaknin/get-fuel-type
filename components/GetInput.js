import React, { Component } from 'react'
import {
    StyleSheet,
    View,
    TextInput
} from 'react-native'

import Button from 'react-native-really-awesome-button'
import Icon from 'react-native-vector-icons/Feather'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    inputContainer: {
        alignItems: 'center'
    },
    input: {
        backgroundColor: '#4fc4c4',
        textAlign: 'center',
        marginBottom: 13,
        width: 130,
        borderWidth: 1.5,
        borderRadius: 9,
        borderColor: '#689ca1',
        fontSize: 17.5,
        fontFamily: 'Rubik-Regular'
    }
});

class GetInput extends Component {

    state = {
        text: undefined,
        submitted: false
    }

    // Capitalize the first letter of every key in the vehicle's detials
    capitalize = text => {
        return text.toString().toLowerCase().split(' ').map(w => w[0].toUpperCase() + w.slice(1)).join(' ')
    }

    // Get the info from data.gov.il
    getCarInfo = async () => {

        //#region Private Car

        // Get the vehicle's degem_nm
        try {
            const licensePlateEndpoint = `https://data.gov.il/api/action/datastore_search?resource_id=053cea08-09bc-40ec-8f7a-156f0677aff3&q=${this.state.text}`
            const response = await fetch(licensePlateEndpoint)
            const json = await response.json()

            // No data or motorcycle
            if (json.result.records.length === 0) throw Error('Not a private car')

            // Found info, it is a private car
            const car = {type: 'car'}
            let vehicle = json.result.records[0]

            // Save the car's info to the "car" object, if the info is not null/undefined
            for (let key of Object.keys(vehicle)){
                if (vehicle[key]) car[key] = this.capitalize(vehicle[key])
            }
            car.degem_cd = vehicle['degem_cd'].toString().padStart('4', '0')

            // Fetch the vehicle's information via the degem_nm
            try{
                const vechicleInformationEndpoint = `https://data.gov.il/api/action/datastore_search?resource_id=142afde2-6228-49f9-8a29-9b6c3a0cbe40&q=${car.degem_nm}`
                const response = await fetch(vechicleInformationEndpoint)
                const json = await response.json()
                if (json.result.records.length === 0) return false
    
                // Iterate through all different vehicles
                for(let vehicle of json.result.records){

                    // Found the correct model
                    if (vehicle.degem_cd === car.degem_cd){

                        // Save the car's info to the "car" object, if the info is not null/undefined
                        for (let key of Object.keys(vehicle)){
                            if (vehicle[key]) car[key] = this.capitalize(vehicle[key])
                        }
                        return car
                    }
                }

                return false
            }
    
            catch (e){console.log(e)}
        }

        catch (e){console.log(e);}

        //#endregion

        //#region Motorcycle
        try{
            const endpoint = `https://data.gov.il/api/action/datastore_search?resource_id=bf9df4e2-d90d-4c0a-a400-19e15af8e95f&q=${this.state.text}`
            const response = await fetch(endpoint)
            const json = await response.json()
            if (json.result.records.length === 0) return false

            // Return motorcycle information
            else{
                const motorcycle = {}
                motorcycle.type = 'motorcycle'
                const info = json.result.records[0]
                for (let key of Object.keys(info)){
                    motorcycle[key] = info[key]
                }
                return motorcycle
            }
        }

        catch (e){console.log(e);return false}

        //#endregion
    }

    // Get disability indicator
    hasDisabilityParking = async vehicleNumber => {

        try {
            const endpoint = `https://data.gov.il/api/action/datastore_search?resource_id=c8b9f9c8-4612-4068-934f-d4acd2e3c06e&q=${vehicleNumber}`;
            const response = await fetch(endpoint)
            const json = await response.json()
            return json.result.records.length > 0
        }
        catch (e) {return false}
    }

    // Formats the vehicle's number like so: 3274328 -> 32-743-28
    formatLicensePlate = number => {
        const arr = Array.from(number.toString())

        // 7 digits
        if (number.length === 7){
            arr.splice(2, 0, "-")
            arr.splice(6, 0, "-")
            return arr.join('')
        }

        // 8 digits
        else{
            arr.splice(3, 0, "-")
            arr.splice(6, 0, "-")
            return arr.join('')
        }
    }

    // Get the vehicle's number and send it to "getCarInfo"
    onPressHandler = async () => {
        if (!this.state.text || this.state.text.length <= 5) return
        const vehicle = await this.getCarInfo()
        if (vehicle.mispar_rechev) vehicle.mispar_rechev = this.formatLicensePlate(vehicle.mispar_rechev)
        if (vehicle.type === 'car') vehicle.disability = await this.hasDisabilityParking(this.state.text) ? '1' : '0'
        this.props.display(vehicle)
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.inputContainer}>
                    <TextInput
                        onSubmitEditing={e => this.onPressHandler(e.nativeEvent.text)}
                        keyboardType='numeric'
                        style={styles.input}
                        placeholder="מספר רכב" 
                        placeholderTextColor='#eee'
                        value={this.state.text}
                        onChangeText={text => this.setState({text})}
                        maxLength={8}
                    />
                    <Button
                        backgroundColor="#4f979e"
                        textSize={15}
                        textColor="#fff"
                        width={75}
                        height={35}
                        borderRadius={12.5}
                        paddingTop={5}
                        paddingBottom={5}
                        progress
                        progressLoadingTime={200}
                        onPress={async next => {
                            await this.onPressHandler()
                            next()
                        }}
                    >
                        <Icon name='arrow-left' size={25} color="#eee" />
                    </Button>

                </View>
            </View>
        )
    }
}

export default GetInput