describe('CameraPage', () => {
    beforeAll(async () => {
      await device.launchApp();
    });
  
    beforeEach(async () => {
      await device.reloadReactNative();
    });
  
    it('should display camera and take a photo', async () => {
      // Assume navigation to CameraPage
      await element(by.id('camera-page')).tap();
  
      // Check for camera permission
      await expect(element(by.id('camera-view'))).toBeVisible();
  
      // Toggle flash
      await element(by.id('flash-button')).tap();
      await expect(element(by.id('flash-icon'))).toHaveProp('source', flashOnIcon);
  
      // Take a photo
      await element(by.id('shutter-button')).tap();
      await waitFor(element(by.id('photo-preview')))
        .toBeVisible()
        .withTimeout(5000);
  
      // Continue to the next step
      await element(by.id('continue-button')).tap();
      await expect(element(by.id('result-page'))).toBeVisible();
    });
  
    it('should handle back button', async () => {
      await element(by.id('camera-page')).tap();
      await element(by.id('back-button')).tap();
      await expect(element(by.id('previous-page'))).toBeVisible();
    });
  
    it('should handle retake photo', async () => {
      await element(by.id('camera-page')).tap();
  
      // Take a photo
      await element(by.id('shutter-button')).tap();
      await waitFor(element(by.id('photo-preview')))
        .toBeVisible()
        .withTimeout(5000);
  
      // Retake photo
      await element(by.id('retake-button')).tap();
      await expect(element(by.id('camera-view'))).toBeVisible();
    });
  });