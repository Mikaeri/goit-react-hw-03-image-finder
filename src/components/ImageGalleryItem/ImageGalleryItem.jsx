import React from 'react';
import { GalleryItem, GalleryItemImg, Overlay } from './ImageGalleryItemStyles';

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
        <GalleryItem>
          <GalleryItemImg
            src={webformatURL}
            alt={tags}
            onClick={this.toggleModal}
          />
        </GalleryItem>
        {isModalOpen && (
          <Overlay
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
