/*
 * @Author: Clloz
 * @Date: 2020-09-06 14:46:16
 * @LastEditTime: 2020-09-08 09:28:04
 * @LastEditors: Clloz
 * @Description:
 * @FilePath: /toy-react/main.js
 * @博观而约取，厚积而薄发，日拱一卒，日进一寸。
 */

import { createElement, Component, render } from './toy-react';

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

class AnotherComponent extends Component {
    render() {
        return (
            <div {...this.props}>
                <h2>another component</h2>
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
        <AnotherComponent id="c" class="d">
            <div>another clloz</div>
        </AnotherComponent>
        <div>hello</div>
        <div>world</div>
    </MyComponent>,
    document.body,
);

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
