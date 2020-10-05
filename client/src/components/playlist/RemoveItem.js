import React, { Component } from 'react';
import { connect } from 'react-redux';

import { removeElement, getUserGeneratedPlaylist } from '../../actions';

class RemoveItem extends Component {
  state = { btnClick: false, removendo: false };
  handleRemoveClick = (e) => {
    e.stopPropagation();
    this.setState({
      btnClick: !this.state.btnClick,
    });
  };

  removeElementonClick = async (e) => {
    const { removeElement, elemId, getUserGeneratedPlaylist } = this.props;
    e.stopPropagation();

    this.setState({ removendo: true });

    await removeElement(elemId);

    this.setState(
      {
        btnClick: !this.state.btnClick,
        removendo: false,
      },
      () => getUserGeneratedPlaylist()
    );
  };

  renderText = () => {
    if (this.state.removendo) {
      return <i className='ui spinner loading icon' />;
    }

    if (!this.state.btnClick) {
      return (
        <div className='remove-text' onClick={this.handleRemoveClick}>
          Remover
        </div>
      );
    }
    return (
      <div>
        <div className='remove-cancel-text' onClick={this.removeElementonClick}>
          Remover
        </div>
        <div className='remove-cancel-text' onClick={this.handleRemoveClick}>
          Cancelar
        </div>
      </div>
    );
  };

  render() {
    return <div className='remove-btn-container'>{this.renderText()}</div>;
  }
}

const mapStateToProps = (state) => {
  return { userPlaylist: state.auth.generatedMusics };
};

export default connect(mapStateToProps, {
  removeElement,
  getUserGeneratedPlaylist,
})(RemoveItem);
