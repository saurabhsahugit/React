import { Component } from 'react/cjs/react.production.min'
import './styles.css';
import axios from 'axios';

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

  handleSubmit = async (e) => {
    console.log(this.state.userName);
    const resp = await axios.get('https://api.github.com/users');
    const data = await resp.json()
    console.log(data);
  }
  
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input placeholder='Github username...' required
          onChange={(e) => this.setState({ userName: e.target.value })}>
        </input>
        <button>Add card</button>
      </form>

    )
  }
}
// /${this.state.userName}`


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

// const fetchData = async () => {
//   const resp = await fetch('https://api.github.com/users')
//   const data = await resp.json()
//   console.log(data);
// }
// const DiplayUserList = (props) => (
//   <div>
//     {props.profiles.map(profile => <Card key={profile.id}{...profile} />)}
//   </div>
// );

const DiplayUserList = (props) => (
	<div>
  	{props.profiles.map(profile => <Card key={profile.id} {...profile}/>)}
	</div>
);

export default class GitHubForm extends Component {

  state = {
    profiles: testData,
  };

  render() {
    return (<>
      <div className="header">GitHubForm</div>
      <UsernameInputForm />
      <DiplayUserList profiles={this.state.profiles} />
    </>
    );
  }
}

