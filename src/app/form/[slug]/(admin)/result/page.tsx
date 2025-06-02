import ResponseTable from './response-table'

export default function Page() {
  return (
    <div className="flex flex-grow flex-col px-2">
      <p className="p-8 text-muted-foreground">Under construction...</p>
      <main className="-mx-2 flex-grow bg-secondary py-4">
        <div className="container">
          <ResponseTable />
        </div>
      </main>
    </div>
  )
}
