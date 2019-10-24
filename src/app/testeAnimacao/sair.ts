import { Animation } from '@ionic/core';

export function anicacaoSaida(AnimationC: Animation, baseEl: HTMLElement): Promise<Animation> {

    const baseAnimation = new AnimationC();

    const backdropAnimation = new AnimationC();
    backdropAnimation.addElement(baseEl.querySelector('ion-backdrop'));

    const wrapperAnimation = new AnimationC();
    const wrapperEl = baseEl.querySelector('.modal-wrapper');
    wrapperAnimation.addElement(wrapperEl);
    const wrapperElRect = wrapperEl!.getBoundingClientRect();

    wrapperAnimation
      .fromTo('transform', 'scaleX(1) scaleY(1)', 'scaleX(0.7) scaleY(0.3)')
      .fromTo('opacity', 1, 1);

    backdropAnimation.fromTo('opacity', 0.4, 0.0);

    return Promise.resolve(baseAnimation
      .addElement(baseEl)
      .easing('ease-out')
      .duration(200)
      .add(backdropAnimation)
      .add(wrapperAnimation));

}