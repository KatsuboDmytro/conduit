import { FC } from 'react';

interface TagListProps {}

export const TagList: FC<TagListProps> = () => {
  return (
    <ul className='flex'>
      <li className='font-light text-date border border-conduit-lightenGray text-conduit-tag mb-0.2 px-tag rounded-tag'>qwet</li>
      <li className='font-light text-date border border-conduit-lightenGray text-conduit-tag mb-0.2 px-tag rounded-tag'>qwet</li>
      <li className='font-light text-date border border-conduit-lightenGray text-conduit-tag mb-0.2 px-tag rounded-tag'>qwet</li>
    </ul>
  )
}