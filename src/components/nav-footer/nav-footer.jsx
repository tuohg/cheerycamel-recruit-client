import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {TabBar} from 'antd-mobile'
import {withRouter} from 'react-router-dom'

const Item = TabBar.Item

class NavFooter extends React.Component{
    static propTypes = {
        navList: PropTypes.array.isRequired
    }

    render() {
        const navList =this.props.navList.filter(nav => !nav.hide)

        const {pathname} = this.props.location
        return (
            <TabBar>
                {
                    navList.map((nav, index)=>(
                        <Item key={nav.path}
                                title={nav.text}
                                icon={{uri:require(`./images/${nav.icon}.png`)}}
                                selectedIcon={{uri: require(`./images/${nav.icon}-selected.png`)}}
                                selected={pathname===nav.path}
                                onPress={()=>{
                                    this.props.history.replace(nav.path)
                                }}
                        />
                    ))}
            </TabBar>
        )
    }
}

export default withRouter(NavFooter)