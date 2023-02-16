import './styles.css';
import axios from 'axios';
import {React, Component} from 'react';


// GitHub usernames: gaearon, sophiebits, sebmarkbage, bvaughn

const testData = [
  {
    "name": "mojombo",
    "avatar_url": "https://avatars.githubusercontent.com/u/1?v=4",
    "company": "Facebook"
  },
  {
    "name": "pjhyett",
    "avatar_url": "https://avatars.githubusercontent.com/u/3?v=4",
    "company": "Facebook"
  },
  {
    "name": "wycats",
    "avatar_url": "https://avatars.githubusercontent.com/u/4?v=4",
    "company": "Facebook"
  }
];

class UsernameInputForm extends Component {
  state = { userName: '' };

  handleSubmit = async (event) => {
    const resp = await axios.get(`https://api.github.com/users/${this.state.userName}`);
    const data = resp;
    this.props.onSubmit(data);
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input placeholder='Github username...' required
          value={this.state.userName}
          onChange={event => this.setState({ userName: event.target.value })}>
        </input>
        <button>Add card</button>
      </form>

    );
  }
}


class Card extends Component {
  render() {
    const profile = this.props;
    return (<div className='github.profile'>
      <img alt='' src={profile.avatar_url} width="62" height="62" />
      <div className='info'>
        <div className='name'>{profile.name}</div>
        <div className='company'>{profile.company}</div>
      </div>
    </div>
    )
  }
}

const DiplayUserList = (props) => (
  <div>
    {props.profiles.map(profile => <Card key={profile.id} {...profile} />)}
  </div>
);

export default class GitHubForm extends Component {

  state = {
    profiles: testData,
  };
  addNewProfile = (profileData) => {
    this.setState(prevState => ({
      profiles: [...prevState.profiles, profileData],
    }))
  }

  render() {
    return (<>
      <div className="header">GitHubForm</div>
      <UsernameInputForm />
      <DiplayUserList profiles={this.state.profiles} />
    </>
    );
  }
}

