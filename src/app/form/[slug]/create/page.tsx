import BlockCard from '@/components/block-card'

export default function Page() {
  return (
    <div className="space-y-4 p-2 overflow-y-auto min-h-0 h-full">
      <p>Content</p>
      {['1', '2', '3', '4', '5'].map((i) => (
        <BlockCard key={i} />
      ))}
      <p>End</p>
      <BlockCard />
    </div>
  )
}
