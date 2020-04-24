import React from 'react'

import { Pack } from "@potion/layout";
import { Svg, Circle, Arc } from "@potion/element";
import { Pattern, LinearGradient } from '@potion/extra'

const TestTest = _ => {
    return(
        <>
        <h1>Testing</h1>
        <Svg width={400} height={400}>
        {/* <Pattern.Paths
            id="my-pattern"
            d="waves"
            stroke="black"

        /> */}
        <Arc
            key={123}
            innterRadius = {100}
            outerRadius = {200}
            startAngle = {0}
            endAngle = {Math.PI * 3 / 2}
            fill='black'
            
        />
        </Svg>
        </>
    )
}

export default TestTest