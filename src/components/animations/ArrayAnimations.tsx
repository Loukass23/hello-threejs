import React from 'react'
import Anime, { anime } from 'react-anime';

interface Props {
    array: String[]
}

const ArrayAnimations: React.FC<Props> = ({ array }) => {


    let animeProps = {
        opacity: [0, 1],
        translateY: [-64, 0],
        delay: (el: Element, i?: number | undefined, len?: number | undefined) => i ? i * 200 : 0
    };
    return (
        <Anime {...animeProps}>
            {array.map((v, i) => <h1 key={i}>{v}</h1>)}
        </Anime>
    )
}

export default ArrayAnimations
