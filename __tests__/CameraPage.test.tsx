import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import CameraPage from '../src/pages/CameraPage'; 
import { ToastAndroid } from 'react-native';

jest.mock('react-native/Libraries/Components/ToastAndroid/ToastAndroid', () => ({
  show: jest.fn(),
}));

jest.mock('react-native-vision-camera', () => {
  const React = require('react');
  return {
    Camera: React.forwardRef(({props, ref}:any) => <div ref={ref} {...props} />),
    useCameraDevice: jest.fn(() => ({ devices: [] })),
    useCameraFormat: jest.fn(),
    useCameraPermission: jest.fn(),
  };
});

jest.mock('@react-native-camera-roll/camera-roll', () => ({
  CameraRoll: {
    saveAsset: jest.fn().mockResolvedValue({
      node: {
        image: { uri: 'mockUri', filename: 'mockFilename' },
        type: 'image/jpeg',
      },
    }),
  },
}));

jest.mock('../src/API/UserApi', () => ({
  post: jest.fn(() => Promise.resolve({ data: { heart_line: 'mockHeartLine', life_line: 'mockLifeLine', head_line: 'mockHeadLine' } })),
}));

describe('CameraPage', () => {
  const mockNavigation = { navigate: jest.fn(), goBack: jest.fn() };
  const mockRoute = { params: { name: 'John', gender: 'Male', student_name: 'Doe', group_id: '1234' } };

  beforeEach(() => {
    jest.clearAllMocks();
    require('react-native-vision-camera').useCameraPermission.mockReturnValue({
      hasPermission: false,
      requestPermission: jest.fn(),
    });
  });
 
  it('renders correctly', () => {
    const { getByText } = render(<CameraPage navigation={mockNavigation} route={mockRoute} />);
    expect(getByText('Posisikan Tangan Kamu')).toBeTruthy();
  });

  it('calls requestPermission if not granted', async () => {
    const mockRequestPermission = jest.fn();
    require('react-native-vision-camera').useCameraPermission.mockReturnValue({
      hasPermission: false,
      requestPermission: mockRequestPermission,
    });

    render(<CameraPage navigation={mockNavigation} route={mockRoute} />);

    expect(mockRequestPermission).toHaveBeenCalled();
  });

  it('toggles flash mode on button press', () => {
    require('react-native-vision-camera').useCameraPermission.mockReturnValue({
      hasPermission: true,
      requestPermission: jest.fn(),
    });

    const { getByTestId } = render(<CameraPage navigation={mockNavigation} route={mockRoute} />);

    const flashButton = getByTestId('flash-button');
    fireEvent.press(flashButton);

    const flashIcon = getByTestId('flash-icon');
    expect(flashIcon.props.source).toBe('test-file-stub');

    fireEvent.press(flashButton);
    expect(flashIcon.props.source).toBe('test-file-stub');
  });

  it('calls onTakePicturePressed when shutter button is pressed', async () => {
    require('react-native-vision-camera').useCameraPermission.mockReturnValue({
      hasPermission: true,
      requestPermission: jest.fn(),
    });

    const { getByTestId } = render(<CameraPage navigation={mockNavigation} route={mockRoute} />);
    const shutterButton = getByTestId('shutter-button');

    fireEvent.press(shutterButton);
    await waitFor(() => expect(require('@react-native-camera-roll/camera-roll').CameraRoll.saveAsset).toHaveBeenCalled());
  });

  it('calls buttonHandler when "lanjut" button is pressed', async () => {
    require('react-native-vision-camera').useCameraPermission.mockReturnValue({
      hasPermission: true,
      requestPermission: jest.fn(),
    });

    const { getByText, getByTestId } = render(<CameraPage navigation={mockNavigation} route={mockRoute} />);
    
    // Trigger the shutter button first
    const shutterButton = getByTestId('shutter-button');
    fireEvent.press(shutterButton);
    await waitFor(() => expect(require('@react-native-camera-roll/camera-roll').CameraRoll.saveAsset).toHaveBeenCalled());

    // Wait for the "lanjut" button to appear
    const lanjutButton = await waitFor(() => getByText('lanjut'));
    expect(lanjutButton).toBeTruthy();

    // Now press the "lanjut" button
    fireEvent.press(lanjutButton);
    await waitFor(() => expect(require('../src/API/UserApi').post).toHaveBeenCalled());
  });

  it('navigates to ResultPage on successful API call', async () => {
    require('../src/API/UserApi').post.mockResolvedValueOnce({ data: { heart_line: 'test', life_line: 'test', head_line: 'test' } });
    require('react-native-vision-camera').useCameraPermission.mockReturnValue({
      hasPermission: true,
      requestPermission: jest.fn(),
    });

    const { getByText, getByTestId } = render(<CameraPage navigation={mockNavigation} route={mockRoute} />);

    const shutterButton = getByTestId('shutter-button');
    fireEvent.press(shutterButton);
    await waitFor(() => expect(require('@react-native-camera-roll/camera-roll').CameraRoll.saveAsset).toHaveBeenCalled());

    const lanjutButton = await waitFor(() => getByText('lanjut'));
    fireEvent.press(lanjutButton);

    await waitFor(() => expect(mockNavigation.navigate).toHaveBeenCalledWith('ResultPage', expect.anything()));
  });

  it('shows error toast on API call failure', async () => {
    require('../src/API/UserApi').post.mockRejectedValueOnce({ response: { data: { detail: 'Error message' } } });
    require('react-native-vision-camera').useCameraPermission.mockReturnValue({
      hasPermission: true,
      requestPermission: jest.fn(),
    });

    const { getByText, getByTestId } = render(<CameraPage navigation={mockNavigation} route={mockRoute} />);

    const shutterButton = getByTestId('shutter-button');
    fireEvent.press(shutterButton);
    await waitFor(() => expect(require('@react-native-camera-roll/camera-roll').CameraRoll.saveAsset).toHaveBeenCalled());

    const lanjutButton = await waitFor(() => getByText('lanjut'));
    fireEvent.press(lanjutButton);

    await waitFor(() => expect(ToastAndroid.show).toHaveBeenCalledWith('Error message', 5000));
  });
});