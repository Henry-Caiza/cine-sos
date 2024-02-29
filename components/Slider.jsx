import React from 'react'
import CardSlider from './CardSlider'

export default React.memo(function Slider({ type_media, title, isWrap, dataTopRated, dataPopular, classNameCard, classNameCardFooter }) {

    return (
        <div className=' -mt-8 flex flex-col md:gap-4'>
            <CardSlider title={`Top ${title} With The Best Rating`} data={dataTopRated} type_media={type_media} isWrap={isWrap} classNameCard={classNameCard} classNameCardFooter={classNameCardFooter} />
            <CardSlider title={`Popular ${title}`} data={dataPopular} type_media={type_media} isWrap={isWrap} />
        </div>
    )
}
)
