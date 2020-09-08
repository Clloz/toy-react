/*
 * @Author: Clloz
 * @Date: 2020-09-06 20:45:45
 * @LastEditTime: 2020-09-08 15:38:09
 * @LastEditors: Clloz
 * @Description: toy-react.js
 * @FilePath: /toy-react/toy-react.js
 * @博观而约取，厚积而薄发，日拱一卒，日进一寸。
 */
let RENDER_TO_DOM = Symbol('rander to dom');
class ElementWrapper {
    constructor(type) {
        this.root = document.createElement(type);
    }
    setAttribute(name, value) {
        if (name.match(/^on([\s\S]+)$/)) {
            this.root.addEventListener(
                RegExp.$1.replace(/^[\s\S]/, c => c.toLowerCase()),
                value,
            );
        } else {
            this.root.setAttribute(name, value);
        }
    }
    appendChild(component) {
        console.log(component);
        let range = document.createRange();
        range.setStart(this.root, this.root.childNodes.length);
        range.setEnd(this.root, this.root.childNodes.length);
        component[RENDER_TO_DOM](range);
    }
    [RENDER_TO_DOM](range) {
        range.deleteContents();
        range.insertNode(this.root);
    }
}

class TextWrapper {
    constructor(content) {
        this.root = document.createTextNode(content);
    }
    [RENDER_TO_DOM](range) {
        range.deleteContents();
        range.insertNode(this.root);
    }
}

export class Component {
    constructor() {
        this.props = Object.create(null);
        this.children = [];
        this._range = null;
    }
    setAttribute(name, value) {
        this.props[name] = value;
    }
    appendChild(component) {
        this.children.push(component);
    }
    [RENDER_TO_DOM](range) {
        this._range = range;
        this.render()[RENDER_TO_DOM](range);
    }
    rerender() {
        this._range.deleteContents();
        this[RENDER_TO_DOM](this._range);
    }
    setState(newObj) {
        if (this.state === null || typeof this.state !== 'object') {
            this.state = newObj;
            this.rerender();
            return;
        }

        let merge = (oldState, newState) => {
            for (let p in newState) {
                if (oldState[p] === null || typeof oldState[p] !== 'object') {
                    oldState[p] = newState[p];
                } else {
                    merge(oldState(p), newState[p]);
                }
            }
        };
        merge(this.state, newObj);
        this.rerender();
    }
}

export function createElement(type, attributes, ...children) {
    // console.log(type, attributes, children);
    let e;
    if (typeof type === 'string') {
        e = new ElementWrapper(type);
    } else {
        e = new type();
    }

    for (let attr in attributes) {
        e.setAttribute(attr, attributes[attr]);
    }

    let insertChildren = children => {
        for (let child of children) {
            // console.log(child, typeof child);
            if (typeof child === 'string') {
                child = new TextWrapper(child);
            }
            if (typeof child === 'object' && Array.isArray(child)) {
                insertChildren(child);
            } else {
                e.appendChild(child);
            }
        }
    };
    insertChildren(children);
    return e;
}

export function render(component, parentElement) {
    let range = document.createRange();
    range.setStart(parentElement, 0);
    range.setEnd(parentElement, parentElement.childNodes.length);
    range.deleteContents();
    component[RENDER_TO_DOM](range);
}
