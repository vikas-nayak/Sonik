'use client'

import * as Clerk from '@clerk/elements/common'
import * as SignUp from '@clerk/elements/sign-up'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { LoaderCircle, Github, Twitter } from 'lucide-react'

export default function RedesignedSignUpPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-600 via-blue-600 to-fuchsia-500 flex justify-center items-center px-4 py-12">
      <div className="w-full max-w-md">
        <SignUp.Root>
          <Clerk.Loading>
            {(isGlobalLoading) => (
              <>
                <SignUp.Step name="start">
                  <div className="relative mb-8">
                    <Card className="relative bg-blue-700/90 backdrop-blur-sm border-none shadow-[8px_8px_0px_0px_rgba(250,204,21,100)] hover:shadow-[16px_16px_0px_0px_rgba(250,204,0,1)] transition-all">
                      <CardHeader>
                        <CardTitle className="text-2xl font-bold text-yellow-200">Create an account</CardTitle>
                        <CardDescription className="text-yellow-200/70">Welcome to Sonik! Please sign up to continue</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <Clerk.Connection name="google" asChild>
                            <Button
                              variant="outline"
                              className="bg-yellow-200 text-blue-950 hover:bg-yellow-300 border-none"
                              disabled={isGlobalLoading}
                            >
                              <Clerk.Loading scope="provider:google">
                                {(isLoading) =>
                                  isLoading ? (
                                    <LoaderCircle className="w-4 h-4 animate-spin" />
                                  ) : (
                                    <>
                                      <Clerk.Icon className="mr-2 h-4 w-4" />
                                      Google
                                    </>
                                  )
                                }
                              </Clerk.Loading>
                            </Button>
                          </Clerk.Connection>
                          <Clerk.Connection name="apple" asChild>
                            <Button
                              variant="outline"
                              className="bg-yellow-200 text-blue-950 hover:bg-yellow-300 border-none"
                              disabled={isGlobalLoading}
                            >
                              <Clerk.Loading scope="provider:apple">
                                {(isLoading) =>
                                  isLoading ? (
                                    <LoaderCircle className="w-4 h-4 animate-spin" />
                                  ) : (
                                    <>
                                      <Clerk.Icon className="mr-2 h-4 w-4" />
                                      Apple
                                    </>
                                  )
                                }
                              </Clerk.Loading>
                            </Button>
                          </Clerk.Connection>
                        </div>
                        <div className="relative">
                          <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t border-yellow-200/20" />
                          </div>
                          <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-blue-950 px-2 text-yellow-200/70">OR CONTINUE WITH</span>
                          </div>
                        </div>
                        <Clerk.Field name="emailAddress" className="space-y-2">
                          <Clerk.Label asChild>
                            <Label className="text-yellow-200">Email address</Label>
                          </Clerk.Label>
                          <Clerk.Input type="email" required asChild>
                            <Input className="bg-blue-900/50 border-yellow-200/20 text-yellow-100 placeholder:text-yellow-200/30" />
                          </Clerk.Input>
                          <Clerk.FieldError className="text-sm text-red-400" />
                        </Clerk.Field>
                        <Clerk.Field name="password" className="space-y-2">
                          <Clerk.Label asChild>
                            <Label className="text-yellow-200">Password</Label>
                          </Clerk.Label>
                          <Clerk.Input type="password" required asChild>
                            <Input className="bg-blue-900/50 border-yellow-200/20 text-yellow-100 placeholder:text-yellow-200/30" />
                          </Clerk.Input>
                          <Clerk.FieldError className="text-sm text-red-400" />
                        </Clerk.Field>
                      </CardContent>
                      <CardFooter className="flex flex-col space-y-4">
                        <SignUp.Action submit asChild>
                          <Button className="w-full bg-yellow-200 text-blue-950 hover:bg-yellow-300" disabled={isGlobalLoading}>
                            <Clerk.Loading>
                              {(isLoading) => isLoading ? <LoaderCircle className="w-4 h-4 animate-spin" /> : 'Continue'}
                            </Clerk.Loading>
                          </Button>
                        </SignUp.Action>
                        <Button variant="link" size="sm" asChild className="text-yellow-200 hover:text-yellow-300">
                          <Link href="/sign-in">Already have an account? Sign in</Link>
                        </Button>
                      </CardFooter>
                    </Card>
                  </div>
                </SignUp.Step>

                <SignUp.Step name="continue">
                  <div className="relative mb-8">
                    <Card className="relative bg-blue-950/90 backdrop-blur-sm border-none shadow-[4px_4px_0px_0px_rgba(250,204,21,1)] hover:shadow-[8px_8px_0px_0px_rgba(250,204,21,1)] transition-all">
                      <CardHeader>
                        <CardTitle className="text-2xl font-bold text-yellow-200">Continue registration</CardTitle>
                        <CardDescription className="text-yellow-200/70">
                          Please provide a username to complete your registration
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <Clerk.Field name="username" className="space-y-2">
                          <Clerk.Label asChild>
                            <Label className="text-yellow-200">Username</Label>
                          </Clerk.Label>
                          <Clerk.Input type="text" required asChild>
                            <Input className="bg-blue-900/50 border-yellow-200/20 text-yellow-100 placeholder:text-yellow-200/30" />
                          </Clerk.Input>
                          <Clerk.FieldError className="text-sm text-red-400" />
                        </Clerk.Field>
                      </CardContent>
                      <CardFooter>
                        <SignUp.Action submit asChild>
                          <Button className="w-full bg-yellow-200 text-blue-950 hover:bg-yellow-300" disabled={isGlobalLoading}>
                            <Clerk.Loading>
                              {(isLoading) => isLoading ? <LoaderCircle className="w-4 h-4 animate-spin" /> : 'Continue'}
                            </Clerk.Loading>
                          </Button>
                        </SignUp.Action>
                      </CardFooter>
                    </Card>
                  </div>
                </SignUp.Step>

                <SignUp.Step name="verifications">
                  <SignUp.Strategy name="email_code">
                    <div className="relative mb-8">
                      <Card className="relative bg-blue-950/90 backdrop-blur-sm border-none shadow-[4px_4px_0px_0px_rgba(250,204,21,1)] hover:shadow-[8px_8px_0px_0px_rgba(250,204,21,1)] transition-all">
                        <CardHeader>
                          <CardTitle className="text-2xl font-bold text-yellow-200">Verify your email</CardTitle>
                          <CardDescription className="text-yellow-200/70">
                            Enter the verification code sent to your email
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <Clerk.Field name="code">
                            <Clerk.Label className="sr-only">Email verification code</Clerk.Label>
                            <div className="grid gap-y-2 items-center justify-center">
                              <div className="flex justify-center text-center">
                                <Clerk.Input
                                  type="otp"
                                  autoSubmit
                                  className="flex justify-center has-[:disabled]:opacity-50"
                                  render={({ value, status }) => {
                                    return (
                                      <div
                                        data-status={status}
                                        className="relative flex h-9 w-9 items-center justify-center border-y border-r border-yellow-200/20 text-yellow-200 text-sm shadow-sm transition-all first:rounded-l-md first:border-l last:rounded-r-md data-[status=selected]:ring-1 data-[status=selected]:ring-yellow-200 data-[status=cursor]:ring-1 data-[status=cursor]:ring-yellow-200 bg-blue-900/50"
                                      >
                                        {value}
                                      </div>
                                    )
                                  }}
                                />
                              </div>
                              <Clerk.FieldError className="text-sm text-red-400 text-center" />
                              <SignUp.Action
                                asChild
                                resend
                                className="text-yellow-200/70"
                                fallback={({ resendableAfter }) => (
                                  <Button variant="link" size="sm" disabled className="text-yellow-200/30">
                                    Didn't receive a code? Resend (
                                    <span className="tabular-nums">{resendableAfter}</span>)
                                  </Button>
                                )}
                              >
                                <Button variant="link" size="sm" className="text-yellow-200 hover:text-yellow-300">
                                  Didn't receive a code? Resend
                                </Button>
                              </SignUp.Action>
                            </div>
                          </Clerk.Field>
                        </CardContent>
                        <CardFooter className="flex flex-col space-y-4">
                          <SignUp.Action submit asChild>
                            <Button className="w-full bg-yellow-200 text-blue-950 hover:bg-yellow-300" disabled={isGlobalLoading}>
                              <Clerk.Loading>
                                {(isLoading) => isLoading ? <LoaderCircle className="w-4 h-4 animate-spin" /> : 'Continue'}
                              </Clerk.Loading>
                            </Button>
                          </SignUp.Action>
                        </CardFooter>
                      </Card>
                    </div>
                  </SignUp.Strategy>
                </SignUp.Step>
              </>
            )}
          </Clerk.Loading>
        </SignUp.Root>
        <footer className="text-center text-yellow-200">
          <p className="text-sm">© 2024 Sonik. All rights reserved.</p>
          <div className="mt-4 flex justify-center space-x-4">
            <Link href="https://www.github.com/vikas-nayak" className="text-yellow-200  hover:text-yellow-300">
              <Github className="w-5 h-5" />
            </Link>
            <Link href="https://www.x.com/viikasnayak" className="text-yellow-200 hover:text-yellow-300">
              <Twitter className="w-5 h-5" />
            </Link>
          </div>
        </footer>
      </div>
    </div>
  )
}