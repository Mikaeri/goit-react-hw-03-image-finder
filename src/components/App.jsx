import React from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { getData } from 'services/getData';
import { ToastContainer, toast } from 'react-toastify';
import { gettingProperties } from '../utilites/gettingProperties';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Loader } from './Loader/Loader';
import { Button } from './Button/Button';
import PropTypes from 'prop-types';
import '../components/styles.css';

export class App extends React.Component {
  abortCtrl;

  state = {
    images: [],
    initialValue: '',
    currentPage: 1,
    error: null,
    isLoading: false,
    isLastPage: false,
  };

  handleSubmit = query => {
    if (this.state.initialValue === query) {
      return;
    }

    this.setState({
      initialValue: query,
      currentPage: 1,
      images: [],
      error: null,
      isLastPage: false,
    });
  };

  getImages = async () => {
    const { initialValue, currentPage } = this.state;

    if (this.abortCtrl) {
      this.abortCtrl.abort();
    }

    this.abortCtrl = new AbortController();

    try {
      this.setState({ isLoading: true });

      const data = await getData(
        initialValue,
        currentPage,
        this.abortCtrl.signal
      );

      if (data.hits.length === 0) {
        return toast.info('Sorry, no images for your query...', {
          position: toast.POSITION.TOP_RIGHT,
        });
      } else if (currentPage === 1) {
        toast.success('Wow! We found some images for you!', {
          position: toast.POSITION.TOP_RIGHT,
        });
      } else {
        toast.success('Wow! We found some more images for you!', {
          position: toast.POSITION.TOP_RIGHT,
        });
      }

      const normalizedHits = gettingProperties(data.hits);

      this.setState(prevState => ({
        images: [...prevState.images, ...normalizedHits],
        isLastPage:
          prevState.images.length + normalizedHits.length >= data.totalHits,
        error: null,
      }));
    } catch (error) {
      this.setState({ error: error.message });
    } finally {
      this.setState({ isLoading: false });
    }
  };

  loadMore = () => {
    this.setState(prevState => ({
      currentPage: prevState.currentPage + 1,
    }));
  };

  render() {
    const { images, isLoading, error, isLastPage } = this.state;
    return (
      <>
        <ToastContainer autoClose={2500} />
        <Searchbar onSubmit={this.handleSubmit} />
        {error && <span>Error: {error}</span>}
        <ImageGallery images={images} />
        {isLoading && <Loader />}
        {!isLoading && images.length > 0 && !isLastPage && (
          <Button onClick={this.loadMore} />
        )}
      </>
    );
  }
}

App.propTypes = {
  images: PropTypes.array,
  isLoading: PropTypes.bool,
  error: PropTypes.string,
  isLastPage: PropTypes.bool,
};
