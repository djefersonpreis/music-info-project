import React from 'react'

export default function CardModel(props) {
    return (
        <div className="col mt-3 mb-3">
            <div className="card">
                <img src={props.image} className="card-img-top" alt="Card Image" />
                <div className="card-body">
                    <h5 className="card-title">{props.title} - {props.date}</h5>
                </div>
            </div>
        </div>
    )
}
