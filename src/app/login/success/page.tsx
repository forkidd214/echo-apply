import Link from 'next/link'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export default function SignupSuccess() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center text-2xl">
            Thank you for signing up!
          </CardTitle>
          <CardDescription className="text-center">
            Please check your email for a confirmation link to complete your
            registration.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-center text-sm text-muted-foreground">
              Once you&apos;ve confirmed your email, you can access your
              workspace.
            </p>
            <Button asChild className="w-full">
              <Link href="/workspace">Continue to Workspace</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
