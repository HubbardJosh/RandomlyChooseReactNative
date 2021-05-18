import { StyleSheet, Dimensions, Platform } from 'react-native';

const screenSize = Platform.OS === "web" ? Dimensions.get("window") : Dimensions.get("screen");
const baseHeightUnit = screenSize.height / 25;
const borRad = 4;
const bgColor = '#71cff4';          // light blue
const secondaryColor = '#4c4c4c';   // brownish-gray
const fWeight = '400';

export const styles = StyleSheet.create({
    saveLoadButton: {
        height: baseHeightUnit, 
        width: ((screenSize.width / 5) + 20), 
        backgroundColor: secondaryColor, 
        justifyContent: 'center', 
        alignItems: 'center', 
        borderRadius: borRad
    },
    buttonText: {
        fontSize: Platform.OS == 'ios' ? 20 : 16, 
        fontWeight: fWeight,
        color: '#fff'
    },
    enterClearButton: {
        height: baseHeightUnit * 1.5, 
        width: screenSize.width - 10, 
        backgroundColor: secondaryColor, 
        justifyContent: 'center', 
        alignItems: 'center', 
        borderRadius: borRad
    },
    choiceButtons: {
        height: baseHeightUnit * 1.5, 
        width: (screenSize.width / 3) - 7, 
        backgroundColor: secondaryColor, 
        justifyContent: 'center', 
        alignItems: 'center', 
        borderRadius: borRad
    },
    enterTextInput: {
        width: (screenSize.width - 35 - (screenSize.width / 5)), 
        paddingLeft: 3, 
        backgroundColor: secondaryColor, 
        borderRadius: borRad, 
        fontSize: Platform.OS == 'ios' ? 20 : 16, 
        fontWeight: fWeight, 
        color: '#fff',
    },
    loadSaveCancelButtons: {
        alignItems: 'center', 
        borderRadius: borRad, 
        justifyContent: 'center', 
        height: baseHeightUnit * 1.5, 
        width: screenSize.width / 1.5 - 20, 
        backgroundColor: secondaryColor
    },
    chooseXDoneButton: {
        justifyContent: 'center', 
        borderRadius: borRad, 
        alignItems: 'center', 
        paddingLeft: 5, 
        height: baseHeightUnit * 1.5, 
        width: screenSize.width / 1.5 - 20, 
        marginTop: 5, 
        backgroundColor: secondaryColor
    },
    saveChooseXInput: {
        paddingLeft: 5, 
        borderRadius: borRad, 
        height: baseHeightUnit * 1.5, 
        width: screenSize.width / 1.5 - 20, 
        backgroundColor: secondaryColor,
        color: '#fff',
        fontSize: Platform.OS == 'ios' ? 20 : 16
    },
    entryMessageText: {
        fontSize: 18,
        fontWeight: fWeight, 
        color: '#000'
    },
    entryMessageView: {
        paddingVertical: 5, 
        paddingLeft: 10, 
        height: baseHeightUnit, 
        justifyContent: 'center'
    },
    saveLoadChooseXBackground: {
        position: 'absolute', 
        elevation: 9, 
        height: screenSize.height, 
        width: screenSize.width + 100,
        left: -50, 
        justifyContent: 'center', 
        alignItems: 'center', 
        backgroundColor: 'rgba(50, 50, 50, 0.5)'
    },
    modalView: {
        position: 'absolute', 
        borderRadius: borRad, 
        elevation: 10, 
        paddingVertical: 10, 
        width: screenSize.width / 1.5, 
        backgroundColor: bgColor, 
        borderColor: secondaryColor,
        borderWidth: 1,
        alignItems: 'center', 
        alignContent: 'center'
    },
    flatlistText: {
        fontSize: 22, 
        fontWeight: fWeight, 
        color: '#000'
    },
    flatlistView: {
        height: 50, 
        paddingTop: 10, 
        justifyContent: 'center', 
        borderBottomWidth: 0.3, 
        borderBottomColor: '#777'
    },
    flatlistMainView: {
        justifyContent: 'center', 
        alignItems: 'center', 
        maxHeight: Platform.OS == 'ios' ? ((baseHeightUnit * 14.5) - 10) : ((baseHeightUnit * 14) - 20), 
        // height: Platform.OS == 'ios' ? ((baseHeightUnit * 16.25) - 10) : ((baseHeightUnit * 14) - 20), 
        paddingBottom: 5, 
        paddingTop: 10
    },
    mainView: {
        height: screenSize.height, 
        width: screenSize.width, 
        paddingTop: Platform.OS == "android" ? baseHeightUnit : 0, 
        backgroundColor: bgColor
    },
    bottomButtonsView: {
        justifyContent: 'center', 
        alignItems: 'center',
        position: 'absolute',
        bottom: Platform.OS == 'ios' ? 70 : 70,
        marginBottom: Platform.OS == 'ios' ? 10 : 0,
        left: 5,
    },
    bottomMiddleRowButtonsView: {
        flexDirection: 'row', 
        justifyContent: 'center', 
        paddingVertical: 4
    },
    bottomAdView: {
        position: 'absolute', 
        bottom: Platform.OS == 'ios' ? 20 : 5, 
        height: 50, 
        width: 320, 
        backgroundColor: '#fff', 
        alignSelf: 'center', 
        marginTop: 10,
    }

});