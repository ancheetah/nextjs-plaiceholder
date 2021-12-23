import { Builder } from '@builder.io/react'
import React from 'react'
import type { InferGetStaticPropsType } from 'next'
import Image from 'next/image'
import { getPlaiceholder } from 'plaiceholder'

// export const getStaticProps = async () => {
//   const { base64, img } = await getPlaiceholder(
//     'https://images.unsplash.com/photo-1621961458348-f013d219b50c?auto=format&fit=crop&w=2850&q=80'
//   )

//   return {
//     props: {
//       imageProps: {
//         ...img,
//         blurDataURL: base64,
//       },
//     },
//   }
// }

// const CustomImage: React.FC<InferGetStaticPropsType<typeof getStaticProps>> = ({
//   imageProps,
// }) => {
//   const { src, ...rest } = imageProps
//   return (
//     <div style={{ border: '1px solid black' }}>
//       <h4>Your Image</h4>
//       <Image
//         src={
//           imageProps.src ||
//           'https://cdn.builder.io/api/v1/image/assets%2Fpwgjf0RoYWbdnJSbpBAjXNRMe9F2%2Ffb27a7c790324294af8be1c35fe30f4d'
//         }
//         width="400"
//         height="400"
//       />
//     </div>
//   )
// }

export const CustomImage = (props) => {
  return (
    <div style={{ border: '1px solid black' }}>
      <h4>Your Image</h4>
      <Image
        src={
          props.src ||
          'https://cdn.builder.io/api/v1/image/assets%2Fpwgjf0RoYWbdnJSbpBAjXNRMe9F2%2Ffb27a7c790324294af8be1c35fe30f4d'
        }
        width="400"
        height="400"
      />
    </div>
  )
}

Builder.registerComponent(CustomImage, {
  name: 'Custom Image',
  inputs: [
    {
      name: 'src',
      type: 'file',
      allowedFileTypes: ['jpeg', 'png'],
      defaultValue:
        'https://cdn.builder.io/api/v1/image/assets%2Fpwgjf0RoYWbdnJSbpBAjXNRMe9F2%2Ffb27a7c790324294af8be1c35fe30f4d',
    },
  ],
})
