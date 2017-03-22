import ReactDOM from 'react-dom';
import ExtJSComponent from './ExtJSComponent';

export { default as Template } from './Template';

let settings = {};

/**
 * Launches an ExtReact application, creating a viewport and rendering the specified root component into it.
 * @param {React.Component} rootComponent You application's root component
 */
export function launch(rootComponent) {
    Ext.application({
        launch: () => ReactDOM.render(rootComponent, Ext.Viewport.getRenderTarget().dom)
    })
}

/**
 * Creates a react component for a given Ext JS component.
 *
 *  Single class example: const Grid = reactify('grid');
 *
 *  Multiple class example: const [ Grid, Panel ] = reactify('Grid', 'Panel');
 *
 * @param {String[]/Ext.Class[]} ...targets xtypes or instances of Ext.Class.
 * @returns {React.Component/React.Component[]} If a single argument is passed a single React.Component class is returned. If multiple arguments are passed, an array of React.Component classes is returned.
 */
export function reactify(...targets) {
    const result = [];

    for (let target of targets) {
        if (typeof(target) === 'string') {
            const name = target;
            target = Ext.ClassManager.getByAlias(`widget.${target}`);
            if (!target) throw new Error(`No xtype "${name}" found.  Perhaps you need to require it with Ext.require("${name}")?`);
        }

        const name = target.getName && target.getName();

        result.push(class extends ExtJSComponent {
            static get name() {
                return name;
            }

            get reactorSettings() {
                return settings;
            }

            createExtJSComponent(config) {
                const result = new target(config)
                if (config.floated && result.show) result.show(); // floated components are hidden by default in modern
                return result;
            }
        })
    }

    if (targets.length === 1) {
        return result[0];
    } else {
        return result;
    }
}

/**
 * Configures React to resolve jsx tags.
 * @deprecated
 * @param {String} [viewport=true] Adds a stylesheet that mimics an Ext JS Viewport
 *  by setting the html, body, and react root element to height: 100%. Set this to true when using an
 *  Ext JS component at the root of your app.
 */
export function install({ viewport=false } = {}) {
    console.warn('[@extjs/reactor] Warning: install(options) is deprecated.  Use launch(<App/>, options) in place of Ext.onReady(() => ReactDOM.render(<App/>)).')
    
    settings.viewport = viewport;

    if (viewport) {
        const style = document.createElement('style');
        style.innerHTML = 'html, body, div[data-reactroot] { height: 100%; }';
        document.head.appendChild(style);
    }
};


