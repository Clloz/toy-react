/*
 * @Author: Clloz
 * @Date: 2020-09-06 20:45:45
 * @LastEditTime: 2020-09-07 10:23:35
 * @LastEditors: Clloz
 * @Description: toy-react.js
 * @FilePath: /toy-react/toy-react.js
 * @博观而约取，厚积而薄发，日拱一卒，日进一寸，学不可以已。
 */
class ElementWrapper {
    constructor(type) {
        this.root = document.createElement(type);
    }
    setAttribute(name, value) {
        this.root.setAttribute(name, value);
    }
    appendChild(component) {
        this.root.appendChild(component.root);
    }
}

class TextWrapper {
    constructor(content) {
        this.root = document.createTextNode(content);
    }
}

export class Component {
    constructor() {
        this.props = Object.create(null);
        this.children = [];
        this._root = null;
    }
    setAttribute(name, value) {
        this.props[name] = value;
    }
    appendChild(component) {
        this.children.push(component);
    }
    get root() {
        // console.log(this.render());
        if (!this._root) this._root = this.render().root;
        return this._root;
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
            console.log(child, typeof child);
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
    parentElement.appendChild(component.root);
}
