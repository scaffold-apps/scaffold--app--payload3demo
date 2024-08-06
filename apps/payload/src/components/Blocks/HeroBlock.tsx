import React from 'react'

// import { CMSLink } from "../../Link";

export const HeroBlock: React.FC<any> = (props) => {
  const { title, description, links, subtext } = props

  return (
    <div className="flex flex-col items-center justify-center">
      <h1 dangerouslySetInnerHTML={{ __html: title }} className="text-4xl font-bold"></h1>
      <p dangerouslySetInnerHTML={{ __html: description }} className="text-lg" />
      <div className="flex flex-col items-center justify-center">
        link button here
        {/* {links?.map(({ link }, index) => {
          return <CMSLink key={index} className={classes.link} {...link} />;
        })} */}
      </div>
      <p className="text-lg">{subtext}</p>
    </div>
  )
}
