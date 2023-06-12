import React from 'react';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import {
  FormBtnLabel,
  SearchForm,
  SearchFormBtn,
  SearchFormInput,
  SearchbarContainer,
} from './SearchbarStyles';

export class Searchbar extends React.Component {
  state = {
    inputValue: '',
  };

  handleChange = event => {
    this.setState({
      inputValue: event.currentTarget.value.toLowerCase(),
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    if (this.state.inputValue.trim() === '') {
      return toast.warn('Sorry, there are no search query. Please try again.', {
        theme: 'colored',
      });
    }
    this.props.onSubmit(this.state.inputValue);
    this.setState({ inputValue: '' });
  };
  render() {
    const { inputValue } = this.state;
    return (
      <SearchbarContainer>
        <SearchForm onSubmit={this.handleSubmit}>
          <SearchFormBtn type="submit">
            <FormBtnLabel>Search</FormBtnLabel>
          </SearchFormBtn>

          <SearchFormInput
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={inputValue}
            onChange={this.handleChange}
          />
        </SearchForm>
      </SearchbarContainer>
    );
  }
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
