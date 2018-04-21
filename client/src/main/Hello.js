import React from 'react'

import './Hello.less'
import template from './Hello.rt'

//const Hello = React.createClass({ displayName: 'Hi',  render: template })

class Hello extends React.Component 
{
    constructor(props) { super(props); }
    render() { return template.apply(this); }

    getModel()
    {
        return { who: "World!" }; 
    }
}

export default Hello
