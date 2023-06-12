import React from 'react';
import { Searchbar } from '../Searchbar/Searchbar';
import { getData } from 'services/getData';
import { ToastContainer, toast } from 'react-toastify';

import { ImageGallery } from '../ImageGallery/ImageGallery';
import { Loader } from '../Loader/Loader';
import { Button } from '../Button/Button';

import { gettingProperties } from 'utilites/gettingProperties';
import { GlobalStyles } from '../GlobalStyles';
import { AppContainer } from './AppStyles';
import 'react-toastify/dist/ReactToastify.css';

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

  componentDidUpdate(_, prevState) {
    if (
      prevState.initialValue !== this.state.initialValue ||
      prevState.currentPage !== this.state.currentPage
    ) {
      this.getImages();
    }
  }

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
          prevState.images.length + normalizedHits.length >= data.total,
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
      <AppContainer>
        <GlobalStyles />
        <Searchbar onSubmit={this.handleSubmit} />
        <ToastContainer autoClose={2500} />
        {error && <span>Error: {error}</span>}
        <ImageGallery images={images} />
        {isLoading && <Loader />}
        {!isLoading && images.length > 0 && !isLastPage && (
          <Button onClick={this.loadMore} />
        )}
      </AppContainer>
    );
  }
}
