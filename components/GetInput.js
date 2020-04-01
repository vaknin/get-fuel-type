import React, { Component } from 'react'
import {
    StyleSheet,
    View,
    Text,
    TextInput,
    Button,
} from 'react-native'

const styles = StyleSheet.create({
    view: {
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center'
    },
    input: {
    },
    button: {
    }
});

class GetInput extends Component {

    state = {
        text: undefined,
        fuelType: ''
    }

    getFuelType = async () => {

        //#region Private Car

        let degem_cd, degem_nm

        // Get the vehicle's info, in order to fetch the fuel type from another table
        try {
            const licensePlateEndpoint = `https://data.gov.il/api/action/datastore_search?resource_id=053cea08-09bc-40ec-8f7a-156f0677aff3&q=${this.state.text}`
            const response = await fetch(licensePlateEndpoint)
            const json = await response.json()
            if (json.result.records.length === 0) throw Error('Not a private car')
            degem_cd = json.result.records[0]["degem_cd"].toString().padStart('4', '0')
            degem_nm = json.result.records[0]["degem_nm"]

            // Fetch fuel type
            try{
                const vechicleInformationEndpoint = `https://data.gov.il/api/action/datastore_search?resource_id=142afde2-6228-49f9-8a29-9b6c3a0cbe40&q=${degem_nm}`
                const response = await fetch(vechicleInformationEndpoint)
                const json = await response.json()
                if (json.result.records.length === 0) return false
    
                // Iterate through all different vehicles
                for(let vehicle of json.result.records){
                    if (vehicle.degem_cd === degem_cd){
                        return vehicle.delek_nm
                    }
                }
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
            else return json.result.records[0]['sug_delek_nm']
        }

        catch (e){console.log(e);return false}

        //#endregion
    }

    // Fetch the fuel type
    submit = async () => {
        if (this.state.text.length <= 5) return
        const fuelType = await this.getFuelType();
        this.props.setFuel(fuelType)
    }

    render() {
        return (
            <View style={styles.view}>
                <TextInput style={styles.input} placeholder="הקלד מספר רכב.." value={this.state.text} onChangeText={text => this.setState({text})} />
                <Button style={styles.button} onPress={this.submit} title="גלה את סוג הדלק" />
            </View>
        )
    }
}

export default GetInput