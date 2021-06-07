import React, { Component } from 'react'
import { setTheUsername } from 'whatwg-url';

export default class LeftContent extends Component {
    constructor() {
        super();
        this.state = {
            user: '',
            bio: '',
            company: '',
            location: '',
            twitterUserName: '',
            isInEditMode: false
        }
    }

    componentDidMount() {
        this.fetchUser();
    }

    fetchUser = async () => {
        const response = await fetch(' https://api.github.com/users/jabuna07')
        const data = await response.json()
        this.setState({
            user: data,
            bio: data.bio,
            company: data.company,
            location: data.location,
            twitterUserName: data.twitter_username,
        });
    };

    updateUserDetail = async () => {
        const response = await fetch('https://api.github.com/user', {
            method: 'PATCH',
            headers: new Headers({
                'Authorization': 'Bearer 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',
                'Content-Type': 'application/json',
            }),

            body: JSON.stringify({
                bio: this.state.bio,
                company: this.state.company,
                location: this.state.location,
                twitter_username: this.state.twitterUserName,
            })
        });

        const data = await response.json()
        this.setState({
            user: data,
            bio: data.bio,
            company: data.company,
            location: data.location,
            twitterUserName: data.twitter_username,

        })
    };

    getUserLogin = () => {
        return (
            <>
                <label>Username:
                    {this.state.user.login}</label> <br></br>
                <label>Followers:
                    {this.state.user.followers}</label><br></br>
                <label>Following:
                    {this.state.user.following}</label>
            </>
        )
    }

    editMode = () => {
        this.setState({
            isInEditMode: !this.state.isInEditMode
        })
    }

    updateMode = () => {
        this.setState({
            isInEditMode: false
        })
    }

    handleChange = (event) => {
        this.setState({
            bio: event.target.value
        })
    }

    handleCompanyChange = (event) => {
        this.setState({
            company: event.target.value
        })
    }

    handleLocationChange = (event) => {
        this.setState({
            location: event.target.value
        })
    }

    handleTwitterNameChange = (event) => {
        this.setState({
            twitterUserName: event.target.value
        })
    }

    renderEditView = () => {
        return <>
            <div className="content">
                <div className="content__image">
                    <img src="avatar.png" alt="image" />
                </div>
                <p> {this.getUserLogin()}</p>
            </div>

            <div className="content__userDetail">
                <textarea className="Bio" cols="35" rows="6" placeholder="Add a Bio" onChange={this.handleChange} value={this.state.bio}></textarea>
                <form action="detail">
                    <input type="text" placeholder="company" onChange={this.handleCompanyChange} value={this.state.company} />
                    <input type="text" placeholder="location" onChange={this.handleLocationChange} value={this.state.location} />
                    <input type="text" placeholder="twitter username" onChange={this.handleTwitterNameChange} value={this.state.twitterUserName} />
                </form>
            </div>
            <div className="content__button">
                <input type="button" value="Save" className="content__button--save" onClick={this.updateUserDetail} />
                <input type="button" value="Cancel" className="content__button--cancel" onClick={this.editMode} />
            </div>
        </>
    }

    renderDefaultView = () => {
        return (<div className="content">
            <div className="content__image">
                <img src="avatar.png" alt="image" />
            </div>
            <div className="content__userData">
                <p> Username</p>
                <p>{this.state.bio}</p>
                <p> {this.state.company}</p>
                <p> {this.state.location}</p>
                <p> {this.state.twitterUserName}</p>
            </div>

            <div className="content__edit-btn">
                <input type="button" value="Edit profile" onClick={this.editMode} />
            </div>
        </div>)
    }

    render() {
        return (
            this.state.isInEditMode ? this.renderEditView() : this.renderDefaultView()
        )
    }
}
