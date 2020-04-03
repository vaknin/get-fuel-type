import React, { Component } from 'react'
import {
    StyleSheet,
    ScrollView,
    Text,
    View,
    TouchableOpacity,
} from 'react-native'

/*
"automatic_ind" // אוטומט?
"abs_ind" // ABS?
"bakarat_shyut_adaptivit_ind" // yes or no
"bakarat_stiya_menativ_ind" // yes or no
"bakarat_yatzivut_ind" // yes or no
"baalut" // השכרה ליסינג פרטי חברה
"delek_nm" // סוג דלק
"hanaa_nm" // 4x4 or 4x2
"hege_koah_ind" // הגה כח
"mazgan_ind" // יש מזגן?
"mispar_rechev" // מס'
"mishkal_kolel" // ק"ג
"koah_sus" // כ"ס
"nefah_manoa" // סמ"ק
"mivchan_acharon_dt" // טסט אחרון ב
"tokef_dt" // טסט נגמר ב
"tozar" // חברה
"kinuy_mishari" // מודל
"shnat_yitzur" 
"ramat_gimur" // רמת גימור
"type" // car/motorcycle
@@@@@@@@@@@@@@@@@
"abs_ind": "1",
"automatic_ind": "1",
"bakarat_shyut_adaptivit_ind": "0",
"bakarat_stiya_menativ_ind": "0",
"bakarat_yatzivut_ind": "0",
"baalut": "פרטי",
"delek_nm": "בנזין",
"hanaa_nm": "4X2",
"hege_koah_ind": "1",
"mazgan_ind": "1",
"mispar_rechev": 3274328,
"mishkal_kolel": "1117",
"koah_sus": "115",
"nefah_manoa": "1840",
"mivchan_acharon_dt": "2020-03-11T00:00:00",
"tokef_dt": "2020-09-07T00:00:00",
"tozar": "מזדה", @
"kinuy_mishari": "LANTIS 323", @
"shnat_yitzur": "1997", @
"ramat_gimur": "GLX",
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
        fontFamily: 'Rubik-Bold',
        textAlign: 'center'
    },
    subtitle: {
        fontSize: 20.5,
        marginBottom: 35,
        color: '#911831',
        fontFamily: 'Rubik-Medium',
        textAlign: 'center'
    },
    scrollContainer: {
        flex: 1,
        flexDirection: 'row-reverse'
    },
    leftContainer: {
        alignItems: 'center',
    },
    rightContainer: {
        alignItems: 'center',
    },
    attribute: {
        marginBottom: 17.5,
        backgroundColor: '#ddd',
        padding: 15,
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

        // Prepend or Append
        if (type === 'prepend' || type === 'append') return <TouchableOpacity activeOpacity={0.35} style={styles.attribute}>
                    <Text style={styles.attributeText}>{type === 'prepend' ? `${data[key]} ${value}` : `${value} ${data[key]}`}</Text>
                </TouchableOpacity>
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
                                {this.displayAttribute('prepend', 'koah_sus', 'כ"ס')}
                                {this.displayAttribute('prepend', 'nefah_manoa', 'סמ"ק')}
                                {this.displayAttribute('prepend', 'mishkal_kolel', 'ק"ג')}
                                {this.displayAttribute('append', 'baalut', 'סוג בעלות')}
                                {this.displayAttribute('append', 'delek_nm', 'סוג דלק')}
                            </ScrollView>

                            { /*Left Container*/ }
                            <ScrollView contentContainerStyle={styles.leftContainer}>
                            {this.displayAttribute('prepend', 'koah_sus', 'כ"ס')}
                                {this.displayAttribute('prepend', 'nefah_manoa', 'סמ"ק')}
                                {this.displayAttribute('prepend', 'mishkal_kolel', 'ק"ג')}
                                {this.displayAttribute('append', 'baalut', 'סוג בעלות')}
                                {this.displayAttribute('append', 'delek_nm', 'סוג דלק')}
                            </ScrollView>

                        </View>
                    </View>
                    /*
                    "abs_ind": "1",
                    "automatic_ind": "1",
                    "bakarat_shyut_adaptivit_ind": "0",
                    "bakarat_stiya_menativ_ind": "0",
                    "bakarat_yatzivut_ind": "0",
                    "mazgan_ind": "1",
                    "hege_koah_ind": "1",
                    "hanaa_nm": "4X2",
                    "mivchan_acharon_dt": "2020-03-11T00:00:00",
                    "tokef_dt": "2020-09-07T00:00:00",
                    "ramat_gimur": "GLX",
                    "type": "מכונית"
                    */
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