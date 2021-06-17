import React, {Component} from 'react'
import {Button} from 'antd-mobile'

export default class NotFound extends Component{
    render() {
        return (
            <div>
                <div>
                    <h2>404: Sorry, can't find page!</h2>
                    <Button
                        type="primary"
                        onClick={()=>this.props.history.replace("/")}
                    >Back Home Page</Button>
                </div>
            </div>
        )
    }
}