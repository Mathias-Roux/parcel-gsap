import "splitting/dist/splitting.css";
import "splitting/dist/splitting-cells.css";
import Splitting from "splitting";
import { gsap } from 'gsap';

Splitting()


// DOM elements
let DOM = {
	content: {
		home: {
			section: document.querySelector('.content__item--home'),
			get chars() {
				return this.section.querySelectorAll('.content__paragraph .word > .char, .whitespace')
			},
			isVisible: true
		},
		about: {
			section: document.querySelector('.content__item--about'),
			get chars() {
				return this.section.querySelectorAll('.content__paragraph .word > .char, .whitespace')
			},
			get picture() {
				return this.section.querySelector('.content__figure')
			},
			isVisible: false
		}
	},
	links: {
		about: {
			anchor: document.querySelector('a.frame__about'),
			get stateElement() {
				return this.anchor.children
			}
		}
	}
}


//Gsap timeline
const timelineSettings = {
	staggerValue: 0.014,
	charsDuration: 0.5
}

const timeline = gsap.timeline({paused: true})
    .addLabel('start')
    // Stagger the animation of the home section chars
    .staggerTo( DOM.content.home.chars, timelineSettings.charsDuration, {
        ease: 'Power3.easeIn',
        y: '-100%',
        opacity: 0
    }, timelineSettings.staggerValue, 'start')
    // Here we do the switch
    // We need to toggle the current class for the content sections
    .addLabel('switchtime')
    .add( () => {
        DOM.content.home.section.classList.toggle('content__item--current');
        DOM.content.about.section.classList.toggle('content__item--current');
    })
    // Change the body's background color
    .to(document.body, {
        duration: 0.8,
        ease: 'Power1.easeInOut',
        backgroundColor: '#c3b996'
    }, 'switchtime-=timelineSettings.charsDuration/4')
    // Start values for the about section elements that will animate in
    .set(DOM.content.about.chars, {
        y: '100%'
    }, 'switchtime')
    .set(DOM.content.about.picture, {
        y: '40%',
        rotation: -4,
        opacity: 0
    }, 'switchtime')
    // Stagger the animation of the about section chars
    .staggerTo( DOM.content.about.chars, timelineSettings.charsDuration, {
        ease: 'Power3.easeOut',
        y: '0%'
    }, timelineSettings.staggerValue, 'switchtime')
    // Finally, animate the picture in
    .to( DOM.content.about.picture, 0.8, {
        ease: 'Power3.easeOut',
        y: '0%',
        opacity: 1,
        rotation: 0
    }, 'switchtime+=0.6');


//Clicking on about/close link toggle content area, by playing or reversing timeline
//We have to switch current state on about/close link

const switchContent = () => {
	DOM.links.about.stateElement[0].classList[DOM.content.about.isVisible ? 'add' : 'remove']('frame__about-item--current')
	DOM.links.about.stateElement[1].classList[DOM.content.about.isVisible ? 'remove' : 'add']('frame__about-item--current')
	timeline[DOM.content.about.isVisible ? 'reverse' : 'play']()
	DOM.content.about.isVisible = !DOM.content.about.isVisible
	DOM.content.home.isVisible = !DOM.content.about.isVisible
}


DOM.links.about.anchor.addEventListener('click', () => switchContent())



















