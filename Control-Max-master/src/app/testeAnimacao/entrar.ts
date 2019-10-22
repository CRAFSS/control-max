import { Animation } from '@ionic/core';

export function animacaoEntrada(AnimationC: Animation, baseEl: HTMLElement): Promise<Animation> {

    const baseAnimation = new AnimationC();

    const backdropAnimation = new AnimationC();
    backdropAnimation.addElement(baseEl.querySelector('ion-backdrop'));

    const wrapperAnimation = new AnimationC();
    wrapperAnimation.addElement(baseEl.querySelector('.modal-wrapper'));

    wrapperAnimation
        .fromTo('transform', 'scaleX(0.8) scaleY(0.4)', 'translateX(0%) scaleX(1) scaleY(1)')
        .fromTo('opacity', 1, 1);

    backdropAnimation.fromTo('opacity', 0.01, 0.4);

    return Promise.resolve(baseAnimation
        .addElement(baseEl)
        .easing('cubic-bezier(0.36,0.66,0.04,1)')
        .duration(200)
        .beforeAddClass('show-modal')
        .add(backdropAnimation)
        .add(wrapperAnimation));

}

//https://www.joshmorony.com/create-a-custom-modal-page-transition-animation-in-ionic/