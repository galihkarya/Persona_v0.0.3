import React from 'react';
import {render, fireEvent, act} from '@testing-library/react-native';
import HomePage from '../src/pages/HomePage'; 

jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');

describe('HomePage', () => {
  const navigationMock = {
    navigate: jest.fn(),
    goBack: jest.fn(),
    reset: jest.fn(),
  };

  it('renders correctly', () => {
    const {getByText} = render(<HomePage navigation={navigationMock} />);
    expect(getByText('Log in')).toBeTruthy();
    expect(getByText('Apa itu Palmistry?')).toBeTruthy();
    expect(getByText('Macam-macam Garis Tangan')).toBeTruthy();
    expect(
      getByText('Gaya belajar yang cocok sesuai kepribadian anak!'),
    ).toBeTruthy();
  });

  it('opens and closes modal correctly', () => {
    const {getByText, queryByText, getByTestId} = render(
      <HomePage navigation={navigationMock} />,
    );

    // Trigger modal open
    fireEvent.press(getByText('Apa itu Palmistry?'));
    expect(getByText('Menurut kamus besar bahasa Indonesia Palmistry merupakan kata benda yang berarti kepandaian meramal berdasarkan rajah/garis tangan.')).toBeTruthy();

    // Close modal
    fireEvent.press(
      getByTestId('closeButton',),);
      expect(
      queryByText(
        'Menurut kamus besar bahasa Indonesia Palmistry merupakan kata benda yang berarti kepandaian meramal berdasarkan rajah/garis tangan.',
      ),
    ).toBeFalsy();
  });

  it('navigates to other screens correctly', () => {
    const {getByText} = render(<HomePage navigation={navigationMock} />);

    fireEvent.press(getByText('Log in'));
    expect(navigationMock.navigate).toHaveBeenCalledWith('LoginPage');

    fireEvent.press(getByText('Mulai Prediksi'));
    expect(navigationMock.navigate).toHaveBeenCalledWith('AddNamePage');
  });

  it('handles theme switching correctly', async () => {
    const { getByTestId, rerender } = render(<HomePage navigation={navigationMock} theme="light" />);

    expect(getByTestId('theme-container').props.style).toContainEqual({backgroundColor: '#f0f0f0'});

    await act(async () => {
        rerender(<HomePage navigation={navigationMock} theme="dark" />);
        expect(getByTestId('theme-container').props.style).toContainEqual({backgroundColor: '#2d2d2d'});
    });
});

});
