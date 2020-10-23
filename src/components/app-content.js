'use strict'

import React from 'react'
import Search from './search'
import UserInfo from './user-info.js'
import Actions from './actions.js'
import Repos from './repos.js'

const AppContent = ({ userinfo, repos, starred, handleSearch, handleClick, isFetching }) => (
  <div className='app'>
    <Search
      handleSearch={handleSearch}
      isDisabled={isFetching}
    />
    {isFetching && <div>Carregando ... </div>}
    {!!userinfo && <UserInfo userinfo={userinfo} />}
    {!!userinfo && <Actions handleClick={handleClick} />}
    {!!repos.length &&
      <Repos
        className='repos'
        title='Repositórios: '
        repos={repos}
      />}

    {!!starred.length &&
      <Repos
        className='starred'
        title='Favoritos: '
        repos={starred}
      />}
  </div>
)
AppContent.propTypes = {
  userinfo: React.PropTypes.object.isRequired,
  repos: React.PropTypes.array.isRequired,
  starred: React.PropTypes.array.isRequired,
  isFetching: React.PropTypes.bool.isRequired,
  handleSearch: React.PropTypes.func.isRequired,
  handleClick: React.PropTypes.func.isRequired
}

export default AppContent
