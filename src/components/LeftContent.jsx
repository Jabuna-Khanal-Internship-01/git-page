import React from 'react'

export default function LeftContent() {
    return (
        <div className="content">
            <div className="content__image">
                <img src="avatar.png" alt="image" />
            </div>
            <div className="content__userDetail">
                <p>UserName</p>
                <textarea className="Bio" cols="35" rows="6" value="Add a Bio"></textarea>
                <form action="detail">
                    <input type="text" value="Company" />
                    <input type="text" value="Location" />
                    <input type="text" value="Website" />
                    <input type="text" value="Twitter username" />
                </form>
            </div>
            <div className="content__button">
                <input type="button" value="Save" className="content__button--save"/>
                <input type="button" value="Cancel"className="content__button--cancel"/>
            </div>
        </div>
    )
}
