import React, { Component } from 'react'
import {
    StyleSheet,
    ScrollView,
    Text,
    View,
    TouchableOpacity,
} from 'react-native'
import Icon from 'react-native-vector-icons/Feather'

/*
    "type": "מכונית"
*/

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
    scrollContainer: {
        flex: 1,
        flexDirection: 'row-reverse',
    },
    leftContainer: {
        paddingTop: 10,
        alignItems: 'center',
    },
    rightContainer: {
        paddingTop: 10,
        alignItems: 'center',
    },
    attribute: {
        marginBottom: 17.5,
        backgroundColor: '#ddd',
        padding: 10,
        width: 140,
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
});

class Result extends Component {

    displayAttribute = (type, key, value) => {
        const data = this.props.data

        // Data is not available
        if (!data[key]) return

        // Prepend or Append attributes
        if (type === 'prepend' || type === 'append') return <TouchableOpacity activeOpacity={0.35} style={styles.attribute}>
                    <Text style={styles.attributeText}>{type === 'prepend' ? `${data[key]} ${value}` : `${value} ${data[key]}`}</Text>
                </TouchableOpacity>

        // Date attribute
        else if (type === 'date'){
            const date = new Date(data[key].toUpperCase())
            const newDate = `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`
            return <TouchableOpacity activeOpacity={0.35} style={styles.attribute}>
                        <Text style={styles.attributeText}>{`${value}\n${newDate}`}</Text>
                    </TouchableOpacity>
        }

        // Indicator attribute
        else if (type === 'indicator'){
            return <TouchableOpacity activeOpacity={0.35} style={styles.attribute}>
                        <Text style={styles.attributeText}>{value}{'\n'}
                            <Icon name={`${data[key] === "0" ? 'x' : 'check'}`} size={30} color="#900" />
                        </Text>
                    </TouchableOpacity>
        }

        // Indicator attribute
        else if (type === 'automatic'){
            return <TouchableOpacity activeOpacity={0.35} style={styles.attribute}>
                        <Text style={styles.attributeText}>{data[key] === "1" ? "גיר אוטומטי" : 'גיר ידני'}</Text>
                    </TouchableOpacity>
        }
    }

    render() {

        //console.log(this.props.data)
        const data = this.props.data
        
        return (
            <View style={{flex: 1}}>
                {
                    data
                    ?
                    <View style={styles.container}>
                        <Text style={styles.title}>{`${data.shnat_yitzur} ${data.kinuy_mishari} ${data.tozar}`}</Text>
                        <Text style={styles.subtitle}>{data.mispar_rechev}</Text>

                        <View style={styles.scrollContainer}>

                            { /*Right Container*/ }
                            <ScrollView contentContainerStyle={styles.rightContainer}>
                                {this.displayAttribute('automatic', 'automatic_ind')}
                                {this.displayAttribute('prepend', 'koah_sus', 'כ"ס')}
                                {this.displayAttribute('prepend', 'nefah_manoa', 'סמ"ק')}
                                {this.displayAttribute('prepend', 'mishkal_kolel', 'ק"ג')}
                                {this.displayAttribute('append', 'baalut', 'סוג בעלות')}
                                {this.displayAttribute('append', 'delek_nm', 'סוג דלק')}
                                {this.displayAttribute('append', 'ramat_gimur', 'רמת גימור')}
                                {this.displayAttribute('date', 'mivchan_acharon_dt', 'טסט אחרון')}
                                {this.displayAttribute('date', 'tokef_dt', 'הטסט עד')}
                            </ScrollView>

                            { /*Left Container*/ }
                            <ScrollView contentContainerStyle={styles.leftContainer}>
                                {this.displayAttribute('indicator', 'abs_ind', 'ABS')}
                                {this.displayAttribute('indicator', 'hege_koah_ind', 'הגה כח')}
                                {this.displayAttribute('indicator', 'mazgan_ind', 'מזגן')}
                                {this.displayAttribute('indicator', 'bakarat_yatzivut_ind', 'בקרת יציבות')}
                                {this.displayAttribute('indicator', 'bakarat_shyut_adaptivit_ind', 'בקרת שיוט')}
                                {this.displayAttribute('indicator', 'bakarat_stiya_menativ_ind', 'בקרת סטייה מנתיב')}
                            </ScrollView>

                        </View>
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