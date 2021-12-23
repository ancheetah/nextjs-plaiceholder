import type { GetStaticPropsContext, InferGetStaticPropsType } from 'next'
import { useRouter } from 'next/router'
import { BuilderComponent, Builder, builder } from '@builder.io/react'
import DefaultErrorPage from 'next/error'
import Head from 'next/head'
import { getPlaiceholder } from 'plaiceholder'

const BUILDER_API_KEY = '492b9fb8f843430fba67137f1f8ec68d'
builder.init(BUILDER_API_KEY)

import '../components/Heading.tsx'
import '../components/CustomImage.tsx'

// tells you what paths are being built
export async function getStaticProps({
  params,
}: GetStaticPropsContext<{ page: string[] }>) {
  const page =
    (await builder
      .get('page', {
        userAttributes: {
          urlPath: '/' + (params?.page?.join('/') || ''),
        },
      })
      .toPromise()) || null

  if (page) {
    // find your CustomImage component(s) in the blocks
    console.log(
      'custom image url: ',
      page.data.blocks[0].children[1].component.options
    )

    // call getPlaiceholder() here to generate your blurDataURL
    const { base64 } = await getPlaiceholder(
      page.data.blocks[0].children[1].component.options.src
    )

    // update the image with the blurDataURL
    page.data.blocks[0].children[1].component.options.src = base64

    console.log(
      'new image url: ',
      page.data.blocks[0].children[1].component.options
    )
  }

  return {
    props: {
      page,
    },
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every 5 seconds
    revalidate: 5,
  }
}

// returns a list
export async function getStaticPaths() {
  const pages = await builder.getAll('page', {
    options: { noTargeting: true },
    omit: 'data.blocks',
  })

  return {
    paths: pages.map((page) => `${page.data?.url}`),
    fallback: true,
  }
}

// React Component
export default function Page({
  page,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const router = useRouter()
  if (router.isFallback) {
    return <h1>Loading...</h1>
  }
  const isLive = !Builder.isEditing && !Builder.isPreviewing
  if (!page && isLive) {
    return (
      <>
        <Head>
          <meta name="robots" content="noindex" />
          <meta name="title"></meta>
        </Head>
        <DefaultErrorPage statusCode={404} />
      </>
    )
  }

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <BuilderComponent model="page" content={page} />
    </>
  )
}
