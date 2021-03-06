import * as path from 'path';
import {browser, by, element, ExpectedConditions as EC} from 'protractor';

import * as blueharvest from 'blue-harvest';

const GOLDEN_IMAGES = [1,2,3,4].map((i) => {
  return path.join(__dirname, `goldens/tractor_control${i}.png`);
});

describe('Tractor beam control page', () => {
  beforeEach(async() => {
    await browser.get('/tractor');
    let width = 1280;
    let height = 900;
    await browser.driver.manage().window().setSize(width, height);
  });

  it('display the right images', async() => {
    await blueharvest.addMask(element(by.css('img.lever')), 'gray');

    console.log(GOLDEN_IMAGES)
    for(let golden of GOLDEN_IMAGES) {
      console.log('Checking golden ', golden);

      // Get the screenshot and compare it to the golden.
      let data = await browser.takeScreenshot();
      let result = await blueharvest.compareScreenshot(data, golden);
      expect(result).toBeTruthy();

      // Increment the image.
      await element(by.buttonText('next frame')).click();
      await browser.sleep(2000);
    }
  });
});
