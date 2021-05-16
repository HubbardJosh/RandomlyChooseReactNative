import { StyleSheet, Dimensions } from 'react-native';

const screenSize = Platform.OS === "web" ? Dimensions.get("window") : Dimensions.get("screen");
const baseHeightUnit = screenSize.height / 25;

export const styles = StyleSheet.create({
    saveLoadButton: {
        height: baseHeightUnit, 
        width: ((screenSize.width / 5) + 20), 
        backgroundColor: '#888', 
        justifyContent: 'center', 
        alignItems: 'center', 
        borderRadius: 3
    },
    buttonText: {
        fontSize: 20, 
        fontWeight: '400'
    },
    enterClearButton: {
        height: baseHeightUnit * 1.5, 
        width: screenSize.width - 10, 
        backgroundColor: '#888', 
        justifyContent: 'center', 
        alignItems: 'center', 
        borderRadius: 3
    },
    choiceButtons: {
        height: baseHeightUnit * 1.5, 
        width: (screenSize.width / 3) - 7, 
        backgroundColor: '#888', 
        justifyContent: 'center', 
        alignItems: 'center', 
        borderRadius: 3
    },
    enterTextInput: {
        width: (screenSize.width - 35 - (screenSize.width / 5)), 
        paddingLeft: 3, 
        backgroundColor: '#888', 
        borderRadius: 3, 
        fontSize: 20, 
        fontWeight: '400', 
        color: '#fff'
    },
    loadSaveCancelButtons: {
        alignItems: 'center', 
        borderRadius: 3, 
        justifyContent: 'center', 
        height: (screenSize.width / 1.5) / 4 - 10, 
        width: screenSize.width / 1.5 - 20, 
        backgroundColor: '#777'
    },
    chooseXDoneButton: {
        justifyContent: 'center', 
        borderRadius: 3, 
        alignItems: 'center', 
        paddingLeft: 5, 
        height: (screenSize.width / 1.5) / 4 - 10, 
        width: screenSize.width / 1.5 - 20, 
        marginTop: 5, 
        backgroundColor: '#777'
    },
    saveChooseXInput: {
        paddingLeft: 5, 
        borderRadius: 3, 
        height: (screenSize.width / 1.5) / 4 - 10, 
        width: screenSize.width / 1.5 - 20, 
        backgroundColor: '#777'
    },
    entryMessageText: {
        fontSize: 18,
        fontWeight: '400', 
        color: '#fff'
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
        width: screenSize.width, 
        justifyContent: 'center', 
        alignItems: 'center', 
        backgroundColor: 'rgba(100, 100, 100, 0.6)'
    },
    modalView: {
        position: 'absolute', 
        borderRadius: 3, 
        elevation: 10, 
        paddingVertical: 10, 
        width: screenSize.width / 1.5, 
        backgroundColor: '#fff', 
        alignItems: 'center', 
        alignContent: 'center'
    },
    flatlistText: {
        fontSize: 25, 
        fontWeight: '300', 
        color: '#fff'
    },
    flatlistView: {
        height: 50, 
        paddingTop: 10, 
        justifyContent: 'center', 
        borderBottomWidth: 0.2, 
        borderBottomColor: '#fff'
    },
    flatlistMainView: {
        justifyContent: 'center', 
        alignItems: 'center', 
        height: ((baseHeightUnit * 14) - 20), 
        paddingBottom: 5, 
        paddingTop: 10
    },
    mainView: {
        height: screenSize.height, 
        width: screenSize.width, 
        paddingTop: Platform.OS == "android" ? baseHeightUnit + 10 : baseHeightUnit * 2, 
        backgroundColor: '#222123'
    },
    bottomButtonsView: {
        justifyContent: 'center', 
        alignItems: 'center'
    },
    bottomMiddleRowButtonsView: {
        flexDirection: 'row', 
        justifyContent: 'center', 
        paddingVertical: 4
    },
    bottomAdView: {
        position: 'absolute', 
        bottom: 30, 
        height: 50, 
        width: 320, 
        backgroundColor: '#fff', 
        alignSelf: 'center', 
        marginTop: 10
    }

});