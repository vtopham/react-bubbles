import React, { useState, useEffect } from "react";
import { Pack } from "@potion/layout";
import { Svg, Circle, Ribbon } from "@potion/element";
import { Pattern, LinearGradient } from '@potion/extra'

//use potion library to visualize bubbles
const Bubbles = ({ colors }) => {
  const [bubbleData, setBubbleData] = useState([]);
  useEffect(() => {
    const generateBubbleData = colors.map((_, i) => ({
      value: Math.floor(Math.random() * (colors.length * 2)) + 1,
      key: `${i + 1}`
    }));
    setBubbleData(generateBubbleData);
  }, [colors]);

  return (
    <div className="bubble-wrap">
      <p>bubbles</p>
      <Svg width={400} height={400}>
        {/* <LinearGradient
          id="my-gradient"
          x1="0%"
          y1="0%"
          x2="0%"
          y2="100%"
          name="argon"
        /> */}
        <Pack
          data={{
            children: bubbleData
          }}
          sum={datum => datum.value}
          size={[400, 400]}
          includeRoot={false}
          nodeEnter={d => ({ ...d, r: 0 })}
          animate
        >
          {nodes =>
            nodes
              .map(({ x, y, r, key }, i) => {
                if (i < colors.length) {
                  return (
                    <>
                    <Circle
                      key={key}
                      cx={x}
                      cy={y}
                      r={r}
                      fill={colors[i].code.hex}
                      // fill='url(#my-gradient)'
                      
                    />
                    {/* <Pattern.Paths
                      id='paths4'
                      d='waves'
                      stroke ={colors[i].code.hex}
                      /> */}
                    </>
                    //JUST FOR FUN (stretch)
                    // <Ribbon
                    //   key={key}
                    //   source={{
                    //     startAngle: x,
                    //     endAngle: y,
                    //     radius: r,
                    //   }}
                    //   target={{
                    //     startAngle: x *.5,
                    //     endAngle: y * .5,
                    //     radius: r,
                    //   }}
                    //   fill={colors[i].code.hex}
                    //   />
                  );
                }
                return null;
              })
              .filter(v => v)
          }
        </Pack>
      </Svg>
    </div>
  );
};

export default Bubbles;
