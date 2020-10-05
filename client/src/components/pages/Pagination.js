import React, { Component } from 'react';
import ReactPaginate from 'react-paginate';
import Playlist from '../playlist/Playlist';

class Pagination extends Component {
  state = {
    startSlice: 0,
    limitSlice: 10,
    pages: 1,
    newPlaylist: [],
  };

  componentDidMount() {
    this.updatePage(0);
  }

  componentDidUpdate(prevProps) {
    const { userPlaylist } = this.props;

    if (userPlaylist !== prevProps.userPlaylist) {
      this.updatePage(0);
    }
  }

  updatePage = (current) => {
    const { userPlaylist } = this.props;
    this.setState(
      {
        pages: Math.ceil(userPlaylist.length / 10),
        startSlice: current * 10,
        limitSlice: (current + 1) * 10,
      },
      () => {
        this.setState({
          newPlaylist: userPlaylist.slice(
            this.state.startSlice,
            this.state.limitSlice
          ),
        });
      }
    );
  };

  onPageChange = (current) => {
    this.updatePage(current.selected);
  };

  render() {
    return (
      <div>
        <Playlist
          playlistItem={this.state.newPlaylist}
          itemId={this.props.itemId}
          getElementInfo={this.props.getElementInfo}
          removeBtn={this.props.removeBtn}
        />
        <ReactPaginate
          pageCount={this.state.pages}
          pageRangeDisplayed={10}
          marginPagesDisplayed={10}
          onPageChange={this.onPageChange}
          previousClassName='previous'
          nextClassName='next'
          pageClassName='page'
          pageLinkClassName='page-link'
          nextLinkClassName='page-link'
          previousLinkClassName='page-link'
          activeLinkClassName='page-link-active'
          containerClassName='pagination-container'
        />
      </div>
    );
  }
}

export default Pagination;
