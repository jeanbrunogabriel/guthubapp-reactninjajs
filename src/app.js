'use strict'

import ajax from '@fdaciuk/ajax'
import React, { Component } from 'react'
import AppContent from './components/app-content'
import fetch from 'node-fetch'
class App extends Component {
  constructor () {
    super()
    this.state = {
      userinfo: null,
      repos: [],
      starred: [],
      error: null,
      isFetching: false
    }
  }

  getGithubUrl (username, type) {
    const internalType = type ? `/${type}` : ''
    const internalName = username ? `/${username}` : ''
    return `https://api.github.com/users${internalName}${internalType}`
  }

  handleSearch (e) {
    const value = e.target.value
    const keyCode = e.which || e.keyCode
    const ENTER = 13

    if (keyCode === ENTER) {
      this.setState({ isFetching: true })
      ajax().get(this.getGithubUrl(value))
        .then(
          (result) => {
            this.setState({
              userinfo: {
                username: result.name,
                photo: result.avatar_url,
                login: result.login,
                repos: result.public_repos,
                followers: result.followers,
                following: result.following
              },
              starred: [],
              repos: [],
              error: null
            })
          }
        )
        .always(() => this.setState({ isFetching: false }))
        //     .error(
        //       this.setState({
        //              userinfo: null,
        //            starred: [],
        //          repos: []
        //    })
        // )
    }
  }

  handleClick (e) {
    const type = e.target.id
    fetch(this.getGithubUrl(this.state.userinfo.login, type))
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            [type]: result.map((repo) => ({
              name: repo.name,
              link: repo.html_url

            }
            ))
          })
        }
      )
  }

  render () {
    if (this.state.error) {
      return (
        <div>
          <AppContent
            userinfo={this.state.userinfo}
            starred={this.state.starred}
            repos={this.state.repos}
            handleSearch={(e) => this.handleSearch(e)}
          />
          <h1>
            Error: {this.state.error.message}
          </h1>
        </div>)
    }
    return (
      <AppContent
        {...this.state}
        handleSearch={(e) => this.handleSearch(e)}
        handleClick={(e) => this.handleClick(e)}
      />)
  }
}

export default App
