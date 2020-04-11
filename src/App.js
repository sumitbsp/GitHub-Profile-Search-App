import React from 'react';
import logo from './logo.svg';
import './App.css';
const axios = require('axios');

const testData = [{
  name: 'sumit',
  imageUrl: 'someurl',
  fullName: 'sumit banerjee'
}]

const Header = () => {
  return <div className="header">
    Github Profile Search
  </div>
}

class InputForm extends React.Component {
  state = { userName: '' }

  handleFormSubmit = async (e) => {
    e.preventDefault();

    const resp = await axios.get(`https://api.github.com/users/${this.state.userName}`);
    console.log(this.state.userName)
    this.props.onsubmit(resp.data)
  }

  render() {
    return <div className="form">
      <form onSubmit={this.handleFormSubmit}>
        <input
          type="text"
          placeholder="Search github user"
          value={this.state.userName}
          onChange={e => this.setState({ userName: e.target.value })}
        />
        <button>Search</button>
      </form>
    </div>
  }
}

const Card = (props) => {
  return (
    <div>
      {props.profile.profiles && <div className="card">
        <div>
          <img className="profile-pic" src={props.profile.profiles.avatar_url} />
        </div>
        <div className="info">
          <p>Name: {props.profile.profiles.name}</p>
          <p>Public Repositories: {props.profile.profiles.public_repos}</p>
          <button><a href={props.profile.profiles.html_url}>Know More</a></button>
        </div>
      </div>}
    </div>
  )
}

const Cardlist = (props) => {
  return <div>
    <Card profile={props} />
  </div>
}

class App extends React.Component {
  state = {
    profile: ''
  }

  addProfile = (data) => {
    this.setState({
      profile: data
    })
    console.log(this.state.profile)
  }

  render() {
    return (
      <div className="container">
        <Header />
        <InputForm onsubmit={this.addProfile} />
        <Cardlist profiles={this.state.profile} />
      </div>
    );
  }
}

export default App;
