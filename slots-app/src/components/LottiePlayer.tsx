import React from 'react';
import Lottie from 'react-lottie'

interface LottieInterFace {
    source: any
    style ?: React.CSSProperties
}

const Lottieplayer: React.FC <LottieInterFace>= (props) => {

    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: props.source,
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
