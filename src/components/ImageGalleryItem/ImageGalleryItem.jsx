import { Modal } from 'components/Modal/Modal';
import React from 'react';

export class ImageGalleryItem extends React.Component {
  state = {
    isModalOpen: false,
  };

  toggleModal = () => {
    this.setState(({ isModalOpen }) => ({
      isModalOpen: !isModalOpen,
    }));
  };

  render() {
    const { isModalOpen } = this.state;
    const {
      image: { webformatURL, largeImageURL, tags },
    } = this.props;
    return (
      <>
        <li>
          <img src={webformatURL} alt={tags} onClick={this.toggleModal} />
        </li>
        {isModalOpen && (
          <Modal
            isOpen={isModalOpen}
            largeImageURL={largeImageURL}
            tags={tags}
            onClose={this.toggleModal}
          />
        )}
      </>
    );
  }
}
