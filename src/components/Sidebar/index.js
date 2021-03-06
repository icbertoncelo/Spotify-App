import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Creators as PlaylistsActions } from '../../store/ducks/playlists';

import { Container, NewPlaylist, Nav } from './styles';
import Loading from '../Loading';
import AddPlaylistIcon from '../../assets/images/add_playlist.svg';

class Sidebar extends Component {
  static propTypes = {
    getPlaylisRequest: PropTypes.func.isRequired,
    playlists: PropTypes.shape({
      data: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.number,
          title: PropTypes.string,
        }),
      ),
      loading: PropTypes.bool,
    }).isRequired,
  };

  componentDidMount() {
    const { getPlaylisRequest } = this.props;
    getPlaylisRequest();
  }

  render() {
    const { playlists } = this.props;

    return (
      <Container>
        <div>
          <Nav main>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <a href=" ">Browse</a>
            </li>
            <li>
              <a href=" ">Radio</a>
            </li>
          </Nav>
          <Nav>
            <li>
              <span>YOUR LIBRARY</span>
            </li>
            <li>
              <a href=" ">Made for you</a>
            </li>
            <li>
              <a href=" ">Recently played</a>
            </li>
            <li>
              <a href=" ">Songs</a>
            </li>
            <li>
              <a href=" ">Albums</a>
            </li>
            <li>
              <a href=" ">Artirts</a>
            </li>
            <li>
              <a href=" ">Stations</a>
            </li>
            <li>
              <a href=" ">Local Files</a>
            </li>
            <li>
              <a href=" ">Videos</a>
            </li>
            <li>
              <a href=" ">Podcasts</a>
            </li>
          </Nav>
          <Nav>
            <li>
              <span>PLAYLISTS</span>
              {playlists.loading && <Loading />}
            </li>
            {playlists.data.map(playlist => (
              <li key={playlist.id}>
                <Link to={`/playlists/${playlist.id}`}>{playlist.title}</Link>
              </li>
            ))}
          </Nav>
        </div>
        <NewPlaylist>
          <img src={AddPlaylistIcon} alt="Add a new playlist" />
          New playlist
        </NewPlaylist>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  playlists: state.playlists,
});

const mapDispatchToProps = dispatch => bindActionCreators(PlaylistsActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Sidebar);
