const basePath = process.env.NEXT_PUBLIC_VERCEL_URL
  ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
  : 'http://localhost:3000'

export default async function copyFormLink(id: string) {
  const link = new URL(`/form/${id}/public`, basePath)
  return navigator.clipboard.writeText(link.href)
}
