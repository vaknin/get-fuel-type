import React, { Component } from 'react'
import {
    StyleSheet,
    ScrollView,
    Text,
    View,
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
"sug_degem": "P",
"mivchan_acharon_dt": "2020-03-11T00:00:00",
"tokef_dt": "2020-09-07T00:00:00",
"tozar": "מזדה",
"kinuy_mishari": "LANTIS 323",
"shnat_yitzur": "1997",
"ramat_gimur": "GLX",
"type": "מכונית"
*/

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center'
    },
    sadContainer: {
        alignItems: 'center',
        paddingBottom: 30
    },
    sadText: {
        fontSize: 23,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#015453',
        textShadowRadius: 30,
    },
    scrollContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    title : {
        paddingTop: 15,
        fontSize: 25.5,
        fontWeight: 'bold',
        textShadowRadius: 50
    }
});

const attributes = [
    {key: 'nefah_manoa', value: 'נפח מנוע', type: ''},
    {key: 'delek_nm', value: 'סוג דלק'},
    {key: 'delek_nm', value: 'סוג דלק'},
    {key: 'delek_nm', value: 'סוג דלק'},
    {key: 'delek_nm', value: 'סוג דלק'},
    {key: 'delek_nm', value: 'סוג דלק'},
    {key: 'delek_nm', value: 'סוג דלק'},
    {key: 'delek_nm', value: 'סוג דלק'},
    {key: 'delek_nm', value: 'סוג דלק'},
    {key: 'delek_nm', value: 'סוג דלק'},
    {key: 'delek_nm', value: 'סוג דלק'},
    {key: 'delek_nm', value: 'סוג דלק'},
    {key: 'delek_nm', value: 'סוג דלק'},
    {key: 'delek_nm', value: 'סוג דלק'},
]

class Result extends Component {

    displayAttribute = attr => {
        for (let entry of dict){
            if (entry.key === attr){
                return <Text>{`${entry.value}: ${this.props.data[attr]}`}</Text>
            }
        }
    }

    render() {

        //console.log(this.props.data)
        const data = this.props.data
        
        return (
            <View style={styles.container}>
                {
                    data
                    ?
                    <ScrollView contentContainerStyle={styles.scrollContainer}>
                        {/*dict.map(e => <Text key={e.key}>{this.displayAttribute(e.key)}</Text>)*/}
                        <Text style={styles.title}>{`${data.shnat_yitzur} ${data.kinuy_mishari} ${data.tozar}`}</Text>
                    </ScrollView>
                    :
                    <View style={styles.sadContainer}>
                        <Text style={styles.sadText}>אויש, הרכב שלך לא מופיע במאגר משרד התחבורה.</Text>
                    </View>
                }
            </View>
        )
    }
}

export default Result