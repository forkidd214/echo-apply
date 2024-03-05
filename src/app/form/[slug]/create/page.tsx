import BlockCard from '@/components/block-card'
import Block from '@/components/block'

export default function Page() {
  return (
    <div className="h-full min-h-0 space-y-4 overflow-y-auto p-2">
      <p>Content</p>
      {BLOCKS.map(({ index, key, type }) => (
        <div key={key}>
          <BlockCard renderBlock={() => <Block type={type as any} />} />
        </div>
      ))}
      <p>End</p>
      <BlockCard renderBlock={() => <Block type="END" />} />
    </div>
  )
}

const BLOCKS = [
  {
    index: 1,
    key: 'block-1',
    type: 'SHORT_TEXT',
  },
  {
    index: 2,
    key: 'block-2',
    type: 'LONG_TEXT',
  },
  {
    index: 3,
    key: 'block-3',
    type: 'YES_OR_NO',
  },
  {
    index: 4,
    key: 'block-4',
    type: 'MULTIPLE_CHOICE',
  },
  {
    index: 5,
    key: 'block-5',
    type: 'CONTACT_INFO',
  },
  {
    index: 6,
    key: 'block-6',
    type: 'DATE',
  },
]
