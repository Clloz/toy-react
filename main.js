/*
 * @Author: Clloz
 * @Date: 2020-09-06 14:46:16
 * @LastEditTime: 2020-09-07 13:26:51
 * @LastEditors: Clloz
 * @Description:
 * @FilePath: /toy-react/main.js
 * @博观而约取，厚积而薄发，日拱一卒，日进一寸，学不可以已。
 */

// import { createElement, Component, render } from './toy-react';
function createElement(type, attributes, ...children) {
    // console.log(type, children);
    let el;
    if (typeof type === 'string') {
        el = document.createElement(type);
    } else {
        el = new type();
    }

    for (let attr in attributes) {
        el.setAttribute(attr, attributes[attr]);
    }

    let insertChildren = children => {
        // console.log(children);
        for (let child of children) {
            if (typeof child === 'string') {
                child = document.createTextNode(child);
            }
            if (typeof child === 'object' && Array.isArray(child)) {
                console.log(child);
                insertChildren(child);
            } else {
                console.log(el, child);
                el.appendChild(child);
                // console.log(el);
            }
        }
    };
    insertChildren(children);
    // console.log(el);
    return el;
}

class Component {
    constructor() {
        this.props = Object.create(null);
        this.children = [];
    }
    setAttribute(name, value) {
        this.props[name] = value;
    }
    appendChild(el) {
        this.children.push(el);
    }
    get template() {
        return this.render();
    }
}

class MyComponent extends Component {
    render() {
        // console.log(this.children);
        return (
            <div {...this.props}>
                <h1>my component</h1>
                {this.children}
            </div>
        );
    }
}

render(
    <MyComponent id="a" class="b">
        <div>
            clloz
            <div>test</div>
        </div>
        <div>hello</div>
        <div>world</div>
    </MyComponent>,
    document.body,
);

function render(component, parentElement) {
    console.log(component.template);
    parentElement.appendChild(component.template);
    // console.log(typeof component.template);
}

// createElement(
//     MyComponent,
//     {
//         id: 'a',
//         class: 'b',
//     },
//     createElement('div', null, 'clloz'),
//     createElement('div', null, 'hello'),
//     createElement('div', null, 'world'),
// );
