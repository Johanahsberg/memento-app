import React from 'react'

const Card = ({image, onClick, selected}) => {
  return (
    <div className='card'>
        <div className={selected && 'selected'}>
            <img alt="" src={image} className="card-face"/>
            <img alt="" className='card-back' src={'/assets/fireship.png'}/>
        </div>
    </div>
  )
}

export default Card