import React, {Component} from 'react';
import {Text, StyleSheet, View} from 'react-native';

class Header extends Component {
    render(){
        return(
            <View style = {style.headerView}>
                <Text style = {style.textStyle}>{this.props.headerText}</Text>
            </View>   
        );
    }
}

const style = StyleSheet.create({
    headerView: {
        backgroundColor: '#576574',
        alignSelf: 'stretch',
        alignItems: 'center'
    },
    textStyle: {
        fontSize: 30,
        color: '#fff'
    }
})

export { Header }