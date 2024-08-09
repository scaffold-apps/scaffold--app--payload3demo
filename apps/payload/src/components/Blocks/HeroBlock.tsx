import { Page } from 'payload-types'
import React from 'react'
import { CMSLink } from '../organisms/CMSLink'
// import { CMSLink } from "../../Link";

export const HeroBlock: React.FC<Extract<Page['layout'][number], { blockType: 'heroBlock' }>> = (
  props,
) => {
  const { title, description, links, subtext, logo } = props

  return (
    <div className="container flex flex-col text-center items-center">
      {logo && <img src={logo.url} alt={logo.alt} className="w-20 h-20 mx-auto mb-4" />}
      <h1 className="text-4xl lg:text-6xl font-bold !leading-normal">{title}</h1>
      <p
        className="text-gray-400 text-2xl mt-10 lg:w-1/2 font-light"
        dangerouslySetInnerHTML={{ __html: description || '' }}
      />
      <div className="mt-14">
        {links?.map(({ link }, index) => {
          return <CMSLink key={index} {...link} />
        })}
      </div>
      <div className="mt-28">{/* <VideoTrigger /> */}</div>
      {/* <p className="text-foreground/50 mt-5 text-sm">
        <span className="italic">
            The only way to go fast is to go well
        </span>
        <br />- Robert C Martin
    </p> */}
    </div>
    // <div className=" min-h-screen flex flex-col items-center justify-center text-center p-4">
    //   <div className="mb-8">
    //     <img src="/api/placeholder/100/100" alt="Logo" className="w-16 h-16 mx-auto mb-4" />
    //     <h1 className="text-4xl font-bold mb-4" dangerouslySetInnerHTML={{ __html: title }} />
    //     <p className="text-xl mb-4" dangerouslySetInnerHTML={{ __html: description }} />
    //     <Button className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded">
    //       Try QuickTweet for free
    //     </Button>
    //     {subtext && (
    //       <p
    //         className="text-sm mt-2 text-gray-600 dark:text-gray-400"
    //         dangerouslySetInnerHTML={{ __html: subtext }}
    //       />
    //     )}
    //   </div>
    //   <div className="max-w-4xl w-full">
    //     <div className="bg-gradient-to-br from-teal-400 via-purple-500 to-orange-500 rounded-lg p-1">
    //       <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-2">
    //         <img src="" alt="Screen Recording Demo" className="w-full rounded" />
    //       </div>
    //     </div>
    //   </div>
    // </div>
    // <div className="flex flex-col items-center justify-center">
    //   {/* logo here  */}
    //   <h1 dangerouslySetInnerHTML={{ __html: title }} className="text-4xl font-bold"></h1>
    //   <p dangerouslySetInnerHTML={{ __html: description }} className="text-lg" />
    //   <div className="flex flex-col items-center justify-center">
    //     link button here
    //     {/* {links?.map(({ link }, index) => {
    //       return <CMSLink key={index} className={classes.link} {...link} />;
    //     })} */}
    //   </div>
    //   <p className="text-lg">{subtext}</p>
    // </div>
  )
}
