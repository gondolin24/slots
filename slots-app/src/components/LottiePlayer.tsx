import React from 'react';
import Lottie from 'react-lottie'

interface LottieInterFace {
    source: any
    animationDefault: boolean
    style ?: React.CSSProperties
}

const Lottieplayer: React.FC <LottieInterFace>= (props) => {
    const {animationDefault} = props
    const anData = (animationDefault)? props.source.default: props.source
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: anData,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice"
        }
    };
    return (
        <Lottie
            options={defaultOptions}
        />
    );
};

export default Lottieplayer;
