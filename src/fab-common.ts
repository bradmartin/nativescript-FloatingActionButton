/**************************************************************************************
 * Made for the {N} community by Brad Martin @BradWayneMartin
 * https://twitter.com/BradWayneMartin
 * https://github.com/bradmartin
 * Pull requests are welcome. Enjoy!
 *************************************************************************************/
import { Color } from '@nativescript/core/color';
import { ImageSource } from '@nativescript/core/image-source';
import { Property, View } from '@nativescript/core/ui/core/view';
import { PanGestureEventData } from '@nativescript/core/ui/gestures';
import { Font, FontStyle, FontWeight } from '@nativescript/core/ui/styling/font';
import * as definitions from './index';

export class FloatingActionButtonBase extends View implements definitions.Fab {
  private swipeEventAttached: boolean = false;
  public hideOnSwipeOfView: string;
  public swipeAnimation:
    | 'slideUp'
    | 'slideDown'
    | 'slideRight'
    | 'slideLeft'
    | 'scale';
  public hideAnimationDuration: number;
  public rippleColor: Color;
  public icon: string;

  onLoaded() {
    super.onLoaded();

    if (this.swipeEventAttached === false) {
      const fab = this;
      if (this.hideOnSwipeOfView) {
        const parent = this.parent || this.parentNode;
        const swipeItem = parent.getViewById(this.hideOnSwipeOfView);

        // check if we have the UI to attach animation to
        if (!swipeItem) {
          return;
        }

        const animationType = this.swipeAnimation
          ? this.swipeAnimation
          : 'slideDown';

        if (swipeItem !== undefined) {
          const duration = this.hideAnimationDuration
            ? this.hideAnimationDuration
            : this._getDurationDefault(animationType);

          swipeItem.on('pan', (args: PanGestureEventData) => {
            // Swipe up
            if (args.deltaY < -10) {
              switch (animationType) {
                case 'slideUp':
                  try {
                    fab.animate({
                      target: fab,
                      translate: {
                        x: 0,
                        y: -200
                      },
                      opacity: 0,
                      duration: 400
                    });
                  } catch (error) {
                    console.log(error);
                  }
                  break;
                case 'slideDown':
                  fab.animate({
                    target: fab,
                    translate: {
                      x: 0,
                      y: 200
                    },
                    opacity: 0,
                    duration: duration
                  });
                  break;
                case 'slideRight':
                  fab.animate({
                    target: fab,
                    translate: {
                      x: 200,
                      y: 0
                    },
                    opacity: 0,
                    duration: duration
                  });
                  break;
                case 'slideLeft':
                  fab.animate({
                    target: fab,
                    translate: {
                      x: -200,
                      y: 0
                    },
                    opacity: 0,
                    duration: duration
                  });
                  break;
                case 'scale':
                  fab.animate({
                    target: fab,
                    scale: {
                      x: 0,
                      y: 0
                    },
                    duration: duration
                  });
                  break;
              }
            } else if (args.deltaY > 0) {
              // Swipe Down
              switch (animationType) {
                case 'slideUp':
                  fab.animate({
                    target: fab,
                    translate: {
                      x: 0,
                      y: 0
                    },
                    opacity: 1,
                    duration: duration
                  });
                  break;
                case 'slideDown':
                  fab.animate({
                    target: fab,
                    translate: {
                      x: 0,
                      y: 0
                    },
                    opacity: 1,
                    duration: duration
                  });
                  break;
                case 'slideRight':
                  fab.animate({
                    target: fab,
                    translate: {
                      x: 0,
                      y: 0
                    },
                    opacity: 1,
                    duration: duration
                  });
                  break;
                case 'slideLeft':
                  fab.animate({
                    target: fab,
                    translate: {
                      x: 0,
                      y: 0
                    },
                    opacity: 1,
                    duration: duration
                  });
                  break;
                case 'scale':
                  fab.animate({
                    target: fab,
                    scale: {
                      x: 1,
                      y: 1
                    },
                    duration: duration
                  });
                  break;
              }
            }
          });

          this.swipeEventAttached = true;
        }
      }
    }
  }

  private _getDurationDefault(animationType: string) {
    switch (animationType) {
      case 'scale':
        return 200;
      default:
        return 400;
    }
  }

  protected getImageFromText(value: string): ImageSource {
    const font = new Font(
      this.style.fontFamily || 'normal',
      this.style.fontSize || 16,
      this.style.fontStyle || FontStyle.NORMAL,
      this.style.fontWeight || FontWeight.LIGHT
    );
    const color = this.style.color || new Color('#FFFFFF');
    return ImageSource.fromFontIconCodeSync(value, font, color);
  }
}

export const iconProperty = new Property<FloatingActionButtonBase, string>({
  name: 'icon',
  affectsLayout: true
});
iconProperty.register(FloatingActionButtonBase);

export const textProperty = new Property<FloatingActionButtonBase, string>({
  name: 'text',
  affectsLayout: true
});
textProperty.register(FloatingActionButtonBase);

export const rippleColorProperty = new Property<FloatingActionButtonBase, Color>({
  name: 'rippleColor',
  equalityComparer: Color.equals,
  valueConverter: v => new Color(v)
});
rippleColorProperty.register(FloatingActionButtonBase);

export type AndroidScaleType = "center" | "centerCrop" | "centerInside" | "fitCenter" | "fitEnd" | "fitStart" | "fitXY" | "matrix";
export const androidScaleTypeProperty = new Property<FloatingActionButtonBase, AndroidScaleType>({
  name: 'androidScaleType',
  defaultValue: 'center',
  affectsLayout: true
});
androidScaleTypeProperty.register(FloatingActionButtonBase);
