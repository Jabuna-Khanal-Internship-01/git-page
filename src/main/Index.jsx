import React, { Component } from 'react'

export default class Main extends Component {
    constructor() {
        super();
        this.state = {
            repos: [],
        };
    }


    componentDidMount() {
        this.fetchRepo();
    }

    fetchRepo = async () => {
        const response = await fetch(' https://api.github.com/users/jabuna07/repos')
        const data = await response.json()
        this.setState({
            repos: data,
        });
    };





    render() {
        return (
            <div>
                {this.state.repos.map((repo) => (
                    <li>{repo.name}</li>
                ))}
            </div>
        )
    }
}
