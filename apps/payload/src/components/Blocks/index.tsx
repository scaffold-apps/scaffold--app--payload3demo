'use client'

import React, { Fragment } from 'react'
import { Page } from '../../../payload-types'
import { toKebabCase } from '../../utils/toKebabCase'
import { HeroBlock } from './HeroBlock'

const blockComponents = {
  heroBlock: HeroBlock,
}

const Blocks: React.FC<{
  blocks: Page['layout']
}> = (props) => {
  const { blocks } = props

  const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0

  if (hasBlocks) {
    return (
      <Fragment>
        {blocks.map((block, index) => {
          const { blockName, blockType } = block

          if (blockType && blockType in blockComponents) {
            const Block = blockComponents[blockType]

            if (Block) {
              return (
                <div key={index} className="rounded-lg">
                  <Block
                    // @ts-ignore
                    id={toKebabCase(blockName)}
                    {...block}
                  />
                </div>
              )
            }
          }
          return null
        })}
      </Fragment>
    )
  }

  return null
}

export default Blocks
