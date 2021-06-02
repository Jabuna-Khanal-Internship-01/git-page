import React from 'react'

export default function RightContent() {
    return (
        <>
            <div className="content-right">
                <a href="">Overview</a>
                <a href="">Repositories</a>
                <a href="">Projects</a>
                <a href="">Packages</a>
            </div>
            <div className="searchBar">
                <input type="text" value="Find a repo" />
                <select className="list">
                    <option value="About">All</option>
                    <option value="About">Public</option>
                    <option value="Completed">Private</option>
                </select>
                <select className="list">
                    <option value="About">All</option>
                    <option value="Completed">html</option>
                </select>
            </div>
        </>
    )
}
