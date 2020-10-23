'use strict'
import React from 'react'

const Actions = ({ handleClick }) => (
  <div className='actions'>
    <button onClick={handleClick} id='repos'>Ver repositórios</button>
    <button onClick={handleClick} id='starred'>Ver favoritos</button>
  </div>
)

Actions.PropTypes = {
  handleClick: React.PropTypes.func.isRequired
}
export default Actions
