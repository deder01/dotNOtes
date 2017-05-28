import React from 'react';

UserProfile = ({bio}) => {
  return (
    <div>
      {bio.avatar_url && <li className="list-group-item"> <img src={this.props.bio.avatar_url} className="img-rounded img-responsive"/></li>}
      {bio.name && <li className="list-group-item">Name: {this.props.bio.name}</li>}
      {bio.login && <li className="list-group-item">Username: {this.props.bio.login}</li>}
      {bio.email && <li className="list-group-item">Email: {this.props.bio.email}</li>}
      {bio.location && <li className="list-group-item">Location: {this.props.bio.location}</li>}
      {bio.company && <li className="list-group-item">Company: {this.props.bio.company}</li>}
      {bio.followers >= 0 && <li className="list-group-item">Followers: {this.props.bio.followers}</li>}
      {bio.following >= 0 && <li className="list-group-item">Following: {this.props.bio.following}</li>}
      {bio.blog && <li className="list-group-item">Blog: <a href={this.props.bio.blog}> {this.props.bio.blog}</a></li>}
    </div>
  );
}

UserProfile.propTypes = {
  username: React.PropTypes.string.isRequired,
  bio: React.PropTypes.object.isRequired,
};

export default UserProfile;
