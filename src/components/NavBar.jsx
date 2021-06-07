import React from 'react'

export default function NavBar() {
    return (
        <div className="Nav">
            <input type="text" value="Search or jump to" />
            <a>Pull requests</a>
            <a>Issues</a>
            <a>Marketplace</a>
            <a>Explore</a>
        </div>
    )
}
