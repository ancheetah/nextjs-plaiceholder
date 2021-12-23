import { Builder } from '@builder.io/react'
import React from 'react'
import Image from 'next/image'

export const CustomImage = (props: any) => {
  return (
    <div style={{ border: '1px solid black' }}>
      <h4>Your Blurred Image</h4>
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
