import React from 'react'
import LeftContent from './LeftContent';
import RightContent from './RightContent';

export default function Container() {
    return (
        <div className="Container">
            <div className="Container__left-wrapper">
                <LeftContent />
            </div>
            <div className="Container__right-wrapper">
                <RightContent />
            </div>
        </div>
    )
}

