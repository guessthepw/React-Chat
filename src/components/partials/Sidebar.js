import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import Icon from '@material-ui/core/Icon';

class Sidebar extends Component {
  state = {
    search: '',
  };

  search = () => {
    this.props.socket.send(
      JSON.stringify({
        type: 'SEARCH',
        data: this.state.search,
      })
    );
  };
  render() {
    return (
      <div className="sidebar">
        <div className="search">
          <input
            type="form-control"
            placeholder="Search..."
            value={this.state.search}
            onChange={(e) => {
              this.setState({ search: e.target.value });
            }}
          />
          <button className="btn btn-primary" onClick={(e) => this.search()}>
            Search
          </button>
        </div>
        {this.state.search ? (
          <ul className="thread-list">
            <label>Search Results</label>
            {this.props.users &&
              this.props.users.map((usr, ui) => {
                return (
                  <li key={ui}>
                    <Link to="/thread">
                      <Icon>person_pin</Icon>
                      <h5>{usr.name}</h5>
                      <p>{usr.email}</p>
                    </Link>
                  </li>
                );
              })}
          </ul>
        ) : (
          <ul className="thread-list">
            <label>Messages</label>
            <li>
              <Link to="/thread">
                <Icon>person_pin</Icon>
                <h5>Name</h5>
                <p>This is the last image</p>
              </Link>
            </li>
            <li>
              <Link to="/thread">
                <Icon>person_pin</Icon>
                <h5>Name</h5>
                <p>This is the last image</p>
              </Link>
            </li>
            <li>
              <Link to="/thread">
                <Icon>person_pin</Icon>
                <h5>Name</h5>
                <p>This is the last image</p>
              </Link>
            </li>
          </ul>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  ...state.auth,
  ...state.chat,
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Sidebar));
