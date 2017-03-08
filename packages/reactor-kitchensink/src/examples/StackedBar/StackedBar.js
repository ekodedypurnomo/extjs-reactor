import React, { Component } from 'react';
import { Cartesian, Panel } from '@extjs/reactor/modern';
import ChartToolbar from '../Charts/ChartToolbar';
import createData from './createData';

Ext.require([
    'Ext.chart.interactions.PanZoom',
    'Ext.chart.series.Bar',
    'Ext.chart.axis.Numeric',
    'Ext.chart.axis.Category'
]);

export default class StackedBarChartExample extends Component {
    constructor() {
        super();
        this.refresh();
    }

    store = Ext.create('Ext.data.Store', {
        fields: ['id', 'g1', 'g2', 'g3', 'g4', 'g5', 'g6', 'name']
    });

    refresh = () => {
        this.store.loadData(createData(25));
    }

    state = {
        theme: 'default'
    };

    changeTeam = (select, choice) => {
        this.setState({ theme: choice.get('value') })
    }

    render() {
        const { theme } = this.state;

        return (
            <Panel shadow layout="fit" title="Fungujem">
                <ChartToolbar
                    onThemeChange={this.changeTheme}
                    onRefreshClick={this.refresh}
                    theme={theme}
                />
                <Cartesian
                    flipXY={ true }
                    store={this.store}
                    series={[{
                        type: 'bar',
                        xField: 'name',
                        yField: ['g1', 'g2', 'g3', 'g4', 'g5', 'g6']
                    }]}
                    axes={[{
                        type: 'numeric',
                        position: 'bottom',
                        fields: ['g1', 'g2', 'g3', 'g4', 'g5', 'g6'],
                        grid: {
                            even: {
                                lineWidth: 1
                            },
                            odd: {
                                stroke: '#fff'
                            }
                        },
                        label: {
                            rotate: {
                                degrees: -90
                            }
                        },
                        maxZoom: 1
                    }, {
                        type: 'category',
                        position: 'left',
                        fields: 'name',
                        maxZoom: 4
                    }]}
                />
            </Panel>
        )
    }
}