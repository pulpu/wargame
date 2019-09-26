import React from 'react'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import Test from './components/test'
import Home from './components/home'
import noMatch from './components/noMatch'

class Router extends React.Component {

    render() {
        return(
            <BrowserRouter>
                <Switch>
                    <Route exact path="/" component={Home}/>
                    <Route exact path="/test" component={Test}/>
                    <Route component={noMatch} />
                </Switch>
            </BrowserRouter>
        )
    }
}

export default Router;