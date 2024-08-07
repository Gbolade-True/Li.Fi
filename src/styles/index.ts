import classNames from 'classnames';

export enum Alignment {
	center = 'center',
	left = 'left',
	right = 'right'
}

export enum Size {
	small = 'small',
	medium = 'medium',
	large = 'large',
	extralarge = 'extralarge'
}

export enum Variant {
	primary = 'primary',
	secondary = 'secondary',
	desctructionary = 'desctructionary',
	text = 'text'
}

export enum Position {
	left = 'left',
	right = 'right'
}

export enum ScreenSizes {
	xsm = 375,
	sm = 640,
	md = 744,
	lg = 1024,
	xl = 1280,
	xxl = 1440,
	xxxl = 1728,
	xxxxl = 1920
}

export enum ElementEffect {
	HOVER = 'hover:',
	FOCUS = 'focus:'
}

export const getColor = (name: string): string => `${name} dark:${name}-d`;

export const getScrollbar = () =>
	'scrollbar scrollbar-thin scrollbar-thumb-secondary-2 scrollbar-track-transparent overflow-y-scroll dark:scrollbar-thumb-secondary-2-d';

export const getTextColorForBackground = (backgroundVariant: Variant): string => {
	switch (backgroundVariant) {
		case Variant.text: {
			return getColor('text-1');
		}
		case Variant.secondary: {
			return getColor('text-secondary-5');
		}
		case Variant.primary:
		case Variant.desctructionary:
		default: {
			return getColor('text-white');
		}
	}
};

export const getBackgroundColor = (variant: Variant, interactive?: boolean): string => {
	switch (variant) {
		case Variant.text: {
			return classNames({
				[getColor('bg-transparent')]: true
			});
		}
		case Variant.primary: {
			return classNames({
				[getColor('bg-primary-1')]: true,
				[getColor('active:bg-primary-4')]: interactive,
				[getColor('hover:bg-primary-2')]: interactive,
				[getColor('focus:ring-blue-500')]: interactive
			});
		}
		case Variant.secondary: {
			return classNames({
				[getColor('bg-misc-1')]: true,
				[getColor('active:bg-secondary-2')]: interactive,
				[getColor('hover:bg-secondary-1')]: interactive,
				[getColor('focus:ring-gray-300')]: interactive
			});
		}
		case Variant.desctructionary:
		default: {
			return classNames({
				[getColor('bg-alert-2')]: true,
				[getColor('active:bg-alert-4')]: interactive,
				[getColor('hover:bg-alert-1')]: interactive,
				[getColor('focus:ring-red-600')]: interactive
			});
		}
	}
};

export const flexCenter = () => classNames('flex', 'justify-center', 'items-center');

export const buttonFocus = () => classNames('focus:ring', 'focus:ring-offset-2', 'focus:ring-opacity-50');
