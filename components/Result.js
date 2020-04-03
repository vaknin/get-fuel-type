import React, { Component } from 'react'
import {
    StyleSheet,
    ScrollView,
    Text,
    View,
    TouchableOpacity,
} from 'react-native'
import Icon from 'react-native-vector-icons/Feather'

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    title : {
        paddingTop: 10,
        fontSize: 29.5,
        color: '#111831',
        fontFamily: 'Rubik-Light',
        textAlign: 'center',
        paddingBottom: 3,
        textShadowRadius: 5
    },
    subtitle: {
        fontSize: 20.5,
        paddingBottom: 8,
        color: '#a44',
        fontFamily: 'Rubik-Medium',
        textAlign: 'center',
        borderBottomColor: '#499',
        borderBottomWidth: 1.25,
        textShadowRadius: 5
    },
    carContainer: {
        flex: 1,
        flexDirection: 'row-reverse',
    },
    leftContainer: {
        paddingTop: 17.5,
        alignItems: 'center',
    },
    rightContainer: {
        paddingTop: 17.5,
        alignItems: 'center',
    },
    attribute: {
        marginBottom: 19,
        backgroundColor: '#ddd',
        padding: 12,
        width: 130,
        borderColor: 'black',
        borderRadius: 7,
        borderWidth: 1.4
    },
    attributeText: {
        fontSize: 18,
        fontFamily: 'Rubik-Regular',
        textAlign: 'center',
        color: '#666'
    },
    sadText: {
        fontSize: 23,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#015453',
        textShadowRadius: 30,
    },
    motorcycleContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
});

class Result extends Component {

    // Render the attribute View
    displayAttribute = (type, key, value) => {
        const data = this.props.data

        // Data is not available
        if (!data[key]) return

        // Prepend or Append attributes
        if (type === 'prepend' || type === 'append') return (
            <TouchableOpacity activeOpacity={0.35} style={styles.attribute}>
                <Text style={styles.attributeText}>{type === 'prepend' ? `${data[key]} ${value}` : `${value} ${data[key]}`}</Text>
            </TouchableOpacity>)

        // Date attribute
        else if (type === 'date'){
            const date = new Date(data[key].toUpperCase())
            const newDate = `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`
            return (
                <TouchableOpacity activeOpacity={0.35} style={styles.attribute}>
                    <Text style={styles.attributeText}>{`${value}\n${newDate}`}</Text>
                </TouchableOpacity>)
        }

        // Indicator attribute
        else if (type === 'indicator'){
            return (
                <TouchableOpacity activeOpacity={0.35} style={styles.attribute}>
                    <Text style={styles.attributeText}>{value}{'\n'}
                        <Icon name={`${data[key] === "0" ? 'x' : 'check'}`} size={30} color="#900" />
                    </Text>
                </TouchableOpacity>)
        }

        // Indicator attribute
        else if (type === 'automatic'){
            return (
                <TouchableOpacity activeOpacity={0.35} style={styles.attribute}>
                    <Text style={styles.attributeText}>{data[key] === "1" ? "גיר אוטומטי" : 'גיר ידני'}</Text>
                </TouchableOpacity>)
        }
    }

    render() {

        const data = this.props.data
        const title = data.type === 'car' ? `${data.shnat_yitzur} ${data.kinuy_mishari} ${data.tozar}` : `${data.tozeret_nm} ${data.shnat_yitzur}`
        
        return (
            <View style={{flex: 1}}>
                {
                    data
                    ?
                    <View style={styles.container}>
                        <Text style={styles.title}>{title}</Text>
                        <Text style={styles.subtitle}>{data.mispar_rechev}</Text>

                        {
                            data.type === 'car'
                            ?
                            <View style={styles.carContainer}>

                                { /*Right Container*/ }
                                <ScrollView contentContainerStyle={styles.rightContainer}>
                                    {this.displayAttribute('automatic', 'automatic_ind')}
                                    {this.displayAttribute('append', 'baalut', 'סוג בעלות')}
                                    {this.displayAttribute('append', 'delek_nm', 'סוג דלק')}
                                    {this.displayAttribute('append', 'ramat_gimur', 'רמת גימור')}
                                    {this.displayAttribute('prepend', 'koah_sus', 'כ"ס')}
                                    {this.displayAttribute('prepend', 'nefah_manoa', 'סמ"ק')}
                                    {this.displayAttribute('prepend', 'mishkal_kolel', 'ק"ג')}
                                    {this.displayAttribute('date', 'mivchan_acharon_dt', 'טסט אחרון')}
                                    {this.displayAttribute('date', 'tokef_dt', 'הטסט עד')}
                                </ScrollView>

                                { /*Left Container*/ }
                                <ScrollView contentContainerStyle={styles.leftContainer}>
                                    {this.displayAttribute('indicator', 'abs_ind', 'ABS')}
                                    {this.displayAttribute('indicator', 'bakarat_yatzivut_ind', 'בקרת יציבות')}
                                    {this.displayAttribute('indicator', 'bakarat_shyut_adaptivit_ind', 'בקרת שיוט')}
                                    {this.displayAttribute('indicator', 'bakarat_stiya_menativ_ind', 'בקרת סטייה מנתיב')}
                                    {this.displayAttribute('indicator', 'mazgan_ind', 'מזגן')}
                                    {this.displayAttribute('indicator', 'hege_koah_ind', 'הגה כח')}
                                </ScrollView>

                            </View>
                            :
                            <View style={styles.motorcycleContainer}>
                                {this.displayAttribute('append', 'degem_nm', 'דגם')}
                                {this.displayAttribute('append', 'sug_delek_nm', 'סוג דלק')}
                            </View>
                        }
                        
                    </View>
                    :
                    <View style={styles.container}>
                        <Text style={styles.sadText}>אוי, הרכב שלך לא מופיע במאגר משרד התחבורה.</Text>
                    </View>
                }
            </View>
        )
    }
}

export default Result