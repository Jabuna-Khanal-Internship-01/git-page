import React, { Component } from 'react'
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom'
import Project from './Project'
import Repos from './Repos'
export default class RightHead extends Component {
    render() {
        return (
            <div className="content-right">
                <BrowserRouter>
                    <nav>
                        <Link to={'/repos'}>Repository</Link>
                        <Link to={'/project'}>Project</Link>
                    </nav>
                    <Switch>
                        <Route path={'/project'} component={Project} exact />
                        <Route path={'/repos'} component={Repos} />
                    </Switch>
                </BrowserRouter>
            </div>
        )
    }
}
