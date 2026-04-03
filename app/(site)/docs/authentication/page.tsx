"use client"


import { SDKIcons } from "@/components/docs/sdk-icons"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { CodeBlock } from "../../../../components/docs/code-block"
import { StepNavigation } from "../../../../components/docs/step-navigation"
import { Footer } from "../../../../components/site/site-footer"
import { useTheme } from "next-themes"
import { cn } from "../../../../lib/utils"


interface CodeBlockDemoProps {
  duration: number;
  delay: number;
  writing: boolean;
  cursor: boolean;
}
const steps = [
  { id: "sign-in-up", number: 1, title: "Sign In / Sign Up" },
  { id: "user-button", number: 2, title: "User button" },
  { id: "protect-routes", number: 3, title: "Protect routes" },
  { id: "get-user", number: 4, title: "Get current user" },
  { id: "social-auth", number: 5, title: "Social authentication" },
  { id: "sign-out", number: 6, title: "Sign out" },
]

export default function AuthenticationPage({
  duration,
  delay,
  writing,
  cursor,
}: CodeBlockDemoProps) {
  const { resolvedTheme } = useTheme();
  return (
    <>
      <div className="flex gap-8 px-6 py-8 lg:px-8">
        <div
          className="absolute top-0 right-0 w-[1500px] h-[1500px] -z-10 bg-primary pointer-events-none"
          style={{
            maskImage: "radial-gradient(ellipse 50% 50% at 100% 0%, rgb(0 0 0 / 0.75), transparent)",
          }}
        >
          <div className="absolute inset-0 bg-cover bg-right-top" style={{ backgroundImage: "url('/grade.png')" }} />
        </div>
        <div className="flex-1 max-w-4xl">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground">Authentication</h1>
            <p className="mt-2 text-lg text-muted-foreground">
              Implement secure authentication with sign in, sign up, and social login.
            </p>
          </div>

          <section id="sign-in-up" className="scroll-mt-24 pb-12">
            <div className="flex items-start gap-4">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-medium text-primary-foreground">
                1
              </span>
              <div className="flex-1">
                <h2 className="text-xl font-semibold text-foreground">Sign In / Sign Up</h2>
                <p className="mt-2 text-muted-foreground">
                  Use the prebuilt SignIn and SignUp components to quickly add authentication.
                </p>

                <CodeBlock
                  code={`'use client';
 
import * as React from 'react';
 
type MyComponentProps = {
  myProps: string;
} & React.ComponentProps<'div'>;
 
function MyComponent(props: MyComponentProps) {
  return (
    <div {...props}>
      <p>My Component</p>
    </div>
  );
}

export { MyComponent, type MyComponentProps };`}
                  lang="tsx"
                  theme={resolvedTheme === 'dark' ? 'dark' : 'light'}
                  writing={writing}
                  duration={duration}
                  delay={delay}
                  className={cn(
                    '[&>pre,_&_code]:!bg-transparent [&>pre,_&_code]:[background:transparent_!important] [&>pre,_&_code]:border-none [&_code]:!text-[13px] [&_code_.line]:!px-0',
                    cursor &&
                    "data-[done=false]:[&_.line:last-of-type::after]:content-['|'] data-[done=false]:[&_.line:last-of-type::after]:inline-block data-[done=false]:[&_.line:last-of-type::after]:w-[1ch] data-[done=false]:[&_.line:last-of-type::after]:-translate-px",
                  )}
                />
              </div>
            </div>
          </section>

          <section id="user-button" className="scroll-mt-24 pb-12">
            <div className="flex items-start gap-4">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-medium text-primary-foreground">
                2
              </span>
              <div className="flex-1">
                <h2 className="text-xl font-semibold text-foreground">User button</h2>
                <p className="mt-2 text-muted-foreground">
                  Display the user&apos;s avatar and profile menu with the UserButton component.
                </p>

                <CodeBlock
                  code={`import { UserButton } from '@devdocs/nextjs'

export function Header() {
  return (
    <header className="flex items-center justify-between p-4">
      <h1>My App</h1>
      <UserButton 
        afterSignOutUrl="/"
        appearance={{
          elements: {
            avatarBox: 'h-10 w-10',
          }
        }}
      />
    </header>
  )
}`}
                  filename="components/header.tsx"
                  language="typescript"
                  showLineNumbers={true}
                />
              </div>
            </div>
          </section>

          <section id="protect-routes" className="scroll-mt-24 pb-12">
            <div className="flex items-start gap-4">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-medium text-primary-foreground">
                3
              </span>
              <div className="flex-1">
                <h2 className="text-xl font-semibold text-foreground">Protect routes</h2>
                <p className="mt-2 text-muted-foreground">
                  Use SignedIn and SignedOut components to conditionally render content.
                </p>

                <CodeBlock
                  code={`import { SignedIn, SignedOut, RedirectToSignIn } from '@devdocs/nextjs'

export default function DashboardPage() {
  return (
    <>
      <SignedIn>
        <Dashboard />
      </SignedIn>
      
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </>
  )
}

// Or use the protect function in Server Components
import { protect } from '@devdocs/nextjs/server'

export default async function ProtectedPage() {
  const { user } = await protect()
  
  return <div>Welcome, {user.name}</div>
}`}
                  filename="app/dashboard/page.tsx"
                  language="typescript"
                  showLineNumbers={true}
                />
              </div>
            </div>
          </section>

          <section id="get-user" className="scroll-mt-24 pb-12">
            <div className="flex items-start gap-4">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-medium text-primary-foreground">
                4
              </span>
              <div className="flex-1">
                <h2 className="text-xl font-semibold text-foreground">Get current user</h2>
                <p className="mt-2 text-muted-foreground">
                  Access the current user data in both client and server components.
                </p>

                <CodeBlock
                  code={`// Client Component
'use client'
import { useUser, useSession } from '@devdocs/nextjs'

export function Profile() {
  const { user, isLoaded, isSignedIn } = useUser()
  const { session } = useSession()
  
  if (!isLoaded) return <div>Loading...</div>
  if (!isSignedIn) return <div>Please sign in</div>
  
  return (
    <div>
      <h1>Welcome, {user.firstName}</h1>
      <p>Email: {user.emailAddresses[0].emailAddress}</p>
    </div>
  )
}

// Server Component
import { currentUser } from '@devdocs/nextjs/server'

export default async function ServerProfile() {
  const user = await currentUser()
  
  if (!user) return null
  
  return <div>Hello, {user.firstName}</div>
}`}
                  filename="components/profile.tsx"
                  language="typescript"
                  showLineNumbers={true}
                />
              </div>
            </div>
          </section>

          <section id="social-auth" className="scroll-mt-24 pb-12">
            <div className="flex items-start gap-4">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-medium text-primary-foreground">
                5
              </span>
              <div className="flex-1">
                <h2 className="text-xl font-semibold text-foreground">Social authentication</h2>
                <p className="mt-2 text-muted-foreground">
                  Enable social login providers like Google, GitHub, and more.
                </p>

                <CodeBlock
                  code={`import { useSignIn } from '@devdocs/nextjs'

export function SocialLogin() {
  const { signIn } = useSignIn()
  
  const handleGoogleSignIn = async () => {
    await signIn.authenticateWithRedirect({
      strategy: 'oauth_google',
      redirectUrl: '/sso-callback',
      redirectUrlComplete: '/dashboard',
    })
  }
  
  const handleGitHubSignIn = async () => {
    await signIn.authenticateWithRedirect({
      strategy: 'oauth_github',
      redirectUrl: '/sso-callback',
      redirectUrlComplete: '/dashboard',
    })
  }
  
  return (
    <div className="space-y-2">
      <button onClick={handleGoogleSignIn}>
        Continue with Google
      </button>
      <button onClick={handleGitHubSignIn}>
        Continue with GitHub
      </button>
    </div>
  )
}`}
                  filename="components/social-login.tsx"
                  language="typescript"
                  showLineNumbers={true}
                />
              </div>
            </div>
          </section>

          <section id="sign-out" className="scroll-mt-24 pb-12">
            <div className="flex items-start gap-4">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-medium text-primary-foreground">
                6
              </span>
              <div className="flex-1">
                <h2 className="text-xl font-semibold text-foreground">Sign out</h2>
                <p className="mt-2 text-muted-foreground">
                  Implement sign out functionality using the useSignOut hook.
                </p>

                <CodeBlock
                  code={`import { useSignOut } from '@devdocs/nextjs'
import { useRouter } from 'next/navigation'

export function SignOutButton() {
  const { signOut } = useSignOut()
  const router = useRouter()
  
  const handleSignOut = async () => {
    await signOut()
    router.push('/')
  }
  
  return (
    <button onClick={handleSignOut}>
      Sign Out
    </button>
  )
}`}
                  filename="components/sign-out-button.tsx"
                  language="typescript"
                  showLineNumbers={true}
                />
              </div>
            </div>
          </section>

          <section id="next-steps" className="scroll-mt-24 border-t border-border pt-8">
            <h2 className="text-xl font-semibold text-foreground">Next steps</h2>
            <p className="mt-2 text-muted-foreground">
              Now that you&apos;ve set up authentication, connect your database.
            </p>

            <div className="mt-6">
              <Link
                href="/docs/database"
                className="group inline-flex items-center gap-2 text-primary hover:text-primary/80"
              >
                Continue to Database Setup
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </section>
        </div>

        <div className="hidden xl:flex xl:flex-col xl:gap-8">
          <StepNavigation steps={steps} />
        </div>
      </div>
      <Footer />
    </>
  )
}

