import React, { Component } from 'react';
import { Panel, Cartesian } from '@extjs/reactor/modern';
import ChartToolbar from '../Charts/ChartToolbar';
import storeData from './storeData';

export default class SplineMarkers extends Component {

    store = Ext.create('Ext.data.Store', {
        fields: ['theta', 'sin', 'cos', 'tan' ],
        data: storeData
    })

    state = {
        theme: 'default'
    }

    changeTheme = (select, choice) => {
        this.setState({ theme: choice.get('value') });
    }

    render() {
        const { theme } = this.state;

        return (
            <Panel shadow layout="fit">
                <ChartToolbar onThemeChange={this.changeTheme} theme={theme}/>
                <Cartesian
                    store={this.store}
                    insetPadding="10 20 10 10"
                    legend={{
                        type: 'sprite',
                        docked: 'top',
                        marker: {
                            size: 16
                        }
                    }}
                    axes={[{
                        type: 'numeric',
                        fields: ['sin', 'cos', 'tan' ],
                        position: 'left',
                        grid: true,
                        renderer: (axis, label) => Ext.util.Format.number(label, '0.0')
                    }, {
                        type: 'category',
                        title: 'Theta',
                        fields: 'theta',
                        position: 'bottom',
                        style: {
                            textPadding: 0 // remove extra padding between labels to make sure no labels are skipped
                        },
                        grid: true,
                        label: {
                            rotate: {
                                degrees: -45
                            }
                        }
                    }]}
                    series={[{
                        type: 'line',
                        xField: 'theta',
                        yField: 'sin',
                        smooth: true,
                        style: {
                            lineWidth: 2
                        },
                        marker: {
                            radius: 4
                        },
                        highlight: {
                            fillStyle: '#000',
                            radius: 5,
                            lineWidth: 2,
                            strokeStyle: '#fff'
                        }
                    }, {
                        type: 'line',
                        xField: 'theta',
                        yField: 'cos',
                        smooth: true,
                        style: {
                            lineWidth: 2
                        },
                        marker: {
                            radius: 4
                        },
                        highlight: {
                            fillStyle: '#000',
                            radius: 5,
                            lineWidth: 2,
                            strokeStyle: '#fff'
                        }
                    }, {
                        type: 'line',
                        xField: 'theta',
                        yField: 'tan',
                        smooth: true,
                        style: {
                            lineWidth: 2
                        },
                        marker: {
                            radius: 4
                        },
                        highlight: {
                            fillStyle: '#000',
                            radius: 5,
                            lineWidth: 2,
                            strokeStyle: '#fff'
                        }
                    }]}
                />
            </Panel>
        )
    }
}