import React, { Component } from 'react';
import { List } from '@extjs/reactor/modern';
import data from '../BasicList/data';

Ext.require([
    'Ext.MessageBox'
]);

export default class DisclosureListExample extends Component {

    store = Ext.create('Ext.data.Store', { 
        data,
        sorters: ['last_name', 'first_name']
    });

    render() {
        return (
            <List
                shadow
                itemTpl="{first_name} {last_name}"
                store={this.store}
                config={{
                    onItemDisclosure: (record, btn, index) => {
                        Ext.Msg.alert('Tap', 'Disclose more info for ' + record.get('first_name'), Ext.emptyFn);
                    }
                }}
                platformConfig={{
                    '!phone': {
                        height: 450,
                        width: 300
                    }
                }}
            />
        )
    }

}