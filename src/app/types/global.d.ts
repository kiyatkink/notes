declare module '*.scss' {
    interface IClassNames {
        [className: string]: string
    }
    const classNames: IClassNames;
    export = classNames;
}

declare module '*.png'
declare module '*.jpg'
declare module '*.jpeg'
declare module '*.svg' {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    import React from 'react';

    const SVG: React.VFC<React.SVGProps<SVGSVGElement>>;
    export default SVG;
}

declare module 'extend-redux' {
    import 'redux-thunk/extend-redux'
}

interface URLSearchParams {
    size: number;
}
