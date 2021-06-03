
import React, { Component } from 'react'
import { setTheUsername } from 'whatwg-url';


export default class LeftContent extends Component {
    constructor() {
        super();
        this.state = {
            user: '',
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
        });

    };


    getUserLogin = () => {
        console.warn('---')
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
        console.log("entered in edit mode")
    }



    updateMode = () => {
        this.setState({
            isInEditMode: false
        })
        console.log("saved")
    }

    renderEditView = () => {
        return <> <div className="content">
            <div className="content__image">
                <img src="avatar.png" alt="image" />
            </div>
            <p>
                {this.getUserLogin()}
            </p>

        </div>

            <div className="content__userDetail">

                <textarea className="Bio" cols="35" rows="6" placeholder="Add a Bio"></textarea>
                <form action="detail">
                    <input type="text" placeholder="company" />
                    <input type="text" placeholder="location" />
                    <input type="text" placeholder="website" />
                    <input type="text" placeholder="twitter username" />
                </form>
            </div>
            <div className="content__button">
                <input type="button" value="Save" className="content__button--save" onClick={this.updateMode} />
                <input type="button" value="Cancel" className="content__button--cancel" onClick={this.editMode} />
            </div>
        </>
    }

    renderDefaultView = () => {
        return <div className="content">
            <div className="content__image">
                <img src="avatar.png" alt="image" />
            </div>
            <p>
                Username
            </p>
            <div className="content__edit-btn">
                <input type="button" value="Edit profile" onClick={this.editMode} />
            </div>
        </div>

    }


    render() {
        return (
            this.state.isInEditMode ? this.renderEditView() : this.renderDefaultView()
        )
    }
}
