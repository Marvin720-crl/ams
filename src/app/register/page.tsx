
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'

import { toast } from 'sonner'
import { UserPlus, Loader2 } from 'lucide-react'

import {
  addUserAction,
  getUsersAction,
  getSettingsAction
} from '@/app/actions/dbActions'

import { Department } from '@/utils/storage'

type Role = 'student' | 'teacher'

interface RegisterForm {
  id: string
  name: string
  email: string
  password: string
  role: Role
  department: Department
  program: string
  year: number
  teacherSecret: string
  emergencyContactName: string;
  emergencyContactAddress: string;
  emergencyContactPhone: string;
}

export default function RegisterPage() {
  const router = useRouter()

  const [loading, setLoading] = useState(false)

  const [formData, setFormData] = useState<RegisterForm>({
    id: '',
    name: '',
    email: '',
    password: '',
    role: 'student',
    department: 'college',
    program: '',
    year: 1,
    teacherSecret: '',
    emergencyContactName: '',
    emergencyContactAddress: '',
    emergencyContactPhone: ''
  })

  const updateField = (field: keyof RegisterForm, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (loading) return
    setLoading(true)

    try {
      const users = await getUsersAction()

      if (users.some(u => u.id === formData.id)) {
        toast.error('User with this ID already exists.')
        setLoading(false)
        return
      }

      if (formData.role === 'teacher') {
        const settings = await getSettingsAction()

        if (formData.teacherSecret !== settings.teacherSecret) {
          toast.error('Invalid teacher secret code.')
          setLoading(false)
          return
        }
      }

      const newUser = {
        id: formData.id,
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: formData.role,
        department: formData.department,
        program: formData.role === 'student' ? formData.program : undefined,
        year: formData.role === 'student' ? formData.year : undefined,
        emergencyContactName: formData.role === 'student' ? formData.emergencyContactName : undefined,
        emergencyContactAddress: formData.role === 'student' ? formData.emergencyContactAddress : undefined,
        emergencyContactPhone: formData.role === 'student' ? formData.emergencyContactPhone : undefined,
        profilePic: ''
      }

      await addUserAction(newUser as any)

      toast.success('Registration successful! Please login.')

      router.push('/')
    } catch (error) {
      console.error(error)
      toast.error('Registration failed.')
    }

    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-muted/30 flex flex-col">

      {/* HEADER */}

      <header className="bg-primary shadow-md">
        <div className="container mx-auto px-6 py-4 flex items-center">
          <Link href="/">
            <Image
              src="/logo.png"
              alt="AMA Portal"
              width={150}
              height={40}
              style={{ height: 'auto' }}
            />
          </Link>
        </div>
      </header>

      {/* MAIN */}

      <main className="flex-grow flex items-center justify-center p-4">

        <div className="w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row">

          {/* LEFT PANEL */}

          <div className="w-full md:w-2/5 bg-primary text-white p-10 md:p-12 flex flex-col justify-center">

            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              CREATE ACCOUNT
            </h1>

            <p className="text-white/80 text-sm leading-relaxed">
              Join the AMA Academic Management System and access
              all student and faculty features.
            </p>

          </div>

          {/* RIGHT PANEL */}

          <div className="w-full md:w-3/5 p-8 md:p-12 overflow-y-auto max-h-[80vh]">

            <h2 className="text-2xl font-bold mb-2">
              Registration
            </h2>

            <p className="text-muted-foreground mb-8">
              Fill in your details to create an account.
            </p>

            <form onSubmit={handleSubmit} className="space-y-5">

              {/* ROLE */}

              <div className="space-y-2">
                <Label>I am a</Label>

                <Select
                  value={formData.role}
                  onValueChange={(v: Role) => updateField('role', v)}
                >
                  <SelectTrigger className="h-12">
                    <SelectValue />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectItem value="student">Student</SelectItem>
                    <SelectItem value="teacher">Teacher</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* DEPARTMENT */}

              <div className="space-y-2">
                <Label>Department</Label>

                <Select
                  value={formData.department}
                  onValueChange={(v: Department) => updateField('department', v)}
                >
                  <SelectTrigger className="h-12">
                    <SelectValue />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectItem value="college">College</SelectItem>
                    <SelectItem value="shs">Senior High School</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* ID */}

              <div className="space-y-2">
                <Label>
                  {formData.role === 'student' ? 'Student ID / USN' : 'Employee ID'}
                </Label>

                <Input
                  value={formData.id}
                  onChange={e => updateField('id', e.target.value)}
                  required
                  disabled={loading}
                  className="h-12"
                />
              </div>

              {/* NAME */}

              <div className="space-y-2">
                <Label>Full Name</Label>

                <Input
                  value={formData.name}
                  onChange={e => updateField('name', e.target.value)}
                  required
                  disabled={loading}
                  className="h-12"
                />
              </div>

              {/* EMAIL */}

              <div className="space-y-2">
                <Label>Email</Label>

                <Input
                  type="email"
                  value={formData.email}
                  onChange={e => updateField('email', e.target.value)}
                  required
                  disabled={loading}
                  className="h-12"
                />
              </div>

              {/* PASSWORD */}

              <div className="space-y-2">
                <Label>Password</Label>

                <Input
                  type="password"
                  value={formData.password}
                  onChange={e => updateField('password', e.target.value)}
                  required
                  disabled={loading}
                  className="h-12"
                />
              </div>

              {/* STUDENT FIELDS */}

              {formData.role === 'student' && (
                <>
                  <div className="grid grid-cols-2 gap-4">

                    <div className="space-y-2">
                      <Label>Program</Label>

                      <Input
                        placeholder={formData.department === 'shs' ? "STEM / ABM" : "BSCS"}
                        value={formData.program}
                        onChange={e => updateField('program', e.target.value)}
                        required
                        disabled={loading}
                        className="h-12"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Year / Grade Level</Label>

                      <Select
                        value={String(formData.year)}
                        onValueChange={v => updateField('year', Number(v))}
                      >
                        <SelectTrigger className="h-12">
                          <SelectValue />
                        </SelectTrigger>

                        <SelectContent>
                          {formData.department === 'shs' ? (
                            <>
                              <SelectItem value="11">Grade 11</SelectItem>
                              <SelectItem value="12">Grade 12</SelectItem>
                            </>
                          ) : (
                            <>
                              <SelectItem value="1">1st Year</SelectItem>
                              <SelectItem value="2">2nd Year</SelectItem>
                              <SelectItem value="3">3rd Year</SelectItem>
                              <SelectItem value="4">4th Year</SelectItem>
                            </>
                          )}
                        </SelectContent>
                      </Select>
                    </div>

                  </div>

                  <div className="border-t pt-5 mt-5">
                    <h3 className="text-lg font-semibold mb-4">Emergency Contact</h3>
                    <div className="space-y-5">
                      <div className="space-y-2">
                        <Label>Contact Person Name</Label>
                        <Input value={formData.emergencyContactName} onChange={e => updateField('emergencyContactName', e.target.value)} disabled={loading} className="h-12" />
                      </div>
                      <div className="space-y-2">
                        <Label>Address</Label>
                        <Input value={formData.emergencyContactAddress} onChange={e => updateField('emergencyContactAddress', e.target.value)} disabled={loading} className="h-12" />
                      </div>
                      <div className="space-y-2">
                        <Label>Phone Number</Label>
                        <Input value={formData.emergencyContactPhone} onChange={e => updateField('emergencyContactPhone', e.target.value)} disabled={loading} className="h-12" />
                      </div>
                    </div>
                  </div>
                </>
              )}

              {/* TEACHER SECRET */}

              {formData.role === 'teacher' && (
                <div className="space-y-2">
                  <Label>Teacher Secret Code</Label>

                  <Input
                    type="password"
                    value={formData.teacherSecret}
                    onChange={e => updateField('teacherSecret', e.target.value)}
                    required
                    disabled={loading}
                    className="h-12"
                  />
                </div>
              )}

              {/* SUBMIT */}

              <Button
                type="submit"
                className="w-full h-12 text-lg font-semibold gap-2"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="animate-spin" />
                    Registering...
                  </>
                ) : (
                  <>
                    Sign Up
                    <UserPlus size={18} />
                  </>
                )}
              </Button>

            </form>

            <div className="text-center mt-6 text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link href="/" className="font-semibold text-primary hover:underline">
                Sign In
              </Link>
            </div>

          </div>

        </div>

      </main>
    </div>
  )
}
